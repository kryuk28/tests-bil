import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminMainPage.html';
Template.adminMainPage.onCreated(function() {
    let template = this
    template.subscribe('subjects')
    template.subscribe('schools')
    template.subscribe("configs")
})
Template.adminMainPage.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    schools() {
        return Schools.find({},{sort:{schoolId:1}})
    },
    selected(id,num,val) {
        let conf = Configs.findOne({_id:id})
        if (conf)
            return conf[num] == val ? "selected" : ""
    }
});

Template.adminMainPage.events({
    'click #resetpassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetSchoolPassword',this.schoolId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    },
    "change #bts1"(event,template) {
        Meteor.call("editConfig","btsUpload","1",event.target.value)
    },
    "change #bts2"(event,template) {
        Meteor.call("editConfig","btsUpload","2",event.target.value)
    },
    "change #bts3"(event,template) {
        Meteor.call("editConfig","btsUpload","3",event.target.value)
    },
    "change #bts4"(event,template) {
        Meteor.call("editConfig","btsUpload","4",event.target.value)
    },
    "change #kbo1"(event,template) {
        Meteor.call("editConfig","kboUpload","1",event.target.value)
    },
    "change #kbo2"(event,template) {
        Meteor.call("editConfig","kboUpload","2",event.target.value)
    },
    "change #kbo3"(event,template) {
        Meteor.call("editConfig","kboUpload","3",event.target.value)
    },
    "change #tat1"(event,template) {
        Meteor.call("editConfig","tatUpload","1",event.target.value)
    },
    "change #tat2"(event,template) {
        Meteor.call("editConfig","tatUpload","2",event.target.value)
    }
})
