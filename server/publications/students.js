import { Meteor } from 'meteor/meteor'

Meteor.publish('students', function(){
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(school) {
            let cursor = Students.find({schoolId:school.schoolId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish("student",function(student_id) {
    if (this.userId) {
        return Students.find({_id:student_id})
    } else {
        return this.ready()
    }
})

Meteor.publish("transferStudents",function() {
    if (this.userId) {
        return StudentTransferList.find()
    } else {
        return this.ready()
    }
})
