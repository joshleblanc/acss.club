import React from 'react';
import classNames from 'classnames';
import { createTournament } from '../api/tournaments';

export const TournamentForm = () => {
    const [challongeUrl, setChallongeUrl] = React.useState('');
    const [name, setName] = React.useState('');
    const [saving, setSaving] = React.useState(false);

    const handleChallongeUrlChange = React.useCallback((e) => {
        setChallongeUrl(e.target.value);
    }, [setChallongeUrl]);

    const handleSubmit = React.useCallback(e => {
        e.preventDefault();

        setSaving(true);
        createTournament.call({ name, challongeUrl }, (err, res) => {
            setChallongeUrl('');
            setName('');
            setSaving(false);
        });
    }, [challongeUrl, setChallongeUrl, name, setName, setSaving])

    const handleNameChange = React.useCallback(e => {
        setName(e.target.value);
    }, [setName]);

    return(
        <>
            <form className="flex" onSubmit={handleSubmit}>
                <div className="form-control w-full mx-2">
                    <label className="label">Add Tournament</label>
                    <input type="text" disabled={saving} placeholder="Challonge URL" className="input w-full" value={challongeUrl} onChange={handleChallongeUrlChange} />   
                </div>
                <div className="form-control w-full mx-2">
                    <label className="label">Name</label>
                    <input type="text" disabled={saving} placeholder="Name" className="input w-full" value={name} onChange={handleNameChange} />   
                </div>
                <div className="form-control">
                    <label className="label">&nbsp;</label>
                    <button className={classNames("btn", { loading: saving })}>Submit</button>
                </div>
                
            </form>
        </>
    )
}