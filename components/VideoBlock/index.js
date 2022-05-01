import React from 'react';
import s from './style.module.scss';
import PlayerView from "../../components/VideoPlayer";
import classNames from "classnames";


const VideoBlock = ({video, className}) => {
    const videoItems = video.map(src =>
        <PlayerView
            key={src}
            muted={'true'}
            classNameContainer={s.verticalContainerPlayer}
            classNamePlayer={s.verticalPlayer}
            src={'https://master-pola.com/' + src}
        />)
    return (
        <div className={classNames(s.media, className)}>
            {videoItems}
        </div>
    )
};


export default VideoBlock;
