import React from 'react';
import s from './Callme.module.scss';
import {Modal, IconButton, Box} from '@mui/material';
import Button from '../Button';
import CloseIcon from '@mui/icons-material/Close';
import Card from '../Cards/Card';
import {inject} from 'mobx-react';
import cn from 'classnames';
import TextField from '../TextField';
import PhoneInput from './PhoneInput';

@inject(({CallmeStore}) => {
  return {
    isShow: CallmeStore.isShow,
    toggleShow: CallmeStore.toggleShow,
    name: CallmeStore.name,
    setName: CallmeStore.setName,
    apply: CallmeStore.apply,
    failed: CallmeStore.failed
  };
})
class Callme extends React.Component {
  render() {
    const {
      className,
      isShow,
      toggleShow,
      product,
      name,
      setName,
      apply,
      buttonText,
      buttonProps,
      isShowButText = true,
      ButtonCall,
      failed
    } = this.props;
    const headerTitle = product && 'Оставить заявку на товар' || 'Заказать звонок';

    return (
      <React.Fragment>
        {
          ButtonCall ? (
            <Box onClick={toggleShow} display={'flex'}>
              {ButtonCall}
            </Box>
          ) : (
            <Button
              variant={'outlined'}
              onClick={toggleShow}
              className={cn(s.buttonMain, className)}
              {...buttonProps}
            >
              {isShowButText && (buttonText || 'Оставить заявку')}
            </Button>
          )
        }
        <Modal
          disablePortal={true}
          disableEnforceFocus={true}
          disableAutoFocus={true}
          open={!!isShow}
          onClose={toggleShow}
        >
          <div className={s.wrapper}>
            <div className={s.header}>
              <span className={s.title}>  {headerTitle} </span>
              <IconButton onClick={toggleShow} className={s.closeButton}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={s.content}>
              <span className={s.desc}>
                Введите свой номер телефона и Вам поступит бесплатный звонок от нашего салона
              </span>
              {
                product && (
                  <Card {...product} />
                )
              }
              <div className={s.inputs}>
                <TextField
                  error={failed && !name}
                  inputProps={{onChange: setName}}
                  label={'Имя'}
                  value={name}
                  variant='standard'
                />
                <PhoneInput
                  variant={'standard'}
                  label={'Телефон'}
                />
              </div>
              <div className={s.helperText}>
                Я даю согласие на обработку персональных данных
              </div>
              <Button
                size={'small'}
                variant={'dark'}
                className={s.call}
                onClick={() => apply(product)}
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Callme;
