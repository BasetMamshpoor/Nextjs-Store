import Filters from 'Components/Categories/Filters';
import style from 'styles/Offers.module.css'

const Incredible_offers = () => {
    return (
        <>
            <div className={style.Offers}>
                <div className="container">
                    <h2 className={style.headertitle}>همه شگفت‌انگیز‌ها</h2>
                    <div className="row">
                        <div className="col-2">
                            <Filters />
                        </div>
                        <div className="col-10"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Incredible_offers;