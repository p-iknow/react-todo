import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

const getTodoData = async () => {
  try {
    const response = fetch(
      'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist' 
    );

  }
      
  catch(err) {
    const data =
  }
  

  
};

class TodoItemList extends Component {
  componentDidMount() {}

  render() {
    const { todos, onToggle, onRemove } = this.props;

    return (
      <div>
        <TodoItem text="안녕" />
        <TodoItem text="리엑트" />
        <TodoItem text="반가워" />
      </div>
    );
  }
}

export default TodoItemList;
