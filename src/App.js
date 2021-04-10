import React, { useRef, useState } from 'react';
import TouchMenuItems from './TouchMenuItems';

const TouchMenu = () => {
  let INNER_WIDTH = window.innerWidth;
  let INNER_HEIGHT = window.innerHeight;
  let TRANSITION_NORMAL = "all .25s linear";
  let TRANSITION_ZERO = "all 0s linear";
  let menuIsOpen = useRef(false);
  let isDragged = useRef(false);
  let prevPositions = useRef({ top: INNER_HEIGHT - 70, left: 10 });

  let [styles, setStyles] = useState(() => {
    let initCoords = JSON.parse(localStorage.getItem("TouchMenuCoords"));
    if (initCoords === null) return { top: INNER_HEIGHT - 70, left: 10, width: 60, height: 60 };
    let { left0, top0 } = initCoords
    return { top: top0, left: left0, width: 60, height: 60 }
  });

  function positionAutoControl(resolve) {
    let LEFT = (INNER_WIDTH - 60) / 2;
    let TOP = (INNER_HEIGHT - 60) / 2;
    let { left, top } = styles;
    if (left <= LEFT && top <= TOP) {
      if (left > top) {
        setStyles(prevStyles => ({ ...prevStyles, top: 0, transition: TRANSITION_NORMAL }))
        return
      }
      setStyles(prevStyles => ({ ...prevStyles, left: 0, transition: TRANSITION_NORMAL }))
    } else if (left > LEFT && top <= TOP) {
      if (INNER_WIDTH - left - 60 > top) {
        setStyles(prevStyles => ({ ...prevStyles, top: 0, transition: TRANSITION_NORMAL }))
        return
      }
      setStyles(prevStyles => ({ ...prevStyles, left: INNER_WIDTH - 60, transition: TRANSITION_NORMAL }))
    } else if (left <= LEFT && top > TOP) {
      if (left > INNER_HEIGHT - top - 60) {
        setStyles(prevStyles => ({ ...prevStyles, top: INNER_HEIGHT - 60, transition: TRANSITION_NORMAL }))
        return
      }
      setStyles(prevStyles => ({ ...prevStyles, left: 0, transition: TRANSITION_NORMAL }))
    } else if (left > LEFT && top > TOP) {
      if (INNER_WIDTH - left > INNER_HEIGHT - top) {
        setStyles(prevStyles => ({ ...prevStyles, top: INNER_HEIGHT - 60, transition: TRANSITION_NORMAL }))
        return
      }
      setStyles(prevStyles => ({ ...prevStyles, left: INNER_WIDTH - 60, transition: TRANSITION_NORMAL }))
    }
    resolve()
  }

  function setPositionToBox(event, distanceX, distanceY) {
    isDragged.current = true;
    let boxPositionX = event.changedTouches[0].pageX - distanceX;
    let boxPositionY = event.changedTouches[0].pageY - distanceY;
    let createLimit = boxPositionX > 0 && boxPositionX < INNER_WIDTH - styles.width && boxPositionY > 0 && boxPositionY < INNER_HEIGHT - styles.height
    if (createLimit) setStyles(prevState => ({ ...prevState, top: boxPositionY, left: boxPositionX }));
  }

  function onHandleTouchStart(event) {
    setStyles(prevStyles => ({ ...prevStyles, transition: TRANSITION_ZERO }));
    const distanceX = event.changedTouches[0].pageX - styles.left;
    const distanceY = event.changedTouches[0].pageY - styles.top;
    if (!menuIsOpen.current) {
      document.ontouchmove = e => setPositionToBox(e, distanceX, distanceY);
      return
    }
    isDragged.current = true;
  }

  function onHandleTochEnd() {
    document.ontouchmove = () => null;
    if (isDragged.current) {
      isDragged.current = false;
      if (!menuIsOpen.current) {
        new Promise(resolve => {
          positionAutoControl(resolve)
        }).then(() => setStyles(prevStyles => ({ ...prevStyles, transition: TRANSITION_ZERO })))
      }
      return
    }
    menuIsOpen.current = true;
    if (menuIsOpen.current) {
      prevPositions.current = { left: styles.left, top: styles.top };
      setStyles({ transition: TRANSITION_NORMAL, width: 300, height: 300, left: (INNER_WIDTH - 300) / 2, top: (INNER_HEIGHT - 300) / 2 });
    }
  }

  function onHandleClickGrabBoxItem(e, type) {
    e.stopPropagation();
    menuIsOpen.current = false;
    setStyles({ transition: TRANSITION_NORMAL, width: 60, height: 60, left: prevPositions.current.left, top: prevPositions.current.top });
    switch (type) {
      case "Menu":
        console.log("Menu")
        break;
      case "Casino":
        console.log("Casino")
        break;
      case "Search":
        console.log("Search")
        break;
      case "Home":
        console.log("Home")
        break;
      case "Chat":
        console.log("Chat")
        break;
      default:
        break
    }
  }

  window.onunload = () => {
    if (menuIsOpen.current) {
      localStorage.setItem("TouchMenuCoords", JSON.stringify({ left0: prevPositions.current.left, top0: prevPositions.current.top }))
      return
    }
    localStorage.setItem("TouchMenuCoords", JSON.stringify({ left0: styles.left, top0: styles.top }))
  }
  return (
    <div className="touchbar"
      style={styles}
      onTouchStart={onHandleTouchStart}
      onTouchEnd={onHandleTochEnd}
    >
      {
        menuIsOpen.current
          ?
          <TouchMenuItems
            onHandleClickGrabBoxItem={onHandleClickGrabBoxItem}
          />
          :
          <>
            <div className="touchbar_radius1">
              <div className="touchbar_radius2">
              </div>
            </div>
          </>
      }
    </div>
  );
}

export default TouchMenu;