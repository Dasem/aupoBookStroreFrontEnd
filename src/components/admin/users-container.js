import {connect} from "react-redux";
import {GetUsers, SetUsers} from "../../redux/actions/user";
import Users from "./users";

const mapStateToProps = state => ({
    users: state.users.users,
})

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(new GetUsers()),
        setUsers: (users) => dispatch(new SetUsers(users)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);