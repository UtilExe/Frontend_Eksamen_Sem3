import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiFacade from './apiFacade';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";
import 'react-tabs/style/react-tabs.css';
import Grid from '@material-ui/core/Grid';

export function Home() {
    const [string, setString] = useState('');
    const [count, setCount] = useState('')

    useEffect (() => {
        apiFacade.getActivityCount()
        .then(data => setCount(data.count))
}, [string])

    return (
        <div>
            <div>
                <h2>Welcome!</h2>
                <hr className="ownHr"></hr>
            </div>
            <div className="list-group">
                <h5>What can you do on our Fitness application?</h5>
                <ol>
                    <li>Log/Create your fitness activity, and use it as a fitness "diary"</li>
                    <li>Get specific details about the Weather in the City of your fitness activity.</li>
                    <li>Get specific details about the City your exercise took place.</li>
                    <li>See all the previous Activities</li>
                    <li>Login and Logout</li>
                  
                </ol>
                <h5>Total number of exercise activities in our system:</h5>
                <h6>{count}</h6>
            </div>
        </div>
    );
}

export function Login({ login }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
        setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
    }
    return (
        <div>
            <h2>Login here</h2>
            <form onChange={onChange}>
                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Username" id="username" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input type="password" className="form-control ownInputs" placeholder="Password" id="password" />
                    </Grid>
                    
                    <button onClick={performLogin} type="button" className="btn btn-primary">Login</button>
            </form>

            <br />
            <hr className="ownHr" />
            <h2>Don't have an account?</h2>
            <Link to={"/sign-up"}>
                <button type="button" className="btn btn-primary">Sign Up</button>
            </Link>
            <hr className="ownHr" />
        </div>
    )
}

export function Signup({ signup }) {

    const init = { username: "", password: "", passwordCheck: "", fullName: "", age: "", weight: "" };
    const [signUpAcc, setSignUp] = useState(init);

    const performSignup = (evt) => {
        evt.preventDefault();
        signup(signUpAcc.username, signUpAcc.password, signUpAcc.passwordCheck, signUpAcc.fullName, signUpAcc.age, signUpAcc.weight);
    }
    const onChange = (evt) => {
        setSignUp({ ...signUpAcc, [evt.target.id]: evt.target.value })
    }

    return (
        <div>
            <h2>Sign up</h2>
            <hr className="ownHr" />
            <form onChange={onChange}>
                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Username..." id="username" />
                    </Grid>
                    <Grid item xs={2} className="mb-2">
                        <input type="password" className="form-control ownInputs" placeholder="Password..." id="password" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input type="password" className="form-control ownInputs" placeholder="Re-enter password..." id="passwordCheck" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Enter full name" id="fullName" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input type="number" className="form-control ownInputs" placeholder="Enter age" id="age" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input type="number" className="form-control ownInputs" placeholder="Enter weight" id="weight" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <button onClick={performSignup} type="button" className="btn btn-primary">Signup</button>
                    </Grid>
            </form>
            <hr className="ownHr" />
        </div>
    )
}

export function LoggedIn() {
    const token = apiFacade.getToken();
    const decoded = jwt_decode(token); // jwt_decode is an external library

    return (
        <div>
            <h2>You are now logged in!</h2>
            <p>Welcome {decoded.username}, your role is: {decoded.roles}</p>
        </div>
    )
}

export function NoMatch() {
    return (
        <div>
            <h2>Sorry, we couldn't find that page...</h2>
        </div>
    );
}