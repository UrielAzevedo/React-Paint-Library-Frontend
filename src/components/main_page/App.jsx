import React from 'react'
import Header from './Header'
import MainColumnFrontPage from '../main_page/MainColumnFrontPage'
import FormBody from '../paint_form_page/FormBody'
import AllPaintingsPage from '../paint_list_page/AllPaintingsPage'
import PaintingDisplay from '../paint_list_page/PaintingDisplay'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import '../../components_style_sheet/main_page/body.css'

function ComponentApp() {
    return (
        <Router>
            <Header/>
            <Switch>

                <Route exact path="/">
                    <MainColumnFrontPage/>
                </Route>

                <Route path="/cadastro">
                    <FormBody/>
                </Route>

                <Route path="/allPaintings">
                    <AllPaintingsPage/>
                </Route>

                <Route path="/paintingDisplay/:paintingId" children={<PaintingDisplay/>}/>

            </Switch>
        </Router>
    )
}

export default ComponentApp