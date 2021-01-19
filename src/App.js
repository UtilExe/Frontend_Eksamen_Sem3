import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
  Prompt,
} from "react-router-dom";
import React, { useState } from 'react';
import {
  Home,
  NoMatch,
  Login,
  Signup,
  LoggedIn,
} from './Components';
import apiFacade from './apiFacade';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import jwt_decode from "jwt-decode";

import AllActivities from './Components/AllActivities';
import CreateActivity from './Components/CreateActivity';
import MyActivities from './Components/MyActivities';


function App() {

  const [count, setCount] = useState('')

  const [error, setError] = useState('')
  const [signUpMsg, setSignUpMsg] = useState("");
  const [isSignedUp, setIsSignedUp] = useState("");

  const [token, setToken] = useState(apiFacade.getToken());

  const logout = () => {
    apiFacade.logout()
    setToken("")
  }

  let decoded;

  // Upon reloading the page, isAdmin will return false by default, and result in admin page not showing.
  // We want to "prevent" this if the token is active, and the .roles is admin.
  if (token != null && token != "") {
    decoded = jwt_decode(token);
  }


  const login = (user, pass) => {
    setError("");
    apiFacade.login(user, pass)
      .then(res => {
        setError('');

        let token = apiFacade.getToken();
        setToken(apiFacade.getToken())
        decoded = jwt_decode(token); // jwt_decode is an external library

      })
      .catch(err => {
        setError("Couldn't log you in, make sure the username and password are correct.");
      })
  }

  const signup = (user, pass, passChecked, fullName, age, weight) => {
    apiFacade.signup(user, pass, passChecked, fullName, age, weight)
      .then(res => {
        setError('');
        setSignUpMsg("Your account has been created!");
        setIsSignedUp(true);
      })
      .catch(err => {
        setIsSignedUp(false);
        setSignUpMsg("Couldn't register, please try again later.");
        Promise.resolve(err.fullError).then(function(value) {
          setSignUpMsg(value.message);
        })
      })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router>
          <div>
            <Header
              token={token}
              loginMsg={token ? "Logout" : "Login"}
            />
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/create-activity">
                <CreateActivity decoded={decoded}/>
              </Route>

              <Route path="/my-activities">
                <MyActivities decoded={decoded}/>
              </Route>

              <Route path="/all-activities">
                <AllActivities/>
              </Route>

              <Route path="/sign-up">
                <Signup signup={signup} />
                { !isSignedUp ? (<p className="errMsg">{signUpMsg}</p>) :
                  (<p className="sucsMsg">{signUpMsg}</p>)}
              </Route>

              <Route path="/login-out">
                <div>
                  {!token ? (<Login login={login} />) :
                  (<div>
                    <LoggedIn/>
                    <button onClick={logout} className="btn btn-primary">Logout</button>
                  </div>)}
                  <p className="errMsg">{error}</p>
                </div>
              </Route>

              <Route component={NoMatch}></Route>
            </Switch>
          </div>
        </Router>
      </Container>
    </React.Fragment>
  );
}

function Header({loginMsg, token}) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {
        token &&
        (
          <React.Fragment>
            <li><NavLink activeClassName="active" to="/create-activity">Create Activity</NavLink></li>
            <li><NavLink exact activeClassName="active" to="/my-activities">My Activities</NavLink></li>
            <li><NavLink exact activeClassName="active" to="/all-activities">All Activities</NavLink></li>
          </React.Fragment>
        )
      }
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
    </ul>
  );
}

export default App;
