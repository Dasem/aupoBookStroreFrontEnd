import {connect} from "react-redux";
import Header from "./header";
import {SetBasket} from "../../redux/actions/basket";
import {SendOrder} from "../../redux/actions/orders";
import {GetRole} from "../../redux/actions/role";

const mapStateToProps = state => ({
    basket: state.basket.basket,
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (basket) => dispatch(new SetBasket(basket)),
        sendOrder: (order) => dispatch(new SendOrder(order)),
        getRole: () => dispatch(new GetRole()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);