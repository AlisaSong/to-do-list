import React from 'react';

import styles from '../index.css';

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: ['All', 'To Do', 'Completed'],
            selectedList: 'All'
        };
    }

    clickList(list) {
        this.setState({
            selectedList: list
        });
    }

    render() {
        return (
            <section>
                <h1>To Do List Manager</h1>
                <ul className={styles.navigation}>
                    {this.state.lists.map((list, index) =>
                        <li className={this.state.selectedList === list ? styles.selectedList : ''}
                            key={index}
                            onClick={() => { this.clickList(list) }}>
                            {list}
                        </li>
                    )}
                </ul>
            </section>
        );
    }
}
