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
import SockJsClient from 'react-stomp';
import {SetBasket} from "../../redux/actions/basket";
import {SendOrder} from "../../redux/actions/orders";
import {GetRole} from "../../redux/actions/role";
import {connect} from "react-redux";
import {SetStomp} from "../../redux/actions/stomp";
import {routeStomp} from "../../redux/helpers/api";
import {selectBooks} from "../../redux/selectors/books";
import {SetBooks} from "../../redux/actions/books";

const MainPage = (props) => {

    return (
        <Container>
            <SockJsClient url='http://localhost:8080/bs' topics={['/bookstore']}
                          onMessage={(msg) => {
                              routeStomp(msg, props);
                          }}
                          ref={(client) => {
                              if (!props.stomp && client){
                                  props.setStomp(client)
                              }
                          }}/>
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

const mapStateToProps = state => ({
    stomp: state.stomp.stomp
})

const mapDispatchToProps = dispatch => {
    return {
        setStomp: (stomp) => dispatch(new SetStomp(stomp)),
        setBooks: (books) => dispatch(new SetBooks(books)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);