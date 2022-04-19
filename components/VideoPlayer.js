import ReactPlayer from 'react-player';
import s from './Player.module.scss';
import React from 'react';


const App = ({src}) => (
    <div className={s.container}>
    <ReactPlayer
        allow="autoplay"
        className={s.rect}
        playing
        loop={true}
        url={src}
        controls
        height='100%'
        config={ {
            youtube: { playerVars: {
                    rel: 0,
                    disablekb: 1,
                    showinfo: 0
            } },
            file: {
                attributes: {
                    controlsList: "nodownload noremoteplayback noplaybackrate"
                }
            }
        } } />
    </div>
);

export default App;
