import React, { useEffect, useState } from 'react';
import ResultsList from "../components/Results";

const ResultsView = () => {

    const [showResults, results] = useState(false);

    useEffect(() => {
        document.title = 'List of songs';
    }, []);

    const handleClick = () => {
        results(true);
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Results</h1>
                <div className="startButton">
                    <button className={`button is-large ${showResults ? 'hideButton' : 'showButton'}`} onClick={handleClick}>START</button>
                </div>
                {
                    showResults && <ResultsList/>
                }
            </div>
        </>
    );
};

export default ResultsView;
