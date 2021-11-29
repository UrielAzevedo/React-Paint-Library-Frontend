import React, {useState} from 'react'
import '../../components_style_sheet/main_page/searchBar.css'

function ComponentSearchBar(){
    
    var hasName = false
    var id = null
    const [inputChar, setInputChar] = useState("")

    const onSubmit = (e) => {
        if(e.key === 'Enter'){

            const query = {
                method: "GET"
            }
    
            fetch(`https://react-paint-library-backend.herokuapp.com/hasName/?name=${inputChar}`, query)
            .catch((err) => console.log(err))
            .then((response) => response.json())
            .then((data) => {
                hasName = data.hasName
                id = (hasName ? data.id : null)

                if(hasName){
                    window.location.replace(`https://react-paint-library-frontend.herokuapp.com/paintingDisplay/${id}`)
                }
            })
        }
    }

    return(
        <label type="text" name="paintQuery">
            <input placeholder="Paint Search" id="mainQuery" spellCheck="false" autoComplete="off" onKeyDown={onSubmit} onChange={(e) => {setInputChar(e.target.value)}}/>
        </label>
    )
}

export default ComponentSearchBar
