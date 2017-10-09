import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsKeysNew.html';
Template.btsKeysNew.onCreated(function() {
    let template = this
    
    if (localStorage.getItem("btsNo")) {
        template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"))
    } else {
        localStorage.setItem("btsNo","1")
        template.btsNo = new ReactiveVar("1")
    }

    if (localStorage.getItem("day")) {
        template.day = new ReactiveVar(localStorage.getItem("day"))
    } else {
        localStorage.setItem("day","1")
        template.day = new ReactiveVar("1")
    }

    if (localStorage.getItem("grade")) {
        template.grade = new ReactiveVar(localStorage.getItem("grade"))
    } else {
        localStorage.setItem("grade","7")
        template.grade = new ReactiveVar("7")
    }


})

Template.btsKeysNew.helpers({
    dayOne(day) {
    	return "1"==Template.instance().day.get()
    },
    gradeIsSeven(grade) {
        return "7"==Template.instance().grade.get()
    },
    selected(id,val) {
            let obj = {
                "btsNo": Template.instance().btsNo.get(),
                day: Template.instance().day.get(),
                grade: Template.instance().grade.get()
            }
            let v = obj[id]===val
            return v ? "selected" : ""
    }
})

Template.btsKeysNew.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    },
    "change #day"(event,template) {
        template.day.set(event.target.value)
        localStorage.setItem("day", event.target.value)
    },
    "change #grade"(event,template) {
        template.grade.set(event.target.value)
        localStorage.setItem("grade", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()
        let answerKeys = {
            academicYear: academicYear.get(),
            grade: template.grade.get(),
            day: template.day.get(),
            quarter: template.btsNo.get(),
            variant: template.find("[name=variant]").value
        }

        if (template.day.get()=="1") {
            answerKeys["physics"] = template.find("[name=physics]").value
            if (template.grade.get()=="7") {
                answerKeys["world_history"] = template.find("[name=world_history]").value
            } else {
                answerKeys["chemistry"] = template.find("[name=chemistry]").value
            }
            answerKeys["biology"] = template.find("[name=biology]").value
            answerKeys["computer"] = template.find("[name=computer]").value
            answerKeys["kazakh_kazakh"] = template.find("[name=kazakh_kazakh]").value
            answerKeys["literature_kazakh"] = template.find("[name=literature_kazakh]").value
            answerKeys["kazakh_russian"] = template.find("[name=kazakh_russian]").value
            answerKeys["literature_russian"] = template.find("[name=literature_russian]").value
            answerKeys["russian"] = template.find("[name=russian]").value
        } else {
            answerKeys["algebra"] = template.find("[name=algebra]").value
            answerKeys["geometry"] = template.find("[name=geometry]").value
            answerKeys["english"] = template.find("[name=english]").value
            answerKeys["turkish"] = template.find("[name=turkish]").value
            answerKeys["history"] = template.find("[name=history]").value
            answerKeys["geography"] = template.find("[name=geography]").value
        }
        Meteor.call("BtsAnswerKeys.Insert", answerKeys,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        //FlowRouter.redirect("/admin/bts/keys")
    }
})