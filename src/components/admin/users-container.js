import {connect} from "react-redux";
import {CreateUser, DeleteUser, GetUsers, SetUsers} from "../../redux/actions/user";
import Users from "./users";

const mapStateToProps = state => ({
    users: state.users.users,
})

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(new GetUsers()),
        setUsers: (users) => dispatch(new SetUsers(users)),
        createUser: (user) => dispatch(new CreateUser(user)),
        deleteUser: (id) => dispatch(new DeleteUser(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);