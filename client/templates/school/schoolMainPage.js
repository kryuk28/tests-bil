import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolMainPage.html';
Template.schoolMainPage.onCreated(function() {
    let template = this
    template.subscribe("subjects")
})
Template.schoolMainPage.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    }
});

Template.schoolMainPage.events({
})
