import React, { useEffect, useState } from 'react';

const ThankYouView = () => {
    useEffect(() => {
        document.title = 'Thank you';
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="title">Thank You</h1>
                <div className="thankyou">You're all done. Now please sit down and relax;
                    the final results will be shown shortly.</div>
            </div>
        </>
    );
};

export default ThankYouView;
