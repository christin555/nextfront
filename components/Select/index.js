import React from 'react';
import ReactSelect, {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const customStyles = {
    secondary: {
        control: (provided, state) => {
            return {
                ...provided,
                'padding': '0 2px',
                'boxShadow': 0,
                fontSize: '14px',
                border: 'none',
                borderRadius: 0,
                'fontWeight': '400'
            };
        },
        placeholder: (provided, state) => {
            return {
                ...provided,
                position: 'relative',
                whiteSpace: 'nowrap',
                opacity: state.isFocused ? 0.5 : 1,
                overflow: 'hidden',
                color: 'black',
                textOverflow: 'ellipsis',
                transform: 'none',
                'marginRight': '10px'
            };
        },
        input: (provided) => {
            return {
                ...provided,
                position: 'absolute',
            };
        },
        valueContainer: (provided) => {
            return {
                ...provided,
                'padding': '0',
                'minHeight': '20px',
            };
        },
        indicatorsContainer: () => {
            return {
                '& [class*="indicatorContainer"]': {
                    '&:hover': {
                        'color': 'rgba(217,217,217,0.83) !important'
                    },
                }
            };
        },
        singleValue: (provided, state) => {
            return {
                ...provided,
                position: 'relative',
                whiteSpace: 'nowrap',
                opacity: state.isFocused ? 0.5 : 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transform: 'none',
                fontSize: '14px'
            };
        },
        menu: (provided) => {
            return {
                ...provided,
                fontSize: '14px',
                borderRadius: 0,
                zIndex: 10
            };
        },
        option: (provided, state) => {
            return {
                ...provided,
                background: state.isSelected && 'rgba(146, 153, 167, 0.1)',
                color: state.isSelected && 'black'
            };
        }
    },
    main: {
        control: (provided, state) => {
            return {
                ...provided,
                'padding': '0 2px',
                'borderColor': 'rgba(226, 226, 226, 0.6)',
                'boxShadow': state.isFocused ? '0 0px 4px rgba(233,245,245)' : 0,
                '&:hover': {
                    'borderColor': 'rgba(217,217,217,0.83)'
                },
                fontSize: '14px'
            };
        },
        placeholder: (provided, state) => {
            return {
                ...provided,
                position: 'relative',
                whiteSpace: 'nowrap',
                opacity: state.isFocused ? 0.5 : 1,
                overflow: 'hidden',
                color: 'gray',
                textOverflow: 'ellipsis',
                transform: 'none',
                'marginRight': '10px'
            };
        },
        input: (provided) => {
            return {
                ...provided,
                position: 'absolute'
            };
        },
        valueContainer: (provided) => {
            return {
                ...provided,
                'padding': '0',
                'minHeight': '20px',
                'minWidth': '150px',
                zIndex: 10
            };
        },
        singleValue: (provided, state) => {
            return {
                ...provided,
                position: 'relative',
                whiteSpace: 'nowrap',
                opacity: state.isFocused ? 0.5 : 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transform: 'none',
                fontSize: '14px'
            };
        },
        menu: (provided) => {
            return {
                ...provided,
                fontSize: '14px',
                zIndex: 10
            };
        },
        option: (provided, state) => {
            return {
                ...provided,
                background: state.isSelected && 'rgba(146, 153, 167, 0.1)',
                color: state.isSelected && 'black'
            };
        }
    }
};

class Select extends React.Component {
    defaultPlaceholder = 'Выберете значение'

    render() {
        const {placeholder, options, loadOptions, defaultOptions, value, variant} = this.props;
        let selected;

        if (typeof value === 'number') {
            selected = options.find(({value: val}) => Number(val) === Number(value));
        }

        return (
            !loadOptions && (
                <ReactSelect
                    placeholder={placeholder || this.defaultPlaceholder}
                    {...this.props}
                    styles={variant && customStyles[variant] || customStyles.main}
                    options={options}
                    value={selected}
                />
            ) || (
                <AsyncSelect
                    placeholder={placeholder || this.defaultPlaceholder}
                    {...this.props}
                    styles={customStyles}
                    loadOptions={loadOptions}
                    cacheOptions={true}
                    defaultOptions={defaultOptions}
                />
            )
        );
    }
}

export default Select;
