import {connect} from "react-redux";
import LoginForm from "./login-form";
import {SignIn, SignUp} from "../../redux/actions/authorisation";
import {GetRole} from "../../redux/actions/role";

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
    return {
        signIn: (credentials) => dispatch(new SignIn(credentials)),
        signUp: (credentials) => dispatch(new SignUp(credentials)),
        getRole: (role) => dispatch(new GetRole(role)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);