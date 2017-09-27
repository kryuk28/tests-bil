import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './teacherDetail.html';

Template.teacherDetail.onCreated(function() {
    let template = this
    template.subscribe("subjects")
    template.subscribe("teacher",FlowRouter.getParam("_id"))
})

Template.teacherDetail.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
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

Template.teacherDetail.events({
    "click #save"(event,template) {
        event.preventDefault()

        let teacher_id = FlowRouter.getParam('_id')

        let name = template.find("[name=name]").value
        let surname = template.find("[name=surname]").value
        let subjectId = template.find("[name=subjectId]").value

        let teacherObject = {
                name:name,
                surname:surname,
                subjectId:subjectId,
            }

        if (name && surname && subjectId) {
            Meteor.call('Teacher.update',teacherObject,teacher_id,function(err) {
                if(err) {
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/school/teachers')
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
                    FlowRouter.redirect('/school/teachers')
                }
            })
        }
    }
})
