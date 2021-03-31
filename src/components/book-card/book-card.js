import React from "react";
import {Alert, Col} from "reactstrap";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/all";
import "./book-card.css"
import {Route} from "react-router";
import {ANONYMOUS, getAuthorities} from "../consts/role";
import {copy} from "../consts/utils"

const BookCard = (props) => {

    const alreadyInBasket = () => {
        return props.basket.find((book) => props.book.id === book.id);
    }

    const addBookToBasket = () => {
        if (!alreadyInBasket()) {
            let basketWithNewBook = copy(props.basket);
            basketWithNewBook.push(props.book);
            props.setBasket(basketWithNewBook);
        } else {
            alert(`"${props.book.title}" уже есть в списке купленных товаров`);
        }
    }

    const removeBookFromBasket = () => {
        let basket = props.basket.filter((book) => props.book.id !== book.id);
        props.setBasket(basket);
    }

    return (
        <Col>
            {!getAuthorities().includes(ANONYMOUS) &&
            <Route path={"/catalog"}>
                <div className={"add-to-basket " + (alreadyInBasket() ? "purchased" : "")}  onClick={() => addBookToBasket()}>
                    <AiFillPlusCircle size={30}/>
                </div>
            </Route>
            }
            <Route path={"/basket"}>
                <div className={"remove-from-basket"} onClick={() => removeBookFromBasket()}>
                    <AiFillMinusCircle size={30}/>
                </div>
            </Route>
            <h3>{props.book.title}</h3>
            <p>
                {props.book.author}
            </p>
            <p>
                {props.book.genres.map(genre => genre.name).join(" ")}
            </p>
            <Alert color={"success"}>{props.book.price}</Alert>
        </Col>
    );
}

export default BookCard;