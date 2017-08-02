import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './onlyIfLoggedIn.html';

Template.onlyIfLoggedIn.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    return !!Meteor.user()
  }
});
