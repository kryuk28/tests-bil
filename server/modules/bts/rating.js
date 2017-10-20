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

        totalRating.algebra += (gradeRating.algebra || 0) / records.length
        totalRating.geometry += (gradeRating.geometry || 0) / records.length
        totalRating.computer += (gradeRating.computer || 0) / records.length
        totalRating.turkish += (gradeRating.turkish || 0) / records.length
        totalRating.world_history += (gradeRating.world_history || 0) / records.length
        totalRating.kazakh_history += (gradeRating.kazakh_history || 0) / records.length
        totalRating.geography += (gradeRating.geography || 0) / records.length
        totalRating.physics += (gradeRating.physics || 0) / records.length
        totalRating.chemistry += (gradeRating.chemistry || 0) / records.length
        totalRating.biology += (gradeRating.biology || 0) / records.length
        totalRating.english += (gradeRating.english || 0) / records.length
        totalRating.kazakh += (gradeRating.kazakh || 0) / records.length
        totalRating.kazakh_literature += (gradeRating.kazakh_literature || 0) / records.length
        totalRating.russian += (gradeRating.russian || 0) / records.length
        totalRating.total += (gradeRating.total || 0) / records.length
    })

    // insert total rating to db

    
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

    return ratingObj

}
