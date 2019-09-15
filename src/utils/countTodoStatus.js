import isEmptyArr from './isEmptyArr';

const countTodoStatus = todos => {
  let all;
  let todo;
  let done;

  if (isEmptyArr(todos)) {
    all = 0;
    todo = 0;
    done = 0;
  } else {
    all = todos.length;
    todo = todos.filter(todo => todo.status === 'todo').length;
    done = all - todo;
  }
  return {
    all,
    todo,
    done
  };
};
export default countTodoStatus;
