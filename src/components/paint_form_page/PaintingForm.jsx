import React, { Fragment, useState, useRef } from 'react'
import '../../components_style_sheet/paint_form_page/paintingForm.css'

const PaintingForm = () => {

    const [img, setImgPrev] = useState({ file: "" })
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const [genre, setGenre] = useState("")
    const imgInput = useRef()

    const imageOnclick = (e) => {
        URL.revokeObjectURL(img.file)

        if (e.target.files[0]) {
            const extension = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf(".") + 1)

            if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
                alert("Image Must Be png or jpg")
                e.target.value = ""
                setImgPrev( { file: "" } )
            }else{
                setImgPrev({ file: URL.createObjectURL(e.target.files[0]) })
            }

        } else {
            setImgPrev({ file: "" })
        }
    }

    const onSubmitFunction = (e) => {
        e.preventDefault()

        const body = {
            name: name,
            author: author,
            year: year,
            genre: genre,
        }

        const formData = new FormData()
        
        formData.append("picture", imgInput.current.files[0])
        formData.append("atributes", JSON.stringify(body))
        
        const postQuery = {
            method: 'POST',
            body: formData,
            Headers: {
                'Contetent-Type': 'multipart/form-data'
            }
        }

        fetch('https://react-paint-library-backend.herokuapp.com/', postQuery)
        .catch(err => console.log(err))
        
        // setTimeout(() => {
        //     window.location.reload(true)
        // }, 2000)
    }

    return (
        <Fragment>
            <div className="tittleContainer">
                <div className="formTittle">Paint</div>
            </div>

            <div className="dataContainer">
                <div className="pictureMinuatureContainer">
                    <img src={img.file} className="picturePreview" alt="" />
                </div>
                <div className="atributesContainer">
                    <form className="formContainer" method="post" encType="multipart/form-data" onSubmit={onSubmitFunction}>
                        <label className="labelContainer">
                            Paint Picture
                            <input type="file" className="imputData" name="picture" onChange={imageOnclick} required="required" ref={imgInput}/>
                        </label>
                        <label className="labelContainer">
                            <div> Paint Name </div>
                            <input type="text" className="imputData" name="paintName" required="required" autoComplete="off" onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="labelContainer">
                            Year Painted
                            <input type="text" className="imputData" name="yearPainted" autoComplete="off" onChange={(e) => setYear(e.target.value)} />
                        </label>
                        <label className="labelContainer">
                            Author Name
                            <input type="text" className="imputData" name="authorName" autoComplete="off" onChange={(e) => setAuthor(e.target.value)} />
                        </label>
                        <label className="labelContainer">
                            Genre
                            <input type="text" className="imputData" name="genre" autoComplete="off" onChange={(e) => setGenre(e.target.value)} />
                        </label>

                        <label className="buttonLabelContainer">
                            Submit
                            <button className="submitButton"/>
                        </label>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default PaintingForm