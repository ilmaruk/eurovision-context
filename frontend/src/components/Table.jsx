import React, {useEffect} from 'react'
import { getAllSongs, postVote } from "../services/api";
import useAppContext from '../hooks/useAppContext';

const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
};

const Table = () => {

    const [list, setList] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
    const { setError } = useAppContext();


    useEffect(() => {
        getAllSongs().then(songs => {
            setList(songs);
        } );
    }, []);

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
        event.dataTransfer.setData("text/html", '');
    }

    const onDragOver = (event) => {

        event.preventDefault();

        let newList = dragAndDrop.originalOrder;

        const draggedFrom = dragAndDrop.draggedFrom;
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
        try {
            await postVote({
                songs: list,
                email: email,
            });
        } catch (e) {
            setError(e.message);
        }
    };

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
                            {list.map((value, index) => {
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
                            <button type="button" className="button is-medium" onClick={handleVote}>
                                <a href={'/thankyou'}>
                                    VOTE
                                </a>
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
};

export default Table
