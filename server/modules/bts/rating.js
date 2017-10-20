export const calculateRating = (academicYear,btsNo,schoolId) => {
    //calculated bts rating here
    let grades = ["7","8","9","10"]

    let totalRating = {
        academicYear:academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: "all",
        // day 2
        algebra: 0,
        geometry: 0,
        computer: 0,
        turkish: 0,
        world_history: 0,
        kazakh_history: 0,
        geography: 0,
        //day1
        physics: 0,
        chemistry: 0,
        biology: 0,
        english: 0,
        kazakh: 0,
        kazakh_literature: 0,
        russian: 0,
        total: 0
    }
    _.each(grades,(grade) => {
        let gradeRating = calculateBtsRatingForGrade(academicYear,btsNo,schoolId,grade)

        totalRating.algebra += (gradeRating.algebra || 0) / 4
        totalRating.geometry += (gradeRating.geometry || 0) / 4
        totalRating.computer += (gradeRating.computer || 0) / 4
        totalRating.turkish += (gradeRating.turkish || 0) / 4
        totalRating.world_history += (gradeRating.world_history || 0) / 4
        totalRating.kazakh_history += (gradeRating.kazakh_history || 0) / 4
        totalRating.geography += (gradeRating.geography || 0) / 4
        totalRating.physics += (gradeRating.physics || 0) / 4
        totalRating.chemistry += (gradeRating.chemistry || 0) / 4
        totalRating.biology += (gradeRating.biology || 0) / 4
        totalRating.english += (gradeRating.english || 0) / 4
        totalRating.kazakh += (gradeRating.kazakh || 0) / 4
        totalRating.kazakh_literature += (gradeRating.kazakh_literature || 0) / 4
        totalRating.russian += (gradeRating.russian || 0) / 4
        totalRating.total += (gradeRating.total || 0) / 4
    })

    // insert total rating to db
    var sameSchoolRating = BtsRatings.findOne({
        btsNo: btsNo,
        schoolId: schoolId,
        academicYear: academicYear,
        grade: 'all'
    })

    if (sameSchoolRating) {
        BtsRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
    } else {
        BtsRatings.insert(totalRating)
    }

}

calculateBtsRatingForGrade = (academicYear,btsNo,schoolId,grade) => {
    let ratingObj = {
        academicYear:academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: grade,
        // day 2
        algebra: 0,
        geometry: 0,
        computer: 0,
        turkish: 0,
        world_history: 0,
        kazakh_history: 0,
        geography: 0,
        //day1
        physics: 0,
        chemistry: 0,
        biology: 0,
        english: 0,
        kazakh: 0,
        kazakh_literature: 0,
        russian: 0,
        total: 0
    }

    let records = BtsResults.find({academicYear:academicYear,btsNo:btsNo,grade:grade,schoolId:schoolId}).fetch()

    _.each(records,(record) => {
        ratingObj.algebra += (record.algebra || 0) / records.length
        ratingObj.geometry += (record.geometry || 0) / records.length
        ratingObj.computer += (record.computer || 0) / records.length
        ratingObj.turkish += (record.turkish || 0) / records.length
        ratingObj.world_history += (record.world_history || 0) / records.length
        ratingObj.kazakh_history += (record.kazakh_history || 0) / records.length
        ratingObj.geography += (record.geography || 0) / records.length
        ratingObj.physics += (record.physics || 0) / records.length
        ratingObj.chemistry += (record.chemistry || 0) / records.length
        ratingObj.biology += (record.biology || 0) / records.length
        ratingObj.english += (record.english || 0) / records.length
        ratingObj.kazakh += (record.kazakh || 0) / records.length
        ratingObj.kazakh_literature += (record.kazakh_literature || 0) / records.length
        ratingObj.russian += (record.russian || 0) / records.length
        ratingObj.total += (record.total || 0) / records.length
    })

    // insert rating to db
    var sameRating = BtsRatings.findOne({
        btsNo: btsNo,
        academicYear: academicYear,
        schoolId: schoolId,
        grade: grade
    })
    if (!sameRating)
        BtsRatings.insert(ratingObj)
    else {
        BtsRatings.update({_id:sameRating._id}, {
            $set: ratingObj
        })
    }

    return ratingObj

}
