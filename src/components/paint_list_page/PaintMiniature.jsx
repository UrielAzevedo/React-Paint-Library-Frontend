import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import '../../components_style_sheet/paints_display_page/paintMiniature.css'

const PaintMiniature = (props) => {

    const [picture, setPicture] = useState({ file: 0 })
    const [name, setName] = useState(null)

    const query = {
        method: 'GET',
    }

    useEffect(() => {
        if(props.id){
            fetch(`https://react-paint-library-backend.herokuapp.com/paintMiniature?id=${props.id}`, query)
            .catch((err) => {
                console.log(err)
            })
            .then(response => response.json())
            .then(data => {
                setPicture({ file: data.file })
                setName(data.name)
            })
        }
    }, [])

    if(name){
        return (
            <Link to={`/paintingDisplay/:${props.id}`} className="displayContainer">
                <div className="imgContainer">
                    <img src={picture.file} alt="" className="img" />
                </div>
                <div className="paintTittleContainer">{name}</div>
            </Link>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default PaintMiniature