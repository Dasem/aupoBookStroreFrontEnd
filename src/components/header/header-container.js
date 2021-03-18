import {connect} from "react-redux";
import Header from "./header";
import {SetBasket} from "../../redux/actions/basket";
import {SendOrder} from "../../redux/actions/order";

const mapStateToProps = state => ({
    basket: state.basket.basket
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (basket) => dispatch(new SetBasket(basket)),
        sendOrder: (order) => dispatch(new SendOrder(order)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);