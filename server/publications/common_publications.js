import { Meteor } from 'meteor/meteor'

Meteor.publish('subjects', function(){
    return Subjects.find()
})

Meteor.publish('schools',function() {
    return Schools.find()
})

Meteor.publish('btsRating',function(academicYear,grade,btsNo) {
    if (this.userId) {
        let cursor = BtsRatings.find({academicYear:academicYear,grade:grade,quarter:btsNo})
        return cursor
    }
    return this.ready()
})

Meteor.publish('kboRating',function(academicYear,grade,kboNo) {
    if (this.userId) {
        let cursor = KboRatings.find({academicYear:academicYear,grade:grade,kboNo:kboNo})
        return cursor
    }
    return this.ready()
})

Meteor.publish('kboResults',function(academicYear,grade,subjectId,kboNo) {
    if (this.userId) {
        let cursor = KboResults.find({academicYear:academicYear,grade:RegExp(grade),subjectId:RegExp(subjectId),kboNo:kboNo})
        return cursor
    } else {
        return this.ready()
    }
})

Meteor.publish('tatRating',function(academicYear,subjectId,tatNo) {
    if (this.userId) {
        let cursor = TatRating.find({academicYear:academicYear,tatNo:tatNo,subjectId:subjectId})
        return cursor
    }
    return this.ready()
})

Meteor.publish('tatResults',function(academicYear,subjectId,tatNo) {
    if (this.userId) {
        let cursor = TatResults.find({academicYear:academicYear,subjectId:RegExp(subjectId),tatNo:tatNo})
        return cursor
    } else {
        return this.ready()
    }
})
