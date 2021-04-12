import {connect} from "react-redux";
import Header from "./header";
import {SetBasket} from "../../redux/actions/basket";
import {SendUserOrder} from "../../redux/actions/orders";

const mapStateToProps = state => ({
    basket: state.basket.basket,
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (basket) => dispatch(new SetBasket(basket)),
        sendUserOrder: (order) => dispatch(new SendUserOrder(order)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);