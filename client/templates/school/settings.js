import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './settings.html';
Template.schoolSettings.onCreated(function() {
    let template = this
    template.subscribe("subjects")
})

Template.schoolSettings.events({
    "click #save"(event,template) {
        event.preventDefault()

        let old = template.find("[name=oldPassword]").value
        let newp = template.find("[name=newPassword]").value

        if (old && newp) {
            Accounts.changePassword(old,newp,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    alert("Құпиясөз өзгертілді")
                }
            })
        }
    },
    "click #upgrade"(event,template) {
        event.preventDefault()
        let pass = template.find("[name=confirm]").value
        if (pass) {
            if (confirm("Өзгеріс енгізілгеннен кейін қайта калпына келмейді!")) {
                $('#upgrade').prop('disabled', true);
                Meteor.call("Student.upgrade",function(err) {
                    if (err) {
                        alert(err.reason)
                    } else {
                        alert("Сыныптан сыныпқа көшіру сәтті аяқталды!")
                        $('#upgrade').prop('disabled', false);
                    }
                })
            }
        }
    }
})
