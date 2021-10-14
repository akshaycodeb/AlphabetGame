import { fabric } from 'fabric';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

const Box = () => {
  const history = useHistory()

  useEffect(() => {
    // console.log("screen.width ----------------- ",window.screen.width);
    // console.log("screen.height ----------------- ",window.screen.height);
    initCanvas();
  });

  const Data = {
  backgroundImageurl:"" ,
  imageUrl: "" ,
  gameData: [{text:"A", color:"yellow"}] 
  }

  const textCoardiantes = [{ text: "A", fixedLeft: 100, fixedTop: 30, dragLeft: 175, dragTop: 110, dragcolor: "yellow", fixedColor: "" },                                                                       
  { text: "H", fixedLeft: 25, fixedTop: 30, dragLeft: 100, dragTop: 110, dragcolor: "red", fixedColor: "" },
  { text: "T", fixedLeft: 175, fixedTop: 30, dragLeft: 25, dragTop: 110, dragcolor: "grey", fixedColor: "" }]

  const initCanvas = () => {

    for (let index = 0; index < textCoardiantes.length; index++) {                                                                                                                                                                                                
      const element = textCoardiantes[index];
      
      var canvasWidth=(dataText, spacebetweenText) =>{     

        const total = dataText * 5 + spacebetweenText * 6

        console.log('left', element.fixedLeft);
        console.log('total', total);
        
        if(total == 400){
          return true
        }
        else{
          return false
        }
      }
      console.log("canvasWidth==>" , canvasWidth(50,element.fixedLeft));
    }
     
    // for (let index = 0; index < textCoardiantes.length; index++) {                                                                                         
    //   const element = textCoardiantes[index];
      
    //   var canvasWidth=(t1,t2,t3,t4,t5) =>{     
        
    //     const total = t1+t2+t3+t4+t5
    //     console.log('left', element.fixedLeft);
    //     console.log('total', total);
        
    //     if(total <= 400){
    //       return true
    //     }
    //     else{
    //       return false
    //     }
    //   }
    //   console.log("canvasWidth" , canvasWidth(25,100,175,250,325));
    // }

    const Anime = new fabric.Canvas('canvas', {
      height:200,
      width:250,   
      // width:canvasWidth(50,25),
      // width:(window.screen.width/canvasWidth(50,25)) * 100, 
      backgroundColor: 'rgba(147, 197, 253)',
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
      {/* <p>{window.screen.width} - {window.screen.height}</p> */}
      <img src='./img/hat.png' width="100" height="100"/>
      <div className="can">
       <canvas  id="canvas" />
      </div>
      {/* <div className="btnnext">
        
      </div> */}
    </div>
  );
}
export default Box