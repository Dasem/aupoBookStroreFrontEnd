import {Jumbotron} from "reactstrap";
import {AiFillAmazonCircle} from "react-icons/ai"
import "./header.css"
import {Link} from "react-router-dom";
import {Route} from "react-router";
import {ANONYMOUS} from "../consts/role";

const Header = (props) => {

    const buy = () => {
        //todo: Покупка добавить юзера, который оформляет заказ
        props.sendOrder({basket: props.basket})
        props.setBasket([])
        alert('Покупка совершена');
    }

    const logout = () => {
        fetch("http://localhost:8080/logout")
            .then(
                response => props.history.push('/authorisation')
            )
            .catch(
                error => console.log(error)
            );
    }

    return (
        <Jumbotron>
            <h1 className="display-3">(Не) книжный магазин</h1>
            <p className="lead">Почти руссифицированный текст</p>
            <hr className="my-2"/>
            <p>Всё-равно никто не прочитает</p>
            <p className="lead">
                <Link to={"/catalog"} className="btn btn-primary">Магазин</Link>
            </p>
            {props.role !== ANONYMOUS &&
            <div>
                <Link to={"/basket"}>
                    <div className={"basket-container"}>
                        Корзина
                        <AiFillAmazonCircle size={50}/>
                        {props.basket.length}
                    </div>
                </Link>
                <Route path={"/basket"}>
                    <button className={"buy-button"} onClick={() => buy()}>Купить</button>
                </Route>
                <button className={"logout-button"} onClick={() => logout()}>Выйти</button>
            </div>
            }
            {props.role === ANONYMOUS &&
            <Link to={"/authorisation"}>
                <button className={"authorisation-button"}>Войти / Зарегистрироваться</button>
            </Link>
            }
        </Jumbotron>
    );
}

export default Header;