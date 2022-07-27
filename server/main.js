import { Meteor } from 'meteor/meteor';
import { PlayersCollection } from '../imports/api/players';
import "../imports/api/players";
import "../imports/api/matches";
import { MatchesCollection } from '../imports/api/matches';
import { TournamentsCollection} from "../imports/api/tournaments";

Meteor.startup(() => {
  process.env.MAIL_URL = Meteor.settings.smtp;

  Accounts.emailTemplates.from = Meteor.settings.emailTemplates.from;
  Accounts.emailTemplates.siteName = Meteor.settings.emailTemplates.siteName;

  console.log(process.env.MAIL_URL);
  console.log(Accounts.emailTemplates.from);

  if(Accounts.users.find({}).count() === 0) {
    Accounts.createUser({ email: Meteor.settings.adminEmail })
  }

  Meteor.publish('players', function() {
    return PlayersCollection.find();
  });

  Meteor.publish('tournaments', function() {
    return TournamentsCollection.find();
  })

  Meteor.publish('players.matches', function(id) {
    return [
      MatchesCollection.find({
        $or: [
          { winnerId: id },
          { loserId: id }
        ]
      }),
      PlayersCollection.find(),
    ];
  });
});
