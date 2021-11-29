import React from 'react'
import OptionsButton from './OptionsButton'
import SearchBar from './SearchBar'
import '../../components_style_sheet/main_page/mainColumnFrontPage.css'

function MainColumnFrontPage() {

    return (
        <div className="mainColumn">
            <SearchBar/>
            <OptionsButton/>
        </div>
    )
}

export default MainColumnFrontPage