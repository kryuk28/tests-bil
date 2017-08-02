import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './mainPage.html';

Template.mainPage.helpers({
    isAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(),['admin'])
    }
});
