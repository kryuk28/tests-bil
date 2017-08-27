import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolMainPage.html';
Template.schoolMainPage.onCreated(function() {
    let template = this
})
Template.schoolMainPage.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    schools() {
        return Schools.find({},{sort:{schoolId:1}})
    }
});

Template.schoolMainPage.events({
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
