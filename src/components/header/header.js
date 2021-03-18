import {Jumbotron, Button} from "reactstrap";
import {AiFillAmazonCircle} from "react-icons/ai"
import "./header.css"
import {Link} from "react-router-dom";
import {Route} from "react-router";

const Header = (props) => {

    const buy = () => {
        //todo: Покупка (оформление заказа на сервер сайде) + добавить юзера, который оформляет заказ
        props.sendOrder({basket:props.basket})
        props.setBasket([])
        alert('Покупка совершена');
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
        </Jumbotron>
    );
}

export default Header;