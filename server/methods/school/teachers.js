import { Meteor } from 'meteor/meteor';
Meteor.methods({
    "Teacher.insert": function(teacherObject) {
        if(Roles.userIsInRole(this.userId,'school')) {
            let school = Schools.findOne({userId:this.userId})
            if(school) {
                let id = IdCounter.findOne()
                teacherId = id['teacherId']+1
                IdCounter.update({_id:id._id},{$set:{teacherId:teacherId}})

                let teacher = teacherObject
                teacher.teacherId = teacherId
                teacher.schoolId = school.schoolId

                Teachers.insert(teacher)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.update": function(teacherObject,teacher_id) {
        if(Roles.userIsInRole(this.userId,['school', 'admin'])) {
            let teacher = Teachers.findOne({_id:teacher_id})
            if(teacher) {
                Teachers.update({_id:teacher_id},{$set:teacherObject})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.transfer": function(teacher_id) {
        if(Roles.userIsInRole(this.userId,['school', 'admin'])) {
            let teacher = Teachers.findOne({_id:teacher_id})
            if(teacher) {
                Teachers.remove({_id:teacher_id})
                TeacherTransferList.insert(teacher)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.delete": function(teacher_id) {
        if(Roles.userIsInRole(this.userId,['school', 'admin'])) {
            let teacher = Teachers.findOne({_id:teacher_id})
            if(teacher) {
                Teachers.remove({_id:teacher_id})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.acceptToSchool": function(teacher_id) {
        if(Roles.userIsInRole(this.userId,'school')) {
            let teacher = TeacherTransferList.findOne({_id:teacher_id})
            if(teacher) {
                TeacherTransferList.remove({_id:teacher_id})
                let school = Schools.findOne({userId:this.userId})
                teacher.schoolId = school.schoolId
                Teachers.insert(teacher)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    }
})
