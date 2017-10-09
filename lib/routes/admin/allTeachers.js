import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var teachers = FlowRouter.group({
    prefix: '/admin/allTeachers'
});

// for admin user
teachers.route('/all', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'allTeachers',menu: 'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {
    }
})

teachers.route('/edit/:_id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'allTeacherDetail',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {
    }
})
