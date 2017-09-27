import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
FlowRouter.route( '/', {
  action: function() {
    // Do whatever we need to do when we visit http://app.com/terms.
    if (! Meteor.userId()) {
        FlowRouter.redirect('/signin')
    } else {
        BlazeLayout.render('mainPage')
    }
  },
  name: 'index' // Optional route name.
});

FlowRouter.route( '/signin', {
  action: function(params,queryParams) {
    // Do whatever we need to do when we visit http://app.com/terms.
    if (!!Meteor.userId()) {
        FlowRouter.redirect('/')
    } else {
        BlazeLayout.render('signin')
    }
  },
  name: 'signin' // Optional route name.
});

FlowRouter.route( '/signout', {
  action: function() {
    Meteor.logout();
    FlowRouter.redirect('/')
  },
  name: 'signin' // Optional route name.
});

FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    action: function() {
        BlazeLayout.render('404')
    }
};
