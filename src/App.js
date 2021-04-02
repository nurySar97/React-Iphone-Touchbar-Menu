import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TouchMenu = () => {
  let [styles, setStyles] = useState({ top: 10, left: 0, width: 60, height: 60 });
  let [menuIsOpen, setMenuIsOpen] = useState(false);
  let isDragged = useRef(false);
  let prevPositions = useRef({ top: null, left: null });
  let INNER_WIDTH = window.innerWidth;
  let INNER_HEIGHT = window.innerHeight;

  function setPosition(event, X, Y) {
    let left = event.changedTouches[0].pageX - X;
    let top = event.changedTouches[0].pageY - Y;
    isDragged.current = true;
    if (left > 0 && left < INNER_WIDTH - styles.width && top > 0 && top < INNER_HEIGHT - styles.height) {
      setStyles(prevState => ({ ...prevState, top, left }));
    }
  }

  function onHandleTouchStart(event) {
    setStyles(prevStyles => ({ ...prevStyles, transition: "all 0s linear" }));
    const X = event.changedTouches[0].pageX - styles.left;
    const Y = event.changedTouches[0].pageY - styles.top;
    if (!menuIsOpen) document.ontouchmove = e => setPosition(e, X, Y);
  }

  function onHandleTochEnd() {
    document.ontouchmove = () => null;
    if (isDragged.current) {
      isDragged.current = false;
    } else {
      setMenuIsOpen(prevState => !prevState)
      if (menuIsOpen) {
        setStyles({ transition: "all .25s linear", width: 60, height: 60, left: prevPositions.current.left, top: prevPositions.current.top });
      } else {
        prevPositions.current = { left: styles.left, top: styles.top };
        setStyles({ transition: "all .25s linear", width: 300, height: 300, left: (INNER_WIDTH - 300) / 2, top: (INNER_HEIGHT - 300) / 2 });
      }
    }
  }

  return (
    <div className="grab-box"
      style={styles}
      onTouchStart={onHandleTouchStart}
      onTouchEnd={onHandleTochEnd}
    >
      {
        menuIsOpen
          ?
          <>
            <div className="grab-box__modal" />
            <div className="grab-box__grid">
              <div className="grab-box__item">
                <Link to="/post" style={{ fontSize: 30 }}>
                  Hello
              </Link>
              </div>
              <div className="grab-box__item"></div>
              <div className="grab-box__item"></div>
              <div className="grab-box__item"></div>
            </div>
          </>
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