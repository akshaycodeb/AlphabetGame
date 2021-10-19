import { fabric } from 'fabric';
import React, { useEffect, useState } from 'react';
import '../App.css';

let gameIndex = 0

const Box = () => {
  // const [gameIndex, setindex] = useState(3)

  useEffect(() => {
    initCanvas();
  });

  const Data = {
    backgroundImageurl: "",
    imageUrl: "",
    gameData: [
      [{ text: "H" }, { text: "A" }, { text: "T" }],  
      [{ text: "B" }, { text: "A" }, { text: "T" }],   
      [{ text: "B" }, { text: "A" }, { text: "L" }, { text: "L" }],   
      [{ text: "C" }, { text: "A" }, { text: "T" }],   
      [{ text: "C" }, { text: "U" }, { text: "P" }],    
      [{ text: "M" }, { text: "A" }, { text: "T" }],
      [{ text: "R" }, { text: "A" }, { text: "T" }],
      [{ text: "B" }, { text: "A" }, { text: "G" }],
      [{ text: "F" }, { text: "A" }, { text: "N" }],
    ]
  }

  const Anime = new fabric.Canvas('canvas', {
    height: window.screen.height,
    width: window.screen.width,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    backgroundColor: 'rgba(147, 197, 253)',
    selection: false,
    objectCaching:false
  })

  fabric.Image.fromURL('./img/back.jpg', function (img) {
    Anime.setBackgroundImage(img, Anime.renderAll.bind(Anime), {
      scaleX: Anime.width / img.width,
      scaleY: Anime.height / img.height,
      objectCaching:false
    });
  });

  const initCanvas = () => {
 
     const dragableObjects = []
     const fixedObjects = []
     const { canvasWidth, canvasHeight, cords: textCoardiantes, rectLeft, rectTop, imgLeft } = calculateCoords(Data, gameIndex)


     fabric.Image.fromURL('./img/hat.png', function (myImg) {
      const img1 = myImg.set({
        left: imgLeft, top: 10
      });
      img1.scaleToHeight(100);
      img1.scaleToWidth(100)
      img1.hasControls = false
      img1.lockMovementX = false
      img1.lockMovementY = false
      img1.selectable = false
      Anime.add(img1);
     });

     const data = new fabric.Rect({
      height: canvasHeight,
      width: canvasWidth,
      left: rectLeft,
      top: rectTop,
      fill: 'rgba(147, 197, 253)',
      selectable: false,
      hasControls: false,
      objectCaching:false
     })

    Anime.add(
      new fabric.Text(
        gameIndex.toString(), {
        left: 0, top: 0,
        objectCaching:false
      }
      )
    )

     Anime.add(data)
     Anime.renderAll()

     for (let index = 0; index < textCoardiantes.length; index++) {
      const element = textCoardiantes[index];
      var fabricTextFixed = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: "white", left: element.fixedLeft, top: element.fixedTop, lockMovementX: true,
        lockMovementY: true, selectable: false, hasBorders: false , objectCaching:false
      });
      var fabricTextDragable = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: " red", left: element.dragLeft, top: element.dragTop, hasControls: false, hasBorders: false, objectCaching:false
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
        // Anime.clear()
        Anime.renderAll()
        // Anime.discardActiveObject()
        // Anime.dispose()
        // Anime.remove()
        // Anime.clear()
      }
      )
     }
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
    if (Math.abs(leftPerc) <= 8 && Math.abs(topPerc) <= 8) {
      return true
    } else {
      return false
    }
  }

  const changeData = () => {
    // setindex(gameIndex+1)
    // const activeObject = Anime.getActiveObject()
    // Anime.remove(activeObject);
    gameIndex++;
    // Anime.dispose()
    // initCanvas()
  }

  return (
    <div className="main">
      <div className="can">
        <canvas id="canvas" >
          <img src="./img/hat.png" id="my-image" width="50" height="50" />
        </canvas>
      </div>
      <div className="btnnext">
        <button className="btn" onClick={changeData}>Next</button>
      </div>
    </div>
  );
}
 export default Box

const calculateCoords = (data, dataIndex) => {

  const gameData = data.gameData[dataIndex]
  const numberOfChara = gameData.length

  const minGap = 30
  const letterSize = 50
  const totalGap = minGap * (numberOfChara + 1)

  const canvasWidth = (letterSize * numberOfChara) + totalGap
  const canvasHeight = (minGap * 3) + (letterSize * 2)

  const rectLeft = (window.screen.width - canvasWidth) / 2
  const rectTop = (window.screen.height - canvasHeight) / 2

  const imgLeft = (window.screen.width - canvasWidth + 130) / 2

  let cords = []

  const allXcords = []

  for (let index = 0; index < gameData.length; index++) {
    const element = gameData[index];
    const charX = rectLeft + (minGap * (index + 1)) + (letterSize * index)
    allXcords.push(charX)

    cords.push({
      ...element,
      fixedLeft: charX,
      fixedTop: rectTop + 25
    })
  }
  // console.log(`allXcords ------`, allXcords)
  cords = cords.map(e => {
    const rndInt = Math.floor(Math.random() * (allXcords.length))
    const dragCharX = allXcords[rndInt]
    allXcords.splice(rndInt, 1)
    return { ...e, dragLeft: dragCharX, dragTop: rectTop + 100 }
  }
  )
  // console.log(`cords`, cords)
  return { canvasWidth, canvasHeight, cords, rectLeft, rectTop, imgLeft }
}
