import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Box = () => {

  useEffect(() => {
    initCanvas();
  });

  const textCoardiantes = [{ text: "A", fixedLeft: 230, fixedTop: 50, dragLeft: 350, dragTop: 200, dragcolor: "yellow", fixedColor: "white" },
  { text: "H", fixedLeft: 100, fixedTop: 50, dragLeft: 230, dragTop: 200, dragcolor: "red", fixedColor: "white" },
  { text: "T", fixedLeft: 350, fixedTop: 50, dragLeft: 100, dragTop: 200, dragcolor: "grey", fixedColor: "white" }]

  const initCanvas = () => {

    const Anime = new fabric.Canvas('canvas', {
      height: 350,
      width: 500,
      backgroundColor: 'pink',
    })

    const dragableObjects = []
    const fixedObjects = []

    for (let index = 0; index < textCoardiantes.length; index++) {
      const element = textCoardiantes[index];
      let fabricTextFixed = new fabric.Text(element.text, {
        fontSize: 80, textBackgroundColor: element.fixedColor, left: element.fixedLeft, top: element.fixedTop, lockMovementX: true,
        lockMovementY: true, selectable: false
      });
      let fabricTextDragable = new fabric.Text(element.text, {
        fontSize: 80, textBackgroundColor: element.dragcolor, left: element.dragLeft, top: element.dragTop, hasControls: false,
      });
      Anime.add(fabricTextFixed)
      fixedObjects.push(fabricTextFixed)

      Anime.add(fabricTextDragable)
      dragableObjects.push(fabricTextDragable)
      Anime.renderAll()
    }

    for (let index = 0; index < dragableObjects.length; index++) {
      const element = dragableObjects[index];
      element.on({ 'moving': moving })
    }

    function calculatDiff(Fl, Ft, Dl, Dt) {

      let leftDiff, topDiff, leftPerc, topPerc

      leftDiff = Fl - Dl
      topDiff = Ft - Dt

      // console.log("leftDiff / Fl --- ", leftDiff / Fl);
      leftPerc = (leftDiff / Fl) * 100
      topPerc = (topDiff / Ft) * 100

      // console.log("leftPerc ---", leftPerc);
      // console.log("topPerc ---", topPerc);
      if (Math.abs(leftPerc) <= 10 && Math.abs(topPerc) <= 10) {
        return true
      } else {
        return false
      }
    }

    function moving(e) {
      Anime.on('mouse:up', function () {

        let dragIndex = dragableObjects.findIndex(obj => {
          if (obj.text === e.transform.target.text) {
            return 1
          }
          return 0
        })

        let originalIndex = textCoardiantes.findIndex(obj => {
          if (obj.text === e.transform.target.text) {
            return 1
          }
          return 0
        })

        let fixedIndex = fixedObjects.findIndex(obj => {
          if (obj.text === e.transform.target.text) {
            return 1
          }
          return 0
        })
        const fLeft = textCoardiantes[originalIndex].fixedLeft
        const fTop = textCoardiantes[originalIndex].fixedTop
        const dLeft = e.transform.target.left
        const dTop = e.transform.target.top

        if (calculatDiff(fLeft, fTop, dLeft, dTop)) {
          dragableObjects[dragIndex].left = textCoardiantes[originalIndex].fixedLeft
          dragableObjects[dragIndex].top = textCoardiantes[originalIndex].fixedTop
          dragableObjects[dragIndex].setCoords()
          dragableObjects[dragIndex].lockMovementX = true
          dragableObjects[dragIndex].lockMovementY = true
          dragableObjects[dragIndex].hasControls = false
          dragableObjects[dragIndex].selectable = false
          fixedObjects[fixedIndex].hasControls = false
          fixedObjects[fixedIndex].selectable = false
        }
        else {
          dragableObjects[dragIndex].left = textCoardiantes[originalIndex].dragLeft
          dragableObjects[dragIndex].top = textCoardiantes[originalIndex].dragTop
          dragableObjects[dragIndex].lockMovementX = false
          dragableObjects[dragIndex].lockMovementY = false
          dragableObjects[dragIndex].setCoords()
        }
        Anime.renderAll()
      }
      )
    }
  }

  return (
    <div className="main">
      <div className="img">
      {/* <img src={require('../img/hat.png')}/> */}
      <img src='./img/hat.png' width="150" height="150"/>
      </div>
      <div className="canvas">
       <canvas  id="canvas" />
      </div>
    </div>
  );
}
export default Box