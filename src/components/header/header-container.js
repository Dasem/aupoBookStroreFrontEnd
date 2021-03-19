import {connect} from "react-redux";
import Header from "./header";
import {SetBasket} from "../../redux/actions/basket";
import {SendOrder} from "../../redux/actions/order";
import {GetRole} from "../../redux/actions/role";

const mapStateToProps = state => ({
    basket: state.basket.basket,
    role: state.role.role,
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (basket) => dispatch(new SetBasket(basket)),
        sendOrder: (order) => dispatch(new SendOrder(order)),
        getRole: (role) => dispatch(new GetRole(role)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);