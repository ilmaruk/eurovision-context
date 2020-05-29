import React, { useEffect, useState } from 'react';
import ResultsList from "../components/Results";

const ResultsView = () => {

    useEffect(() => {
        document.title = 'List of songs';
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="title">Results</h1>
                <ResultsList/>
            </div>
        </>
    );
};

export default ResultsView;
