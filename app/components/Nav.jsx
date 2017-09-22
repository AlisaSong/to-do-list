import React from 'react';

import styles from '../index.css';

export default class Nav extends React.Component {
    render() {
        return (
            <ul className={styles.navigation}>
                <li>All</li>
                <li>To Do</li>
                <li>Completed</li>
            </ul>
        );
    }
}
