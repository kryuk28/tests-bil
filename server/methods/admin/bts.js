import { calculateRating } from "../../modules/bts/rating";

Meteor.methods({
    "BtsAnswerKeys.Insert": function (answerKeys) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')
        
            //check if same variant exists in database
        sameVariant = BtsAnswerKeys.findOne({
            academicYear: answerKeys.academicYear,
            grade: answerKeys.grade,
            quarter: answerKeys.quarter,
            day: answerKeys.day,
            variant: answerKeys.variant
        })
        if (sameVariant)
            throw new Meteor.Error(322, 'Answer keys with same variant already exists please change variant')
        keysId = BtsAnswerKeys.insert(answerKeys)
        return keysId;
    },
    "BtsAnswerKeys.Update": function(id,answerKeys) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')
        
        sameVariant = BtsAnswerKeys.findOne({_id:id})
        if (sameVariant) {
            BtsAnswerKeys.update({_id:id},{$set:answerKeys})
            let config = Configs.findOne({_id:"btsUpload"})
            if (config[sameVariant.quarter] == "enabled") {
                let schools = Schools.find().fetch()
                //
                // здесь должны пересчитать результаты для учеников
                // recheck(sameVariant.academicYear,sameVariant.quarter,sameVariant:grade)
                //
                _.each(schools,(school) => {
                    calculateRating(sameVariant.academicYear,sameVariant.quarter,school.schoolId)
                })
                console.log("admin: calulated rating for schools")
            }
        }
    }
});
