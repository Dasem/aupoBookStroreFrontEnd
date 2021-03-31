import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from "./header";
import {ADMIN} from "../consts/role";
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from "../../redux/store";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "../../App";

const server = setupServer(
    rest.get('http://localhost:8080/role', (req, res, ctx) => {
        return res(ctx.json(ADMIN))
    }),
    rest.get('http://localhost:8080/books', (req, res, ctx) => {
        return res(ctx.json([]))
    })
)

let store;

beforeAll(() => {
    server.listen();
    store = configureStore();
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('admin buttons when admin role', async () => {
    render(
        <Router>
            <Header/>
        </Router>
        , {}
    )
    expect(screen.getByRole('button')).toHaveTextContent('Управление товарами')
    expect(screen.getByRole('button')).toHaveTextContent('Управление заказами')
    expect(screen.getByRole('button')).toHaveTextContent('Управление пользователями')
})
