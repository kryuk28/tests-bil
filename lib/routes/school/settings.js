import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var settings = FlowRouter.group({
  prefix: '/school'
});

settings.route('/profile', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'schoolSettings',menu:'schoolMenu'})
        }
    }
})
