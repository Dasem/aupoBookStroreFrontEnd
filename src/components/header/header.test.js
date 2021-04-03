import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from "./header-container";
import {ADMIN} from "../consts/role";
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

/*const server = setupServer(
    rest.get('http://localhost:8080/role', (req, res, ctx) => {
        return res(ctx.json(ADMIN))
    }),
    rest.get('http://localhost:8080/books', (req, res, ctx) => {
        return res(ctx.json([]))
    })
)*/

const mockStore = configureStore([]);

/*beforeAll(() => {
    server.listen();
})*/

let store;

beforeEach(() => {
    store = mockStore({
        basket: {basket:[]},
    });

    store.dispatch = jest.fn();
    localStorage.setItem("user", JSON.stringify({roles:[ADMIN]}));
    render(
        <Provider store={store}>
            <Router>
                <Header/>
            </Router>
        </Provider>
    )
})

/*
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
*/

test('admin buttons when admin role', async () => {
    expect(screen.getByText('Управление товарами')).toBeDefined();

    expect(screen.getByText('Управление заказами')).toBeDefined()

    expect(screen.getByText('Управление пользователями')).toBeDefined()
})
