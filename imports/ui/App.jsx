import React from 'react';
import { Index } from './Index';
import { Routes, Route } from "react-router-dom";
import { Matches } from "./Matches";
import { LogIn } from './LogIn';
import { Admin } from './Admin';

export const App = () => (
  <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/player/:id/matches" element={<Matches />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  </div>
);
