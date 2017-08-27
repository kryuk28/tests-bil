import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './signin.html';

Template.signin.events({
    'click #submit'(event,template) {
        event.preventDefault()
        var email = $('[name=email]').val()
        var password = $('[name=password]').val()
        Meteor.loginWithPassword(email,password,function(err) {
            if(err) {
                alert(err.reason)
            } else {
                FlowRouter.redirect('/')
            }

        })
    }
})
