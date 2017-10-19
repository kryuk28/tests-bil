import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsKeysEdit.html';
Template.btsKeysEdit.onCreated(function() {
    let template = this
    template.subscribe("btsKey",FlowRouter.getParam("id"))
})

Template.btsKeysEdit.helpers({
    keys() {
        return BtsAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
    },
    dayOne(day) {
    	return day=="1"
    }
})

Template.btsKeysEdit.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()
        let keys = BtsAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
        let answerKeys = {
            
        }

        if (keys.day=="1") {
            answerKeys["algebra"] = template.find("[name=algebra]").value
            answerKeys["geometry"] = template.find("[name=geometry]").value
            answerKeys["computer"] = template.find("[name=computer]").value
            answerKeys["turkish"] = template.find("[name=turkish]").value
            answerKeys["world_history"] = template.find("[name=world_history]").value
            answerKeys["kazakh_history"] = template.find("[name=kazakh_history]").value
            answerKeys["geography"] = template.find("[name=geography]").value
        } else {
            answerKeys["physics"] = template.find("[name=physics]").value
            answerKeys["chemistry"] = template.find("[name=chemistry]").value
            answerKeys["biology"] = template.find("[name=biology]").value
            answerKeys["english"] = template.find("[name=english]").value
            answerKeys["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value
            answerKeys["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value
            answerKeys["kazakh_rus"] = template.find("[name=kazakh_rus]").value
            answerKeys["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value
            answerKeys["russian"] = template.find("[name=russian]").value
        }
        Meteor.call("BtsAnswerKeys.Update", keys._id,answerKeys,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        //FlowRouter.redirect("/admin/bts/keys")
    }
})