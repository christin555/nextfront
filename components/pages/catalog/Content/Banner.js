import Banner from "../../../Banner";
import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';
import {PageStore} from "../../../../src/stores/CatalogStore/PageStore";


@inject(({RootStore: {deviceType, setSelection}}) => {
    return {deviceType, setSelection};
})
@observer
class BannerView extends Component {
    render() {
        const {deviceType, className, setSelection} = this.props;

        return (
            <Banner
                setSelection={setSelection}
                deviceType={deviceType}
                className={className}
                items={items}
            />
        );
    }
}

//mock
const items = [
    {
        background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_3_a80280df16.jpg',
        title: 'Влагостойкий ламинат Alsafloor',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/alsa_mob_35e62f9da8.jpg',
        text: 'Французские стандарты качества - влагостойкость 24 часа',
        justifyContent: 'center',
        textButton: 'Смотреть все дизайны',
        selection: 'alsafloor',
        link: '/catalog/laminate?selection=alsafloor',
        category: 'laminate',
        mobJustifyContent: 'flex-end'
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/art_4842258ffb.png',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/art_mob_aae1f7fd96.png',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        mobAlignItems: 'flex-start',
        textButton: 'Смотреть коллекцию',
        selection: 'arteast_optima',
        link: '/catalog/quartzvinyl_zamkovay?selection=arteast_optima',
        category: 'quartzvinyl_zamkovay'
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_5_93ac65f165.png',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/Bez_imeni_5mob_d61f14260e.png',
        textButton: 'Смотреть дизайны',
        selection: 'alpinefloor',
        link: '/catalog/quartzvinyl?selection=alpinefloor',
        category: 'quartzvinyl',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/podplirtky_0740dc57f2.jpg',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/podplirtky_mob_2f88a02ae8.jpg',
        textButton: 'Смотреть подборку',
        text: 'Теплая альтернатива керамограниту',
        title: 'Кварцвинил под плитку',
        selection: 'podplitky',
        link: '/catalog/quartzvinyl?selection=podplitky',
        category: 'quartzvinyl',
        mobAlignItems: 'flex-start',
        mobJustifyContent: 'flex-end'
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/Banner_dekstom3_6830f35422.jpg',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/Banner_mob4jpg_a5888f9ccc.jpg',
        textButton: 'Смотреть все дизайны',
        selection: 'royce',
        link: '/catalog/quartzvinyl_zamkovay?selection=royce',
        category: 'quartzvinyl_zamkovay',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        mobAlignItems: 'flex-start',
        mobJustifyContent: 'flex-end'
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_1_d4aba3bbd5.png',
        mobileBackground: 'https://master-pola.com/dashboard/uploads/Bez_imeni_1_mob_3402fd1ca4.png',
        link: '/blog/article/laminat_za_tysuachy',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        textButton: 'Подробнее'
    },

    // {
    //     background: 'https://master-pola.com/dashboard/uploads/Bez_imeni_3_83c7d2100c.jpg',
    //     title: 'Хотите получить расчет стоимости и объемов материалов?',
    //     mobileBackground: 'https://master-pola.com/dashboard/uploads/fon_mob_1a38ccfa29.png',
    //     alignItems: 'flex-start',
    //     text: 'Выберите товар и закажите расчет материалов за 10 минут. В расчет вы можете включить учет сопутствующих товаров' +
    //         ' и работ, а также указать препдочитаемый способ связи'
    // },
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
