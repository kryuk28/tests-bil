import { parseAnswerKey } from "../multipleChoiceChecker";
/*
* Подсчитывает рейтинг школы по кбо
* */
export const calculateRating = (academicYear,kboNo,schoolId) => {
    generalRating = {
        academicYear:academicYear,
        schoolId:schoolId,
        kboNo:kboNo,
        grade:'all',
        total:0
    };
    let subjects = KboCourses.find().fetch();

    _.each(['7','8','9','10','11'],function(grade) {
        var gradeRating = {
            academicYear:academicYear,
            schoolId:schoolId,
            kboNo:kboNo,
            grade:grade,
            total:0
        };
        _.each(subjects,function(subject) {
            gradeRating[subject.subjectId]=0;
            let results = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade,subjectId:subject.subjectId}).fetch();
            if (results.length!==0) {
                _.each(results,function(result) {
                    let answerKey = KboKeys.findOne({academicYear:academicYear,kboNo:kboNo,variant:result.variant})
                    if (answerKey) {
                        let amountOfQuestions = parseAnswerKey(answerKey.keys)
                        gradeRating[subject.subjectId]+=(100*result.result)/amountOfQuestions.length;
                        gradeRating.total+= (100*result.result)/amountOfQuestions.length;

                    }
                });
                gradeRating[subject.subjectId]=(gradeRating[subject.subjectId]/results.length).toFixed(2);
            } else {
                gradeRating[subject.subjectId] = 0;
            }
        });
        let gradeStudents = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade}).count();
        if (gradeStudents!==0) {
            gradeRating.total = (gradeRating.total/gradeStudents).toFixed(2);
            let sameRating = KboRatings.findOne({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade});
            if (sameRating===undefined)
                KboRatings.insert(gradeRating);
            else {
                KboRatings.update(sameRating,{$set:gradeRating});
            }
        }
    });

    _.each(subjects,function(subject) {
        generalRating[subject.subjectId] = 0;
        let results = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,subjectId:subject.subjectId}).fetch();
        if (results.length!==0) {
            _.each(results,function(result) {
                let answerKey = KboKeys.findOne({academicYear:academicYear,kboNo:kboNo,variant:result.variant})
                if (answerKey) {
                    let amountOfQuestions = parseAnswerKey(answerKey.keys)
                    generalRating[subject.subjectId]+=(100*result.result)/amountOfQuestions.length;
                    generalRating.total+=(100*result.result)/amountOfQuestions.length;
                }
            });
            generalRating[subject.subjectId]=(generalRating[subject.subjectId]/results.length).toFixed(2);
        }
    });

    let generalStudents = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo}).count();
    if (generalStudents!==0) {
        generalRating.total = (generalRating.total/generalStudents).toFixed(2);
        let sameRating = KboRatings.findOne({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:'all'});
        if (sameRating===undefined)
            KboRatings.insert(generalRating);
        else {
            KboRatings.update(sameRating,{$set:generalRating});
        }
    }

}