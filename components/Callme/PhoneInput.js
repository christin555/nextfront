import React from 'react';
import {IMaskInput} from 'react-imask';
import {inject} from 'mobx-react';
import TextField from '../TextField';

@inject(({CallmeStore}) => {
  return {
    phone: CallmeStore.phone,
    setPhone: CallmeStore.setPhone,
    setClearPhone: CallmeStore.setClearPhone,
    isNumberValid: CallmeStore.isNumberValid,
    failed: CallmeStore.failed
  };
})

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  setPhone = ({target}) => {
    const val = target.value;

    this.props.setClearPhone(val);
  }

  onPaste = (event) => {
    const val = event.clipboardData.getData('text');

    this.props.setClearPhone(val);
  }

  onBlur = ({target}) => {
    const val = target.value;

    if (!val || val === '+7' || val === '+7 (') {
      this.props.setClearPhone('');
    } else {
      this.props.setClearPhone(val);
    }
  }

  focusOn = () => {
    if (!this.props.phone) {
      this.props.setClearPhone('+7');
    }
  }

  textMaskCustom = (props) => {
    const {...other} = props;

    return (
      <IMaskInput
        {...other}
        inputRef={this.inputRef}
        onChange={this.setPhone}
        mask={'+7 (###) ###-##-##'}
        definitions={{
          '#': /[0-9]/
        }}
      />
    );
  }

  render() {
    const {
      label,
      phone,
      variant,
      placeholder,
      isNumberValid,
      failed
    } = this.props;

    return (
      <TextField
        color={'error'}
        error={true || failed && !isNumberValid}
        onPaste={this.onPaste}
        onBlur={this.onBlur}
        onFocus={this.focusOn}
        value={phone}
        label={label}
        InputProps={{inputComponent: this.textMaskCustom}}
        variant={variant}
        placeholder={placeholder}
      />
    );
  }
}

export default PhoneInput;
