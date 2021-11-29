import React from 'react'
import '../../components_style_sheet/paint_form_page/formBody.css'
import PaintingForm from './PaintingForm'

function PaintForm(){

    return(
        <div className="pageContainer">
            <div className="centralizingContainer">
                <PaintingForm/>
            </div>
        </div>
    )
}

export default PaintForm