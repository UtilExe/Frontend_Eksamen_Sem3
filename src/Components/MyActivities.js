import React, { useState } from 'react';
import apiFacade from '../apiFacade';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import Grid from '@material-ui/core/Grid';

export default function MyActivities({decoded}) {

    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState([]);
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        apiFacade.getUserCity(decoded.username)
            .then(arrayCity => {
                setCities(arrayCity)
                setError(''); // to get rid of potential previous error
                apiFacade.getUserWeather(decoded.username)
                .then(arrayWeather => {
                setWeather(arrayWeather)
                setError('');
            }) })
            .catch(err => {
                Promise.resolve(err.fullError).then(function (value) {
                    setError(value.message);
                })
            })
    }

    let displayCity = cities.map((city, index) => (
        <ul className="list-group mb-4" key={index}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <li className="list-group-item ownList">
                        <div className="mb-1">
                          <p>Bynavn:  {city.name} </p>
                          <p> Popularitet: {city.population}</p>
                            <p> GPS: <br/> {city.geocoordinates}</p>
                            <p> Kommune(r): {city.municipality}</p>
                        </div>
                    </li>
                </Grid>
            </Grid>
        </ul>
    ))

    let displayWeather = weather.map((weatherData, index) => (
        
        <ul className="list-group mb-4" key={index}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <li className="list-group-item ownList">
                        <div className="mb-1">
                          <p>Temperatur:  {weatherData.temperature} </p>
                          <p> Vejrudsigt: {weatherData.skyText}</p>
                            <p> Humidity: <br/> {weatherData.humidity}</p>
                            <p> Windtext: {weatherData.windText}</p>
                        </div>
                    </li>
                </Grid>
            </Grid>
        </ul>
    ))

    return (
        <div>
            <h2> My Activities</h2>
            <hr className="ownHr"/>
            <button className="btn btn-primary" onClick={handleSubmit}>Get My Activities</button>
            <br />
            <br />
            <h3>Byer</h3>
            {displayCity}
            <h3>Vejr</h3>
            {displayWeather}
            <hr className="ownHr"/>
            {error}
        </div>
    )
}