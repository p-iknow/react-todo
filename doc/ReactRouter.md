# React-Router 

## 간략한 개요

핵심은 브라우저의 history api 이다. Router 컴포넌트의 상대관리 대상이 브라우저의 history 객체이고, 해당 객체의 상태 변화(정확히는 `history.loacation.pathname` ) 에 따라 어떤 컴포넌트를 렌더링할지 결정한다. 결국은 react-router 도 결국은 컴포넌트에 해당한다.

### Router 컴포넌트의 역할

`useState`를 통해 `history` 객체를 상태로 관리한다

`useEffect` 에 `history.listen`을 등록해 `history(route)` 의 변화를 감지하여, 변화가 있으면 `setState`(`setRoute`)로 `history(route)` 상태를 변경하여 컴포넌트의 리렌더링을 발생시킨다.

```jsx
import React, { useState, useEffect } from 'react';
import { locationToRoute } from './util';
import { history, RouterContext } from './context';
import { Route } from './Route';
import { Link } from './Link';

function Router(props) {
  const [route, setRoute] = useState(locationToRoute(history.location));

  const handleRouterChange = location => {
    const route = locationToRoute(location);
    setRoute(route);
  };

  useEffect(() => {
    const unlisten = history.listen(handleRouterChange);
    return () => {
      unlisten();
    };
  }, []);

  const { children } = props;
  const routerContextValue = { route, history };
  // const is404 = routes.indexOf(route.path) === -1;
  return (
    <RouterContext.Provider value={routerContextValue}>
      {children}
    </RouterContext.Provider>
  );
}

export { history, RouterContext, Router, Route, Link };
```

### Link 컴포넌트의 역할

BrowerRouter의 하위컴포넌트로`history.push(path)` 를 통해 히스토리 객체의 변경을 유도한다

```jsx
import React, { useContext } from 'react';
import { RouterContext, history } from './context';

export function Link({ to, onClick, children }) {
  const { route } = useContext(RouterContext);
  const handleClick = e => {
    e.preventDefault();
    // to 가 현재 path와 같다면 네비게이션을 진행하지 않음
    if (route.path === to) {
      return;
    }

    // 페이지 이동 이외에 별도의 onclick 이벤트가 있을경우 먼저 실행한다.
    if (onClick) {
      onClick(e);
    }

    history.push(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
```

### Route 컴포넌트의 역할

`if(path=== history.location.pathname)` 를 통해 `prop`으로 전달된 `path` 속성과 `history.loacation.pathname` 속성이 같을 경우 `prop`으로 전달된 `component` 를 렌더링한다.

```jsx
import React, { useContext } from 'react';
import { RouterContext } from './context';
import { matchPath } from './util';

export function Route({
  path,
  exact = false,
  strict = false,
  sensitive = false,
  render,
  component: Component,
}) {
  const { route, history } = useContext(RouterContext);

  const match = matchPath(route.path, { path, exact, strict, sensitive });
  debugger;
  if (!match) return null;

  if (Component)
    return <Component history={history} match={match} location={route} />;

  if (render) return render({ match });

  return null;
}
export default Route;
```

## Router 요구사항을 구현하며 어려웠던 부분

#### 이슈

path 가 `/, /home`  에 해당 할 때 `Home` 컴포넌트를 렌더링 하려고 의도했다. 그러나 NavLink `to`  속성에는 하나의 `path` 만 등록할 수 있다. `/` 에서는 `selected` 클래스가 적용되지 않는다.   

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

`onPath` 라는  currying 함수를 생성하여 `onPaths(['/', '/home'])` 형태로   `isActive` 에 전달하는 형태로 문제를 해결했다. 

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