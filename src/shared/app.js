import { Route, Switch } from 'react-router-dom';
import { Home, About } from '../pages';

function App() {

  return (
    <div>
        <Route exact path="/" component={Home}/>
        <Switch>
          <Route path="/about/:name" component={About}/>  {/* :키 로하는 params를 새로 생성한다. */}
          <Route path="/about" component={About}/>
        </Switch>
        {/* 리엑트 라우터에서 <switch> 컴포넌트를 통해서 중복되는 라우터중에서 하나(맨 위에 있는거)만 표현가능하다*/}
    </div>
  );
}

export default App;