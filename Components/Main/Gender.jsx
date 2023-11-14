import React, { useContext, useState } from 'react';
import style from './Gender.module.css'
import { Categories } from 'providers/CategoriesProvider';
import SelectCategory from 'Components/Categories/SelectCategory';

const Gender = () => {
    const { categories } = useContext(Categories)

    const [toggleState, setToggleState] = useState(categories[0]);

    const toggleTab = (state) => setToggleState(state);

    const getActiveClass = (id, className) => toggleState.id === id ? className : "";

    return (
        <div className={style.gender}>
            <div className="container">
                <ul className={style.tab_list}>
                    {categories.map(c => {
                        return (
                            <li key={c.id} className={`${style.tabs} ${getActiveClass(c.id, style.active_tabs)}`} onClick={() => toggleTab(c)}>
                                {c.name}
                            </li>
                        )
                    })}
                </ul>
                <SelectCategory categories={toggleState.subCategories} />
            </div>
        </div>
    );
};

export default React.memo(Gender);
