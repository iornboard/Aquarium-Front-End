import { Route, Switch } from 'react-router-dom';
import { Login, SignUp, UserPorfile, CollaboManage, Collabo, MyPage, Main, UserFollowProfile, Sun, Nam} from '../pages/index';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Auth from '../hoc/auth'  // HOC 컴포넌트, 토큰값을 확인해서 
import AppBar from '../hoc/AppBarHoc'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8346',
      light: '#f5c8b3',
      dark: '#b25b31'
    },
    secondary: {
      main: '#3c2822',
      light: '#63534e',
      dark: '#2a1c17'
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

            <Route path="/userInfo" component={Auth(AppBar(UserPorfile), true)}/>
            {/* <Route path="/follow" component={Auth(AppBar(UserFollowProfile), true)}/> */}

            <Route path="/collaboManage" component={Auth(AppBar(CollaboManage), true)}/>
            <Route path="/collabo/:task" component={Auth(AppBar(Collabo), true)}/>

            <Route path="/sun" component={Auth(AppBar(Sun), false)}/>
            <Route path="/nam" component={Auth(AppBar(Nam), true)}/>

            <Route path="/user/:username" component={Auth(AppBar(MyPage), null)}/>
            

          </Switch>
          {/* 리엑트 라우터에서 <switch> 컴포넌트를 통해서 중복되는 라우터중에서 하나(맨 위에 있는거)만 표현가능하다*/}
        </ThemeProvider>
    </div>
  
  );
}

export default App;