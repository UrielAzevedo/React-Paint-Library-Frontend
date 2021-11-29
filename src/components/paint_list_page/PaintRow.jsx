import React from "react";
import PaintMiniature from "./PaintMiniature";
import '../../components_style_sheet/paints_display_page/paintRow.css'

const PaintRow = (props) => {

    const paintingsIds = props.id

    if(paintingsIds){
        return (
            <div className="rowContainer">
                <PaintMiniature id={paintingsIds[0]}/>        
                <PaintMiniature id={paintingsIds[1]}/>        
                <PaintMiniature id={paintingsIds[2]}/>        
            </div>
        )
    }else{
        return(
            <div>
                
            </div>
        )
    }
}

export default PaintRow