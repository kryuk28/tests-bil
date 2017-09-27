import { Meteor } from 'meteor/meteor';

Meteor.methods({
    resetSchoolPassword(schoolId) {
        adminRequired()
        let school = Schools.findOne({schoolId: schoolId})
        if (school) {
            Accounts.setPassword(school.userId,'school'+school.schoolId)
        }
    },
    // oldSchoolId: function(schoolId) {
    //     let school = Schools.findOne({schoolId:schoolId})
    //     if (school) {
    //         console.log("i am here")
    //         Meteor.users.remove({_id:school.userId})
    //         Schools.update({_id:school._id},{$set:{oldSchoolId:school.schoolId}})
    //         let teachers = Teachers.find({schoolId:schoolId}).fetch()
    //         let students = Students.find({schoolId:schoolId}).fetch()
    //
    //         let btsratings = BtsRatings.find({schoolId:schoolId}).fetch()
    //         let btsresults = BtsResults.find({schoolId:schoolId}).fetch()
    //
    //         let kboratings = KboRatings.find({schoolId:schoolId}).fetch()
    //         let kboresults = KboResults.find({schoolId:schoolId}).fetch()
    //
    //         let tatrating = TatRating.find({schoolId:schoolId}).fetch()
    //         let tatresults = TatResults.find({schoolId:schoolId}).fetch()
    //
    //         _.each(teachers,(teacher) => {
    //             Teachers.update({_id:teacher._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("teachers finished")
    //         _.each(students,(student) => {
    //             Students.update({_id:student._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("students finished")
    //         _.each(btsratings,(btsrating) => {
    //             BtsRatings.update({_id:btsrating._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log(" btsratings finished")
    //         _.each(btsresults,(btsresult) => {
    //             BtsResults.update({_id:btsresult._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("btsresults finished")
    //         _.each(kboratings,(kborating) => {
    //             KboRatings.update({_id:kborating._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("kbo rating finished")
    //         _.each(kboresults,(kboresult) => {
    //             KboResults.update({_id:kboresult._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("kbo results finished")
    //         _.each(tatrating,(rating) => {
    //             TatRating.update({_id:rating._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("tat rating finished")
    //         _.each(tatresults,(tatresult) => {
    //             TatResults.update({_id:tatresult._id},{$set:{oldSchoolId: school.schoolId}})
    //         })
    //         console.log("finished")
    //     }
    // },
    // newSchoolId: function(old,newSchoolId) {
    //     let school = Schools.findOne({oldSchoolId:old})
    //     if (school) {
    //         console.log("i am here")
    //         Schools.update({_id:school._id},{$set:{schoolId:newSchoolId}})
    //         let teachers = Teachers.find({oldSchoolId:old}).fetch()
    //         let students = Students.find({oldSchoolId:old}).fetch()
    //
    //         let btsratings = BtsRatings.find({oldSchoolId:old}).fetch()
    //         let btsresults = BtsResults.find({oldSchoolId:old}).fetch()
    //
    //         let kboratings = KboRatings.find({oldSchoolId:old}).fetch()
    //         let kboresults = KboResults.find({oldSchoolId:old}).fetch()
    //
    //         let tatrating = TatRating.find({oldSchoolId:old}).fetch()
    //         let tatresults = TatResults.find({oldSchoolId:old}).fetch()
    //
    //         _.each(teachers,(teacher) => {
    //             Teachers.update({_id:teacher._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("teachers finished")
    //         _.each(students,(student) => {
    //             Students.update({_id:student._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("students finished")
    //         _.each(btsratings,(btsrating) => {
    //             BtsRatings.update({_id:btsrating._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log(" btsratings finished")
    //         _.each(btsresults,(btsresult) => {
    //             BtsResults.update({_id:btsresult._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("btsresults finished")
    //         _.each(kboratings,(kborating) => {
    //             KboRatings.update({_id:kborating._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("kbo rating finished")
    //         _.each(kboresults,(kboresult) => {
    //             KboResults.update({_id:kboresult._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("kbo results finished")
    //         _.each(tatrating,(rating) => {
    //             TatRating.update({_id:rating._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("tat rating finished")
    //         _.each(tatresults,(tatresult) => {
    //             TatResults.update({_id:tatresult._id},{$set:{schoolId: newSchoolId}})
    //         })
    //         console.log("finished")
    //     }
    // },
    // createUsers() {
    //     let schools = Schools.find().fetch()
    //     _.each(schools,(school) => {
    //         let newUserData = {
    //           username: "school"+school.schoolId,
    //           password: "school"+school.schoolId
    //         };
    //         let userId = Accounts.createUser(newUserData);
    //         Roles.addUsersToRoles(userId,["school"])
    //         Schools.update({_id:school._id},{$set:{userId:userId}})
    //
    //     })
    // }
})
