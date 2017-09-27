Meteor.methods({
    'TatResults.upload':function(tatNo,rows){
        tat = Configs.findOne({
            _id: 'tatUpload'
        });
        if (tat[tatNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'ТАТ жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')
        if (Roles.userIsInRole(this.userId,['school-manager'])) {
            function checkTat(answers, keys) {
                result = 0;
                for (var i = 0; i < answers.length; i++) {
                    if (answers[i] === keys[i]||keys[i]==='+')
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
                    tatNo: tatNo,
                    variant: row.variant,
                    teacherId: row.teacherId,
                    answers: row.answers
                };
                teacher = Teachers.findOne({
                    teacherId: answerObj.teacherId
                });
                tatKeys = TatAnswerKeys.findOne({
                    academicYear: answerObj.academicYear,
                    tatNo: answerObj.tatNo,
                    variant: answerObj.variant
                });
                if (teacher == undefined) {
                    return;
                } else if (teacher.schoolId != school.schoolId) {
                    return;
                } else if (tatKeys == undefined||teacher.subjectId!==tatKeys.subjectId) {
                    return
                }
                answerObj.teacherName = teacher.name;
                answerObj.teacherSurname = teacher.surname;
                answerObj.schoolId = school.schoolId;
                answerObj.subjectId = tatKeys.subjectId;
                answerObj.position = teacher.position;
                answerObj.result = checkTat(answerObj.answers, tatKeys.keys)
                answerObj.percent = answerObj.result*100/tatKeys.keys.trim()
                teacherAnswers = TatResults.find({
                    academicYear: answerObj.academicYear,
                    tatNo: answerObj.tatNo,
                    teacherId: parseInt(answerObj.teacherId)
                }).count();

                if (teacherAnswers == 0) {
                    TatResults.insert(answerObj);
                } else {
                    teacherAnswerId = TatResults.findOne({
                        academicYear: answerObj.academicYear,
                        tatNo: answerObj.tatNo,
                        teacherId: parseInt(answerObj.teacherId)
                    })._id;
                    TatResults.update(teacherAnswerId, {
                        $set: {
                            variant: answerObj.variant,
                            answers: answerObj.answers,
                            subjectId: answerObj.subjectId,
                            result: answerObj.result,
                            percent:answerObj.percent
                        }
                    })
                }
            })
        }
    },
    updateTatRating: function(tatNo) {
        tat = Configs.findOne({
            _id: 'tatUpload'
        });
        if (tat[tatNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'ТАТ жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')
        if (Roles.userIsInRole(this.userId,['school-manager'])) {

            school = Teachers.findOne({
                userId: Meteor.userId()
            })
            academicYear = AcademicYears.findOne({now:true}).academicYear


            generalRating = {
                academicYear:academicYear,
                schoolId:school.schoolId,
                tatNo:tatNo,
                subjectId:'all',
                total:0
            }
            var subjects = [
                    {subjectId:'04',amount:100},
                    {subjectId:'03',amount:50},
                    {subjectId:'02',amount:40},
                    {subjectId:'01',amount:50},
                    {subjectId:'08',amount:50},
                    {subjectId:'10',amount:80},
                    {subjectId:'09',amount:80},
                    {subjectId:'11',amount:100},
                    {subjectId:'06',amount:100},
                    {subjectId:'12',amount:100},
                    {subjectId:'05',amount:80},
                ]
            _.each(subjects,function(subject) {
                var subjectRating = {
                    academicYear:academicYear,
                    schoolId:school.schoolId,
                    tatNo:tatNo,
                    subjectId:subject.subjectId,
                    total:0
                }
                var results = TatResults.find({academicYear:academicYear,schoolId:school.schoolId,tatNo:tatNo,subjectId:subject.subjectId,position:{$ne:'intern'}}).fetch()
                _.each(results,function(result) {
                    subjectRating.total += ((100*result.result)/subject.amount)/results.length
                })
                rating = TatRating.findOne({academicYear:academicYear,schoolId:school.schoolId,tatNo:tatNo,subjectId:subject.subjectId})
                if (rating)
                    TatRating.update({_id:rating._id},{$set:{total:subjectRating.total}})
                else {
                    if (subjectRating.total!=0)
                        TatRating.insert(subjectRating)
                }
            })
            var results = TatRating.find({academicYear:academicYear,schoolId:school.schoolId,tatNo:tatNo,subjectId:{$ne:'all'}}).fetch()
            _.each(results,function(result) {
                generalRating.total+=result.total
                console.log(generalRating.total)
            })
            generalRating.total = +(generalRating.total/results.length).toFixed(2)
            genRatingInDb = TatRating.findOne({academicYear:academicYear,tatNo:tatNo,schoolId:school.schoolId,subjectId:'all'})
            if (genRatingInDb)
                TatRating.update({_id:genRatingInDb._id},{$set:{total:generalRating.total}})
            else {
                TatRating.insert(generalRating)
            }
        }
    }
});