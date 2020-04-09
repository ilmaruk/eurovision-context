import React  from 'react'
import { getAllSongs } from "../services/api";
import { mockedData } from '../mockedData/mockedApi'

const items = [
    { "number": "1", "artist": "Violent Thing", "country": "Iceland", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "Ben"},
    { "number": "2", "artist": "b", "country": "Germany", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "no"},
    { "number": "3", "artist": "c", "country": "Spain", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31","title": "sí"},
    { "number": "4", "artist": "d", "country": "Italy", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "fdsa"},
    { "number": "5", "artist": "Ve", "country": "whatever", "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31", "title": "Bfdsa"},
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
    const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);

    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list
        });


        // Note: this is only for Firefox.
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
    }


    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });

    }

    // Not needed, just for logging purposes:
    React.useEffect( ()=>{
        console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
        console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
    }, [dragAndDrop])

    React.useEffect( ()=>{
        console.log("List updated!");
    }, [list])

    return(
        <section>
            <ul>
                {list.map( (item, index) => {
                    return(
                        <li
                            key={index}
                            data-position={index}
                            draggable
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onDragLeave={onDragLeave}
                            className={dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea" : ""}
                        >
                            <p>{item.title}</p>
                            <p>{item.country}</p>
                            <p>{item.artist}</p>
                            <p>{item.link}</p>
                            <i className="fas fa-arrows-alt-v"></i>
                        </li>
                    )
                })}

            </ul>
        </section>
    )
};

export default Table
