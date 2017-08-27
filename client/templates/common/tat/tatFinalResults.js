import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatFinalResults.html';

Template.tatFinalResults.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatAllResults',academicYear.get(),template.subjectId.get())
    })
})
Template.tatFinalResults.helpers({
    results() {
        let tat1 = TatResults.find({tatNo:'1'}).fetch()
        let tat2 = TatResults.find({tatNo:'2'}).fetch()
        let ids = []
        _.each(tat1,(res) => {
            ids.push(res.teacherId)
        })
        _.each(tat2,(res) => {
            ids.push(res.teacherId)
        })
        ids = _.uniq(ids)
        let results = []
        _.each(ids,(id) => {
            let tat1 = TatResults.findOne({teacherId:id,tatNo:'1'})
            let tat2 = TatResults.findOne({teacherId:id,tatNo:'2'})
            let resultObj = {
                teacherId:id
            }
            if (tat1) {
                resultObj.schoolId = tat1.schoolId
                resultObj.name = tat1.teacherName
                resultObj.surname = tat1.teacherSurname
            }
            if (tat2) {
                resultObj.schoolId = tat2.schoolId
                resultObj.name = tat2.teacherName
                resultObj.surname = tat2.teacherSurname
            }
            resultObj.tat1 = tat1 ? tat1.result : 0
            resultObj.tat2 = tat2 ? tat2.result : 0
            resultObj.total = resultObj.tat1*0.4 + resultObj.tat2*0.6
            results.push(resultObj)
        })
        results = _.sortBy(results,'total').reverse()
        return results
    }
})

Template.tatFinalResults.events({
    'change .subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    }
})
