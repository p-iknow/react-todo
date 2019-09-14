## 최적화

### useMemo

fold button을 누를 때 해당 버튼은 todos의 상태와 무관하다. 그러나 해당 버튼을 누를 때마다 각 todo 의 상태 갯수를 구하는 `countTodoStatus` 가 실행된다. 해당 값을 재 사용하기 위해 `useMemo` 를 활용해보자.  

![image](https://user-images.githubusercontent.com/35516239/64905601-bdcb1980-d715-11e9-99e5-1adaf476f3e8.png)

#### Before

```jsx
const countTodoStatus = todos => {
  console.count('countTodoStatus is called');
	...
  return {
    all,
    todo,
    done
  };
};
 
const Status = () => {
  const todos = useTodoState();
  const { all, todo, done } = countTodoStatus(todos);

  return (
    <div className="status">
      <div className="counter all">ALL: {all}</div>
      <div className="counter todo">TODO: {todo}</div>
      <div className="counter done">DONE: {done}</div>
    </div>
  );
};
```

#### After 

```js
const Status = () => {
  const todos = useTodoState();
  const count = useMemo(() => countTodoStatus(todos), [todos]);
  const { all, todo, done } = count;

  return (
 		...
  );
};
```

`useMemo` 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 `deps` 배열을 넣는다. 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고,내용이 바뀌지 않았다면 이전에 연산한 값을 재 사용하게 된다.

변경 뒤에 todos가 변경되지 않을 때(Fold 버튼 누를 경우)에 count 값을 재활용하기 때문에 `countTodoStatus` 가 추가로 호출되지 않은 것을 볼 수 있다. 

![image](https://user-images.githubusercontent.com/35516239/64905681-fae3db80-d716-11e9-908c-92107db34249.png)