import { useEffect, useRef, useState } from "react"
import axios from "axios"
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import "@neshan-maps-platform/react-openlayers/dist/style.css"
import style from './AddAddress.module.css'
import pinIcon from 'public/Images/pin-location.svg'
import { FiMapPin } from "react-icons/fi";

const AddAddress = () => {
    const input = useRef()

    const [ol, setOl] = useState()
    const [olMap, setOlMap] = useState()
    const [latlng, setLatlng] = useState()
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const handleContextmenu = e => e.preventDefault()

        document.addEventListener('contextmenu', handleContextmenu)
        return ()=> document.removeEventListener('contextmenu', handleContextmenu)
    }, [])

    const onInit = (ol, map) => {
        setOl(ol)
        setOlMap(map)
        // Listen for the 'change:center' event on the view
        map.getView().on('change:center', () => setLatlng(1));
    }

    const handleChange = async (e) => {
        const value = e.target.value
        const center = olMap.getView().getCenter();
        const transformedCoordinates = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
        const latitude = transformedCoordinates[1];
        const longitude = transformedCoordinates[0];
        await axios.get(`https://api.neshan.org/v1/search?term=${value}&lat=${latitude}&lng=${longitude}`, {
            headers: { "Api-Key": `${process.env.NEXT_PUBLIC_NESHAN_SERVICE_KEY}` }
        })
            .then(res => {
                setSearchResult(res.data.items)
            })
            .catch(err => console.log(err))
    }

    const makeDivsResult = () => {
        const handleClick = (e) => {
            setSearchResult([])
            const longitude = e.location.x
            const latitude = e.location.y
            input.current.value = e.title
            setTimeout(() => {
                const view = olMap.getView()
                view.animate({
                    center: (ol.proj.fromLonLat)([longitude, latitude]),
                    zoom: 14,
                    duration: 1000,
                })
            }, 500)
        }
        return searchResult.map(i => {
            return (
                <li key={i.location.x + i.location.y} className={style.place} onClick={() => handleClick(i)}>
                    <pre className={style.placeinfo}>
                        <div className={style.placeIcon}>
                            <FiMapPin />
                        </div>
                        <div className={style.placeName}>
                            <p className={style.top}>{i.title}</p>
                            <p className={style.bottom}>{i.region}</p>
                        </div>
                    </pre>
                </li>
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const center = olMap.getView().getCenter();
        const latlng = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
        setLatlng(latlng)
        await axios.get(`https://api.neshan.org/v5/reverse?lat=${latlng[1]}&lng=${latlng[0]}`, {
            headers: {
                "Api-Key": `${process.env.NEXT_PUBLIC_NESHAN_SERVICE_KEY}`
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={style.addAddress}>
                <div className={style.search}>
                    <form className={style.form}>
                        <div className={style.inputField}>
                            <input ref={input} type="text" onChange={handleChange} placeholder="آدرس خود را وارد کنید" />
                        </div>
                    </form>
                    <ul className={style.result}>
                        {!!searchResult.length && makeDivsResult()}
                    </ul>
                </div>
                <div className={style.map}>
                    <div className={style.marker}><img src={pinIcon.src} alt="" /></div>
                    <NeshanMap
                        mapKey={process.env.NEXT_PUBLIC_NESHAN_MAP_KEY}
                        defaultType="neshan"
                        center={{ latitude: 35.699739, longitude: 51.338097 }}
                        onInit={onInit}
                        className={`neshan_map ${style.neshan}`}
                        zoom={14}
                    />
                </div>
                <div className={style.footer}>
                    <p>مرسوله شما به این آدرس ارسال خواهد شد.</p>
                    <button onClick={handleSubmit} className={[style.submit, !!latlng ? '' : style.disable].join(' ')} disabled={!latlng}>ادامه</button>
                </div>
            </div>
        </>
    )
}

export default AddAddress