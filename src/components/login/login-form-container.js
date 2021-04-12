import {connect} from "react-redux";
import LoginForm from "./login-form";
import {SignIn, SignUp} from "../../redux/actions/authorisation";

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
    return {
        signIn: (credentials) => dispatch(new SignIn(credentials)),
        signUp: (credentials) => dispatch(new SignUp(credentials)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);