export default function todoReducer(state, action) {
  switch (action.type) {
    case 'TODO_UPLOAD':
      return state.concat(action.todos);
    case 'TODO_CREATE':
      return state.concat(action.todo);
    case 'TODO_TOGGLE':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, status: todo.status === 'todo' ? 'done' : 'todo' }
          : todo
      );
    case 'TODO_REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
