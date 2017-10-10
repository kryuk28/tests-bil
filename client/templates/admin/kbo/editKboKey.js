import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './editKboKey.html';
Template.editKboKey.onCreated(function() {
    let template = this

    if (localStorage.getItem("kboNo")) {
        template.kboNo = new ReactiveVar(localStorage.getItem("kboNo"))
    } else {
        localStorage.setItem("kboNo","1")
        template.kboNo = new ReactiveVar("1")
    }

    template.subscribe("kboSubjects")
    template.subscribe("kboKeys",academicYear.get(), template.kboNo.get())
    template.subscribe("kboKey",FlowRouter.getParam("id"))

})

Template.editKboKey.helpers({
    key() {
        return KboKeys.findOne()
    },
    subjects() {
        return KboCourses.find()
    },
    selected(a,b) {
        if (a==b) {
            return "selected"
        }
    }
})

Template.editKboKey.events({
    "change #kboNo"(event,template) {
        template.kboNo.set(event.target.value)
        localStorage.setItem("kboNo", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()

        let answerKey = {
            academicYear: academicYear.get(),
            kboNo: template.find("[name=kboNo]").value,
            variant: template.find("[name=variant]").value,
            subjectId: template.find("[name=subjectId]").value,
            keys: template.find("[name=keys]").value,
        }

        Meteor.call("KboKeys.Update",FlowRouter.getParam("id"),answerKey,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды")
            }
        })
        alert("Идет пересчет рейтинга школ")
    }
})
