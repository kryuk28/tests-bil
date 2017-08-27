import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboResults.html';

Template.kboResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar('7')
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('kboResults',academicYear.get(),template.grade.get(),template.subjectId.get(),FlowRouter.getParam('kboNo'))
    })

})

Template.kboResults.helpers({
    kboNo() {
        return FlowRouter.getParam('kboNo')
    },
    results() {
        return KboResults.find({},{sort:{result:-1}})
    }
})

Template.kboResults.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'change .subject'(event,template) {
        template.subjectId.set(event.target.value)
    }
})
