adminRequired = () => {
    if (!Roles.userIsInRole(this.userId,'admin'))
        throw Meteor.Error('auth-error','Admin rights required.')
}
