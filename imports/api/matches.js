import { Mongo } from "meteor/mongo";
import Elo from "elo-js";
import { PlayersCollection } from "./players";

export const MatchesCollection = new Mongo.Collection("matches");

export const createMatch = new ValidatedMethod({
    name: "matches.createMatch",
    validate: new SimpleSchema({
        winnerId: { type: String },
        loserId: { type: String },
        tie: { type: Boolean },
        tournamentId: { type: String },
    }).validator(),
    run({ winnerId, loserId, tie = false, tournamentId }) { 
        console.log("Creating match")
        const elo = new Elo();
        
        const winner = PlayersCollection.findOne({ _id: winnerId });
        const loser = PlayersCollection.findOne({ _id: loserId });

        let newWinnerRating;
        let newLoserRating;

        if(tie) {
            newWinnerRating = elo.ifTies(winner.elo, loser.elo);
            newLoserRating = elo.ifTies(loser.elo, winner.elo);
        } else {
            newWinnerRating = elo.ifWins(winner.elo, loser.elo);
            newLoserRating = elo.ifLoses(loser.elo, winner.elo);
        }

        MatchesCollection.insert({
            winnerId,
            loserId,
            winnerEloChange: newWinnerRating - winner.elo,
            loserEloChange: newLoserRating - loser.elo,
            tie,
            tournamentId,
            createdAt: new Date()
        })

        PlayersCollection.update({ _id: winnerId }, { $set: { elo: newWinnerRating } });
        PlayersCollection.update({ _id: loserId }, { $set: { elo: newLoserRating } });
    }
})

