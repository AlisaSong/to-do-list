import React from 'react'

export default class App extends React.Component {
    render() {
        return (
            <main>
                <header>To Do List Manager</header>
                {this.props.children}
            </main>
        );
    }
}
