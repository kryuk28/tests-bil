import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolTeachers.html';

Template.schoolTeachers.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.grade_search = new ReactiveVar("")
    template.division_search = new ReactiveVar("")
    template.subscribe("teachers")
    template.subscribe("subjects")
})

Template.schoolTeachers.helpers({
    teachers() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        return Teachers.find({
            name:name_search,
            surname:surname_search,
        },{sort:{surname:1,name:1,subjectId:1}})
    }
});

Template.schoolTeachers.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    }
})
