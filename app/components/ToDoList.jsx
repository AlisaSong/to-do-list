import React from 'react';

import styles from '../index.css';

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: ['All', 'To Do', 'Completed'],
            selectedList: 'All',
            selectedTask: null,
            tasks: this.getTasks()
        };
    }

    getTasks() {
        return [{
            isEditing: false,
            isHovered: false,
            name: 'Task 1',
            namePrevious: 'Task 1',
            status: 'To Do'
        }, {
            isEditing: false,
            isHovered: false,
            name: 'Task 2',
            namePrevious: 'Task 2',
            status: 'Completed'
        }, {
            isEditing: false,
            isHovered: false,
            name: 'Task 3',
            namePrevious: 'Task 3',
            status: 'Completed'
        }, {
            isEditing: false,
            isHovered: false,
            name: 'Task 4',
            namePrevious: 'Task 4',
            status: 'Completed'
        }, {
            isEditing: false,
            isHovered: false,
            name: 'Task 5',
            namePrevious: 'Task 5',
            status: 'To Do'
        }, {
            isEditing: false,
            isHovered: false,
            name: 'Task 6',
            namePrevious: 'Task 6',
            status: 'Completed'
        }, {
            isEditing: false,
            isHovered: false,
            name: 'Task 7',
            namePrevious: 'Task 7',
            status: 'Completed'
        }];
    }

    onChangeTaskName(index, event) {
        let tasks = this.state.tasks;
        tasks[index].name = event.target.value;
        this.setState({
            tasks: tasks
        });
    }

    onChangeTaskStatus(index, event) {
        let tasks = this.state.tasks;
        tasks[index].isHovered = false;
        tasks[index].status = event.target.checked
            ? 'Completed'
            : 'To Do';
        this.setState({
            tasks: tasks
        });
    }

    onClickAddNewTask() {
        let tasks = this.state.tasks;
        tasks.push({
            isEditing: true,
            isHovered: false,
            name: 'New Task',
            namePrevious: 'New Task',
            status: 'To Do'
        })
    }

    onClickCancelTask(index) {
        let tasks = this.state.tasks;
        tasks[index].isEditing = false;
        tasks[index].name = tasks[index].namePrevious;
        this.setState({
            tasks: tasks
        });
    }

    onClickDeleteTask(index) {
        let tasks = this.state.tasks;
        tasks.splice(index, 1);
        this.setState({
            tasks: tasks
        });
    }

    onClickEditTask(index) {
        let tasks = this.state.tasks;
        tasks[index].isEditing = true;
        this.setState({
            tasks: tasks
        });
    }

    onClickList(list) {
        this.setState({
            selectedList: list
        });
    }

    onClickSaveTask(index) {
        let tasks = this.state.tasks;
        tasks[index].isEditing = false;
        tasks[index].isHovered = false;
        tasks[index].namePrevious = tasks[index].name;
        this.setState({
            tasks: tasks
        });
    }

    onHoverTask(index, isHovered) {
        let tasks = this.state.tasks;
        if (!tasks[index].isEditing) {
            tasks[index].isHovered = isHovered;
            this.setState({
                tasks: tasks
            });
        }
    }

    render() {
        return (
            <section>
                <h1>To Do List Manager</h1>
                <ul className={styles.navigation}>
                    {this.state.lists.map((list, index) =>
                        <li className={this.state.selectedList === list ? styles.selectedList : ''}
                            key={index}
                            onClick={() => { this.onClickList(list) }}>
                            {list}
                        </li>
                    )}
                </ul>
                <ul className={styles.tasks}>
                    {this.state.tasks.map((task, index) =>
                        (this.state.selectedList === 'All' || task.status === this.state.selectedList) &&
                        <li key={index}
                            onMouseEnter={() => { this.onHoverTask(index, true) }}
                            onMouseLeave={() => { this.onHoverTask(index, false) }}>
                            {<input type="checkbox"
                                checked={task.status === 'Completed'}
                                onChange={(event) => { this.onChangeTaskStatus(index, event) }} />}
                            {task.isEditing
                                ? <input type="text"
                                    onChange={(event) => this.onChangeTaskName(index, event)}
                                    value={task.name} />
                                : task.name}
                            {task.isHovered && !task.isEditing &&
                                <span>
                                    <span onClick={() => this.onClickEditTask(index)}>Edit</span>
                                    <span onClick={() => this.onClickDeleteTask(index)}>Delete</span>
                                </span>
                            }
                            {task.isEditing &&
                                <span>
                                    <span onClick={() => this.onClickSaveTask(index)}>Save</span>
                                    <span onClick={() => this.onClickCancelTask(index)}>Cancel</span>
                                </span>
                            }
                        </li>
                    )}
                </ul>
                <button onClick={() => this.onClickAddNewTask()}>Add New Task</button>
            </section>
        );
    }
}
