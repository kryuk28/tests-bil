import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './newStudent.html';

Template.newStudent.onCreated(function() {
    let template = this
    template.subscribe("kboSubjects")
})

Template.newStudent.helpers({
    subjects() {
        return KboCourses.find({},{sort:{subjectId:1}})
    }
});

Template.newStudent.events({
    "click #save"(event,template) {
        event.preventDefault()

        let name = template.find("[name=name]").value
        let surname = template.find("[name=surname]").value
        let grade = template.find("[name=grade]").value
        let division = template.find("[name=division]").value
        let olympiad = template.find("[name=olympiadSubject]").value
        let languageGroup = template.find("[name=languageGroup]").value

        if (name && surname && grade && division) {
            Meteor.call('Student.insert',{
                name:name,
                surname:surname,
                grade:grade,
                division:division,
                olympiad:olympiad,
                languageGroup:languageGroup
            })
        }
        FlowRouter.redirect('/school/students')
    }
})
