import React from 'react';
import s from './Blocks.module.scss';
import Russia from '../../../Icons/Russia';
import Present from '../../../Icons/Present';
import House from '../../../Icons/House';
import Square from '../../../Icons/Square';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const blocks = [
  {
    icon: <House className={s.iconChar} />,
    text: <span>Уложено более <nobr>80 000 м²</nobr></span>,
    desc: 'Наши специалисты имеют многолетний опыт в укладке напольных покрытий - более 15 лет'
  },
  {
    icon: <Russia className={s.iconChar} />, text: 'Работаем по всей России',
    desc: 'Принимаем заказы и доставляем товары по всем городам России'
  },
  {
    icon: <VerifiedUserIcon className={s.iconChar} />, text: 'Надежно',
    desc: 'Мы работаем только с проверенными и качественными производителями.' +
            ' На монтаж предоставляем гарантию'
  },
  {
    icon: <Present className={s.iconChar} />,
    text: 'Выгодно',
    desc: 'У нас лучшие цены в городе - проверено покупателями'
  }
];
const Blocks = () => (
  <div className={s.charsBlock}>
    <div>
      <div className={s.charsBlocks}> {
        blocks.map(({icon, text, desc}, index) => (
          <div key={index} className={s.char}>
            <div>{icon} </div>
            <div>
              <div className={s.titleChar}>{text} </div>
              <div className={s.descChar}> {desc}</div>
            </div>
          </div>
        ))
      }
      </div>
    </div>

  </div>
);

export default Blocks;
