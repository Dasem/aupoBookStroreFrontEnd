import React, {useEffect, useState} from 'react';
import {DataTypeProvider, EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {authHeader} from "../consts/auth-header";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {ROLES} from "../consts/role";

const getRowId = row => row.id;

const Users = (props) => {

    let roles = ROLES

    const deleteUser = (id, callback) => { // TODO: сделать по status'у редирект на /error
        fetch(`http://localhost:8080/users/${id}`, {
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

    const saveOrUpdate = (user, callback) => {
        fetch("http://localhost:8080/users", {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(
            response => response.json()
        ).then(
            response => {
                if (callback) {
                    callback(response);
                }
            }
        )
    }

    useEffect(() => {
        props.getUsers();
    }, []);

    const RoleFormatter = ({value}) => {
        return (
            <span>
            {value ? value : 'Выберите роль'}
        </span>
        );
    }

    const RoleEditor = ({value, onValueChange}) => {
        return (
            <Select
                onChange={selected => {
                    onValueChange(selected.value)
                }}
                options={roles.map(role => {
                        return {value: role, label: role};
                    }
                )}
            />
        );
    }

    const RoleTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={RoleFormatter}
            editorComponent={RoleEditor}
            {...props}
        />
    );

    const PasswordFormatter = ({value}) => {
        return (
            <span>
            {value ? '*****' : 'Установите пароль'}
        </span>
        );
    }

    const PasswordEditor = ({value, onValueChange}) => {
        return (
            <input type="password" onChange={(event) => {
                onValueChange(event.target.value)
            }} />
        );
    }

    const PasswordTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={PasswordFormatter}
            editorComponent={PasswordEditor}
            {...props}
        />
    );

    const [columns] = useState([
        {name: 'login', title: 'Логин'},
        {name: 'password', title: 'Пароль'},
        {name: 'role', title: 'Роль'},
    ]);

    const [roleSelectColumns] = useState(['role']);
    const [passwordSelectColumns] = useState(['password']);

    const commitChanges = ({added, changed, deleted}) => {
        let changedRows;
        if (added) {
            saveOrUpdate(...added, (savedRow) => {
                changedRows = [
                    ...props.users,
                    savedRow,
                ];
                props.setUsers(changedRows);
            });
        }
        if (changed) {
            changedRows = props.users.forEach(row => {
                if (changed[row.id]) { // Сохраняем изменённую строку
                    let forSave = {...row, ...changed[row.id]};
                    saveOrUpdate(forSave, (updated) => { // После сохранения пихаем её в отображение
                        changedRows = props.users.map(row => (row.id === updated.id ? updated : row));
                        props.setUsers(changedRows);
                    });
                }
            });

        }
        if (deleted) {
            deleteUser(deleted[0], () => props.getUsers());
        }
    };

    return (
        <div className="card">
            <Grid
                rows={props.users ? props.users : []}
                columns={columns}
                getRowId={getRowId}
            >
                <RoleTypeProvider
                    for={roleSelectColumns}
                />
                <PasswordTypeProvider
                    for={passwordSelectColumns}
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

export default Users;