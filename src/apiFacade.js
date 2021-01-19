import URLS, {loginURL, signUpURL, AllActivitesURL, SubmitSpecificActivityURL, getUserWeatherURL, getUserCityURL} from './Settings';

function submitActivity(activity) {
    const options = makeOptions("POST", true, activity);
    return fetch (SubmitSpecificActivityURL, options)
    .then(handleHttpErrors);
}

function getAllActivites() {
    const options = makeOptions("GET", true);
    return fetch(AllActivitesURL, options)
    .then(handleHttpErrors);
}

function getUserWeather(username) {

    const options = makeOptions("POST", true, {username: username}); // backend endpoint expects an object
    return fetch(getUserWeatherURL, options)
    .then(handleHttpErrors);
}

function getUserCity(username) {
    const options = makeOptions("POST", true, {username: username}); // backend endpoint expects an object
    return fetch(getUserCityURL, options)
    .then(handleHttpErrors);
}

const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
}
const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}
const logout = () => {
    localStorage.removeItem("jwtToken");
}

const login = (user, password) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(loginURL, options)
        .then(handleHttpErrors)
        .then(res => { setToken(res.token) })
}

const signup = (user, userPass, passwordCheck, fullName, age, weight) => {
    const options = makeOptions("POST", true, { username: user, userPass: userPass, passwordCheck: passwordCheck, fullName: fullName, age: age, weight: weight });
    return fetch(signUpURL, options)
        .then(handleHttpErrors);
}

const apiFacade = {
    setToken,
    getToken,
    loggedIn,
    logout,
    login,
    signup,
    getAllActivites,
    submitActivity,
    getUserWeather,
    getUserCity
}

function makeOptions(method, addToken, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (addToken && loggedIn()) {
        opts.headers["x-access-token"] = getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default apiFacade;