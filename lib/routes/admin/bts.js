import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var bts = FlowRouter.group({
  prefix: '/admin/bts'
});

bts.route('/keys', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'btsKeys',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

bts.route('/keys/edit/:id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'btsKeysEdit',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})
