import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var tat = FlowRouter.group({
  prefix: '/tat'
});

tat.route('/rating/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'tatRating',menu: userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)
        }
    },
    subscriptions: function(params,queryParams) {
        //this.register('companyDetails', Meteor.subscribe('companyDetails',params.companyId));
    }
})

tat.route('/results/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'tatResults',menu: userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)
        }
    }
})

tat.route('/final',{
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'tatFinalResults',menu: userIsAdmin() ? 'adminMenu' : 'schoolMenu'}),1000)
        }
    }
})
