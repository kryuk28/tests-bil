userIsAdmin = () => {
    return Roles.userIsInRole(Meteor.userId(),"admin")
}
