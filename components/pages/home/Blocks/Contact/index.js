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

@inject(({RootStore: {HomeStore}}) => {
    return {
        name: HomeStore.name,
        setName: HomeStore.setName,
        phone: HomeStore.phone,
        setPhone: HomeStore.setPhone,
        apply: HomeStore.apply
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
            className,
            isShow,
            toggleShow,
            product,
            name,
            phone,
            setPhone,
            setName,
            apply,
            buttonText,
            buttonProps,
            isShowButText = true
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
                        onClick={toggleShow}

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
