import React from 'react';
import { createPlayer } from '../api/players';
import classNames from 'classnames';

export const PlayerForm = () => {
    const [battleNetUrl, setBattleNetUrl] = React.useState('');
    const [saving, setSaving] = React.useState(false);

    const handleBattleNetUrlChange = React.useCallback((e) => {
        setBattleNetUrl(e.target.value);
    }, [setBattleNetUrl]);

    const handleSubmit = React.useCallback(e => {
        e.preventDefault();

        setSaving(true);
        createPlayer.call({ battleNetUrl }, (err, res) => {
            console.log("Done", err, res);
            setBattleNetUrl('');
            setSaving(false);
        });
    }, [battleNetUrl, setBattleNetUrl, setSaving])

    return(
        <>
            <form className="flex" onSubmit={handleSubmit}>
                <div className="form-control w-full">
                    <label className="label">Add player</label>
                    <input type="text" disabled={saving} placeholder="battle.net url" className="input w-full" value={battleNetUrl} onChange={handleBattleNetUrlChange} />   
                </div>
                <div className="form-control">
                    <label className="label">&nbsp;</label>
                    <button className={classNames("btn", { loading: saving })}>Submit</button>
                </div>
                
            </form>
        </>
    )
}
