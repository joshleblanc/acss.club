import React from 'react';
import { Index } from './Index';
import { Routes, Route } from "react-router-dom";
import { Matches } from "./Matches";
import { LogIn } from './LogIn';
import { Admin } from './Admin';
import { TournamentsCollection } from '../api/tournaments';
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => { 
  useTracker(() => Meteor.subscribe("tournaments"));
  const nextTournament = useTracker(() => TournamentsCollection.findOne({}, { sort: { createdAt: -1 }}));
  return(
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      <div class="prose flex items-center max-w-full w-full mb-4 flex-col">
        <h1 class="mb-0">ACSS</h1>
        <h6 class="mt-0">
            {
              nextTournament && <>Next tournament: <a href={nextTournament.challongeUrl}>{nextTournament?.name}</a></>
            }
        </h6>
      </div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/player/:id/matches" element={<Matches />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  )
}
