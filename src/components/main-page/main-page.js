import React from "react";
import {Container} from "reactstrap";
import Header from "../header/header-container";
import Catalog from "../catalog/catalog-container";
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route} from "react-router";
import Basket from "../basket/basket-container";

const MainPage = () => {

    return (
        <Container>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/author/:authorId">
                        <Catalog/>
                    </Route>
                    <Route path="/catalog">
                        <Catalog/>
                    </Route>
                    <Route path="/basket">
                        <Basket/>
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default MainPage;