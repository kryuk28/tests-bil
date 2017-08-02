import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var kbo = FlowRouter.group({
  prefix: '/admin/kbo'
});

kbo.route('/rating/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboAdminRating',menu:'adminMenu'})
        }
    }
})
