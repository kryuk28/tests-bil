Modules = {}
Modules.server = {}
Modules.server.tat = {}

Modules.server.tat.calculateRating = function (tatNo,schoolId) {
    academicYear = AcademicYears.findOne({now:true}).academicYear
    generalRating = {
        academicYear:academicYear,
        schoolId:schoolId,
        tatNo:tatNo,
        subjectId:'all',
        total:0
    }
    var weight = {
    }
    var keys = TatAnswerKeys.find({academicYear:academicYear,tatNo:tatNo}).fetch()
    _.each(keys,function(key){
        weight[key.subjectId] = key.keys.length
    })
    var results = TatResults.find({academicYear:academicYear,schoolId:schoolId,tatNo:tatNo,position:{$ne:'intern'}}).fetch()
    _.each(results,function(result) {
        generalRating.total += 100*result.result/weight[result.subjectId]
    })

    generalRating.total = +(generalRating.total/results.length).toFixed(2)
    genRatingInDb = TatRating.findOne({academicYear:academicYear,tatNo:tatNo,schoolId:schoolId,subjectId:'all'})
    if (genRatingInDb)
        TatRating.update({_id:genRatingInDb._id},{$set:{total:generalRating.total}})
    else {
        TatRating.insert(generalRating)
    }

}

Modules.server.tat.calculateRanking = function (tatNo) {
    var subjects = ['04','03','02','01','08','10','09','11','06','12','05']
    academicYear = AcademicYears.findOne({now:true}).academicYear;

    _.each(subjects, function(subject) {
        var records = TatResults.find({academicYear:academicYear,tatNo:tatNo,position:{$ne:'intern'},subjectId:subject},{sort:{result:-1}}).fetch()
        order = 1;
        counter=1;
        current = records[0];
        _.each(records,function(obj) {
            if (obj.result==current.result)
                TatResults.update({_id:obj._id},{$set:{rank:order+'/'+records.length}})
            else {
                order=counter
                TatResults.update({_id:obj._id},{$set:{rank:order+'/'+records.length}})
                current = obj
            }
            counter++
        })
    })
}