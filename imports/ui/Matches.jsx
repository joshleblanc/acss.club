import React from 'react';
import { useParams } from "react-router-dom";
import { MatchesCollection } from '../api/matches';
import { useTracker } from "meteor/react-meteor-data";
import { PlayersCollection } from '../api/players';
import classNames from 'classnames';
import { Link } from "react-router-dom";
import { TournamentsCollection } from '../api/tournaments';

export const Matches = () => {
    const { id } = useParams();

    const matchesReady = useTracker(() => {
        return Meteor.subscribe("players.matches", id);
    }, [id]);

    const tournamentsReady = useTracker(() => {
        return Meteor.subscribe("tournaments");
    })
    
    const matches = useTracker(() => {
        return MatchesCollection.find({ 
            $or: [
                { winnerId: id },
                { loserId: id }
            ]
         }, {
            sort: { createdAt: -1 }
         }).fetch();
    });

    const player = useTracker(() => {
        return PlayersCollection.findOne({ _id: id });
    }, [id]);

    if(!matchesReady) {
        return null;
    }
    return(
        <>
            <div class="flex mb-4">
                <Link className="btn btn-xs opacity-50" to="/">Back</Link>
                <h1 className="mx-4">{player.name}'s Matches</h1>
            </div>
            
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Winner</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="flex justify-end">Loser</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            matches.map(m => {
                                const winner = PlayersCollection.findOne({ _id: m.winnerId });
                                const loser = PlayersCollection.findOne({ _id: m.loserId });
                                const tournament = TournamentsCollection.findOne({ _id: m.tournamentId });

                                return(
                                    <tr key={m._id}>
                                        <td>
                                            <div className="flex items-center">
                                                <div className="avatar mx-2">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={winner.portrait} alt={winner.name} />
                                                    </div>
                                                </div>
                                                <span className={classNames("race", "mx-2", winner.race)}></span>
                                                {winner.name}
                                            </div>
                                        
                                        </td>
                                        <td>
                                            {m.winnerEloChange}
                                        </td>
                                        <td class="text-center">{tournament?.name}</td>
                                        <td class="text-align-right">
                                            {m.loserEloChange}
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-end">
                                                {loser.name}
                                                <span className={classNames("race", "mx-2", loser.race)}></span>
                                                <div className="avatar mx-2">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={loser.portrait} alt={loser.name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}