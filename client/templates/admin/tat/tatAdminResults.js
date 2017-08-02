import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatAdminResults.html';

Template.tatAdminResults.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatResults',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })

})

Template.tatAdminResults.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
        return TatResults.find({},{sort:{result:-1}})
    },
    schoolName(schoolId) {
        return Schools.findOne({schoolId:schoolId}) ? Schools.findOne({schoolId:schoolId}).shortName : undefined
    }
})

Template.tatAdminResults.events({
    'change .subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    }
})
