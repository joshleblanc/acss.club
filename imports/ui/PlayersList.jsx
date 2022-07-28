import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlayersCollection } from '../api/players';
import classNames from 'classnames';
import { Link } from "react-router-dom";

export const PlayersList = () => {
    const playersReady = useTracker(() => {
        return Meteor.subscribe('players').ready();
    }, []);

    const players = useTracker(() => {
        return PlayersCollection.find({}, { sort: { elo: -1 } }).fetch();
    }, []);

    return (
        <div class="card bg-base-300 shadow-xl">

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Elo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map(p => (
                                <Link className="link-tr" key={p._id} to={`/player/${p._id}/matches`} Component="tr">
                                    <td>
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12">
                                                <img src={p.portrait} alt={p.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={classNames("race", p.race)}></span>
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.elo}</td>
                                </Link>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}