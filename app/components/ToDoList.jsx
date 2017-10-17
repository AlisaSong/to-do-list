import React from 'react';

import styles from '../index.css';

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [{
                name: 'New List',
                selectedStatus: 'All',
                tasks: []
            }],
            selectedList: 0,
            statuses: ['All', 'To Do', 'Completed'],
        };
    }

    getCurrentList() {
        return this.state.lists[this.state.selectedList];
    }

    onChangeListName(index, event) {
        let lists = this.state.lists;
        lists[index].name = event.target.value;
        this.setState({
            lists: lists
        });
    }

    onChangeTaskName(index, event) {
        let tasks = this.getCurrentList().tasks;
        tasks[index].name = event.target.value;
        this.updateTasks(tasks);
    }

    onChangeTaskStatus(index, event) {
        let tasks = this.getCurrentList().tasks;
        tasks[index].isHovered = false;
        tasks[index].status = event.target.checked
            ? 'Completed'
            : 'To Do';
        this.updateTasks(tasks);
    }

    onClickAddNewList() {
        let lists = this.state.lists;
        lists.push({
            isEditing: true,
            isHovered: false,
            name: 'New List',
            namePrevious: 'New List',
            selectedStatus: 'All',
            tasks: []
        });
        this.setState({
            lists: lists,
            selectedList: lists.length - 1
        });
    }

    onClickAddNewTask() {
        let tasks = this.getCurrentList().tasks;
        tasks.push({
            isEditing: true,
            isHovered: false,
            name: 'New Task',
            namePrevious: 'New Task',
            status: 'To Do'
        });
        this.updateTasks(tasks);
    }

    onClickCancelList(index) {
        let lists = this.state.lists;
        lists[index].isEditing = false;
        lists[index].name = lists[index].namePrevious;
        this.setState({
            lists: lists
        });
    }

    onClickCancelTask(index) {
        let tasks = this.getCurrentList().tasks;
        tasks[index].isEditing = false;
        tasks[index].name = tasks[index].namePrevious;
        this.updateTasks(tasks);
    }

    onClickDeleteList(index) {
        let lists = this.state.lists;
        lists.splice(index, 1);
        this.setState({
            lists: lists,
            selectedList: this.state.selectedList - 1
        });
    }

    onClickDeleteTask(index) {
        let tasks = this.getCurrentList().tasks;
        tasks.splice(index, 1);
        this.updateTasks(tasks);
    }

    onClickEditList(index) {
        let lists = this.state.lists;
        lists[index].isEditing = true;
        this.setState({
            lists: lists
        });
    }

    onClickEditTask(index) {
        let tasks = this.getCurrentList().tasks;
        tasks[index].isEditing = true;
        this.updateTasks(tasks);
    }

    onClickList(index) {
        this.setState({
            selectedList: index
        });
    }

    onClickSaveList(index) {
        let lists = this.state.lists;
        lists[index].isEditing = false;
        lists[index].isHovered = false;
        lists[index].namePrevious = lists[index].name;
        this.setState({
            lists: lists
        });
    }

    onClickSaveTask(index) {
        let tasks = this.getCurrentList().tasks;
        tasks[index].isEditing = false;
        tasks[index].isHovered = false;
        tasks[index].namePrevious = tasks[index].name;
        this.updateTasks(tasks);
    }

    onClickStatus(status) {
        let lists = this.state.lists;
        lists[this.state.selectedList].selectedStatus = status;
        this.setState({
            lists: lists
        });
    }

    onHoverList(index, isHovered) {
        let lists = this.state.lists;
        lists[index].isHovered = isHovered;
        this.setState({
            lists: lists
        });
    }

    onHoverTask(index, isHovered) {
        let tasks = this.getCurrentList().tasks;
        if (!tasks[index].isEditing) {
            tasks[index].isHovered = isHovered;
            this.updateTasks(tasks);
        }
    }

    updateTasks(tasks) {
        let lists = this.state.lists;
        lists[this.state.selectedList].tasks = tasks;
        this.setState({
            lists: lists
        });
    }

    render() {
        return (
            <section>
                <div className={styles.sectionNavigation}>
                    <ul className={styles.listNavigation}>
                        {this.state.lists.map((list, index) =>
                            <li key={index}
                                onMouseEnter={() => { this.onHoverList(index, true) }}
                                onMouseLeave={() => { this.onHoverList(index, false) }}>
                                <span onClick={() => this.onClickList(index)}>{list.isEditing
                                    ? <input type="text"
                                        onChange={(event) => this.onChangeListName(index, event)}
                                        value={list.name} />
                                    : list.name}</span>
                                {list.isHovered && !list.isEditing &&
                                    <span>
                                        <span onClick={() => this.onClickEditList(index)}>Edit</span>
                                        <span onClick={() => this.onClickDeleteList(index)}>Delete</span>
                                    </span>
                                }
                                {list.isEditing &&
                                    <span>
                                        <span onClick={() => this.onClickSaveList(index)}>Save</span>
                                        <span onClick={() => this.onClickCancelList(index)}>Cancel</span>
                                    </span>
                                }
                            </li>
                        )}
                    </ul>

                    <button onClick={() => this.onClickAddNewList()}>Add New List</button>
                </div>

                {this.state.selectedList >= 0
                    ? <div className={styles.sectionContent}>
                        <ul className={styles.statusButtons}>
                            {this.state.statuses.map((status, index) =>
                                <li className={this.getCurrentList().selectedStatus === status ? styles.selectedStatus : ''}
                                    key={index}
                                    onClick={() => { this.onClickStatus(status) }}>
                                    {status}
                                </li>
                            )}
                        </ul>
                        <ul className={styles.tasks}>
                            {this.getCurrentList().tasks.map((task, index) =>
                                (this.getCurrentList().selectedStatus === 'All' || task.status === this.getCurrentList().selectedStatus) &&
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
                                            <span className={styles.editButton} onClick={() => this.onClickEditTask(index)}>Edit</span>
                                            <span className={styles.deleteButton} onClick={() => this.onClickDeleteTask(index)}>Delete</span>
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
                    </div>
                    : <div className={styles.sectionContent}>
                        Add a new list to get started! :)
                    </div>
                }
            </section>
        );
    }
}
