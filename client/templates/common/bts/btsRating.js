import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsRating.html';
Template.btsRating.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("all")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsRating",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.btsRating.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsRatings.find({},{sort:{total:-1}})
    }
})

Template.btsRating.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
