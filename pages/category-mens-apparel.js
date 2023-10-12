import SelectCategory from 'Components/Categories/SelectCategory';
import SelectGender from 'Components/Categories/SelectGender';


const Womens = () => {
    return (
        <>
            <SelectGender gender={'mens'} />
            <SelectCategory gender={'mens'} />
        </>
    );
};

export default Womens;