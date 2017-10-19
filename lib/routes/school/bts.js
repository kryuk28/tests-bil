import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var students = FlowRouter.group({
    prefix: '/school/bts'
});

students.route('/upload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'btsUpload',menu:'schoolMenu'})
        }
    }
})