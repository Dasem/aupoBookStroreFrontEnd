import {Jumbotron} from "reactstrap";
import {AiFillAmazonCircle} from "react-icons/ai"
import "./header.css"
import {Link} from "react-router-dom";
import {Route, useHistory} from "react-router";
import {ADMIN, ANONYMOUS, getAuthorities} from "../consts/role";

const Header = (props) => {

    const buy = () => {
        if (props.basket.length === 0) {
            alert('Корзина пуста, пожалуйста. добавьте товары');
        } else {
            props.sendOrder({basket: props.basket})
            props.setBasket([])
            alert('Покупка совершена');
        }
    }

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("user");
        history.push('/authorisation')
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
            {!getAuthorities().includes(ANONYMOUS) &&
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
            {getAuthorities().includes(ANONYMOUS) &&
            <Link to={"/authorisation"}>
                <button className={"authorisation-button"}>Войти / Зарегистрироваться</button>
            </Link>
            }
            {getAuthorities().includes(ADMIN) &&
            <Link to={"/goods"}>
                <button className={"control-button"}>Управление товарами</button>
            </Link>
            }
            {getAuthorities().includes(ADMIN) &&
            <Link to={"/orders"}>
                <button className={"control-button"}>Управление заказами</button>
            </Link>
            }
        </Jumbotron>
    );
}

export default Header;