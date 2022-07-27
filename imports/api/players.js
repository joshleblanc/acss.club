import { ValidatedMethod } from "meteor/mdg:validated-method";
import { fetch } from "meteor/fetch";
import { Mongo } from "meteor/mongo";

export const PlayersCollection = new Mongo.Collection("players");

export const createPlayer = new ValidatedMethod({
    name: "players.createPlayer",
    validate: new SimpleSchema({
        battleNetUrl: { type: String }
    }).validator(),
    async run({ battleNetUrl }) { 
        return await syncPlayer({ battleNetUrl });
    }
})

let syncPlayer;
if(Meteor.isServer) {
    syncPlayer = async ({ battleNetUrl }) => {
        const apiUrl = battleNetUrl.replace("profile", "api/sc2/profile")
        const response = await fetch(apiUrl);
        const json = await response.json();
        const id = json.summary.id;
        const name = json.summary.displayName;
        const portrait = json.summary.portrait;
        const league = json.career.current1v1LeagueName;

        let bestRace;
        let raceWins;

        const races = ["terran", "zerg", "protoss"];

        races.forEach(race => {
            const raceWinsId = race + "Wins";
            if(!bestRace) {
                bestRace = race;
                raceWins = json.career[raceWinsId];
            }
            if(json.career[raceWinsId] > raceWins) {
                bestRace = race;
                raceWins = json.career[raceWinsId]
            }
        });
    
        const player = PlayersCollection.update({ externalId: id }, {
            $set: {
                name, 
                portrait, 
                league,
                race: bestRace,
                updatedAt: new Date()
            },
            $setOnInsert: {
                createdAt: new Date(),
                elo: 1000,
                externalId: id
            }
        }, { upsert: true });   

        return player;
    }
} else {
    syncPlayer = () => {};
}


// https://starcraft2.com/en-us/profile/1/1/2809973
// https://starcraft2.com/en-us/api/sc2/profile/1/1/2809973?locale=en_US
// https://starcraft2.com/en-us/api/sc2/profile/1/1/2809973/ladder/summary?locale=en-us
// https://starcraft2.com/en-us/api/sc2/profile/1/1/2809973/ladder/309817?locale=en-us