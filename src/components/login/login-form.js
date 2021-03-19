import React from "react";
import {Button} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import "./login-form.css"
import {useHistory} from "react-router";

const LoginForm = (props) => {
    const handleValidSubmit = (event, values) => {
        login(values);
    };

    const handleInvalidSubmit = (event, errors, values) => {
        //this.setState({login: values.login, error: true});
        console.log(`Login failed`);
    };

    const login = (values) => {
        //props.tryToLogin({login: values.login, password: values.password})
        fetch("http://localhost:8080/perform_login", {
            method: 'post',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            body: new URLSearchParams({login: values.login, password: values.password}),
        }).then(
            response => {
                return props.getRole();
            }
        ).then(
            response => history.push('/authorisation')
        ).catch(
            error => console.log(error)
        );
    }

    const history = useHistory();

    const register = (values) => {
        fetch("http://localhost:8080/register", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({login: values.login, password: values.password}),
        }).then(
            response => login(values) // Автоматическая авторизация по окончании регистрации
        ).catch(
            error => console.log(error)
        );
    }

    return (
        <AvForm
            onValidSubmit={(event, values) => handleValidSubmit(event, values)}
            onInvalidSubmit={handleInvalidSubmit}
        >
            <AvField
                name="login"
                label="Логин"
                type="text"
                validate={{
                    required: true,
                    minLength: {
                        value: 6,
                        errorMessage: "Your login must be more than 5 characters"
                    },
                    maxLength: {
                        value: 16,
                        errorMessage: "Your login must be less than 17 characters"
                    }
                }}
            />
            <AvField
                name="password"
                label="Пароль"
                type="password"
                validate={{
                    required: {
                        value: true,
                        errorMessage: "Please enter your password"
                    },
                    pattern: {
                        value: "^[A-Za-z0-9]+$",
                        errorMessage:
                            "Your password must be composed only with letter and numbers"
                    },
                    minLength: {
                        value: 6,
                        errorMessage: "Your password must be between 6 and 16 characters"
                    },
                    maxLength: {
                        value: 16,
                        errorMessage: "Your password must be between 6 and 16 characters"
                    }
                }}
            />
            <div className={"authorisation-buttons"}>
                <Button id="login">Войти</Button>
                <Button id="register">Зарегистрироватсья</Button>
            </div>
        </AvForm>
    );
}

export default LoginForm;