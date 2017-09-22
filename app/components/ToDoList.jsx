import React from 'react';

import Nav from './Nav';

export default class ToDoList extends React.Component {
    render() {
        return (
            <section>
                <h1>To Do List Manager</h1>
                <Nav />
            </section>
        );
    }
}
