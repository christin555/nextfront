import Banner from "../../../Banner";
import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';


@inject(({RootStore: {deviceType}}) => {
    return {
        deviceType: deviceType
    };
})
@observer
class BannerView extends Component {
    render() {
        const {deviceType, className} = this.props;

        return (
            <Banner deviceType={deviceType} className={className} items={items}/>
        );
    }
}

const items = [
    {
        background: 'https://master-pola.com/dashboard/uploads/BANNER_SAJT_a3be03ecd1.png',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/Mob_banner_0492b38f3a.png',
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_3_83c7d2100c.jpg',
        title: 'Хотите получить расчет стоимости и объемов материалов?',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/fon_mob_1a38ccfa29.png',
        alignItems: 'flex-start',
        text: 'Выберите товар и закажите расчет материалов за 10 минут. В расчет вы можете включить учет сопутствующих товаров' +
            ' и работ, а также указать препдочитаемый способ связи'
    },
    {
        //img: 'https://master-pola.com/dashboard/uploads/1_c19c558770.jpg',
        background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_1_d4aba3bbd5.png',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/Bez_imeni_1_mob_3402fd1ca4.png',
        link: '/blog/article/laminat_za_tysuachy',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        textButton: 'Подробнее',
        reverse: true
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_2_58cd7d4da1.jpg',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/fon_mob2_07d07d6ee7.png',
        justifyContent: 'center',
        alignItems: 'flex-start',
        title: 'Самая распространённая ошибка при ремонте',
        text: 'У меня ровная стяжка от застройщика, зачем мне ещё выравнивать пол?',
        link: '/blog/article/y_menya_rovny_pol_ot_zastroyshika',
        textButton: 'Подробнее'
    }
//     img: 'https://master-pola.com/dashboard/uploads/m_L8_Qf_Tg_WY_60e2162b7e.jpg',
//     background: 'https://master-pola.com/dashboard/uploads/photo_2022_04_15_18_35_36_27e3ad8e90.jpg',
//     title: 'Кварцвинил вместо керамогранита?',
//     text: 'Не все знают, что керамогранит в коридоре, кухне и в любом жилом помещении можно заменить на SPC👇🏻\n' +
//         'Выходит дешевле, по тактильным ощущениям мягче и теплее, есть дизайны под бетон, камень и мрамор. Особенно если в квартире маленький ребёнок, то лучше предпочесть SPC вместо холодного керамогранита\n' +
//         '\n' +
//         'Сегодня в нашем салоне выбирали с клиентом SPC бренда AlpineFloor на всю квартиру, остановились на двух вариантах - один светлый, другой более тёмный. Пока думаем что выбрать😬😅 А вам какой больше нравится?',
//     link: '/blog/article/kvarzvinyl_vmesto_keramogranita',
//     textButton: 'Подробнее'
// },
// {
//     img: 'https://master-pola.com/dashboard/uploads/photo_2022_04_13_10_50_39_039da162e1.jpg',
//     background: 'https://master-pola.com/dashboard/uploads/photo_2022_04_13_10_50_39_0d960275fc.jpg',
//     title: 'SPC под камень',
//     text: 'Подборка SPC, которая заменит вам керамогранит',
//     link: '/catalog/quartzvinyl_zamkovay?texture=1',
//     textButton: 'Смотреть'
// },
]

export default BannerView;
