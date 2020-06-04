import React, { useEffect, useState } from 'react';
import Table from '../components/Table'

const ListView = () => {

    useEffect(() => {
        document.title = 'Eurovision context 2020 entries';
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="title">Eurovision song context 2020 entries</h1>
                <Table
                />
            </div>
        </>
    );
};

export default ListView;
