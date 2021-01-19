import React, { useState } from 'react';
import apiFacade from '../apiFacade';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import Grid from '@material-ui/core/Grid';

export default function AllActivites() {

    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
        apiFacade.getAllActivites()
            .then(array => {
                setActivities(array)
                setError(''); // to get rid of potential previous error
            })
            .catch(err => {
                Promise.resolve(err.fullError).then(function (value) {
                    setError(value.message);
                })
            })
    }

    let displayAllActivities = activities.map((activity, index) => (
        <ul className="list-group mb-4" key={index}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <li className="list-group-item ownList">
                        <div className="mb-1">
                          <p>Fitness-type:  {activity.exerciseType} </p>
                            <p> Kommentar: <br/> {activity.comment}</p>
                            <p> Længde i KM: {activity.distance}</p>
                            <p> Tid: {activity.duration}</p>
                            <p> Tidspunkt på dagen: {activity.timeOfDay}</p>
                            <p> Dato: {activity.exerciseDate}</p>
                        </div>
                    </li>
                </Grid>
            </Grid>
        </ul>
    ))

    return (
        <div>
            <h2> All Activities</h2>
            <hr className="ownHr"/>
            <button className="btn btn-primary" onClick={handleSubmit}>Get All Activities</button>
            <br />
            <br />
            {displayAllActivities}
            <hr className="ownHr"/>
            {error}
        </div>
    )
}