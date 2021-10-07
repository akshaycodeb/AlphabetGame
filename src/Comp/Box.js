import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const Box = () => {

  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, [canvas]);

  const textCoardiantes = [{ text: "A", fixedLeft: 250, fixedTop: 400, dragLeft: 400, dragTop: 600, dragcolor: "yellow", fixedColor: "white" },
  { text: "H", fixedLeft: 100, fixedTop: 400, dragLeft: 250, dragTop: 600, dragcolor: "red", fixedColor: "white" },
  { text: "T", fixedLeft: 400, fixedTop: 400, dragLeft: 100, dragTop: 600, dragcolor: "grey", fixedColor: "white" }]

  const initCanvas = () => {

    const Anime = new fabric.Canvas('canvas', {
      height: 800,
      width: 600,
      backgroundColor: 'pink',
    })

    const dragableObjects = []
    const fixedObjects = []

    for (let index = 0; index < textCoardiantes.length; index++) {
      const element = textCoardiantes[index];
      let fabricTextFixed = new fabric.Text(element.text, {
        fontSize: 100, textBackgroundColor: element.fixedColor, left: element.fixedLeft, top: element.fixedTop, lockMovementX: true,
        lockMovementY: true, selectable: false
      });
      let fabricTextDragable = new fabric.Text(element.text, {
        fontSize: 100, textBackgroundColor: element.dragcolor, left: element.dragLeft, top: element.dragTop, hasControls: false,
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

    // function movingText3(e) {
    //   Anime.on('mouse:up', function () {
    //     if (parseInt(e.transform.target.left) > 50 && parseInt(e.transform.target.left) < 150 && parseInt(e.transform.target.top) < 450 && parseInt(e.transform.target.top) > 350) 
    //     {
    //       Text3.left = 100
    //       Text3.top = 400
    //       Text3.setCoords()
    //       Text3.lockMovementX = true
    //       Text3.lockMovementY = true
    //       Text3.hasControls = false
    //       Text3.selectable=false
    //       Text2.hasControls = false
    //       Text2.selectable=false
    //     } else {
    //       Text3.left = 250
    //       Text3.top = 600
    //       Text3.setCoords()
    //     } })
    //   Anime.renderAll()
    // }

    // function movingText4(e) {
    //   Anime.on('mouse:up', function () {
    //     if (parseInt(e.transform.target.left) > 200 && parseInt(e.transform.target.left) < 300 && parseInt(e.transform.target.top) < 450 && parseInt(e.transform.target.top) > 350) {
    //       Text4.left = 250
    //       Text4.top = 400
    //       Text4.setCoords()
    //       Text4.lockMovementX = true
    //       Text4.lockMovementY = true
    //       Text4.hasControls = false
    //       Text4.selectable=false
    //       Text.hasControls = false
    //       Text.selectable=false
    //     } else {
    //       Text4.left = 400
    //       Text4.top = 600
    //       Text4.setCoords()
    //     } })
    //   Anime.renderAll()
    // }

    // Text5.on({ 'moving': moving });
    // Text3.on({ 'moving': movingText3 });
    // Text4.on({ 'moving': movingText4 });

  }

  return (
    <div className="box" >
      <canvas className="canvas" id="canvas">
        {/* <img src={require('./../img/hat.png')} id='img' /> */}
      </canvas>
    </div>
  );
}
export default Box