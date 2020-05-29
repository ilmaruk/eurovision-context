import React, { useEffect, useState } from 'react';

const ThankYouView = () => {
    useEffect(() => {
        document.title = 'Thank you';
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="title">Thank You</h1>
            </div>
        </>
    );
};

export default ThankYouView;
