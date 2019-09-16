## React-Router 

### 라우터 이해를 위한 custom-react-router 만들기 

- https://github.com/P-iknow/custom-react-router

- 핵심은 history api 이며, react-router 도 결국은 컴포넌트
- BrowserRouter 컴포넌트의 역할
  - useState를 통해 history 객체를 상태로 관리함
  - useEffect 에  history.listen을 등록해 history 의 변화를 감지하여, 변화가 있으면 setState로 history 상태를 변경하여 컴포넌트의 리렌더링을 발생시킴 
- Link 컴포넌트의 역할
  - BrowerRouter의 하위컴포넌트로`history.push(path)` 를 통해 히스토리 객체의 변경을 유도
- Route 컴포넌트의 역할 
  - `if(path=== history.location.pathname)` 를 통해 prop으로 전달된  `path` 속성과 `history.loacation.pathname` 속성이 같을 경우 prop으로 전달된 component 를 렌더링함

### Router 요구사항을 구현하며 어려웠던 부분

#### 이슈

path 가 `/, /home`  에 해당 할 때 `Home` 컴포넌트를 렌더링 하려고 의도했다. 그러나 NavLink `to`  속성에는 하나의 `path` 만 등록할 수 있다. `/` 에서는 `selected` 클래스가 적용되지 않는다.   

```jsx
<NavLink
  activeClassName="selected"
  to="/home"
>
  Home
</NavLink>
<Route exact path={['/', '/home']} component={Home} />
  

```

#### Navlink `isActive` 속성을 통해 문제 해결 

`isActive` 속성에  링크 활성화 여부를 결정하는 로직을 담은 함수를 전달할 수 있다. 해당 함수는 `Boolearn`  값을 리턴하는데 해당 값에 따라 활성화 여부가 결정된다. 

필자가 원하는 목적을 달성하기 위해서는 해당 함수에 일치해야 하는 path 를 담은 배열인 `paths`  변수를 전달해, 인자로 전달된 paths 배열이 현재 path 를 포함할지 여부를 판단해야 한다.  

여기서 문제가 하나있었다.  `isActive` 에 전달되는 함수는 `(location, match) => {}` 의 프로토콜을 가지고 있어 `loaction, match `  이외에 다른 인자를 전달하여 사용할 수 없다. 다른 인자를 전달하기 위해서는 `currying` 을 활용해서 함수를 리턴하는 함수를 만들어야 한다.  

`onPath` 라는  currying 함수를 생성하여 `onPaths(['/', '/home'])` 형태로   `isActive` 에 전달하는 형태로 문제를 해결했다. 

```jsx
const onPaths = paths => {
  return (match, location) => {
    return paths.includes(location.pathname);
  };
};

<NavLink
  className="link"
  activeClassName="selected"
  to="/home"
  isActive={onPaths(['/', '/home'])}
>
 Home
</NavLink>
```



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

### React.memo

`Form` 컴포넌트와 Fold 의 상태값은 무관하지만 fold 상태에 변화에 따라 상위 컴포넌트인 `TodoListTemplate` 가 Rerender 되므로 `Form` 컴포넌트 또한 리렌더링 되고 있는 현상을 발견할 수 있었다. `React.memo` 로 Rerender를 방지할 수 있다. 

#### Before

![image](https://user-images.githubusercontent.com/35516239/64909138-4b712e00-d743-11e9-803f-ffd6a6726f55.png)

#### After

`export` 할 때, `React.memo` Form 컴포넌트를 감싸줬다. 이렇게 할 경우 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있다. (참고로 클래스  컴포넌트에서는 ` shouldComponentUpdate`  를 사용한다.)    

```jsx
const Form = () => {
  ...
  return (
		...
  );
};

export default Form;
```

![image](https://user-images.githubusercontent.com/35516239/64909246-917ac180-d744-11e9-86e9-ba84a9973953.png)

#### 추가

 하나의 `todoItem` 의 상태가 변경될 때 나머지 모두 rerendering 되어 todoItem에도 React.memo를 적용했다. 이외 다른 컴포넌트에도 리렌더링 방지를 목적으로 React.memo 를 적용했다. 

## propType

### 느껴지는 장점

- 타입을 강제하여 예상치 못한 오류를 빠르게 발견할 수 있음
- 타인이 컴포넌트 구조를 파악할 때 용이함 

### 아쉬운 점

- useState or useContext 를 통해 생성된 값의 경우 type 강제가 어려움 
- 이러한 이유로 typescript 사용이 필요해지는 것으로 보임 

