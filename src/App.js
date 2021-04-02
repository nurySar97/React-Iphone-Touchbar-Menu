import React, { useEffect, useRef, useState } from 'react';

const TouchMenuItems = ({ onHandleClickGrabBoxItem }) => {
  let [isShow, setIsShow] = useState(false)
  useEffect(() => {
    let timeout = setTimeout(() => setIsShow(true), 250)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <div className="grab-box__modal" onClick={e => onHandleClickGrabBoxItem(e,0)} />
      <div className={`grab-box__grid${isShow ? " opacity" : ""}`}>
        <div className="grab-box__item">
          <button onClick={(e) => onHandleClickGrabBoxItem(e, 1)}>
            Hello
          </button>
        </div>
        <div className="grab-box__item">
          <button onClick={(e) => onHandleClickGrabBoxItem(e, 2)}>
            Hello
          </button>
        </div>
        <div className="grab-box__item">
          <button onClick={(e) => onHandleClickGrabBoxItem(e, 3)}>
            Hello
          </button>
        </div>
        <div className="grab-box__item">
          <button onClick={(e) => onHandleClickGrabBoxItem(e, 4)}>
            Hello
          </button>
        </div>
      </div>
    </>
  )
}


const TouchMenu = () => {
  let [styles, setStyles] = useState({ top: 100, left: 200, width: 60, height: 60 });
  let menuIsOpen = useRef(false)
  let isDragged = useRef(false);
  let prevPositions = useRef({ top: null, left: null });
  let INNER_WIDTH = window.innerWidth;
  let INNER_HEIGHT = window.innerHeight;

  function setPositionToBox(event, distanceX, distanceY) {
    isDragged.current = true;
    let boxPositionX = event.changedTouches[0].pageX - distanceX;
    let boxPositionY = event.changedTouches[0].pageY - distanceY;
    let createLimit = boxPositionX > 0 && boxPositionX < INNER_WIDTH - styles.width && boxPositionY > 0 && boxPositionY < INNER_HEIGHT - styles.height
    if (createLimit) setStyles(prevState => ({ ...prevState, top: boxPositionY, left: boxPositionX }));
  }

  function onHandleTouchStart(event) {
    setStyles(prevStyles => ({ ...prevStyles, transition: "all 0s linear" }));
    // Distance box coord's until touched place coord's 
    const distanceX = event.changedTouches[0].pageX - styles.left;
    const distanceY = event.changedTouches[0].pageY - styles.top;
    if (!menuIsOpen.current) {
      document.ontouchmove = e => setPositionToBox(e, distanceX, distanceY);
    } else {
      isDragged.current = true;
    }
  }

  function onHandleTochEnd() {
    document.ontouchmove = () => null;
    if (isDragged.current) {
      isDragged.current = false;
    } else {
      menuIsOpen.current = true;
      if (menuIsOpen.current) {
        prevPositions.current = { left: styles.left, top: styles.top };
        setStyles({ transition: "all .25s linear", width: 300, height: 300, left: (INNER_WIDTH - 300) / 2, top: (INNER_HEIGHT - 300) / 2 });
      }
    }
  }

  function onHandleClickGrabBoxItem(e, number) {
    e.stopPropagation();
    menuIsOpen.current = false;
    setStyles({ transition: "all .25s linear", width: 60, height: 60, left: prevPositions.current.left, top: prevPositions.current.top });
    console.log(number)
  }

  return (
    <div className="grab-box"
      style={styles}
      onTouchStart={onHandleTouchStart}
      onTouchEnd={onHandleTochEnd}
    >
      {
        menuIsOpen.current
          ?
          <TouchMenuItems onHandleClickGrabBoxItem={onHandleClickGrabBoxItem} />
          :
          <>
            <div className="grab-box_radius1">
              <div className="grab-box_radius2">
              </div>
            </div>
          </>
      }
    </div>
  );
}

export default TouchMenu;