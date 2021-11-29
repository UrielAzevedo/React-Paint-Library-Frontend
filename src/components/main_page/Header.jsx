import React from 'react'
import '../../components_style_sheet/main_page/header.css'
import {Link } from "react-router-dom";

function ComponentHeader() {

    return (
        <div className="header">
            <div>
                <Link to="/">Main</Link>
            </div>

            <div>
                <Link to="/cadastro">Registration</Link>
            </div>

            <div>
                <Link to="/allPaintings">Paintings List</Link>
            </div>

        </div>
    )
}
export default ComponentHeader