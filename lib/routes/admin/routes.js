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

// admin.route('/profile', {
//     action: function(params,queryParams) {
//         if (!Meteor.userId()) {
//             FlowRouter.redirect('/signin')
//         } else {
//             BlazeLayout.render('mainLayout', {content:'adminProfile'})
//         }
//     },
// });
// admin.route('/company/:companyId', {
//     action: function(params,queryParams) {
//         if (!Meteor.userId()) {
//             FlowRouter.redirect('/signin')
//         } else {
//             BlazeLayout.render('mainLayout', {content:'adminCompany'})
//         }
//     },
//     subscriptions: function(params,queryParams) {
//         this.register('companyDetails', Meteor.subscribe('companyDetails',params.companyId));
//     }
// })
