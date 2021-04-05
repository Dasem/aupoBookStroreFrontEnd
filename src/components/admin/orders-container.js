import {connect} from "react-redux";
import {selectBooks} from "../../redux/selectors/books";
import {GetBooks} from "../../redux/actions/books";
import {DeleteOrder, GetOrders, CreateOrder, SetOrders} from "../../redux/actions/orders";
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
        createOrder: (order) => dispatch(new CreateOrder(order)),
        deleteOrder: (id) => dispatch(new DeleteOrder(id)),
        getBooks: () => dispatch(new GetBooks()),
        getUsers: () => dispatch(new GetUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);