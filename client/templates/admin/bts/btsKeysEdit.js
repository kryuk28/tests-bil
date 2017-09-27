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
    }
})

Template.btsKeysEdit.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    }
})