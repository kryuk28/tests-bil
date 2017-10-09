import { Meteor } from 'meteor/meteor'

Meteor.publish('btsKeys', function(academicYear, quarter){
	if (this.userId) {
		return BtsAnswerKeys.find({academicYear:academicYear,quarter:quarter})	
	} 
	return this.ready()
})

Meteor.publish('kboKeys', function(academicYear, kboNo){
	if (this.userId) {
		return KboKeys.find({academicYear:academicYear,kboNo:kboNo})	
	} 
	return this.ready()
})

Meteor.publish("btsKey", function(keyId) {
	if (this.userId) {
		return BtsAnswerKeys.find({_id:keyId})
	}
	return this.ready()
})