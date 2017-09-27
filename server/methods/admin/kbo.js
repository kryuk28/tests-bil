Meteor.methods({
    addKboCourse: function(obj) {
        if (Roles.userIsInRole(this.userId,['admin']))
            KboCourses.insert(obj);
    },
    addKboKey: function(obj) {
        if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
            obj.academicYear = AcademicYears.findOne({
                now: true
            }).academicYear;
            sameKey = KboKeys.findOne({
                academicYear: obj.academicYear,
                kboNo: obj.kboNo,
                variant: obj.variant
            });
            if (!sameKey) {
                obj.keys = obj.keys.replace(/\s+/g, '');
                id = KboKeys.insert(obj);
                return id;
            } else {
                throw new Meteor.Error(403, 'Duplicate error');
            }
        } else {
            throw new Meteor.Error(403, 'Access forbidden');
        }
    },
    removeKboCourse: function(_id) {
        if (Roles.userIsInRole(this.userId,['admin']))
            KboCourses.remove(_id);
    },
    updateKboRating: function(kboNo) {
        if (!Roles.userIsInRole(this.userId, ['school-manager']))
            throw new Meteor.Error(403, 'You need to login!');
        var academicYear = AcademicYears.findOne({now:true}).academicYear;
        var schoolId = Teachers.findOne({userId:this.userId}).schoolId;
        if (!schoolId)
            throw new Meteor.Error(403, 'No school selected!');
        generalRating = {
            academicYear:academicYear,
            schoolId:schoolId,
            kboNo:kboNo,
            grade:'all',
            total:0
        };
        var subjects = KboCourses.find().fetch();

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
                var results = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade,subjectId:subject.subjectId}).fetch();
                if (results.length!==0) {
                    _.each(results,function(result) {
                        gradeRating[subject.subjectId]+=(100*result.result)/subject.amount;
                        gradeRating.total+= (100*result.result)/subject.amount;
                    });
                gradeRating[subject.subjectId]=(gradeRating[subject.subjectId]/results.length).toFixed(2);
                } else {
                    gradeRating[subject.subjectId] = 0;
                }
            });
            var gradeStudents = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade}).count();
            if (gradeStudents!==0) {
                gradeRating.total = (gradeRating.total/gradeStudents).toFixed(2);
                var sameRating = KboRating.findOne({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade});
                if (sameRating===undefined)
                    KboRating.insert(gradeRating);
                else {
                    KboRating.update(sameRating,{$set:gradeRating});
                }
            }
        });

        _.each(subjects,function(subject) {
            generalRating[subject.subjectId] = 0;
            var results = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,subjectId:subject.subjectId}).fetch();
            if (results.length!==0) {
                _.each(results,function(result) {
                    generalRating[subject.subjectId]+=(100*result.result)/subject.amount;
                    generalRating.total+=(100*result.result)/subject.amount;
                });
                generalRating[subject.subjectId]=(generalRating[subject.subjectId]/results.length).toFixed(2);
            }
        });
        var generalStudents = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo}).count();
        if (generalStudents!==0) {
            generalRating.total = (generalRating.total/generalStudents).toFixed(2);
            var sameRating = KboRating.findOne({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:'all'});
            if (sameRating===undefined)
                KboRating.insert(generalRating);
            else {
                KboRating.update(sameRating,{$set:generalRating});
            }
        }
    },

    'SaveKboFinalists': function(grade,subject,finalists) {
        if (isNaN(finalists)) {
            throw new Meteor.Error('not-a-number','Enter proper value.');
        }
        if (Roles.userIsInRole(this.userId,['admin'])) {
            var academicYear = AcademicYears.findOne({now:true}).academicYear;
            KboFinalists.remove({academicYear:academicYear,grade:grade,subjectId:subject});
            var students = Students.find({olympiad:subject,grade:grade}).fetch();
            _.each(students, function(student){
                kbo1 = KboResults.findOne({kboNo:'1',studentId:student.studentId,academicYear:academicYear,subjectId:subject});
                kbo2 = KboResults.findOne({kboNo:'2',studentId:student.studentId,academicYear:academicYear,subjectId:subject});
                kbo3 = KboResults.findOne({kboNo:'3',studentId:student.studentId,academicYear:academicYear,subjectId:subject});
                student.kbo1=kbo1?kbo1.result:0;
                student.kbo2=kbo2?kbo2.result:0;
                student.kbo3=kbo3?kbo3.result:0;
                student.final = (student.kbo1*0.1+student.kbo2*0.35+student.kbo3*0.55).toFixed(2);

                student.school = Schools.findOne({schoolId:student.schoolId}).shortName || '';
                student.subject = KboCourses.findOne({subjectId:student.olympiad}).name || '';
            });
            students = students.sort(function(a,b){
                return b.final-a.final;
            });
            students = students.slice(0,finalists);
            _.each(students,function(student) {
                KboFinalists.insert({studentId:student.studentId,academicYear:academicYear,grade:grade,subjectId:subject,schoolId:student.schoolId});
            });
        } else {
            throw new Meteor.Error('access-denied','You do not have a permission.');
        }

    },
    'KboFinalists.update': function(studentId,schoolId,grade,subjectId) {
        if (Roles.userIsInRole(this.userId,['admin'])) {
            var academicYear = AcademicYears.findOne({now:true}).academicYear;
            var sameRecord = KboFinalists.findOne({academicYear:academicYear,studentId:studentId});
            if (sameRecord)
                KboFinalists.remove({academicYear:academicYear,studentId:studentId,grade:grade,subjectId:subjectId});
            else {
                KboFinalists.insert({academicYear:academicYear,grade:grade,studentId:studentId,subjectId:subjectId,schoolId:schoolId});
            }
        } else {
            throw new Meteor.Error('access-denied','You do not have a permission.');
        }
    }
});