import React, { useEffect, useState } from 'react';
import Table from '../components/Table'

const ListView = () => {

    useEffect(() => {
        document.title = 'List of songs';
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="title">List of Eurosongs</h1>
                <Table
                />
            </div>
        </>
    );
};

export default ListView;
