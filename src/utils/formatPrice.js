const formatPrice = ({price, unit = ''}) => {
  if (!price) {
    return '';
  }
  const clearPrice =
        typeof price === 'string' ? price.replace(/\D+/g, '') : price;

  return `${new Intl.NumberFormat('ru-RU')
    .format(clearPrice)} ${unit}`;
};

export default formatPrice;
