const formatPrice = (price, withCurrency = true, isSquare = true) => {
  if (!price) {
    return '';
  }
  const unit  = isSquare ? ' ₽/м²' : ' ₽'
  const clearPrice =
        typeof price === 'string' ? price.replace(/\D+/g, '') : price;

  return `${new Intl.NumberFormat('ru-RU').format(clearPrice)}${
    withCurrency ? unit : ''
  }`;
};

export default formatPrice;
