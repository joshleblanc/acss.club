import React from 'react';
import { TournamentsCollection } from '../api/tournaments';
import { useTracker } from 'meteor/react-meteor-data';

export const TournamentSelect = ({ label, value, onChange, disabled }) => {
    const handle = useTracker(() => {
        return Meteor.subscribe('tournaments');
    });

    console.log(handle.ready())

    const tournaments = useTracker(() => {
        return TournamentsCollection.find({}).fetch();
    });

    return(
        <div class="form-control w-full m-2">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select className="select select-bordered" onChange={onChange} value={value} disabled={disabled}>
                <option disabled selected value="">Pick one</option>
                {
                    tournaments.map(tournament => (
                        <option key={tournament._id} value={tournament._id}>{tournament.name}</option>
                    ))
                }
            </select>
        </div>
    )
}