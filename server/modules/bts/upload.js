import { check} from "../multipleChoiceChecker";
import { parseAnswerKey } from "../multipleChoiceChecker";
/*
* метод для загрузки текст файла bts
* */

export const upload = (academicYear,btsNo,day,schoolId,results) => {
    _.each(results,(studentObj) => {
        let student = Students.findOne({studentId:parseInt(studentObj.studentId)});

        let answerKey = BtsAnswerKeys.findOne({
            academicYear: academicYear,
            quarter: studentObj.btsNo,
            variant: studentObj.variant,
            day: day,
            grade: studentObj.grade
        });

        if (!student || student.schoolId != schoolId || !answerKey)
            return;

        let studentRecord = {
            academicYear: academicYear,
            btsNo: btsNo,
            studentId: student.studentId,
            name: student.name,
            surname: student.surname,
            grade: student.grade,
            division: student.division,
        }

        if (day == 2) {
            studentRecord.variant_day_2 = answerKey.variant
            studentRecord.day_2_keys = studentObj.keys

            studentRecord["algebra"] = check(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,10))
            studentRecord["geometry"] = check(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(10,20))
            studentRecord["computer"] = check(parseAnswerKey(answerKey.computer), studentObj.keys.slice(20,30))
            studentRecord["turkish"] = check(parseAnswerKey(answerKey.turkish), studentObj.keys.slice(30,50))
            studentRecord["world_history"] = check(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(50,60))
            studentRecord["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(60,70))
            studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(70,80))

            studentRecord["day_2_total"] = studentRecord["algebra"] + studentRecord["geometry"] + studentRecord["computer"] + studentRecord["turkish"] + studentRecord["world_history"] +studentRecord["kazakh_history"] + studentRecord["geography"]
        } else {
            studentRecord.variant_day_1 = answerKey.variant
            studentRecord.day_1_keys = studentObj.keys

            answerKeys["physics"] = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(0,10))
            answerKeys["chemistry"] = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(10,20))
            answerKeys["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(20,30))
            answerKeys["english"] = check(parseAnswerKey(answerKey.english), studentObj.keys.slice(30,50))
            if (student.languageGroup == "kaz") {
                answerKeys["kazakh"] = check(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(50,60))
                answerKeys["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(60,70))
            } else {
                answerKeys["kazakh"] = check(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(50,60))
                answerKeys["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(60,70))
            }
            answerKeys["russian"] = check(parseAnswerKey(answerKey.russian), studentObj.keys.slice(70,80))

            studentRecord["day_1_total"] = studentRecord["physics"] + studentRecord["chemistry"] + studentRecord["biology"] + studentRecord["english"] + studentRecord["kazakh"] + studentRecord["kazakh_literature"] + studentRecord["russian"]
        }

        let recordInDb = BtsResults.findOne({academicYear:academicYear,btsNo:btsNo,day:day,studentId:student.studentId})

        if (recordInDb) {
            BtsResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            BtsResults.insert(studentRecord)
        }
    })
}