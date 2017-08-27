import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var students = FlowRouter.group({
  prefix: '/school'
});

students.route('/students', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'schoolStudents',menu:'schoolMenu'})
        }
    }
})

students.route('/student/edit/:_id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'studentDetail',menu:'schoolMenu'})
        }
    }
})

students.route('/student/add', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'newStudent',menu:'schoolMenu'})
        }
    }
})

students.route('/students/transfer', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'studentTransferList',menu:'schoolMenu'})
        }
    }
})
