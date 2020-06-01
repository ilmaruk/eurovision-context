import React, {useEffect} from 'react'
import {getResults} from "../services/api";

const ResultsList = () => {
    const [songs, updateResults] = React.useState([]);

    // useEffect(() => {
    //     try {
    //         getResults().then(results => {
    //             updateResults(results.results);
    //         });
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // }, []);

    //load somehow fancy?
    // useEffect(function effectFunction() {
    //     async function fetchResults() {
    //         const response = await fetch(
    //             "http://0.0.0.0:5000/results"
    //         );
    //         const json = await response.json();
    //         console.log(json.results);
    //         updateResults(json.results);
    //         console.log(songs);
    //     }
    //     fetchResults();
    // }, []);

    //load somehow fancy?
    useEffect(function effectFunction() {
        let l = 1;
        (function myLoop(l) {
            setTimeout(function() {
                try {
                    getResults(l).then(results => {
                        updateResults(results.results);
                        if (results.votes_total !== results.votes_used) {
                            myLoop(++l)
                        }
                    });
                } catch (e) {
                    console.log(e.message);
                    // Try again
                    myLoop(l)
                }
            }, 1000)
        })(l)
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
                            <tr key={index}>
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
