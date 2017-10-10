import { recheck } from "../../modules/kbo/recheck";

Meteor.methods({
    addKboCourse: function(obj) {
        if (Roles.userIsInRole(this.userId,['admin']))
            KboCourses.insert(obj);
    },
    "KboKeys.Insert": function(obj) {
        if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
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
    "KboKeys.Update": function(id,obj) {
        if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
            sameKey = KboKeys.findOne({_id:id});
            if (sameKey) {
                KboKeys.update({_id:id},{$set:obj})
                //re calculates results and rating for given key and kbo
                recheck(sameKey.academicYear,sameKey.kboNo,sameKey.variant)
            }
        } else {
            throw new Meteor.Error(403, 'Access forbidden');
        }  
    },
    removeKboCourse: function(_id) {
        if (Roles.userIsInRole(this.userId,['admin']))
            KboCourses.remove(_id);
    },
    'SaveKboFinalists': function(grade,subject,finalists) {
        if (isNaN(finalists)) {
            throw new Meteor.Error('not-a-number','Enter proper value.');
        }
        if (Roles.userIsInRole(this.userId,['admin'])) {
            let academicYear = AcademicYears.findOne({now:true}).academicYear;
            KboFinalists.remove({academicYear:academicYear,grade:grade,subjectId:subject});
            let students = Students.find({olympiad:subject,grade:grade}).fetch();
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
            let academicYear = AcademicYears.findOne({now:true}).academicYear;
            let sameRecord = KboFinalists.findOne({academicYear:academicYear,studentId:studentId});
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