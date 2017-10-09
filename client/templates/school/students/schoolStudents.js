import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolStudents.html';

Template.schoolStudents.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.grade_search = new ReactiveVar("")
    template.division_search = new ReactiveVar("")
    template.subscribe("students")
    template.subscribe("kboSubjects")
})

Template.schoolStudents.helpers({
    students() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let grade_search = new RegExp(Template.instance().grade_search.get(), 'i')
        let division_search = new RegExp(Template.instance().division_search.get(), 'i')
        return Students.find({
            name:name_search,
            surname:surname_search,
            grade:grade_search,
            division:division_search
        },{sort:{grade:1,division:1,surname:1,name:1}})
    },
    subjects() {
        return KboCourses.find({},{sort:{subjectId:1}})
    },
    isOlympiadStudent(studentId,subjectId) {
        let student = Students.findOne({studentId:studentId})
        if (student && student.olympiad == subjectId)
            return 'selected'
    }
});

Template.schoolStudents.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.grade_search.set(template.find('[name=grade_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
        template.division_search.set(template.find('[name=division_search]').value)
    },
    "change #kboSubject"(event,template) {
        Meteor.call('Student.updateOlympiadSubject',this._id,event.target.value)
    }
})
