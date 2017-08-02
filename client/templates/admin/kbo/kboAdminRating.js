import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboAdminRating.html';

Template.kboAdminRating.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar('all')
    template.autorun(()=>{
        template.subscribe('kboRating',academicYear.get(),template.grade.get(),FlowRouter.getParam('kboNo'))
    })
})
Template.kboAdminRating.helpers({
    kboNo() {
        return FlowRouter.getParam('kboNo')
    },
    results() {
        return KboRatings.find({},{sort:{total:-1}})
    }
})

Template.kboAdminRating.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
