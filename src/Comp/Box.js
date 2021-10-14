import { fabric, Rect } from 'fabric';
import React, { useEffect } from 'react';
import '../App.css';

const Box = () => {

  useEffect(() => {
    initCanvas();
  });

  const Data = {
    backgroundImageurl: "",
    imageUrl: "",
    gameData: [{ text: "H", color: "yellow" },
    { text: "A", color: "yellow" },
    { text: "T", color: "yellow" },
    { text: "D", color: "yellow" },
    { text: "1", color: "yellow" },
    { text: "2", color: "yellow" },
    { text: "3", color: "yellow" },
    { text: "4", color: "yellow" },
    { text: "5", color: "yellow" },
    { text: "E", color: "yellow" },
    { text: "F", color: "yellow" },
    { text: "G", color: "yellow" },
    { text: "H", color: "yellow" },
    { text: "I", color: "yellow" },
    { text: "J", color: "yellow" },
    { text: "K", color: "yellow" },
    { text: "L", color: "yellow" },
    { text: "M", color: "yellow" }
    ]
  }

  // const textCoardiantes = [{ text: "A", fixedLeft: 100, fixedTop: 30, dragLeft: 175, dragTop: 110, dragcolor: "yellow", fixedColor: "" },
  // { text: "H", fixedLeft: 25, fixedTop: 30, dragLeft: 100, dragTop: 110, dragcolor: "red", fixedColor: "" },
  // { text: "T", fixedLeft: 175, fixedTop: 30, dragLeft: 25, dragTop: 110, dragcolor: "grey", fixedColor: "" }]

  const initCanvas = () => {

    const { canvasWidth, canvasHeight, cords: textCoardiantes, rectLeft, rectTop } = calculateCoords(Data)

    // const totalWidth = (window.screen.height - 25)/  2

    const Anime = new fabric.Canvas('canvas', {
      // height: canvasHeight,
      // width: canvasWidth,
      height: window.screen.height,
      width: window.screen.width,
      backgroundColor: 'rgba(147, 197, 253)',
      selection: false
    })
    // Anime.setBackgroundImage("./img/back.jpg",Anime.renderAll.bind(Anime),{
    //   // scaleX: Anime.width / img.width,
    //   // scaleY: Anime.height / img.height
    // })

    fabric.Image.fromURL('./img/back.jpg', function (img) {
      Anime.setBackgroundImage(img, Anime.renderAll.bind(Anime), {
        scaleX: Anime.width / img.width,
        scaleY: Anime.height / img.height
      });
    });
    const imgElement = document.getElementById('my-image');
    const imgInstance = new fabric.Image(imgElement, {
      left: 100,
      top: 100,
      // angle: 30,
      // opacity: 0.85
    });

    Anime.add(imgInstance)


    const data = new fabric.Rect({

      height: canvasHeight,
      width: canvasWidth,
      left: rectLeft,
      top: rectTop,
      fill: 'rgba(147, 197, 253)',
      selectable: false,
      hasControls: false
    })
    Anime.add(data)
    Anime.renderAll()

    const dragableObjects = []
    const fixedObjects = []

    for (let index = 0; index < textCoardiantes.length; index++) {
      const element = textCoardiantes[index];
      var fabricTextFixed = new fabric.Text(element.text, {
        textAlign: 'center',
        fontSize: 50, textBackgroundColor: element.fixedColor, left: element.fixedLeft, top: element.fixedTop, lockMovementX: true,
        lockMovementY: true, selectable: false, hasBorders: false
      });
      var fabricTextDragable = new fabric.Text(element.text, {
        fontSize: 50, textBackgroundColor: element.dragcolor, left: element.dragLeft, top: element.dragTop, hasControls: false, hasBorders: false
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
      <div className="can">
        <canvas id="canvas" >
        </canvas>
      </div>
      <div className="btnnext">
        <button className="btn">Next</button>
      </div>
    </div>
  );
}
export default Box


const calculateCoords = (data) => {



  const gameData = data.gameData
  const numberOfChara = gameData.length

  const minGap = 25
  const letterSize = 50

  const totalGap = minGap * (numberOfChara + 1)
  const canvasWidth = (letterSize * numberOfChara) + totalGap


  const canvasHeight = (minGap * 3) + (letterSize * 2)

  const rectLeft = (window.screen.width - canvasWidth) / 2
  const rectTop = (window.screen.height - canvasHeight) / 2


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
  console.log(`allXcords ------`, allXcords)
  cords = cords.map(e => {
    const rndInt = Math.floor(Math.random() * (allXcords.length))
    const dragCharX = allXcords[rndInt]
    allXcords.splice(rndInt, 1)
    return { ...e, dragLeft: dragCharX, dragTop: rectTop + 100 }
  }
  )
  console.log(`cords`, cords)
  return { canvasWidth, canvasHeight, cords, rectLeft, rectTop }

}
