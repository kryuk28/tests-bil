import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboRating.html';

Template.kboRating.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar('all')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('kboRating',academicYear.get(),template.grade.get(),FlowRouter.getParam('kboNo'))
    })
})
Template.kboRating.helpers({
    kboNo() {
        return FlowRouter.getParam('kboNo')
    },
    results() {
        return KboRatings.find({},{sort:{total:-1}})
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

Template.kboRating.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
