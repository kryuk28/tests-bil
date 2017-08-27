import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var kbo = FlowRouter.group({
  prefix: '/kbo'
});

kbo.route('/rating/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'kboRating',menu:userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)
        }
    }
})

kbo.route('/results/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'kboResults',menu:userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)
        }
    }
})

kbo.route('/final',{
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'kboFinalResults',menu: userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)
        }
    }
})
