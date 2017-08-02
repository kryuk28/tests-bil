import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboAdminRating.html';

Template.kboAdminRating.onCreated(function(){
    console.log('kbo rating was created')
    let template = this
    template.grade = new ReactiveVar('all')
    template.subscribe('schools')
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
    },
    schoolName(schoolId) {
        return Schools.findOne({schoolId:schoolId}) ? Schools.findOne({schoolId:schoolId}).shortName : undefined
    },
    points(subjectId) {
        let result = KboRatings.findOne({schoolId:this.schoolId})
        if (result) {
            return result[subjectId]
        } else {
            return 0
        }
    }
})

Template.kboAdminRating.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
