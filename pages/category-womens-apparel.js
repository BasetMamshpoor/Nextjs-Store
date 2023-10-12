import SelectCategory from 'Components/Categories/SelectCategory';
import SelectGender from 'Components/Categories/SelectGender';


const Womens = () => {
    return (
        <>
            <SelectGender gender={'womens'} />
            <SelectCategory gender={'womens'} />
        </>
    );
};

export default Womens;