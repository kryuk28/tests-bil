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
        }
    },
    'BtsResults.calculateRating': function (quarter) {
        //check if bts upload is enabled
        btsUpload = Configs.findOne({
            _id: 'btsUpload'
        }) || {}
        if (btsUpload[quarter] === 'disabled')
            throw new Meteor.Error(401, 'BTS Upload is disabled please contact coordinator');

        if (Roles.userIsInRole(this.userId, ['school-manager'])) {
            var grades = ['7', '8', '9', '10']
            var academicYear = AcademicYears.findOne({
                now: true
            }).academicYear;
            var schoolId = Teachers.findOne({
                userId: this.userId
            }).schoolId
            var seventh_day_1_Results = BtsResults.find({
                schoolId: schoolId,
                academicYear: academicYear,
                quarter: quarter,
                grade: '7',
                day_1_total:{$exists:true,$ne:0},
            }).count()

            var seventh_day_2_Results = BtsResults.find({
                schoolId: schoolId,
                academicYear: academicYear,
                quarter: quarter,
                grade: '7',
                day_2_total:{$exists:true,$ne:0},
            }).count()

            var others_day_1_Results = BtsResults.find({
                schoolId: schoolId,
                academicYear: academicYear,
                quarter: quarter,
                grade: {
                    $ne: '7'
                },
                day_1_total:{$exists:true,$ne:0},
            }).count()

            var others_day_2_Results = BtsResults.find({
                schoolId: schoolId,
                academicYear: academicYear,
                quarter: quarter,
                grade: {
                    $ne: '7'
                },
                day_1_total:{$exists:true,$ne:0},
            }).count()
            var all_day_1_Results = seventh_day_1_Results + others_day_1_Results
            var all_day_2_Results = seventh_day_2_Results + others_day_2_Results
            var generalRating = {
                academicYear: academicYear,
                quarter: quarter,
                schoolId: schoolId,
                grade: 'all',
                physics: 0,
                chemistry: 0,
                biology: 0,
                world_history: 0,
                computer_science: 0,
                kazakh_lang: 0,
                literature: 0,
                russian_lang: 0,
                algebra: 0,
                geometry: 0,
                english_lang: 0,
                turkish_lang: 0,
                kazakh_history: 0,
                geography: 0,
                day_1_total:0,
                day_2_total:0,
                total: 0
            }
            if (schoolId)
                _.each(grades, function (grade) {
                    var results = BtsResults.find({
                        grade: grade,
                        schoolId: schoolId,
                        academicYear: academicYear,
                        quarter: quarter
                    }).fetch()

                    var studentsAttendedDay1 = BtsResults.find({
                        grade: grade,
                        schoolId: schoolId,
                        academicYear: academicYear,
                        quarter: quarter,
                        day_1_total:{$exists:true,$ne:0},
                        }).count()
                    var studentsAttendedDay2 = BtsResults.find({
                        grade: grade,
                        schoolId: schoolId,
                        academicYear: academicYear,
                        quarter: quarter,
                        day_2_total:{$exists:true,$ne:0},
                        }).count()
                    var ratingObj = {
                        academicYear: academicYear,
                        quarter: quarter,
                        schoolId: schoolId,
                        grade: grade,
                        physics: 0,
                        chemistry: 0,
                        biology: 0,
                        world_history: 0,
                        computer_science: 0,
                        kazakh_lang: 0,
                        literature: 0,
                        russian_lang: 0,
                        algebra: 0,
                        geometry: 0,
                        english_lang: 0,
                        turkish_lang: 0,
                        kazakh_history: 0,
                        geography: 0,
                        day_1_total:0,
                        day_2_total:0,
                        total: 0
                    }

                    _.each(results, function (result) {
                        //for all grades
                        generalRating.physics += result.physics ? result.physics.points : 0;
                        generalRating.chemistry += result.chemistry ? result.chemistry.points : 0;
                        generalRating.biology += result.biology ? result.biology.points : 0;
                        generalRating.world_history += result.world_history ? result.world_history.points : 0;
                        generalRating.computer_science += result.computer_science ? result.computer_science.points : 0;
                        generalRating.kazakh_lang += result.kazakh_lang ? result.kazakh_lang.points : 0;
                        generalRating.literature += result.literature ? result.literature.points : 0;
                        generalRating.russian_lang += result.russian_lang ? result.russian_lang.points : 0;
                        generalRating.algebra += result.algebra ? result.algebra.points : 0;
                        generalRating.geometry += result.geometry ? result.geometry.points : 0;
                        generalRating.english_lang += result.english_lang ? result.english_lang.points : 0;
                        generalRating.turkish_lang += result.turkish_lang ? result.turkish_lang.points : 0;
                        generalRating.kazakh_history += result.kazakh_history ? result.kazakh_history.points : 0;
                        generalRating.geography += result.geography ? result.geography.points : 0;
                        generalRating.day_1_total+=result.day_1_total||0
                        generalRating.day_2_total+=result.day_2_total||0

                            //for grade
                        ratingObj.physics += result.physics ? result.physics.points : 0;
                        ratingObj.chemistry += result.chemistry ? result.chemistry.points : 0;
                        ratingObj.biology += result.biology ? result.biology.points : 0;
                        ratingObj.world_history += result.world_history ? result.world_history.points : 0;
                        ratingObj.computer_science += result.computer_science ? result.computer_science.points : 0;
                        ratingObj.kazakh_lang += result.kazakh_lang ? result.kazakh_lang.points : 0;
                        ratingObj.literature += result.literature ? result.literature.points : 0;
                        ratingObj.russian_lang += result.russian_lang ? result.russian_lang.points : 0;
                        ratingObj.algebra += result.algebra ? result.algebra.points : 0;
                        ratingObj.geometry += result.geometry ? result.geometry.points : 0;
                        ratingObj.english_lang += result.english_lang ? result.english_lang.points : 0;
                        ratingObj.turkish_lang += result.turkish_lang ? result.turkish_lang.points : 0;
                        ratingObj.kazakh_history += result.kazakh_history ? result.kazakh_history.points : 0;
                        ratingObj.geography += result.geography ? result.geography.points : 0;
                        ratingObj.day_1_total+=result.day_1_total||0
                        ratingObj.day_2_total+=result.day_2_total||0

                    })
                    if (results.length !== 0) {
                        if (studentsAttendedDay1>0) {
                        ratingObj.physics = (ratingObj.physics / studentsAttendedDay1).toFixed(2)
                        ratingObj.chemistry = (ratingObj.chemistry / studentsAttendedDay1).toFixed(2)
                        ratingObj.biology = (ratingObj.biology / studentsAttendedDay1).toFixed(2)
                        ratingObj.world_history = (ratingObj.world_history / studentsAttendedDay1).toFixed(2)
                        ratingObj.computer_science = (ratingObj.computer_science / studentsAttendedDay1).toFixed(2)
                        ratingObj.kazakh_lang = (ratingObj.kazakh_lang / studentsAttendedDay1).toFixed(2)
                        ratingObj.literature = (ratingObj.literature / studentsAttendedDay1).toFixed(2)
                        ratingObj.russian_lang = (ratingObj.russian_lang / studentsAttendedDay1).toFixed(2)
                        ratingObj.day_1_total = (ratingObj.day_1_total/studentsAttendedDay1).toFixed(2)
                        }
                        if (studentsAttendedDay2>0) {
                        ratingObj.algebra = (ratingObj.algebra / studentsAttendedDay2).toFixed(2)
                        ratingObj.geometry = (ratingObj.geometry / studentsAttendedDay2).toFixed(2)
                        ratingObj.english_lang = (ratingObj.english_lang / studentsAttendedDay2).toFixed(2)
                        ratingObj.turkish_lang = (ratingObj.turkish_lang / studentsAttendedDay2).toFixed(2)
                        ratingObj.kazakh_history = (ratingObj.kazakh_history / studentsAttendedDay2).toFixed(2)
                        ratingObj.geography = (ratingObj.geography / studentsAttendedDay2).toFixed(2)
                        ratingObj.day_2_total = (ratingObj.day_2_total/studentsAttendedDay2).toFixed(2)
                        }
                        ratingObj.total = parseFloat(ratingObj.day_1_total||0)+parseFloat(ratingObj.day_2_total||0)
                    }
                    var sameRating = BtsRatings.findOne({
                        quarter: quarter,
                        academicYear: academicYear,
                        schoolId: schoolId,
                        grade: grade
                    })
                    if (!sameRating)
                        BtsRatings.insert(ratingObj)
                    else {
                        BtsRatings.update(sameRating, {
                            $set: ratingObj
                        })
                    }
                })

            if (all_day_1_Results !== 0 && all_day_2_Results!==0) {
                generalRating.physics = (generalRating.physics / all_day_1_Results).toFixed(2)
                if (others_day_1_Results>0)
                    generalRating.chemistry = (generalRating.chemistry / others_day_1_Results).toFixed(2)
                generalRating.biology = (generalRating.biology / all_day_1_Results).toFixed(2)
                if (seventh_day_1_Results>0)
                    generalRating.world_history = (generalRating.world_history / seventh_day_1_Results).toFixed(2)
                generalRating.computer_science = (generalRating.computer_science / all_day_1_Results).toFixed(2)
                generalRating.kazakh_lang = (generalRating.kazakh_lang / all_day_1_Results).toFixed(2)
                generalRating.literature = (generalRating.literature / all_day_1_Results).toFixed(2)
                generalRating.russian_lang = (generalRating.russian_lang / all_day_1_Results).toFixed(2)
                generalRating.algebra = (generalRating.algebra / all_day_2_Results).toFixed(2)
                generalRating.geometry = (generalRating.geometry / all_day_2_Results).toFixed(2)
                generalRating.english_lang = (generalRating.english_lang / all_day_2_Results).toFixed(2)
                generalRating.turkish_lang = (generalRating.turkish_lang / all_day_2_Results).toFixed(2)
                generalRating.kazakh_history = (generalRating.kazakh_history / all_day_2_Results).toFixed(2)
                generalRating.geography = (generalRating.geography / all_day_2_Results).toFixed(2)
                generalRating.day_1_total = (generalRating.day_1_total/all_day_1_Results).toFixed(2)
                generalRating.day_2_total = (generalRating.day_2_total/all_day_2_Results).toFixed(2)
                generalRating.total = parseFloat(generalRating.day_1_total)+parseFloat(generalRating.day_2_total)
            }
            var sameSchoolRating = BtsRatings.findOne({
                quarter: quarter,
                schoolId: schoolId,
                academicYear: academicYear,
                grade: 'all'
            })
            if (!sameSchoolRating)
                BtsRatings.insert(generalRating)
            else {
                BtsRatings.update(sameSchoolRating, {
                    $set: generalRating
                })
            }

        }
    }
});
