import {connect} from "react-redux";
import Goods from "./goods";
import {selectBooks} from "../../redux/selectors/books";
import {CreateBook, DeleteBook, GetBooks, SetBooks} from "../../redux/actions/books";
import {GetGenres} from "../../redux/actions/genres";

const mapStateToProps = state => ({
    books: selectBooks(state),
    genres: state.genres.genres,
})

const mapDispatchToProps = dispatch => {
    return {
        setBooks: (books) => dispatch(new SetBooks(books)),
        getBooks: () => dispatch(new GetBooks()),
        createBook: (book) => dispatch(new CreateBook(book)),
        deleteBook: (id) => dispatch(new DeleteBook(id)),
        getGenres: () => dispatch(new GetGenres()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goods);