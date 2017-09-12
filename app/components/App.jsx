import React from 'react'

import { app } from './app.css'
import { mastHead } from './shared/typography'

export default class App extends React.Component {
    render() {
        return (
            <main className={app}>
                <h1 className={mastHead}>To Do List</h1>
                {this.props.children}
            </main>
        );
    }
}
