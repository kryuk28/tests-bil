import { Meteor } from 'meteor/meteor'

Meteor.publish('teachers', function(){
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(school) {
            let cursor = Teachers.find({schoolId:school.schoolId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish("teacher",function(student_id) {
    if (this.userId) {
        return Teachers.find({_id:student_id})
    } else {
        return this.ready()
    }
})

Meteor.publish("transferTeachers",function() {
    if (this.userId) {
        return TeacherTransferList.find()
    } else {
        return this.ready()
    }
})
