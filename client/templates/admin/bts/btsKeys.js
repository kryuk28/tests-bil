import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsKeys.html';
Template.btsKeys.onCreated(function() {
    let template = this

    if (localStorage.getItem("btsNo")) {
        template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"))
    } else {
        localStorage.setItem("btsNo","1")
        template.btsNo = new ReactiveVar("1")
    }

    template.autorun(() => {
        template.subscribe("btsKeys",academicYear.get(), template.btsNo.get())
    })

})

Template.btsKeys.helpers({
    keys() {
        return BtsAnswerKeys.find({},{sort:{day:1,grade:1}})
    }
})

Template.btsKeys.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    }
})