import { Meteor } from 'meteor/meteor';

Meteor.methods({
    resetSchoolPassword(schoolId) {
        adminRequired()
        let school = Schools.findOne({schoolId: schoolId})
        if (school) {
            Accounts.setPassword(school.userId,'school'+school.schoolId)
        }
    }
})
