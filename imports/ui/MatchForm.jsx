import React from 'react'
import classNames from 'classnames';
import { PlayerSelect } from './PlayerSelect';
import { createMatch } from '../api/matches';
import { TournamentSelect } from './TournamentSelect';

export const MatchForm = () => {
    const [saving, setSaving] = React.useState(false);
    const [tie, setTie] = React.useState(false);
    const [winner, setWinner] = React.useState("");
    const [loser, setLoser] = React.useState("");
    const [tournament, setTournament] = React.useState("");

    const handleWinnerChange = React.useCallback(e => {
        setWinner(e.target.value);
    }, [setWinner]);

    const handleTournamentChange = React.useCallback(e => {
        setTournament(e.target.value);
    }, [setTournament]);

    const handleLoserChange = React.useCallback(e => {
        setLoser(e.target.value);
    }, [setLoser]);

    const handleTieChange = React.useCallback(e => {
        setTie(e.target.checked);
    }, [setTie]);

    const handleSubmit = React.useCallback(e => {
        e.preventDefault();

        setSaving(true);
        createMatch.call({ winnerId: winner, loserId: loser, tie, tournamentId: tournament }, (err, res) => {
            setSaving(false);
        });
    }, [setSaving, saving, tournament, winner, loser, tie]);

    return(
        <form className="flex" onSubmit={handleSubmit}>
            <PlayerSelect label="Winner" disabled={saving} onChange={handleWinnerChange} value={winner} />
            <PlayerSelect label="Loser" dsiabled={saving} onChange={handleLoserChange} value={loser} />
            <TournamentSelect label="Tournament" disabled={saving} onChange={handleTournamentChange} value={tournament} />

            <div className="form-control w-1/4 items-center m-2">
                <label className="label cursor-pointer">
                    <span className="label-text">Tie?</span>
                </label>
                <div className="flex items-center h-full">
                    <input type="checkbox" className="checkbox" checked={tie} onChange={handleTieChange} disabled={saving} />
                </div>
            </div>

            <div className="form-control">
                <label className="label">&nbsp;</label>
                <button disabled={saving} className={classNames("btn", { loading: saving })}>Submit</button>
            </div>
        </form>

    )
}