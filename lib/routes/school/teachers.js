import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var students = FlowRouter.group({
  prefix: '/school'
});

students.route('/teachers', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'schoolTeachers',menu:'schoolMenu'})
        }
    }
})

students.route('/teacher/edit/:_id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'teacherDetail',menu:'schoolMenu'})
        }
    }
})

students.route('/teacher/add', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'newTeacher',menu:'schoolMenu'})
        }
    }
})

students.route('/teachers/transfer', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'teacherTransferList',menu:'schoolMenu'})
        }
    }
})
