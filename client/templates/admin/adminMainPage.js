import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminMainPage.html';
Template.adminMainPage.onCreated(function() {
    let template = this
    template.subscribe('subjects')
    template.subscribe('schools')
})
Template.adminMainPage.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    schools() {
        return Schools.find({},{sort:{schoolId:1}})
    }
});

Template.adminMainPage.events({
    'click #resetpassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetSchoolPassword',this.schoolId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    }
})
