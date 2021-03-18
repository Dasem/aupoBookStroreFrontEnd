import {connect} from "react-redux";
import BookCard from "./book-card";
import {SetBasket} from "../../redux/actions/basket";

const mapStateToProps = state => ({
    basket: state.basket.basket,
    role: state.role.role,
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (basket) => dispatch(new SetBasket(basket))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);