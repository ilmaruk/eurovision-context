import React from 'react'
import YouTube from "react-youtube";

const Youtube = ({videoId}) => {

    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    const opts = {
        height: '150',
        width: '200',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <YouTube videoId={videoId} opts={opts} onReady={onReady}/>
    )
};


export default Youtube
