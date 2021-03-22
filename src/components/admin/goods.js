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

const getRowId = row => row.id;

const deleteBook = (id, callback) => {
    fetch(`http://localhost:8080/books/${id}`, {
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

const saveOrUpdate = (book, callback) => {
    fetch("http://localhost:8080/books", {
        method: 'post',
        body: JSON.stringify(book),
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

const Goods = (props) => {
    useEffect(() => {
        props.getBooks();
        props.getGenres();
    }, []);

    const MultiSelectFormatter = ({value}) => {
        return (
            <span>
            {value ? JSON.parse(value).map((genre) => genre.name).join(', ') : ''}
        </span>
        );
    }

    const MultiSelectEditor = ({value, onValueChange}) => (
        <Multiselect
            options={props.genres} // Options to display in the dropdown
            onSelect={(selectedList) => {
                onValueChange(JSON.stringify(selectedList))
            }} // Function will trigger on select event
            onRemove={(selectedList) => {
                onValueChange(JSON.stringify(selectedList))
            }} // Function will trigger on remove event
            selectedValues={value ? JSON.parse(value) : []} // Preselected value to persist in dropdown
            displayValue="name" // Property name to display in the dropdown options
        />
    );

    const MultiSelectTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={MultiSelectFormatter}
            editorComponent={MultiSelectEditor}
            {...props}
        />
    );

    const [columns] = useState([
        {name: 'author', title: 'Автор'},
        {name: 'title', title: 'Название'},
        {name: 'price', title: 'Стоимость'},
        {name: 'genres', title: 'Жанры'},
    ]);

    const [multiSelectColumns] = useState(['genres']);

    const commitChanges = ({added, changed, deleted}) => {
        let changedRows;
        if (added) {
            let addedRowWithFixedGenres = {...added[0], genres: JSON.parse(added[0].genres)}
            saveOrUpdate(addedRowWithFixedGenres, (savedRow) => {
                changedRows = [
                    ...props.books,
                    savedRow,
                ];
                props.setBooks(changedRows);
            });
        }
        if (changed) {
            changedRows = props.books.forEach(row => {
                if (changed[row.id]) { // Сохраняем изменённую строку
                    let bookWithStringGenres = {...row, ...changed[row.id]};
                    let bookForSave = {...bookWithStringGenres, genres: JSON.parse(bookWithStringGenres.genres)};
                    saveOrUpdate(bookForSave, (updatedBook) => { // После сохранения пихаем её в отображение
                        changedRows = props.books.map(row => (row.id === updatedBook.id ? updatedBook : row));
                        props.setBooks(changedRows);
                    });
                }
            });

        }
        if (deleted) {
            deleteBook(deleted[0], () => props.getBooks());
        }
    };

    return (
        <div className="card">
            <Grid
                rows={props.books ? props.books.map(book => {
                        return {
                            ...book
                            , genres: JSON.stringify(book.genres)
                        }
                    }
                ) : []}
                columns={columns}
                getRowId={getRowId}
            >
                <MultiSelectTypeProvider
                    for={multiSelectColumns}
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

export default Goods;