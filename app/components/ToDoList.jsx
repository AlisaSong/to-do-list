import React from 'react'

import { text, title } from './shared/typography'
import { toDoList } from './toDoList.css'
import btn from './shared/button'

const ToDoList = React.createClass({
    render() {
        return (
            <div className={toDoList}>
                <h2 className={title}>Things to accomplish today!!!</h2>

                <p className={text}>Pancake's story</p>

                <button className={btn.normal} role="button">Normal Button</button>

                <button className={btn.primary} role="button">Primary Button</button>

                <button className={btn.danger} role="button">Wrong Button</button>
            </div>
        )
    }
})

export default ToDoList
