checkGds = function (studentKeys, answerKeys) {
    //grade, courseId, quarter and academYear parameters are required to calculate and update BTS objectives statistics
    var points = 0;
    for (var i = 0; i < studentKeys.length; i++) {
        if (studentKeys[i] === answerKeys[i] || answerKeys[i]==="+") {
            points += 1
        }
    }
    return {
        points: points,
        keys: studentKeys,
    }
}

// helper function for getting rid of extra space, newlines and tabs in strings
// inside input object
var answerKeysTrim = function (answerKeys) {
    // if school is object
    if (typeof (answerKeys) === 'object')
    // for each value - if value is string then trim it and return it with key
    // if the value is object do the same in the object
    // otherwise just return it with key
        return _.object(_.map(answerKeys, function (val, key) {
        if (typeof (val) === 'string') return [key, val.trim()];
        else if (typeof (val) === 'object') return [key, answerKeysTrim(val)];
        else return [key, val];
    }));
};


// check for the input values
var answerKeysCheck = function (answerKeys) {
        // if quarter
    if (['1', '2', '3', '4'].indexOf(answerKeys.quarter) < 0)
        throw new Meteor.Error(422, 'Please, fill in quarter field.');
    // if grade
    if (['7', '8', '9', '10', '11'].indexOf(answerKeys.grade) < 0)
        throw new Meteor.Error(422, 'Please, fill in grade field.');
    // if day
    if (['1', '2'].indexOf(answerKeys.day) < 0)
        throw new Meteor.Error(422, 'Please, fill in day field.');
    // if variant - check through regular expression
    var regexpVariant = /^\d\d\d\d$/;
    if (!regexpVariant.test(answerKeys.variant))
        throw new Meteor.Error(422, 'Please, fill in variant field.');

    if (answerKeys.day == '1')
        if (answerKeys.grade == '7') {
            if (answerKeys['02'].length !== 15)
                throw new Meteor.Error(322, 'Please fill correct amount of keys in physics')
            if (answerKeys['07'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in world history')
            if (answerKeys['04'].length !== 15)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in biology')
            if (answerKeys['08'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in computer science')
            if (answerKeys['09_kaz'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['09_rus'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['24_kaz'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['24_rus'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['11'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in russian language')
        } else {
            if (answerKeys['02'].length !== 20)
                throw new Meteor.Error(322, 'Please fill correct amount of keys in physics')
            if (answerKeys['03'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in chemistry')
            if (answerKeys['04'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in biology')
            if (answerKeys['08'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in computer science')
            if (answerKeys['09_kaz'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['09_rus'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['24_kaz'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['24_rus'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in kazakh language')
            if (answerKeys['11'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in russian language')
        } else
    if (answerKeys.day == '2')
        if (answerKeys.grade == '7') {
            if (answerKeys['01'].length !== 15)
                throw new Meteor.Error(322, 'Please fill correct amount of keys in algebra')
            if (answerKeys['13'].length !== 5)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in geometry')
            if (answerKeys['05'].length !== 30)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in english language')
            if (answerKeys['10'].length !== 30)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in turkish language')
            if (answerKeys['12'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in Kazakhstan history')
            if (answerKeys['06'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in geography')
        } else {
            if (answerKeys['01'].length !== 20)
                throw new Meteor.Error(322, 'Please fill correct amount of keys in algebra')
            if (answerKeys['13'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in geometry')
            if (answerKeys['05'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in english language')
            if (answerKeys['10'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in  turkish language')
            if (answerKeys['12'].length !== 20)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in Kazakhstan history')
            if (answerKeys['06'].length !== 10)
                throw new Meteor.Error(422, 'Please fill correct amount of keys in geography')
        }
};

Meteor.methods({
    newBtsKeys: function (data) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')
            //checking recieved data to validness
        academicYear = AcademicYears.findOne({
            now: true
        }).academicYear || ""
        answerKeysCheck(data)
            //check if same variant exists in database
        sameVariant = BtsAnswerKeys.findOne({
            academicYear: academicYear,
            grade: data.grade,
            quarter: data.quarter,
            day: data.day,
            variant: data.variant
        })
        if (sameVariant)
            throw new Meteor.Error(322, 'Answer keys with same variant already exists please change variant')
        data.academicYear = academicYear;
        keysId = BtsAnswerKeys.insert(data)
        return keysId;
    },
    // import one or set of answer keys of students
    'BtsResults.upload': function (btsNo, day, data) {
        // check for permission
        if (!this.userId || !Roles.userIsInRole(this.userId, ['school-manager']))
            throw new Meteor.Error(401, 'Please login to the portal as moderator.');
        //check if bts upload is enabled
        btsUpload = Configs.findOne({
            _id: 'btsUpload'
        }) || {}
        if (btsUpload[btsNo] === 'disabled')
            throw new Meteor.Error(401, 'BTS Upload is disabled please contact coordinator');
        // check the day and quarter
        if (['1', '2'].indexOf(day) < 0 || ['1', '2', '3', '4'].indexOf(btsNo) < 0)
            throw new Meteor.Error(422, 'Day or quarter is incorrect.');
        // split the string into the lines and store as an array
        schoolId = Teachers.findOne({
            userId: this.userId
        }).schoolId
        academicYear = AcademicYears.findOne({
                now: true
            }).academicYear || ''
            // for each index in array
        _.each(data, function (studentKey) {
            studentId = +studentKey.studentId
            variant = studentKey.variant
            student = Students.findOne({
                studentId: studentId
            })
            if (student == undefined || student.schoolId !== schoolId) {
                return;
            }
            answerKeys = BtsAnswerKeys.findOne({
                academicYear: academicYear,
                grade: student.grade,
                quarter: btsNo,
                day: day,
                variant: variant
            })
            if (answerKeys == undefined || student.grade !== answerKeys.grade) {
                //throw new Meteor.Error(422,'Variant of student with ID:'+studentId+' is incorrect please correct!')
                return;
            }
            if (day == '1') {
                if (student.grade == '7') {
                    resultObj = {
                        academicYear: academicYear,
                        quarter: btsNo,
                        grade: student.grade,
                        division: student.division,
                        variant_day_1: variant,
                        studentId: student.studentId,
                        schoolId: student.schoolId,
                        name: student.name,
                        surname: student.surname,
                        physics: checkGds(studentKey.answers.slice(0, 15), answerKeys['02']),
                        world_history: checkGds(studentKey.answers.slice(15, 25), answerKeys['07']),
                        biology: checkGds(studentKey.answers.slice(25, 40), answerKeys['04']),
                        computer_science: checkGds(studentKey.answers.slice(40, 50), answerKeys['08']),
                        russian_lang: checkGds(studentKey.answers.slice(80, 100), answerKeys['11']),
                    }
                    if (student.languageGroup == 'kaz') {
                        resultObj.kazakh_lang = checkGds(studentKey.answers.slice(50, 70), answerKeys['09_kaz'])
                        resultObj.literature = checkGds(studentKey.answers.slice(70, 80), answerKeys['24_kaz'])
                    } else {
                        resultObj.kazakh_lang = checkGds(studentKey.answers.slice(50, 70), answerKeys['09_rus'])
                        resultObj.literature = checkGds(studentKey.answers.slice(70, 80), answerKeys['24_rus'])
                    }
                    resultObj.day_1_total = resultObj.physics.points + resultObj.world_history.points + resultObj.biology.points + resultObj.computer_science.points + resultObj.russian_lang.points + resultObj.kazakh_lang.points + resultObj.literature.points
                    resultObj.total = resultObj.physics.points + resultObj.world_history.points + resultObj.biology.points + resultObj.computer_science.points + resultObj.russian_lang.points + resultObj.kazakh_lang.points + resultObj.literature.points
                } else {
                    resultObj = {
                        academicYear: academicYear,
                        quarter: btsNo,
                        grade: student.grade,
                        division: student.division,
                        variant_day_1: variant,
                        studentId: student.studentId,
                        schoolId: student.schoolId,
                        name: student.name,
                        surname: student.surname,
                        physics: checkGds(studentKey.answers.slice(0, 20), answerKeys['02']),
                        chemistry: checkGds(studentKey.answers.slice(20, 40), answerKeys['03']),
                        biology: checkGds(studentKey.answers.slice(40, 60), answerKeys['04']),
                        computer_science: checkGds(studentKey.answers.slice(60, 70), answerKeys['08']),
                        russian_lang: checkGds(studentKey.answers.slice(90, 100), answerKeys['11']),
                    }
                    if (student.languageGroup == 'kaz') {
                        resultObj.literature = checkGds(studentKey.answers.slice(80, 90), answerKeys['24_kaz'])
                        resultObj.kazakh_lang = checkGds(studentKey.answers.slice(70, 80), answerKeys['09_kaz'])

                    } else {
                        resultObj.literature = checkGds(studentKey.answers.slice(80, 90), answerKeys['24_rus'])
                        resultObj.kazakh_lang = checkGds(studentKey.answers.slice(70, 80), answerKeys['09_rus'])
                    }
                    resultObj.day_1_total = resultObj.physics.points + resultObj.chemistry.points + resultObj.biology.points + resultObj.computer_science.points + resultObj.russian_lang.points + resultObj.kazakh_lang.points + resultObj.literature.points
                    resultObj.total = resultObj.physics.points + resultObj.chemistry.points + resultObj.biology.points + resultObj.computer_science.points + resultObj.russian_lang.points + resultObj.kazakh_lang.points + resultObj.literature.points
                }
            } else if (day == '2') {
                if (student.grade == '7') {
                    resultObj = {
                        academicYear: academicYear,
                        quarter: btsNo,
                        grade: student.grade,
                        division: student.division,
                        variant_day_2: variant,
                        studentId: student.studentId,
                        schoolId: student.schoolId,
                        name: student.name,
                        surname: student.surname,
                        algebra: checkGds(studentKey.answers.slice(0, 15), answerKeys['01']),
                        geometry: checkGds(studentKey.answers.slice(15, 20), answerKeys['13']),
                        english_lang: checkGds(studentKey.answers.slice(20, 50), answerKeys['05']),
                        turkish_lang: checkGds(studentKey.answers.slice(50, 80), answerKeys['10']),
                        kazakh_history: checkGds(studentKey.answers.slice(80, 90), answerKeys['12']),
                        geography: checkGds(studentKey.answers.slice(90, 100), answerKeys['06'])
                    }
                    resultObj.day_2_total = resultObj.algebra.points + resultObj.geometry.points + resultObj.english_lang.points + resultObj.turkish_lang.points + resultObj.kazakh_history.points + resultObj.geography.points
                    resultObj.total = resultObj.algebra.points + resultObj.geometry.points + resultObj.english_lang.points + resultObj.turkish_lang.points + resultObj.kazakh_history.points + resultObj.geography.points
                } else {
                    resultObj = {
                        academicYear: academicYear,
                        quarter: btsNo,
                        grade: student.grade,
                        division: student.division,
                        variant_day_2: variant,
                        studentId: student.studentId,
                        schoolId: student.schoolId,
                        name: student.name,
                        surname: student.surname,
                        algebra: checkGds(studentKey.answers.slice(0, 20), answerKeys['01']),
                        geometry: checkGds(studentKey.answers.slice(20, 30), answerKeys['13']),
                        english_lang: checkGds(studentKey.answers.slice(30, 50), answerKeys['05']),
                        turkish_lang: checkGds(studentKey.answers.slice(50, 70), answerKeys['10']),
                        kazakh_history: checkGds(studentKey.answers.slice(70, 90), answerKeys['12']),
                        geography: checkGds(studentKey.answers.slice(90, 100), answerKeys['06']),
                    }
                    resultObj.day_2_total = resultObj.algebra.points + resultObj.geometry.points + resultObj.english_lang.points + resultObj.turkish_lang.points + resultObj.kazakh_history.points + resultObj.geography.points
                    resultObj.total = resultObj.algebra.points + resultObj.geometry.points + resultObj.english_lang.points + resultObj.turkish_lang.points + resultObj.kazakh_history.points + resultObj.geography.points
                }
            }
            studentResults = BtsResults.findOne({
                academicYear: resultObj.academicYear,
                quarter: resultObj.quarter,
                studentId: resultObj.studentId,
            })
            if (studentResults == undefined) {
                BtsResults.insert(resultObj)
            } else {
                if (day == '1') {
                    var physics = studentResults.physics ? studentResults.physics.points : 0,
                        biology = studentResults.biology ? studentResults.biology.points : 0,
                        computer_science = studentResults.computer_science ? studentResults.computer_science.points : 0,
                        russian_lang = studentResults.computer_science ? studentResults.russian_lang.points : 0,
                        kazakh_lang = studentResults.kazakh_lang ? studentResults.kazakh_lang.points : 0,
                        literature = studentResults.literature ? studentResults.literature.points : 0;
                    var day_1_total = physics + biology + computer_science + russian_lang + kazakh_lang + literature;
                    if (studentResults.chemistry)
                        day_1_total += studentResults.chemistry.points
                    if (studentResults.world_history)
                        day_1_total += studentResults.world_history.points
                    resultObj.total = (studentResults.total - day_1_total) + resultObj.total
                } else {
                    var algebra = studentResults.algebra ? studentResults.algebra.points : 0,
                        geometry = studentResults.geometry ? studentResults.geometry.points : 0,
                        english_lang = studentResults.english_lang ? studentResults.english_lang.points : 0,
                        turkish_lang = studentResults.turkish_lang ? studentResults.turkish_lang.points : 0,
                        kazakh_history = studentResults.kazakh_history ? studentResults.kazakh_history.points : 0,
                        geography = studentResults.geography ? studentResults.geography.points : 0;
                    day_2_total = algebra + geometry + english_lang + turkish_lang + kazakh_history + geography;
                    resultObj.total = (studentResults.total - day_2_total) + resultObj.total
                }
                BtsResults.update(studentResults, {
                    $set: resultObj
                })
            }

        })

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
    },
    'BtsResults.calculateObjectives': function (quarter) {
        var schools = Schools.find().fetch()
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            _.each(schools, function (school) {
                Modules.server.bts.calculateSchoolObjectives(quarter, school.schoolId)
            })
            Modules.server.bts.calculateGeneralObjectives(quarter)
            Modules.server.bts.calculateObjectiveStats(quarter)
        }
    },
    'ObjectivesList.insert': function (obj) {
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            var academicYear = AcademicYears.findOne({
                now: true
            }).academicYear
            obj.academicYear = academicYear
            var sameObjective = BtsObjectivesList.findOne({
                academicYear: academicYear,
                quarter: obj.quarter,
                grade: obj.grade,
                objective: obj.objective
            })
            if (sameObjective)
                BtsObjectivesList.update({
                    _id: sameObjective._id
                }, {
                    $set: {
                        variant1: obj.variant1,
                        questions1: obj.questions1,
                        variant2: obj.variant2,
                        questions2: obj.questions2
                    }
                })
            else
                BtsObjectivesList.insert(obj)

        }
    },
    'ObjectivesList.upload':function(rows) {
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            var academicYear = AcademicYears.findOne({
                now: true
            }).academicYear
            _.each(rows,function(row){
                row.academicYear = academicYear
            var sameObjective = BtsObjectivesList.findOne({
                academicYear: academicYear,
                quarter: row.quarter,
                grade: row.grade,
                objective: row.objective
            })
            if (sameObjective)
                BtsObjectivesList.update({
                    _id: sameObjective._id
                }, {
                    $set: {
                        variant1: row.variant1,
                        questions1: row.questions1,
                        variant2: row.variant2,
                        questions2: row.questions2
                    }
                })
            else
                BtsObjectivesList.insert(row)
            })
        }
    },
    'BtsObjectivesList.remove': function (_id) {
        if (Roles.userIsInRole(this.userId, ['admin']))
            BtsObjectivesList.remove({
                _id: _id
            })
    },
    
    'importObjectives': function(rows) {
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            _.each(rows,function(r) {
                LessonObjectives.insert(r)
            })
        }
    }
});
