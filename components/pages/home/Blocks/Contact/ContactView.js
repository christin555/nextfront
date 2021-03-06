import React from 'react';
import s from './Style.module.scss';
import styles from "../../../../Menu/menu.module.scss";
import TextField from "../../../../TextField";
import {inject} from "mobx-react";
import MaskedInput from "react-text-mask";
import Button from "../../../../Button";
import cn from "classnames";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

@inject(({CallmeStore}) => {
    return {
        name: CallmeStore.name,
        setName: CallmeStore.setName,
        phone: CallmeStore.phone,
        setPhone: CallmeStore.setPhone,
        apply: CallmeStore.apply
    };
})
class Contact extends React.Component {
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

    render() {
        const {
            name,
            phone,
            setPhone,
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
                <a href={'tel:+79829881522'} className={s.phone}>
                    {`  +7 (982) 988-15-22`}
                        </a>
            </span>
                <div className={s.inputs}>
                    <TextField
                        onChange={setName}
                        placeholder={'Ваше имя'}
                        value={name}
                        variant="outlined"
                    />
                    <TextField
                        onChange={setPhone}
                        value={phone}
                        // label={'Номер'}
                        InputProps={{inputComponent: this.textMaskCustom}}
                        variant="outlined"
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
