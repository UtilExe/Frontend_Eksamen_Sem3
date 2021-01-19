import React, { useState } from 'react';
import apiFacade from '../apiFacade';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import Grid from '@material-ui/core/Grid';

export default function CreateActivity({decoded}) {

    const init = { comment: "", distance: "", duration: "", exerciseType: "", primærtnavn: "", username: decoded.username };
    const [search, setSearch] = useState(init);

    const [activitiy, setActivities] = useState([]);
    const [sucess, setSuccess] = useState('');
    const [error, setError] = useState('');

 
    function handleSubmit(event) {
        event.preventDefault();
        apiFacade.submitActivity(search)
            .then(data => {
                setActivities(data);
                setSuccess('Hurray! Your fitness submission has been added')
                setError(''); // to get rid of potential previous error
            })
            .catch(err => {
                Promise.resolve(err.fullError).then(function (value) {
                    setError(value.message);
                })
            })
    }

    function handleChange(event) {
        setSearch({ ...search, [event.target.id]: event.target.value });
    };

    return (
        <React.Fragment>
            <div>
                <h2>Write down your Fitness activity</h2>
                <hr className="ownHr" />
                <form onChange={handleChange}>
                    <div>
                        <Grid item xs={2} className="mb-2">
                            <input className="form-control ownInputs" id="comment" placeholder="Comment..." />
                        </Grid>

                        <Grid item xs={2} className="mb-2">
                            <input type="number" className="form-control ownInputs" id="distance" placeholder="Distance..." />
                        </Grid>

                        <Grid item xs={2} className="mb-2">
                            <input type="number" className="form-control ownInputs" id="duration" placeholder="Duration..." />
                        </Grid>

                        <Grid item xs={2} className="mb-2">
                            <input className="form-control ownInputs" id="exerciseType" placeholder="Exercise Type.." />
                        </Grid>

                        <Grid item xs={2} className="mb-2">
                            <input className="form-control ownInputs" id="primærtnavn" placeholder="City name" />
                        </Grid>

                        <Grid item xs={2} className="mb-2">
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                        </Grid>
                       
                    </div>
                </form>
              <h4>{sucess} </h4>
                {error}
            </div>
            <div>
            </div>
        </React.Fragment>
    )
}