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
            setSquare,
            square,
            setChannel,
            channel,
            listCalculates,
            setListCalculates
        } = this.props;
        const headerTitle = '???????????????? ????????????';

        return (
            <React.Fragment>
                <Button
                    variant={'contained'}
                    onClick={toggleShow}
                    className={cn(s.buttonMain, className)}
                    {...buttonProps}
                >
                    {'????????????????????'}
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
                            <span className={s.title}>  {headerTitle} </span>
                            <IconButton onClick={toggleShow} className={s.closeButton}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <div className={s.content}>
              <span className={s.desc}>
                ?????????????? ???????? ?????????? ???????????????? ?? ???????????????? ???????????? ??????????. ?????????? 10 ?????????? ?????? ???????????? ?????????? ??????????!
                  <span style={{color: 'gray'}}>*</span>
              </span>
                            <span style={{margin: '10px 0'}}>
                                <b> ?????????? - {`${product.category} ${product.brand} ${product.name}`} </b>
                            </span>
                            <div className={s.inputs}>
                                <TextField
                                    onChange={setName}
                                    label={'??????'}
                                    value={name}
                                    variant="standard"
                                />
                                <TextField
                                    onChange={setPhone}
                                    value={phone}
                                    // label={'??????????'}
                                    InputProps={{inputComponent: this.textMaskCustom}}
                                    variant="standard"
                                />
                                <TextField
                                    onChange={setSquare}
                                    label={'???????? ??????????????'}
                                    value={square}
                                    variant="standard"
                                />
                                <FormGroup>
                                    <FormControlLabel onChange={({target}) => setListCalculates('???????????? ?????????????????????????? ????????????', target.checked)}
                                                      checked={listCalculates.includes('???????????? ?????????????????????????? ????????????')}
                                                      control={<Checkbox size="small"/>}
                                                      label={'???????????? ?????????????????????????? ????????????'}
                                    />
                                    <FormControlLabel onChange={({target}) => setListCalculates('???????????? ????????????',  target.checked)}
                                                      checked={listCalculates.includes('???????????? ????????????')}
                                                      control={<Checkbox size="small"/>}
                                                      label={'???????????? ????????????'}/>
                                    <FormControlLabel onChange={({target}) => setListCalculates('?????????? ??????????????',  target.checked)}
                                                      checked={listCalculates.includes('?????????? ??????????????')}
                                                      control={<Checkbox size="small"/>}
                                                      label={'?????????? ??????????????'}/>
                                </FormGroup>

                                <FormControl>
                                    <FormLabel id="radio-buttons-group-label">???????????? ??????????</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        onChange={setChannel}
                                        value={channel}
                                    >
                                        <FormControlLabel value="??????????????" control={<Radio size="small"/>}
                                                          label="???? ????????????????"/>
                                        <FormControlLabel value="viber" control={<Radio size="small"/>} label="Viber"/>
                                        <FormControlLabel value="whatsapp" control={<Radio size="small"/>}
                                                          label="WhatsApp"/>
                                        <FormControlLabel value="telegram" control={<Radio size="small"/>}
                                                          label="Telegram"/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={s.helperText}>
                                ?? ?????? ???????????????? ???? ?????????????????? ???????????????????????? ????????????
                            </div>
                            <div className={s.helperText}>
                                *???????????? ???????????????????? ?? ?????????????? ?????????? ????????????
                            </div>
                            <Button
                                variant={'contained'}
                                size={'medium'}
                                className={s.call}
                                onClick={() => apply(product)}
                            >
                                ???????????????? ????????????
                            </Button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Callme;
