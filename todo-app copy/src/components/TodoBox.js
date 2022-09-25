import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

export default class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    addTodo = (title) => {
        this.setState((state) => ({
            todos: [
                ...state.todos,
                { id: Date.now(), title }
            ]
        }))
    }

    render() {
        return (
            <div className='container'>
                <div className='card' >
                    <div className='card-header' >
                        <h1>Daftar Kerjaan</h1>
                    </div>
                    <div className='card-body' >
                        <TodoForm add={this.addTodo} />
                    </div>
                    <hr />
                    <TodoList data={this.state.todos} />
                </div>
            </div>
        )
    }
}