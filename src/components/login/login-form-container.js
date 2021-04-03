import {connect} from "react-redux";
import LoginForm from "./login-form";
import {SignIn} from "../../redux/actions/authorisation";
import {GetRole} from "../../redux/actions/role";

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
    return {
        tryToLogin: (credentials) => dispatch(new SignIn(credentials)),
        getRole: (role) => dispatch(new GetRole(role)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);