import React, { useEffect, useRef, useState } from "react";
import { IoClose, IoChevronDownOutline } from 'react-icons/io5'
import ColorLabel from "./ColorLabel";
import Label from "./Label";
import TwoLabel from "./TwoLabel";
import style from "./Dropdown.module.css";
import useSwipeScroll from "hooks/useHorizontalScroll";

const Dropdown = ({ name, styles, styleBox, array, Multiple, setState, Searchable, defaultValue, placeHolder = "انتخاب ...", towLabel, colorInLabel, label, disabled = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(Multiple ? [] : null);
    const [searchValue, setSearchValue] = useState("");
    const scrollRef = useSwipeScroll();
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) searchRef.current.focus();
    }, [showMenu]);

    useEffect(() => {
        if (defaultValue) {
            if (Multiple) setSelectedValue(filterByReference(array, defaultValue))
            else setSelectedValue(array.find(el => el.value === defaultValue))
        } else setSelectedValue(Multiple ? [] : null)
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, [defaultValue]);

    useEffect(() => {
        if (Multiple) {
            if (!defaultValue) !filterByReference(array, selectedValue).length && setSelectedValue([])
        }
        else if (!defaultValue) !array.find(i => i.value === selectedValue?.value) && setSelectedValue(null)
    }, [array])


    const filterByReference = (arr1, arr2) => {
        let result = []
        result = arr1.filter(el => {
            return arr2.find(element => {
                return element.name === el.name
            })
        })
        return result
    }

    const handler = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };
    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) return placeHolder;

        if (Multiple) {
            return (
                <div className={style.dropdown_tags}>
                    {selectedValue.map((option) => (
                        <div key={option.value} className={style.dropdown_tag_item}>
                            {option.name}
                            <span
                                onClick={(e) => onTagRemove(e, option)}
                                className={style.dropdown_tag_close}
                            >
                                <IoClose />
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return selectedValue.name;
    };

    const removeOption = (option) => {
        return selectedValue.filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e, option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        setState(name, newValue);
    };

    const onItemClick = (option, name) => {
        let newValue;
        if (Multiple) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            if (selectedValue !== null && option.value === selectedValue.value) newValue = null
            else newValue = option;
        }
        setSelectedValue(newValue);
        setState(name, Array.isArray(newValue) ? newValue : newValue?.value);
    };

    const isSelected = (option) => {
        if (Multiple) return selectedValue.filter((o) => o.value === option.value).length > 0;
        if (!selectedValue) {
            return false;
        }
        return selectedValue.value === option.value;
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return array;
        }

        return array.filter(option =>
            Object.values(option).some(val =>
                String(val).toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    };

    return (
        <div className={disabled ? style.disabledDropdown : style.dropdown_container} style={styles ? styles : null}>
            <div>
                <section ref={inputRef} onClick={handleInputClick} className={style.dropdown_input} style={styleBox ? styleBox : null}>
                    <div className={style.dropdown_selected_value} ref={scrollRef}>{getDisplay()}</div>
                    <div className={style.dropdown_tools} style={showMenu ? { transform: 'rotate(180deg)' } : null}>
                        <IoChevronDownOutline />
                    </div>
                </section>
                {showMenu && (
                    <div className={style.dropdown_menu}>
                        {Searchable && (
                            <div className={style.search_box}>
                                <input onChange={onSearch} value={searchValue} ref={searchRef} onClick={e => e.stopPropagation()} />
                            </div>
                        )}
                        <ul className={style.dropdown_item_group} dir="auto">
                            {getOptions().map((option) => (
                                <li
                                    onClick={() => onItemClick(option, name)}
                                    key={option.value}
                                    className={style.dropdown_item}
                                >
                                    <label className={style.gqIo}>
                                        <input type="checkbox" hidden defaultChecked={isSelected(option) ? true : false} />
                                        <span className={style.gbPol}></span>
                                        <div className={style.Mdsp}>
                                            {towLabel && <TwoLabel one={option.name} two={option.value} />}
                                            {colorInLabel && <ColorLabel name={option.name} code={option.value} />}
                                            {label && <Label name={option.name} />}
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(Dropdown);