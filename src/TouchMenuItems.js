import { faBars, faDice, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const TouchMenuItems = ({ onHandleClickGrabBoxItem }) => {
    let [isShow, setIsShow] = useState(false)
    useEffect(() => {
        let timeout = setTimeout(() => setIsShow(true), 300)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <>
            <div className="touchbar__modal" onClick={e => onHandleClickGrabBoxItem(e, "Modal")} />
            <div className={`touchbar__grid${isShow ? " opacity" : ""}`}>
                <div className="touchbar__item">
                    <button onClick={(e) => onHandleClickGrabBoxItem(e, "Menu")}>
                        <FontAwesomeIcon size="lg" icon={faBars} />
                        <div>Menu</div>
                    </button>
                </div>

                <div className="touchbar__item">
                    <button onClick={(e) => onHandleClickGrabBoxItem(e, "Casino")}>
                        <FontAwesomeIcon size="lg" icon={faDice} />
                        <div>Casino</div>
                    </button>
                </div>

                <div className="touchbar__item">
                    <button onClick={(e) => onHandleClickGrabBoxItem(e, "Search")}>
                        <FontAwesomeIcon size="lg" icon={faSearch} />
                        <div>Search</div>
                    </button>
                </div>

                <div className="touchbar__item">
                    <button onClick={(e) => onHandleClickGrabBoxItem(e, "Home")}>
                        <FontAwesomeIcon size="lg" icon={faHome} />
                        <div>Home</div>
                    </button>
                </div>
            </div>
        </>
    )
}


export default TouchMenuItems;