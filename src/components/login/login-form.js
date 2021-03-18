import React from "react";
import {Button} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import "./login-form.css"

const LoginForm = () => {
    const handleValidSubmit = (event, values) => {
        if (event.target.id === 'login') {
            login(values);
        } else {
            register(values);
        }
        //this.setState({login: values.login});
    };

    const handleInvalidSubmit = (event, errors, values) => {
        //this.setState({login: values.login, error: true});
        console.log(`Login failed`);
    };

    const login = (values) => {
        // todo: login
    }

    const register = (values) => {
        // todo: register
    }

    return (
        <AvForm
            onValidSubmit={handleValidSubmit}
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