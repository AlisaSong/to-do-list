import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import ToDoList from './components/ToDoList'

export const routes = (
    <Route component={App}>
        <Route path="/" component={ToDoList} />
    </Route>
)
