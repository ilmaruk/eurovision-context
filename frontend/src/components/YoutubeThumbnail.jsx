import React, {useEffect} from 'react'
import logo from '../assets/eurovision-logo.svg'
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
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <YouTube videoId={videoId} opts={opts} onReady={onReady}/>
    )
};


export default Youtube
