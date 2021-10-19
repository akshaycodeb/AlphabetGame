import { fabric } from 'fabric';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import '../App.css';
import { FaAngleDoubleRight } from "react-icons/fa";


let gameIndex = 0

const Box = () => {
  const [gameIndex, setgameIndex] = useState(0)
  const [test, setTest] = useState()

  const Data = {
    backgroundImageurl: "",
    imageUrl: "",
    gameData: [
      [{ text: "H" }, { text: "A" }, { text: "T" }],  
      [{ text: "B" }, { text: "A" }, { text: "T" }],   
      [{ text: "T" }, { text: "A" }, { text: "P" }],   
      [{ text: "C" }, { text: "A" }, { text: "T" }],   
      [{ text: "C" }, { text: "U" }, { text: "P" }],    
      [{ text: "M" }, { text: "A" }, { text: "T" }],
      [{ text: "R" }, { text: "A" }, { text: "T" }],
      [{ text: "B" }, { text: "A" }, { text: "G" }],
      [{ text: "F" }, { text: "A" }, { text: "N" }],
    ]
  }

  const initCanvas = (Anime) => {
   
    const dragableObjects = []
    const fixedObjects = []
    const { canvasWidth, canvasHeight, cords: textCoardiantes, rectLeft, rectTop, imgLeft } = calculateCoords(Data, gameIndex)
   
    fabric.Image.fromURL('./img/hat.png', function (myImg) {
      const img1 = myImg.set({
        left: imgLeft, top: rectTop - 90
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
      fill: 'rgba(191, 219, 254)',
      opacity:0.8,
      selectable: false,
      hasControls: false,
      objectCaching:false
    })
    Anime.add(data) 

    // Anime.add(
    //   new fabric.Text(
    //     gameIndex.toString(), {
    //     left: 0, top: 0,
    //     objectCaching:false
    //   }
    //   )
    // )

    for (let index = 0; index < textCoardiantes.length; index++) {
      const element = textCoardiantes[index];
      var fabricTextFixed = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: "white", left: element.fixedLeft, top: element.fixedTop, lockMovementX: true,
        lockMovementY: true, selectable: false, hasBorders: false , objectCaching:false
      });
      var fabricTextDragable = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: "", left: element.dragLeft, top: element.dragTop, hasControls: false, hasBorders: false, objectCaching:false
      });
        fixedObjects.push(fabricTextFixed)
        dragableObjects.push(fabricTextDragable)
        Anime.renderAll()

        const plotObjects=(fabricText1, fabricText2 )=>{
          Anime.add(fabricText1)
          Anime.add(fabricText2)
          Anime.renderAll()
        }
        plotObjects(fabricTextFixed,fabricTextDragable)
    }

    // const removeObjectsfromCanvas=(removeObject1,removeObject2,fabricRect)=>{
    //   Anime.remove(fabricRect)
    //   Anime.remove(removeObject1)
    //   Anime.remove(removeObject2)
    //   // Anime.remove(fabricRect)
    //   Anime.renderAll()
    // }
    // removeObjectsfromCanvas(fabricTextDragable,fabricTextFixed,data)

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
      if (Math.abs(leftPerc) <= 8 && Math.abs(topPerc) <= 8) {
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
  
  //  const removeObjectsfromCanvas=( Anime,removeObject)=>{
  //   Anime.remove(removeObject)
  //   // Anime.remove(fabricRect)
  //   Anime.renderAll()
  // }

//   window.deleteObject = function(Anime) {
//     Anime.getActiveObject().remove();
// }

  const changeData = () => {
    if(gameIndex == 8){
     setgameIndex(0)
    }else{
      setgameIndex(gameIndex + 1)
    }
    initCanvas(test) 

  }

  useLayoutEffect(() => {
    var Anime = new fabric.Canvas('canvas', {
      height: window.screen.height,
      width: window.screen.width,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      backgroundColor: 'rgba(147, 197, 253)', 
      selection: false,
    })

    fabric.Image.fromURL('./img/back.jpg', function (img) {
      Anime.setBackgroundImage(img, Anime.renderAll.bind(Anime), {
        scaleX: Anime.width / img.width,
        scaleY: Anime.height / img.height,
      });
    });
    setTest(Anime)
    initCanvas(Anime)
  }, [])

  return (
    <div className="main">
      <div className="can">
        <canvas id="canvas" >
        {/* <button className="btn" onClick={changeData}>Next</button> */}
        </canvas>
        <FaAngleDoubleRight className="btn" onClick={changeData}/>
      </div>
    </div>
  );
}
export default Box

const calculateCoords = (data, dataIndex) => {

  const gameData = data.gameData[dataIndex]
  const numberOfChara = gameData.length

  const minGap = 25
  const letterSize = 50
  const totalGap = minGap * (numberOfChara + 1)

  const canvasWidth = (letterSize * numberOfChara) + totalGap
  const canvasHeight = (minGap * 3) + (letterSize * 2)

  const rectLeft = (window.screen.width - canvasWidth) / 2
  const rectTop = (window.screen.height - canvasHeight) / 2

  const imgLeft = (window.screen.width - (canvasWidth/2 - 10)) / 2

  let cords = []

  const allXcords = []

  for (let index = 0; index < gameData.length; index++) {
    const element = gameData[index];
    const charX = rectLeft + (minGap * (index + 1)) + (letterSize * index)
    allXcords.push(charX)

    cords.push({
      ...element,
      fixedLeft: charX ,
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
