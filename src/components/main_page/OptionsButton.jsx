import React, { useRef } from 'react'
import '../../components_style_sheet/main_page/optionsButton.css'

function ComponentOptionsButton() {
    const optionsMenuRefFirst = useRef(null)
    const optionsMenuRefSecond = useRef(null)
    const optionsMenuRefThird = useRef(null)
    const optionMenuRef= useRef(null)

    var buttonClicked = false

    function print (){
        if(!buttonClicked){
            optionsMenuRefFirst.current.style.transform = "translate(100%, 0)"
            optionsMenuRefThird.current.style.transform = "translate(-100%, 0)"
            setTimeout(() =>{
                optionsMenuRefFirst.current.style.transform = "translate(100%, 35%)"
                optionsMenuRefThird.current.style.transform = "translate(-100%, -35%)"
            }, 250)
            buttonClicked = true
        }else{
            optionsMenuRefFirst.current.style.transform = "translate(100%, 0)"
            optionsMenuRefThird.current.style.transform = "translate(-100%, 0)"
            setTimeout(() =>{
                optionsMenuRefFirst.current.style.transform = "translate(0, 0)"
                optionsMenuRefThird.current.style.transform = "translate(0, 0)"
            }, 250)
            buttonClicked = false
        }

    }

    return (
        <div className="optionsMenu" ref={optionMenuRef} onClick={print}>
            <span className="dotMenu" ref={optionsMenuRefFirst}>.</span>
            <span className="dotMenu" ref={optionsMenuRefSecond}>.</span>
            <span className="dotMenu" ref={optionsMenuRefThird}>.</span>
        </div>
    )
}

export default ComponentOptionsButton