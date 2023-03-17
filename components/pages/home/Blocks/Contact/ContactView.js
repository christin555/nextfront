import React from 'react';
import s from './Style.module.scss';
import TextField from "../../../../TextField";
import {inject} from "mobx-react";
import Button from "../../../../Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneInput from '../../../../Callme/PhoneInput';

@inject(({CallmeStore}) => {
    return {
      name: CallmeStore.name,
      setName: CallmeStore.setName,
      apply: CallmeStore.apply
    };
})
class Contact extends React.Component {

    render() {
        const {
            name,
            setName,
            apply
        } = this.props;

        return (
            <div className={s.container}>
                <h2>
                    Не можете определиться с выбором?
                </h2>
                <p>
                    Получите консультацию нашего специалиста, он ответит на все ваши вопросы, <br/>
                    а также вы всегда можете попросить его сделать  бесплатный расчет и фотографии товара в салоне
                </p>
                <span> Оставьте заявку на консультацию или звоните нам по телефону:
                <a
                  href={'tel:+79829881522'}
                  className={s.phone}>
                    {` +7 (982) 988-15-22`}
                </a>
            </span>
                <div className={s.inputs}>
                    <TextField
                        onChange={setName}
                        placeholder={'Ваше имя'}
                        value={name}
                        variant="outlined"
                    />
                    <PhoneInput
                      placeholder={'Телефон'}
                      variant={'outlined'}
                    />
                    <Button
                        variant={'contained'}
                        onClick={apply}
                        className={s.button}
                    >
                        {'Оставить заявку'}
                    </Button>
                </div>
                <Box margin={'10px 0'}>
                    <Typography variant={'caption'} component={'p'}>
                        Отправляя заявку, вы даете согласие на обработку персональных данных
                    </Typography>
                </Box>
            </div>
        );
    }
};

export default Contact;
