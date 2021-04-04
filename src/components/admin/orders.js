import React, {useEffect, useState} from 'react';
import {DataTypeProvider, EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import {Multiselect} from 'multiselect-react-dropdown';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {authHeader} from "../consts/auth-header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {WS_TIMEOUT} from "../consts/utils";

const dateFormat = require("dateformat");

const getRowId = row => row.id;


// --- Начало костыля для соединения реквеста и респонса
let callback = null;
let timeoutForWsResponse;

export const receiveOrderOperation = (order) => {
    if (callback) {
        // Отключаем сброс коллбека по таймауту, т.к. достучались до сервера
        if (timeoutForWsResponse) {
            clearTimeout(timeoutForWsResponse);
        }
        callback(order);
    } else {
        alert('Косяк с коллбеком')
    }
    callback = null;
}

// Ожидаем ответа от сервера и выполняем действие. Возможно не дождёмся
const waitForResponse = (cb) => {
    callback = cb;
    timeoutForWsResponse = setTimeout(() => callback = null, WS_TIMEOUT)
}
// --- Конец костыля

const Orders = (props) => {

    const deleteOrder = (id, callback) => {
        fetch(`http://localhost:8080/orders/${id}`, {
            method: 'delete',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(
            response => {
                if (callback) {
                    callback(response);
                }
            }
        )
    }

    useEffect(() => {
        props.getBooks();
        props.getOrders();
        props.getUsers();
    }, []);

    const MultiSelectFormatter = ({value}) => {
        return (
            <span>
            {value ? value.map((book) => book.title).join(', ') : ''}
        </span>
        );
    }

    const MultiSelectEditor = ({value, onValueChange}) => (
        <Multiselect
            options={props.books} // Options to display in the dropdown
            onSelect={(selectedList) => {
                onValueChange(selectedList)
            }} // Function will trigger on select event
            onRemove={(selectedList) => {
                onValueChange(selectedList)
            }} // Function will trigger on remove event
            selectedValues={value ? value : []} // Preselected value to persist in dropdown
            displayValue="title" // Property name to display in the dropdown options
        />
    );

    const MultiSelectTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={MultiSelectFormatter}
            editorComponent={MultiSelectEditor}
            {...props}
        />
    );

    const UserFormatter = ({value}) => {
        return (
            <span>
            {value ? value.login : 'Выберите пользователя'}
        </span>
        );
    }

    const UserEditor = ({value, onValueChange}) => {
        return (
            <Select
                onChange={selected => onValueChange(props.users.find(user => selected.value === user.id))}
                options={props.users.map(user => {
                        return {value: user.id, label: user.login};
                    }
                )}
            />
        );
    }

    const UserTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={UserFormatter}
            editorComponent={UserEditor}
            {...props}
        />
    );

    const DateFormatter = ({value}) => {
        return (
            <span>
            {value ? dateFormat(value, 'fullDate') : ''}
        </span>
        );
    }

    const DateEditor = ({value, onValueChange}) => (
        <DatePicker selected={value ? new Date(value) : new Date()} onChange={date => onValueChange(date)}/>
    );

    const DateTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={DateFormatter}
            editorComponent={DateEditor}
            {...props}
        />
    );

    const [columns] = useState([
        {name: 'basket', title: 'Корзина'},
        {name: 'orderDate', title: 'Дата заказа'},
        {name: 'user', title: 'Логин пользователя'},
    ]);

    const [multiSelectColumns] = useState(['basket']);
    const [userSelectColumns] = useState(['user']);
    const [dateSelectColumns] = useState(['orderDate']);

    const commitChanges = ({added, changed, deleted}) => {
        if (callback) {
            alert('Подождите окончания предыдущей операции');
            return;
        }
        let changedRows;
        if (added) {
            let addedRowWithFixedGenres = {...added[0], genres: added[0].basket}
            props.sendOrder(addedRowWithFixedGenres);
            waitForResponse((savedRow) => {
                changedRows = [
                    ...props.orders,
                    savedRow,
                ];
                props.setOrders(changedRows);
            });
        }
        if (changed) {
            changedRows = props.orders.forEach(row => {
                if (changed[row.id]) { // Сохраняем изменённую строку
                    let orderWithStringBasket = {...row, ...changed[row.id]};
                    let orderForSave = {...orderWithStringBasket, basket: orderWithStringBasket.basket};
                    props.sendOrder(orderForSave);
                    waitForResponse((updatedOrder) => { // После сохранения пихаем её в отображение
                        changedRows = props.orders.map(row => (row.id === updatedOrder.id ? updatedOrder : row));
                        props.setOrders(changedRows);
                    });
                }
            });
        }
        if (deleted) {
            props.deleteOrder(deleted[0].id);
            waitForResponse(() => props.getOrders());
        }
    };

    return (
        <div className="card">
            <Grid
                rows={props.orders ? props.orders : []}
                columns={columns}
                getRowId={getRowId}
            >
                <MultiSelectTypeProvider
                    for={multiSelectColumns}
                />
                <UserTypeProvider
                    for={userSelectColumns}
                />
                <DateTypeProvider
                    for={dateSelectColumns}
                />
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <Table/>
                <TableHeaderRow/>
                <TableEditRow/>
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                />
            </Grid>
        </div>
    );
};

export default Orders;