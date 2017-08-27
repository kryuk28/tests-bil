import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var bts = FlowRouter.group({
  prefix: '/admin/bts'
});

// bts.route('/rating/:btsNo', {
//     action: function(params,queryParams) {
//         if (!Meteor.userId()) {
//             FlowRouter.redirect('/signin')
//         } else {
//             BlazeLayout.render('mainLayout', {content:'btsRating',menu:'adminMenu'})
//         }
//     },
//     subscriptions: function(params,queryParams) {
//
//     }
// })
