import React, { useEffect, useState } from 'react';
import useAppContext from '../hooks/useAppContext';
import Table from '../components/Table'

const ListView = () => {

    return (
        <>
            <div className="container">
                <h1 className="title">List of Existing Jobs</h1>
                <Table
                />
            </div>
        </>
    );
};

export default ListView;
