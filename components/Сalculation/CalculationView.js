import React from 'react';
import s from './Callme.module.scss';
import {Modal, IconButton, Box, Checkbox} from '@mui/material';
import Button from '../Button';
import CloseIcon from '@mui/icons-material/Close';
import MaskedInput from 'react-text-mask';
import Card from '../Cards/Card';
import {inject} from 'mobx-react';
import cn from 'classnames';
import TextField from '../TextField'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import PhoneInput from '../Callme/PhoneInput';

@inject(({CallmeStore}) => {
    return {
        isShow: CallmeStore.isShow,
        toggleShow: CallmeStore.toggleShow,
        name: CallmeStore.name,
        setName: CallmeStore.setName,
        phone: CallmeStore.phone,
        setPhone: CallmeStore.setPhone,
        apply: CallmeStore.apply,
        setSquare: CallmeStore.setSquare,
        square: CallmeStore.square,
        setChannel: CallmeStore.setChannel,
        channel: CallmeStore.channel,
        listCalculates: CallmeStore.listCalculates,
        setListCalculates: CallmeStore.setListCalculates,
      setValue: CallmeStore.setValue,
      values: CallmeStore.values,
      type: CallmeStore.type
    };
})
class Callme extends React.Component {
    textMaskCustom = (props) => {
        const {inputRef, ...other} = props;

        return (
            <MaskedInput
                {...other}
                // ref={(ref) => {
                //   inputRef(ref ? ref.inputElement : null);
                // }}
                mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'_'}
                showMask={true}
            />
        );
    }

    get fields(){
      const {
        listCalculates,
        setListCalculates,
        setValue,
        values,
        type,
        setSquare,
        square
      } = this.props;


      if(type === 'doors'){
       return   <>
         <FormControl>
           <FormLabel id="hinges">Петли</FormLabel>
           <RadioGroup
             row
             aria-labelledby="hinges"
             name="hinges"
             onChange={({target}) => setValue('hinges', target.value)}
           >
             <FormControlLabel value="наружные" control={<Radio />} label="Наружные" />
             <FormControlLabel value="скрытые" control={<Radio />} label="Скрытые" />
         </RadioGroup>
         </FormControl>
         <FormGroup>
         <FormLabel >Включить в расчет </FormLabel>
         <FormControlLabel onChange={({target}) => setValue('furniture', target.checked)}
                          checked={values['фурнитура']}
                          control={<Checkbox size="small"/>}
                          label={'Фурнитура'}    />
         <FormControlLabel onChange={({target}) => setValue('work', target.checked)}
                           checked={values['установка']}
                           control={<Checkbox size="small"/>}
                           label={'Установка'}
         />
         </FormGroup>
         </>
      }
      if(type === 'floor'){
        return  (
          <React.Fragment>
            <TextField
              onChange={setSquare}
              label={'Ваша площадь'}
              value={square}
              variant="standard"
            />
            <FormGroup>
              <FormControlLabel onChange={({target}) => setListCalculates('Учесть сопутствующие товары', target.checked)}
                            checked={listCalculates.includes('Учесть сопутствующие товары')}
                            control={<Checkbox size="small"/>}
                            label={'Учесть сопутствующие товары'}
              />
              <FormControlLabel onChange={({target}) => setListCalculates('Учесть работы',  target.checked)}
                            checked={listCalculates.includes('Учесть работы')}
                            control={<Checkbox size="small"/>}
                            label={'Учесть работы'}/>
              <FormControlLabel onChange={({target}) => setListCalculates('Нужна заливка',  target.checked)}
                            checked={listCalculates.includes('Нужна заливка')}
                            control={<Checkbox size="small"/>}
                            label={'Нужна заливка'}/>
            </FormGroup>
        </React.Fragment>
        )
      }

      return <TextField
        onChange={setSquare}
        label={'Ваша площадь'}
        value={square}
        variant="standard"
      />
    }

    render() {
        const {
            className,
            isShow,
            toggleShow,
            product,
            name,
            phone,
            setPhone,
            setName,
            apply,
            buttonProps,
            setChannel,
            channel
        } = this.props;
        const headerTitle = 'Получить расчет';

        return (
            <React.Fragment>
                <Button
                    variant={'contained'}
                    onClick={toggleShow}
                    className={cn(s.buttonMain, className)}
                    {...buttonProps}
                >
                    {'Рассчитать'}
                </Button>
                <Modal
                    disablePortal={true}
                    disableEnforceFocus={true}
                    disableAutoFocus={true}
                    open={!!isShow}
                    onClose={toggleShow}
                >
                    <div className={s.wrapper}>
                        <div className={s.header}>
                            <span className={s.title}>  {headerTitle}  <span style={{color: 'gray'}}>*</span> </span>
                            <IconButton onClick={toggleShow} className={s.closeButton}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <div className={s.content}>
              <span className={s.desc}>
                Введите свой номер телефона и выберите способ связи
              </span>
                            <span style={{margin: '10px 0'}}>
                                <b> Товар - {`${product.category} ${product.brand} ${product.name}`} </b>
                            </span>
                            <div className={s.inputs}>
                                <TextField
                                    onChange={setName}
                                    label={'Имя'}
                                    value={name}
                                    variant="standard"
                                />
                               <PhoneInput
                                  variant={'standard'}
                                  label={'Телефон'}
                                />
                              {this.fields}
                                <FormControl>
                                    <FormLabel id="radio-buttons-group-label">Способ связи</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        onChange={setChannel}
                                        value={channel}
                                    >
                                        <FormControlLabel value="телефон" control={<Radio size="small"/>}
                                                          label="По телефону"/>
                                        <FormControlLabel value="viber" control={<Radio size="small"/>} label="Viber"/>
                                        <FormControlLabel value="whatsapp" control={<Radio size="small"/>}
                                                          label="WhatsApp"/>
                                        <FormControlLabel value="telegram" control={<Radio size="small"/>}
                                                          label="Telegram"/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={s.helperText}>
                                Я даю согласие на обработку персональных данных
                            </div>
                            <div className={s.helperText}>
                                *Расчет происходит в рабочее время салона
                            </div>
                            <Button
                                variant={'contained'}
                                size={'medium'}
                                className={s.call}
                                onClick={() => apply(product)}
                            >
                                Получить расчет
                            </Button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Callme;
