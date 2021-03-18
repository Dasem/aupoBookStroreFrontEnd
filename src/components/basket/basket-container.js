import {connect} from "react-redux";
import Basket from "./basket";

const mapStateToProps = state => ({
    basket: state.basket.basket
})

export default connect(mapStateToProps)(Basket);