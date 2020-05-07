import React  from 'react'
import { getAllSongs, postVote } from "../services/api";
import { mockedData } from '../mockedData/mockedApi'
import useAppContext from '../hooks/useAppContext';

const items = [
    { "id": "1", "artist": "Violent Thing", "country": "Iceland", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "Ben"},
    { "id": "2", "artist": "b", "country": "Germany", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "no"},
    { "id": "3", "artist": "c", "country": "Spain", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31","title": "sí"},
    { "id": "4", "artist": "d", "country": "Italy", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "fdsa"},
    { "id": "5", "artist": "Ve", "country": "whatever", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "Bfdsa"},
]


const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
}

const Table = () => {

    const [list, setList] = React.useState(items);
    const [email, setEmail] = React.useState('');
    const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
    const { setError } = useAppContext();


    // onDragStart fires when an element
    // starts being dragged
    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list
        });

        // Note: this is only for Firefox.
        // Without it, the DnD won't work.
        // But we are not using it.
        event.dataTransfer.setData("text/html", '');
    }

    // onDragOver fires when an element being dragged
    // enters a droppable area.
    // In this case, any of the items on the list
    const onDragOver = (event) => {

        // in order for the onDrop
        // event to fire, we have
        // to cancel out this one
        event.preventDefault();

        let newList = dragAndDrop.originalOrder;

        // index of the item being dragged
        const draggedFrom = dragAndDrop.draggedFrom;

        // index of the droppable area being hovered
        const draggedTo = Number(event.currentTarget.dataset.position);

        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);

        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];

        if (draggedTo !== dragAndDrop.draggedTo){
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            })
        }

    }


    const onDrop = (event) => {
        setList(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    };
    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });

    };

    const handleVote = async () => {
        setError(null);
        console.log(list);
        console.log(email);
        try {
            await postVote({
                jobQuery: {
                    list: list,
                    email: email
                },
            });
        } catch (e) {
            setError(e.message);
        }
    };

    // Not needed, just for logging purposes:
    React.useEffect( ()=>{
        console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
        console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
    }, [dragAndDrop])

    React.useEffect( ()=>{
        console.log("List updated!");
    }, [list])

    const handleChange = e => {
        setEmail(e.target.value);
    }

    return(
        <>
            <div className="table">
                <section>
                    <ul>
                        <li className="places">
                            <span>Place</span>
                            {items.map((value, index) => {
                                return <span key={index}>{index+1}</span>
                            })}
                        </li>
                    </ul>
                </section>
                <section>
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Country</th>
                                    <th>Artist</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            {list.map( (item, index) => {
                                return(
                                    <tbody key={`tbody-${index}`}>
                                        <tr
                                            key={index}
                                            data-position={index}
                                            id={item.id}
                                            draggable
                                            onDragStart={onDragStart}
                                            onDragOver={onDragOver}
                                            onDrop={onDrop}
                                            onDragLeave={onDragLeave}
                                            className={(dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea" : "") + index}
                                        >
                                            <td>{item.title}</td>
                                            <td>{item.country}</td>
                                            <td>{item.artist}</td>
                                            <td>{item.link}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                        <div className="">
                            <input className="input" type="email" placeholder="Please insert your Oracle email" onChange={handleChange}/>
                        </div>
                        <div>
                            <button type="button" className="button is-link" onClick={handleVote}>
                                VOTE
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
};

export default Table
