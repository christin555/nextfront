import React, {useState} from 'react';
import s from './Rewiew.module.scss';
import StarIcon from '@mui/icons-material/Star';
import Gallery from '../Carousel/gallery';

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
      <div className={s.imgsBlock}>
        {imgs?.map(({src}) => <img key={src} src={src} onClick={() => setIsOpenGallery(true)} />)}
        <Gallery
          imgs={imgs}
          isOpen={isOpenGallery}
          setIsOpenGallery={setIsOpenGallery}
        />
      </div>
    </div>
  );
};

export default ReviewsCard;
