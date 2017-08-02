import { Meteor } from 'meteor/meteor'

Meteor.publish('subjects', function(){
    return Subjects.find()
})

Meteor.publish('schools',function() {
    return Schools.find()
})

Meteor.publish('btsRating',function(academicYear,grade,btsNo) {
    if (this.userId) {
        return BtsRatings.find({academicYear:academicYear,grade:grade,quarter:btsNo})
    }
    return this.ready()
})
