import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Task from "./pages/Task";
import About from "./pages/AboutMatrix";
import Overview from "./pages/Overview";
import Sitting from "./pages/Setting";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            {
              user ? <Home /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/do-first">
            {
              user ? <Task tasks='Do First' /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/do-later">
            {
              user ? <Task tasks='Do Later' /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/dont-do">
            {
              user ? <Task tasks="Don't Do" /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/delegate">
            {
              user ? <Task tasks='Delegate' /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/about">
            {
              user ? <About /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/setting">
            {
              user ? <Sitting /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/overview">
            {
              user ? <Overview /> : <Redirect to='/login'></Redirect> 
            }
          </Route>

          <Route path="/signup">
            {
              !user ? <Signup /> : <Redirect to='/'></Redirect> 
            }
          </Route>

          <Route path="/login">
            {
              !user ? <Login /> : <Redirect to='/'></Redirect> 
            }
          </Route>

          <Route path="*">
            {
              user ? <p>404</p> : <Redirect to='/login'></Redirect> 
            }
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
