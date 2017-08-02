import { Meteor } from 'meteor/meteor'

Meteor.methods({
    combineTat() {
        let results = []
        let teachers = Teachers.find({position:'teacher'}).fetch()
        _.each(teachers,(teacher) => {
            let tat1 = TatResults.findOne({academicYear:'2015-2016',tatNo:'1',teacherId:teacher.teacherId,subjectId:teacher.subjectId})
            let tat2 = TatResults.findOne({academicYear:'2015-2016',tatNo:'2',teacherId:teacher.teacherId,subjectId:teacher.subjectId})
            let tat3 = TatResults.findOne({academicYear:'2016-2017',tatNo:'1',teacherId:teacher.teacherId,subjectId:teacher.subjectId})
            let tat4 = TatResults.findOne({academicYear:'2016-2017',tatNo:'2',teacherId:teacher.teacherId,subjectId:teacher.subjectId})
            let subjectName = Subjects.findOne({subjectId:teacher.subjectId})

            let resObj = {
                schoolId:teacher.schoolId,
                teacherId: teacher.teacherId,
                name: teacher.name,
                surname: teacher.surname,
                branch: subjectName ? subjectName.name_kz : teacher.subjectId,
                tat1: tat1 ? tat1.result : 0,
                tat2: tat2 ? tat2.result : 0,
                tat3: tat3 ? tat3.result : 0,
                tat4: tat4 ? tat4.result : 0,
            }
            TatCombinedRes.insert(resObj)
            console.log('pushing results')
        })
    }
})
