const formatPrice = ({price, unit = ''}) => {
  if (!price) {
    return '';
  }
  const clearPrice =
        typeof price === 'string' ? price.replace(/\D+/g, '') : price;

  const priceString = new Intl.NumberFormat('ru-RU').format(clearPrice);

  if (!unit) {
    return priceString;
  }

  return `${priceString} ${unit}`;
};

export default formatPrice;
