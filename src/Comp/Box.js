import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Box = () => {

  useEffect(() => {
    initCanvas();
  });

  const textCoardiantes = [{ text: "A", fixedLeft: 140, fixedTop: 30, dragLeft: 250, dragTop: 130, dragcolor: "yellow", fixedColor: "" },
  { text: "H", fixedLeft: 30, fixedTop: 30, dragLeft: 140, dragTop: 130, dragcolor: "red", fixedColor: "" },
  { text: "T", fixedLeft: 250, fixedTop: 30, dragLeft: 30, dragTop: 130, dragcolor: "grey", fixedColor: "" }]

  const initCanvas = () => {

    const Anime = new fabric.Canvas('canvas', {
      height: 200,
      width: 300,
      backgroundColor: 'rgba(147, 197, 253',
      selection:false
      
    })

    const dragableObjects = []
    const fixedObjects = []

    for (let index = 0; index < textCoardiantes.length; index++) {
      const element = textCoardiantes[index];
      let fabricTextFixed = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: element.fixedColor, left: element.fixedLeft, top: element.fixedTop, lockMovementX: true, 
        lockMovementY: true, selectable: false 
      });
      let fabricTextDragable = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: element.dragcolor, left: element.dragLeft, top: element.dragTop, hasControls: false,
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
      if (Math.abs(leftPerc) <= 20 && Math.abs(topPerc) <= 20) {
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
      <img src='./img/hat.png' width="130" height="130"/>
      </div>
      <div className="can">
      <img src="./img/bird.png" width='100' height='200' />
       <canvas  id="canvas" />
      <img src="./img/bird.png" width='100' height='200' />
      </div>
    </div>
  );
}
export default Box