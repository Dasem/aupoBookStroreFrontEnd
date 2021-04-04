import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-form.css"
import {useHistory} from "react-router";
import axios from "axios";


const LoginForm = (props) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return login.length > 0 && password.length > 0;
    }

    return (
        <div className="Login">
            <Form>
                <Form.Group size="lg" controlId="login">
                    <Form.Label>login</Form.Label>
                    <Form.Control
                        autoFocus
                        type="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" onClick={() => props.signIn({login, password})} disabled={!validateForm()}>
                    Войти
                </Button>
                <Button block size="lg" onClick={() => props.signUp({login, password})} disabled={!validateForm()}>
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );
}

export default LoginForm;