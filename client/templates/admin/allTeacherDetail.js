import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './allTeacherDetail.html';

Template.allTeacherDetail.onCreated(function() {
    let template = this
    template.subscribe("subjects")
    template.subscribe("schools")
    template.subscribe("teacher",FlowRouter.getParam("_id"))
})

Template.allTeacherDetail.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    schools() {
        return Schools.find({}, {sort:{schoolId:1}})
    },
    teacher() {
        return Teachers.findOne({_id:FlowRouter.getParam("_id")})
    },
    selector(identificator,value) {
        let teacher = Teachers.findOne({_id:FlowRouter.getParam("_id")})
        if (teacher) {
            return teacher[identificator] == value ? "selected" : ""
        }
    }
});

Template.allTeacherDetail.events({
    "click #save"(event,template) {
        event.preventDefault()

        let teacher_id = FlowRouter.getParam('_id')
        let name = template.find("[name=name]").value
        let surname = template.find("[name=surname]").value

        let subjectId = template.find("[name=subjectId]").value

        let ielts = template.find("[name=ielts]").value
        let school = template.find("[name=schoolId]").value

        if (name && surname && subjectId || school || ielts) {
            Meteor.call('Teacher.update',{
                name:name,
                surname:surname,
                schoolId:school,
                subjectId:subjectId,
                ielts:ielts,

            },teacher_id, function(err) {
                if(err) {
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/allTeachers/all/')
                }
            })
        }
    },
    "click #transfer"(event,template) {
        event.preventDefault()

        if (confirm('Мұғалімді трансфер тізіміне аударғыңыз келеді ме?')) {
            Meteor.call("Teacher.transfer", FlowRouter.getParam("_id"), function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/allTeachers/all')
                }
            })
        }
    },

    "click #delete"(event,template) {
        event.preventDefault()

        if (confirm('Мұғалімді өшіргіңіз келеді ме?')) {
            Meteor.call("Teacher.delete", FlowRouter.getParam("_id"), function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/allTeachers/all')
                }
            })
        }
    }


})
