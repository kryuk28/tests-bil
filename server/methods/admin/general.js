import { Meteor } from 'meteor/meteor';

Meteor.methods({
    resetSchoolPassword(schoolId) {
        adminRequired()
        let school = Schools.findOne({schoolId: schoolId})
        if (school) {
            Accounts.setPassword(school.userId,'school'+school.schoolId)
        }
    },
    editConfig: function(id,num,val) {
        if (!this.userId)
            return

        if (!Roles.userIsInRole(this.userId,"admin"))
            return

        let conf = Configs.findOne({_id:id})
        if(conf) {
            conf[num] = val
            console.log(conf)
            Configs.update({_id:conf._id},{$set:conf})
        }
    }
})
