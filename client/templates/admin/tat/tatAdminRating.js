import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatAdminRating.html';

Template.tatAdminRating.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('all')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatRating',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })
})
Template.tatAdminRating.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
        return TatRating.find({},{sort:{total:-1}})
    },
    schoolName(schoolId) {
        return Schools.findOne({schoolId:schoolId}) ? Schools.findOne({schoolId:schoolId}).shortName : undefined
    }
})

Template.tatAdminRating.events({
    'change .subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    }
})
