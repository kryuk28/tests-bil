import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var tat = FlowRouter.group({
  prefix: '/admin/tat'
});

tat.route('/rating/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatAdminRating',menu:'adminMenu'})
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
            BlazeLayout.render('mainLayout', {content:'tatAdminResults',menu:'adminMenu'})
        }
    }
})
