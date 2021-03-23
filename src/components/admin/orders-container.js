import {connect} from "react-redux";
import Goods from "./goods";
import {selectBooks} from "../../redux/selectors/books";
import {GetBooks, SetBooks} from "../../redux/actions/books";
import {GetGenres} from "../../redux/actions/genres";
import {GetOrders, SetOrders} from "../../redux/actions/orders";
import Orders from "./orders";
import {GetUsers} from "../../redux/actions/user";

const mapStateToProps = state => ({
    orders: state.orders.orders,
    books: selectBooks(state),
    users: state.users.users,
})

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(new GetOrders()),
        setOrders: (orders) => dispatch(new SetOrders(orders)),
        getBooks: () => dispatch(new GetBooks()),
        getUsers: () => dispatch(new GetUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);