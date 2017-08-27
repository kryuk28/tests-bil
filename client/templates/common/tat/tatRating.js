import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatRating.html';

Template.tatRating.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('all')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatRating',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })
})
Template.tatRating.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
        return TatRating.find({},{sort:{total:-1}})
    }
})

Template.tatRating.events({
    'change .subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    }
})
