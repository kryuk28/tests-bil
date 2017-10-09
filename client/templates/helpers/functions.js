Blaze.registerHelper("schoolName", function(schoolId) {
    return Schools.findOne({schoolId:schoolId}) ? Schools.findOne({schoolId:schoolId}).shortName : undefined
})

Blaze.registerHelper("subjectName", function(subjectId) {
    return Subjects.findOne({subjectId:subjectId}) ? Subjects.findOne({subjectId:subjectId}).name_kz : undefined
})

Blaze.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
})

Blaze.registerHelper("round", function(value,number) {
    return number.toFixed(value)
})

academicYear = new ReactiveVar('2017-2018')
