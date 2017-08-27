import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsResults.html';
Template.btsResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.btsResults.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsResults.find({},{sort:{total:-1}})
    }
})

Template.btsResults.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
