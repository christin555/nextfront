import ReactPlayer from 'react-player';
import React from 'react';


const App = ({src, classNameContainer, classNamePlayer, ...props}) => (
        <div className={classNameContainer}>
            <ReactPlayer
                allow="autoplay"
                className={classNamePlayer}
                playing
                loop={true}
                url={src}
                controls
                config={{
                    youtube: {
                        width: '100%',
                        height: '100%',
                        playerVars: {
                            rel: 0,
                            disablekb: 1,
                            showinfo: 0,
                            frameborder: 0
                        }
                    },
                    file: {
                        attributes: {
                            controlsList: "nodownload noremoteplayback noplaybackrate"
                        }
                    }
                }}
                {...props}
            />
        </div>
    )
;

export default App;
