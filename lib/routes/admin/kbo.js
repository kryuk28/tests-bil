import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var kbo = FlowRouter.group({
  prefix: '/admin/kbo'
});

kbo.route('/keys', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboKeys',menu:'adminMenu'})
        }
    }
})

kbo.route('/keys/edit/:id', {
    action: function(params,queryParams) {
    	if (!Meteor.userId()) {
	    FlowRouter.redirect('/signin')
	} else {
	    BlazeLayout.render('mainLayout', {content:'editKboKey',menu:'adminMenu'})
	}
    }
})
