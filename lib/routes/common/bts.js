import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var bts = FlowRouter.group({
  prefix: '/bts'
});

bts.route('/rating/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsRating',menu:userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/results/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsResults',menu:userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)

        }
    },
    subscriptions: function(params,queryParams) {
    }
})
