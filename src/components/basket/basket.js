import React from "react";
import {Row} from "reactstrap";

import BookCard from "../book-card/book-card-container";

const Basket = (props) => {
    return (
        <div>
            <Row xs={"3"}>
                {
                    props.basket && props.basket.map(book => {
                        return (
                            <BookCard key={`book-${book.id}`} book={book} />
                        )
                    })
                }
            </Row>
        </div>
    );
}

export default Basket;