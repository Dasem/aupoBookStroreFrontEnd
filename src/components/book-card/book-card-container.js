import {connect} from "react-redux";
import BookCard from "./book-card";
import {SetBasket} from "../../redux/actions/basket";
import {SetBooks} from "../../redux/actions/books";

const mapStateToProps = state => ({
    basket: state.basket.basket,
    books: state.books.books,
    role: state.role.role,
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (basket) => dispatch(new SetBasket(basket)),
        setBooks: (books) => dispatch(new SetBooks(books))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);