import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './allTeachers.html';

Template.allTeachers.onCreated(function() {
    let template = this

    //template.schoolId_search = new ReactiveVar("")

    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.grade_search = new ReactiveVar("")
    template.division_search = new ReactiveVar("")

    template.schoolId_select = new ReactiveVar("")

    template.subscribe("schools")
    template.subscribe("allTeachers")
    template.subscribe("subjects")
})


Template.allTeachers.helpers({

    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },

    teachers() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())

        //let schoolId_search = new RegExp(Template.instance().schoolId_search.get())

        return Teachers.find({
            name:name_search,
            surname:surname_search,
            //schoolId:schoolId_search,
            schoolId:schoolId_select,

        },{sort:{schoolId:1,surname:1,name:1,subjectId:1}})
    },

});

Template.allTeachers.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)

        //template.schoolId_search.set(template.find('[name=schoolId_search]').value)
    },

    "change #select"(event,template) {
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)

        let schoolId_select = FlowRouter.getParam('_id')
    }

});

