import {Card, CardBody, Col, Jumbotron, Row} from "reactstrap";
import LoginForm from "./login-form-container";

const Login = (props) => {
    return (
        <div>
            <Row>
                <Col />
                <Col lg="8">
                    <Jumbotron>
                        <h3>
                            <u>Login Form</u>
                        </h3>
                        <hr />
                        <Card>
                            <CardBody>
                                <LoginForm />
                            </CardBody>
                        </Card>
                    </Jumbotron>
                </Col>
                <Col />
            </Row>
        </div>
    );
}

export default Login;