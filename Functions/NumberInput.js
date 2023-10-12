import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqualObjects from 'shallow-equal/objects';

import { mapToFarsi, mapToLatin, stripAnyThingButDigits, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN } from './util';

class NumberInput extends Component {

    static propTypes = {
        inputRef: PropTypes.any, getInputRef: PropTypes.any, name: PropTypes.string, onChange: PropTypes.func, style: PropTypes.object,
        className: PropTypes.string, disabled: PropTypes.bool, readOnly: PropTypes.bool, maxLength: PropTypes.number, onClick: PropTypes.func, onFocus: PropTypes.func, value: PropTypes.string,
    };

    constructor(props) {
        super(props);
        let ref = props.inputRef || props.getInputRef;
        if (ref && typeof ref === 'function') {
            ref = ref();
        }
        this.inputRef = ref ? ref : React.createRef();
        this.values = this.readValuesFromProps(props);
    }

    readValuesFromProps = (props) => {
        const value = props.value || '';
        const valueToShow = this.mapValue(value, props.numberFormat);

        return {
            value,
            valueToShow,
            selectionStart: undefined,
            selectionEnd: undefined,
        };
    };

    handleKeyDown = (event) => {
        if (this.props.disabled || this.props.readOnly) {
            event.preventDefault();
        } else if (event.keyCode === 8) {
            event.preventDefault();
            this.updateState(this.deleteValue(event.target, -1));
        } else if (event.keyCode === 46) {
            event.preventDefault();
            this.updateState(this.deleteValue(event.target, 1));
        } else if (event.keyCode >= 48 && event.keyCode <= 57) {
            event.preventDefault();
            this.updateState(this.updateValue(event.target, (event.keyCode - 48).toString(), this.props.numberFormat));
        } else if (event.keyCode >= 96 && event.keyCode <= 105) {
            event.preventDefault();
            this.updateState(this.updateValue(event.target, (event.keyCode - 96).toString(), this.props.numberFormat));
        } else if ((event.key >= '۰' && event.key <= '۹') || (event.key >= '٠' && event.key <= '٩')) {
            event.preventDefault();
            this.updateState(this.updateValue(event.target, event.key, this.props.numberFormat));
        } else if (event.keyCode >= 35 && event.keyCode <= 40) {
        } else if (event.keyCode === 9) {
        } else if (event.keyCode === 13) {
            this.hideKeyboard();
        } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 88)) {
        } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 82)) { 
        } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 82)) { 
        } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 73)) { 
        } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 65)) {
        } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 76)) { 
        } else if (event.keyCode >= 112 && event.keyCode <= 123) { 
        } else if (event.keyCode === 229) { 
        } else {
            event.preventDefault();
        }
    };

    hideKeyboard = () => {
        this.inputRef.current.blur();
    }

    handlePaste = (event) => {
        event.preventDefault();
        if (this.props.disabled || this.props.readOnly) return;

        const enteredValue = stripAnyThingButDigits((event.clipboardData || window.clipboardData).getData('text'));

        this.updateState(this.updateValue(event.target, enteredValue, this.props.numberFormat));
    };

    handleInput = (event) => {
        if (this.props.disabled || this.props.readOnly) return;
        if (this.values.valueToShow === event.target.value) return;

        const enteredValue = stripAnyThingButDigits(event.target.value);

        this.updateState(this.recheckValue(event.target, enteredValue, this.props.numberFormat), true);
    };

    mapValue = (value, numberFormat) => {
        if (numberFormat === NUMBER_FORMAT_FARSI) {
            return mapToFarsi(value);
        } else if (numberFormat === NUMBER_FORMAT_LATIN) {
            return mapToLatin(value);
        }
        return mapToFarsi(value);
    };


    updateState = (newState, forceFireChange, noFireOnChange) => {
        if (!newState) return;

        this.values = newState;
        let fireOnChangeInTheEnd = false;
        if (this.inputRef.current.value !== this.values.valueToShow) {
            fireOnChangeInTheEnd = true;
            this.inputRef.current.value = this.values.valueToShow;
        }
        if (this.inputRef.current === document.activeElement) {
            this.inputRef.current.setSelectionRange(this.values.selectionStart, this.values.selectionEnd);
        } else {
        }
        if (fireOnChangeInTheEnd || forceFireChange) {
            if (!noFireOnChange) {
                this.fireOnChange();
            }
        }
    };

    updateValue = (element, enteredValue, numberFormat) => {
        const enteredValueMapped = this.mapValue(enteredValue, numberFormat);
        let valueToShow = element.value;
        let selectionStart = element.selectionStart;
        let selectionEnd = element.selectionEnd;

        let lengthToBe = valueToShow.length + enteredValue.length - (selectionEnd - selectionStart)

        if (this.props.maxLength && lengthToBe > this.props.maxLength) {
            return;
        }

        valueToShow = valueToShow.substring(0, selectionStart) + enteredValueMapped + valueToShow.substring(selectionEnd);

        selectionStart += enteredValueMapped.length;
        selectionEnd = selectionStart;

        const value = mapToLatin(valueToShow);

        return {
            value,
            valueToShow,
            selectionStart,
            selectionEnd,
        };
    };

    recheckValue = (element, enteredValue, numberFormat) => {
        let valueToShow = this.mapValue(enteredValue, numberFormat);
        let selectionStart = element.selectionStart;
        let selectionEnd = element.selectionEnd;

        const value = mapToLatin(valueToShow);

        return {
            value,
            valueToShow,
            selectionStart,
            selectionEnd,
        };
    };

    deleteValue = (element, qty) => {
        let valueToShow = element.value;
        let selectionStart = element.selectionStart;
        let selectionEnd = element.selectionEnd;

        if (selectionStart === selectionEnd) {
            if (qty < 0) {
                if (selectionStart === 0) return;
                valueToShow = valueToShow.substring(0, selectionStart + qty) + valueToShow.substring(selectionEnd);
                selectionStart += qty;
            } else {
                if (selectionEnd === valueToShow.length) return;
                valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd + qty);
            }
        } else {
            valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd);
        }

        selectionEnd = selectionStart;

        const value = mapToLatin(valueToShow);

        return {
            value,
            valueToShow,
            selectionStart,
            selectionEnd,
        };
    };

    fireOnChange = () => {
        if (this.props.onChange) {
            this.props.onChange({ target: { name: this.props.name, value: this.values.value } });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value !== this.values.value || nextProps.numberFormat !== this.props.numberFormat) {
            this.updateState(this.readValuesFromProps(nextProps), false, true);
        }
        if (!shallowEqualObjects(nextProps.style, this.props.style)) {
            return true;
        }
        if (nextProps.className !== this.props.className) {
            this.inputRef.current.className = nextProps.className;
        }
        if (nextProps.disabled !== this.props.disabled) {
            this.inputRef.current.disabled = nextProps.disabled;
        }
        if (nextProps.readOnly !== this.props.readOnly) {
            this.inputRef.current.readOnly = nextProps.readOnly;
        }
        if (nextProps.placeholder !== this.props.placeholder) {
            this.inputRef.current.placeholder = nextProps.placeholder;
        }
        return false;
    }

    render() {
        const { value, onChange, onInput, onPast, onKeyDown, pattern, inputMode, type, ref, inputRef, getInputRef, numberFormat, defaultValue, ...rest } = this.props;
        const { valueToShow } = this.values;
        return (
            <input
                ref={this.inputRef}
                type={"tel"}
                dir={"ltr"}
                defaultValue={valueToShow}
                onKeyDown={this.handleKeyDown}
                onPaste={this.handlePaste}
                onInput={this.handleInput}
                {...rest}
            />
        );
    }
}
export default NumberInput;