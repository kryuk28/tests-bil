import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

let admin = FlowRouter.group({
  prefix: '/admin'
});

admin.route( '/', {
  action: function() {
      if (! Meteor.userId()) {
          FlowRouter.redirect('/signin')
      } else {
          BlazeLayout.render('mainPage')
      }
  }
});