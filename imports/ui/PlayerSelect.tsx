import React from 'react';
import { PlayersCollection } from '../api/players';
import { useTracker } from 'meteor/react-meteor-data';

export const PlayerSelect = ({ label, value, onChange, disabled }) => {
    useTracker(() => {
        Meteor.subscribe('players');
    });
    
    const players = useTracker(() => {
        return PlayersCollection.find({}).fetch();
    });

    return(
        <div class="form-control w-full m-2">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select className="select select-bordered" onChange={onChange} value={value} disabled={disabled}>
                <option disabled selected value="">Pick one</option>
                {
                    players.map(player => (
                        <option key={player._id} value={player._id}>{player.name}</option>
                    ))
                }
            </select>
        </div>
    )
}