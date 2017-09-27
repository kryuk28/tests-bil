import { Meteor } from 'meteor/meteor';

Meteor.methods({
    addTatKey: function(obj) {
        if (Roles.userIsInRole(this.userId,['admin'])) {
            var keyWithSameId = TatAnswerKeys.findOne(obj);
            academ = AcademicYears.findOne({now:true});
            obj.academicYear = academ.academicYear;
            obj.keys = obj.keys.replace(/\s+/g, '');
            if (!keyWithSameId)
                id = TatAnswerKeys.insert(obj);
            else
                throw new Meteor.Error('duplicate-error','Duplicate error!');
        } else {
            throw new Meteor.Error('access-denied','Access denied!');
        }
    }
});
