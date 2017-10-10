import { upload } from "../../modules/kbo/upload";
import { calculateRating } from "../../modules/kbo/rating";

Meteor.methods({
    'KboResults.Upload':function(academicYear,kboNo,rows){
        kbo = Configs.findOne({
            _id: 'kboUpload'
        });
        if (kbo[kboNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'КБО жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')

        if (!Roles.userIsInRole(this.userId,"school"))
            throw new Meteor.Error('access-denied', 'Access denied!')


        let school = Schools.findOne({
            userId: this.userId
        })

        if (school) {
            upload(academicYear,kboNo,school.schoolId,rows)
            calculateRating(academicYear,kboNo,school.schoolId)
        }

    }
});