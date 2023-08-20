import React, {useRef, useState} from 'react';
import s from './Rewiew.module.scss';
import StarIcon from '@mui/icons-material/Star';
import Gallery from '../Carousel/gallery';
import {Portal} from '@mui/base/Portal';

const Stars = () => (
  <span className={s.stars}>
    <StarIcon fontSize={'14'} className={s.star} />
    <StarIcon fontSize={'14'} className={s.star} />
    <StarIcon fontSize={'14'} className={s.star} />
    <StarIcon fontSize={'14'} className={s.star} />
    <StarIcon fontSize={'14'} className={s.star} />
  </span>
);

const ReviewsCard = (props) => {
  const {name, date, text, imgs} = props;
  const carouselBlockRef = useRef(null);
  const [isOpenGallery, setIsOpenGallery] = useState(false);

  return (
    <div className={s.card}>
      <div className={s.header}>
        <span className={s.row}>
          <span className={s.name}> {name}  </span>
          <Stars />
        </span>
        <span className={s.date}>{date} </span>
      </div>
      <div>
        {text}
      </div>
      {
        imgs ? (
          <div className={s.imgsBlock}>
            {imgs?.map(({src}) => <img key={src} src={src} onClick={() => setIsOpenGallery(true)} />)}
            <Portal>
              <div ref={carouselBlockRef}>
                <Gallery
                  imgs={imgs}
                  isOpen={isOpenGallery}
                  setIsOpenGallery={setIsOpenGallery}
                />
              </div>
            </Portal>
          </div>
        ) : null
      }
    </div>
  );
};

export default ReviewsCard;
