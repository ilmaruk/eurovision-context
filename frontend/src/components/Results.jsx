import React, {useEffect} from 'react'

const ResultsList = () => {
     const [songs, updateResults] = React.useState([]);

    useEffect(function effectFunction() {
        async function fetchResults() {
            const response = await fetch(
                "http://0.0.0.0:5000/results"
            );
            const json = await response.json();
            console.log(json.results);
            updateResults(json.results);
            console.log(songs);
        }
        fetchResults();
    }, []);


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Points</th>
                        <th>Title</th>
                        <th>Country</th>
                    </tr>
                </thead>
                {songs && songs.map( (item, index) => {
                    return(
                        <tbody key={`tbody-${index}`}>
                        <tr
                            key={index}
                        >
                            <td>{item.points}</td>
                            <td>{item.song.title}</td>
                            <td>{item.song.country}</td>
                            <td>{item.song.artist}</td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </>
    );
};

export default ResultsList;
