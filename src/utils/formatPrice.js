import {priceUnit} from '../enums'

const formatPrice = ({price, withCurrency = true, unit = priceUnit.RUBLE}) => {
    if (!price) {
        return '';
    }
    const clearPrice =
        typeof price === 'string' ? price.replace(/\D+/g, '') : price;

    return `${new Intl.NumberFormat('ru-RU')
        .format(clearPrice)} ${withCurrency ? labelsUnit[unit] : ''}`;
};

const labelsUnit = {
    [priceUnit.RUBLE]: '₽',
    [priceUnit.METRKV]: '₽/м²',
    [priceUnit.SHT]: '₽/шт',
    [priceUnit.KOMPLEKT]: '₽/комплект',
    [priceUnit.POLOTNO]: '₽/полотно'
};

export default formatPrice;
