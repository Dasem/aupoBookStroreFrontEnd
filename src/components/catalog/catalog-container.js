import {selectBooks} from "../../redux/selectors/books";
import {connect} from "react-redux";
import Catalog from "./catalog";
import {GetBooks} from "../../redux/actions/books";

const mapStateToProps = state => ({
    books: selectBooks(state)
})

const mapDispatchToProps = dispatch => {
    return {
        getBooks: () => dispatch(new GetBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);