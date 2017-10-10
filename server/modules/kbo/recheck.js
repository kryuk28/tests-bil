import { parseAnswerKey } from "../multipleChoiceChecker";
import { check } from "../multipleChoiceChecker";
import { calculateRating } from "./rating";

export const recheck = (academicYear,kboNo,variant) => {
    let results = KboResults.find({academicYear:academicYear,kboNo:kboNo,variant:variant}).fetch()
    let answerKeys = KboKeys.findOne({academicYear:academicYear,kboNo:kboNo,variant:variant})

    _.each(results,(result) => {
        let res = check(parseAnswerKey(answerKeys.keys),result.answers)
        KboResults.update({_id:result._id},{$set:{result:res}})
    })

    let schools = Schools.find().fetch()
    _.each(schools,(school) => {
        calculateRating(academicYear,kboNo,school.schoolId)
    })
}