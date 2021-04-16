import { Route, Switch } from 'react-router-dom';
import { Login, SignUp , Main, Sun, Post, UserInfo } from '../pages';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Auth from '../hoc/auth'  // HOC 컴포넌트, 토큰값을 확인해서 
import AppBar from '../hoc/AppBarHoc'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8346',
      light: '#ff9b6b',
      dark: '#b25b31'
    },
    secondary: {
      main: '#3c2822'
    },
    error: {
      main: '#ff1744'
    },
    text: {
      primary: '#ff8346',
      secondary: '#3c2822',
      disabled: '#4caf50',
      hint: '#ffc107',
      myTextColor: '#039be5'
    }
  },
})

function App() {

  return (
    <div>
       <ThemeProvider theme={theme} style={{ padding: '20px' }}>
            <Route exact path="/" component={Auth(AppBar(Main), null)}/>
          <Switch>
            <Route path="/signin" component={Auth(Login, false)}/>
            <Route path="/signup" component={Auth(SignUp, false)}/>
            <Route path="/Sun" component={Auth(AppBar(Sun), true)}/>
            <Route path="/Post" component={Auth(AppBar(Post), true)}/>
            <Route path="/UserInfo" component={Auth(AppBar(UserInfo), true)}/>
          </Switch>
          {/* 리엑트 라우터에서 <switch> 컴포넌트를 통해서 중복되는 라우터중에서 하나(맨 위에 있는거)만 표현가능하다*/}
        </ThemeProvider>
    </div>
  
  );
}

export default App;