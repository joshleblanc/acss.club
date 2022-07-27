import { Mongo } from "meteor/mongo";

export const TournamentsCollection = new Mongo.Collection("tournaments");

export const createTournament = new ValidatedMethod({
    name: "tournaments.createTournament",
    validate: new SimpleSchema({
        challongeUrl: { type: String },
        name: { type: String },
    }).validator(),
    run({ name, challongeUrl }) { 
        TournamentsCollection.insert({
            challongeUrl,
            name,
            createdAt: new Date()
        })
    }
})