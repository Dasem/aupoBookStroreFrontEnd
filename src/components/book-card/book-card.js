import React from "react";
import {Alert, Col} from "reactstrap";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/all";
import "./book-card.css"
import {Route} from "react-router";

const BookCard = (props) => {

    const addBookToBasket = () => {
        if (!props.basket.find((book) => props.book.id === book.id)) {
            props.basket.push(props.book);
            props.setBasket(props.basket);
            //TODO: forceUpdate for adding
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
            <Route path={"/catalog"}>
                <div className={"add-to-basket"} onClick={() => addBookToBasket()}>
                    <AiFillPlusCircle size={30}/>
                </div>
            </Route>
            <Route path={"/basket"}>
                <div className={"remove-from-basket"} onClick={() => removeBookFromBasket()}>
                    <AiFillMinusCircle size={30}/>
                </div>
            </Route>
            <h3>{props.book.title}</h3>

            <p>
                {
                    props.book.author
                }
            </p>

            <p>
                {
                    props.book.genres.map(genre => genre.name).join(" ")
                }
            </p>

            <Alert color={"success"}>{props.book.price}</Alert>
        </Col>
    );
}

export default BookCard;