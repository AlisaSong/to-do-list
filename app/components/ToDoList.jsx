import React from 'react'

import { text, title } from './shared/typography'
import { toDoList } from './toDoList.css'
import btn from './shared/button'

export default class ToDoList extends React.Component {
    onClickNormal() {
        alert("NORMAL");
    }

    render() {
        return (
            <div className={toDoList}>
                <h2 className={title}>Things to accomplish today!!!</h2>

                <p className={text}>Pancake's story</p>

                <button className={btn.normal} onClick={this.onClickNormal} role="button">Normal Button</button>

                <button className={btn.primary} onClick={this.onClickNormal} role="button">Primary Button</button>

                <button className={btn.danger} onClick={this.onClickNormal} role="button">Wrong Button</button>
            </div>
        );
    }
}
