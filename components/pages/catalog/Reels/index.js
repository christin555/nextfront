import React from 'react';
import Description from '../../../Footer/DescriptionPage';
import {inject, observer} from "mobx-react";
import Image from "next/image";
import {CardMedia, Card, CardContent, Typography, CardActions, Button} from '@mui/material';
import ReactPlayer from 'react-player'

@inject(({RootStore: {CatalogStore}}) => {
    return {
        alias: CatalogStore.category
    };
}) @observer

class DescriptionMain extends React.Component {
    render() {
        return <div>
            <ReactPlayer
                loop={true}
                controls={true}
                autoPlay
                width={'135px'}
                height={'240px'}
                volume={1}
                muted={true}
                url={'https://master-pola.com/static/video/doors.mp4'}
                playing />
        </div>
    }

}

export default DescriptionMain;
