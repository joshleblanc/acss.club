import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { PlayerForm } from "./PlayerForm";
import { MatchForm } from "./MatchForm";
import { Navigate } from "react-router-dom";
import { TournamentForm } from "./TournamentForm";

export const Admin = () => {
    const userId = useTracker(() => Meteor.userId());
    console.log(userId);
    return(
        <>
            {!userId && <Navigate to="/login" />}
            <PlayerForm />
            <div class="divider"></div>
            <MatchForm />
            <div class="divider"></div>
            <TournamentForm />
        </>
        
    )
}