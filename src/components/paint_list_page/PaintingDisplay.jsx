import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import '../../components_style_sheet/paints_display_page/paintingDisplay.css'

const PaintingDisplay = () => {

    var { paintingId } = useParams()
    paintingId = parseInt(paintingId.substring(paintingId.lastIndexOf(':') + 1))

    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(true)
    const [deleteButton, setDeleteButton] = useState(null)
    const [displayData, setdisplayData] = useState({ name: 0, author: "", genre: "", year: "", file: "", imgId: "" })
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")
    const [nameInput, setNameInput] = useState("")
    const [yearInput, setYearInput] = useState("")
    const [authorInput, setAuthorInput] = useState("")
    const [genreInput, setGenreInput] = useState("")

    const getQuery = {
        method: "GET"
    }

    useEffect(() => {
        fetch(`https://react-paint-library-backend.herokuapp.com/paintingDisplay?id=${paintingId}`, getQuery)
            .catch(err => console.log(err))
            .then(response => response.json())
            .then(data => {
                setdisplayData({
                    name: data.name,
                    author: data.author_name,
                    genre: data.genre,
                    year: data.year,
                    file: data.file,
                    imgId: data.imgId
                })
                setName(data.name)
                setYear(data.year)
                setAuthor(data.author_name)
                setGenre(data.genre)
            })

        setLoading(false)
    }, [])
    
    function inputCleaner() {
        setNameInput("")
        setYearInput("")
        setAuthorInput("")
        setGenreInput("")
    }

    function editingDisplay () {
        setName(<input type="text" placeholder={displayData.name}  className="info-data-container-input" onChange={(e) => setNameInput(e.target.value)} />)
        setYear(<input type="text" placeholder={displayData.year} className="info-data-container-input" onChange={(e) => setYearInput(e.target.value)} />)
        setAuthor(<input type="text" placeholder={displayData.author} className="info-data-container-input" onChange={(e) => setAuthorInput(e.target.value)} />)
        setGenre(<input type="text" placeholder={displayData.genre} className="info-data-container-input" onChange={(e) => setGenreInput(e.target.value)} />)
        setDeleteButton(
            <div className="buttonContainer">
                <button className="delete-button" onClick={onClickDeleteButton}></button>
            </div>
        )
    }

    function display () {

        setName(displayData.name)
        setYear(displayData.year)
        setAuthor(displayData.author)
        setGenre(displayData.genre)

        setDeleteButton(<div/>)
    } 
    
    const onClickEditButton = () => {
        setEditing(!editing)
        
        if (editing) {
            editingDisplay()        
        } else {
            display()
            
            const body = {
                name: "",
                year: "",
                author: "",
                genre: "",
                id: paintingId,
            }

            body.name = (nameInput ? nameInput : displayData.name)
            body.year = (yearInput ? yearInput : displayData.year)
            body.author = (authorInput ? authorInput : displayData.author)
            body.genre = (genreInput ? genreInput : displayData.genre)
            
            const dataToUpdate = (displayData.name !== body.name || displayData.year !== body.year || displayData.author !== body.author || displayData.genre !== body.genre)

            const postQuery = {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            if(dataToUpdate){
                fetch('https://react-paint-library-backend.herokuapp.com/editPainting', postQuery)
                .catch((err) => console.log(err))
                window.location.reload(true)
            }

            inputCleaner()
        }
    }
      
    const onClickDeleteButton = () => {

        const body = {
            id: paintingId,
            imgId: displayData.imgId
        }
        const deleteQuery = {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('https://react-paint-library-backend.herokuapp.com/paintingDelete', deleteQuery)
        .catch((err) => console.log(err))
        window.location.replace('https://react-paint-library-frontend.herokuapp.com/allPaintings')
    }
    
    if (!loading) {
        return (
            <div className="paintDisplayContainer">
                <div className="paint-tittle-container">
                    {name}
                </div>
                <div className="img-container">
                    <img src={displayData.file} alt="" className="paint-img" />
                    <div className="buttonContainer">
                        {deleteButton}
                        <button className="editButton" id="maumau" onClick={onClickEditButton}>&#9998;</button>
                    </div>
                </div>
                <div className="info-data-container">
                    <div className="author-container">
                        <div className="author-tittle"> Author </div>
                        <div className="author-content-container">{author}</div>
                    </div>
                    <div className="year-container">
                        <div className="year-tittle"> Year </div>
                        <div className="year-content-container">{year}</div>
                    </div>
                    <div className="genre-container">
                        <div className="genre-tittle"> Genre </div>
                        <div className="genre-content-container">{genre}</div>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default PaintingDisplay