Meteor.methods({
    'KboResults.upload':function(kboNo,rows){
        kbo = Configs.findOne({
            _id: 'kboUpload'
        });
        if (kbo[kboNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'КБО жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')
        if (Roles.userIsInRole(this.userId,['school-manager'])) {
            function checkKbo(answers, keys) {
                result = 0;
                for (var i = 0; i < answers.length; i++) {
                    if (answers[i] == keys[i])
                        result += 1
                }
                return result
            }
            school = Teachers.findOne({
                userId: Meteor.userId()
            })
            academicYear = AcademicYears.findOne({now:true}).academicYear

            _.each(rows,function(row) {
                answerObj = {
                    academicYear: academicYear,
                    kboNo: kboNo,
                    variant: row.variant,
                    studentId: row.studentId,
                    answers: row.answers
                };
                student = Students.findOne({
                    studentId: answerObj.studentId
                });
                kboKeys = KboKeys.findOne({
                    academicYear: answerObj.academicYear,
                    kboNo: answerObj.kboNo,
                    variant: answerObj.variant
                });
                if (student == undefined) {
                    return;
                } else if (student.schoolId != school.schoolId) {
                    return;
                } else if (kboKeys == undefined||student.olympiad!==kboKeys.subjectId) {
                    return
                }
                answerObj.studentName = student.name;
                answerObj.studentSurname = student.surname;
                answerObj.grade = student.grade;
                answerObj.division = student.division;
                answerObj.schoolId = school.schoolId;
                answerObj.subjectId = kboKeys.subjectId;
                answerObj.result = checkKbo(answerObj.answers, kboKeys.keys)
                studentAnswers = KboResults.find({
                    academicYear: answerObj.academicYear,
                    kboNo: answerObj.kboNo,
                    studentId: parseInt(answerObj.studentId)
                }).count();

                if (studentAnswers == 0) {
                    KboResults.insert(answerObj);
                } else {
                    studentAnswerId = KboResults.findOne({
                        academicYear: answerObj.academicYear,
                        kboNo: answerObj.kboNo,
                        studentId: parseInt(answerObj.studentId)
                    })._id;
                    KboResults.update(studentAnswerId, {
                        $set: {
                            variant: answerObj.variant,
                            answers: answerObj.answers,
                            subjectId: answerObj.subjectId,
                            result: answerObj.result
                        }
                    })
                }
            })
        }
    }
});