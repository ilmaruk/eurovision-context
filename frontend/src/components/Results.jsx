import React, {useEffect} from 'react'
import {getResults} from "../services/api";
import Youtube from "./YoutubeThumbnail";

const ResultsList = () => {
    const [info, updateInfo] = React.useState([]);
    const [final, setFinal] = React.useState(false);

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
                        results.votes_pct = (results.votes_used / results.votes_total * 100.).toFixed(1);
                        updateInfo(results);
                        if (results.votes_total !== results.votes_used) {
                            myLoop(++l)
                        } else {
                            setFinal(true);
                        }
                    });
                } catch (e) {
                    console.log(e.message);
                    // Try again
                    myLoop(l)
                }
            }, 10000)
        })(l)
    }, []);

    return (
        <>
            {info.results && <div className="votes_info">
                <div className="votes_counter">Counting {info.votes_used} votes out of {info.votes_total} ({info.votes_pct}%)</div>
                <div className="votes_last">Last vote from: {info.last}</div>
            </div>}

            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Points</th>
                        <th>Country</th>
                        <th>Artist</th>
                        <th>Song</th>
                    </tr>
                </thead>
                {info.results && info.results.map( (item, index) => {
                    let arrowClass = "black";
                    let arrow = "⥈";
                    if (item.var > 0) {
                        arrowClass = "green";
                        arrow = "⇡";
                    } else if (item.var < 0) {
                        arrowClass = "red";
                        arrow = "⇣";
                    }
                    return(
                        <tbody key={`tbody-${index}`}>
                            <tr key={index} className={`resultsRow results${index}`}>
                                <td>{index+1}</td>
                                <td>{item.points}</td>
                                <td><span className={arrowClass}>{arrow}</span>&nbsp;<img src={process.env.PUBLIC_URL + `/flags/${item.song.country}.svg`} className="imgFlag"/>&nbsp;{item.song.country}</td>
                                <td>{item.song.artist}</td>
                                <td>{item.song.title}</td>
                            </tr>
                        </tbody>
                    )
                })
                }
            </table>

            {info.results && final && <div className="winner">
                And the Winner is:<br/>
                <img src={process.env.PUBLIC_URL + `/flags/${info.results[0].song.country}.svg`} className="imgFlag"/>&nbsp;{info.results[0].song.country}<br/>
                <Youtube videoId={info.results[0].song.video_id} />
            </div>}
        </>
    );
};

export default ResultsList;
