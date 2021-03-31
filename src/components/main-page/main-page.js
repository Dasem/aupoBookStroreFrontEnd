import React from "react";
import {Container} from "reactstrap";
import Header from "../header/header-container";
import Catalog from "../catalog/catalog-container";
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route} from "react-router";
import Basket from "../basket/basket-container";
import LoginForm from "../login/login-form-container";
import Goods from "../admin/goods-container";
import Orders from "../admin/orders-container";
import Users from "../admin/users-container";

const MainPage = () => {

    return (
        <Container>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/catalog">
                        <Catalog/>
                    </Route>
                    <Route path="/basket">
                        <Basket/>
                    </Route>
                    <Route path="/authorisation">
                        <LoginForm/>
                    </Route>
                    <Route path="/goods">
                        <Goods/>
                    </Route>
                    <Route path="/orders">
                        <Orders/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default MainPage;