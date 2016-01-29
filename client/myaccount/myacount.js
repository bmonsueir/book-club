Template.myaccount.events({
"submit form": function(event){
    event.preventDefault();

var user = Meteor.userId();
var username = Meteor.user().username;
var firstname = event.target.firstname.value;
if(!firstname) firstname = Meteor.user().profile.firstname;
var lastname = event.target.lastname.value;
if(!lastname) lastname = Meteor.user().profile.lastname;
var city = event.target.city.value;
if(!city) city = Meteor.user().profile.city;
var state = event.target.state.value;
if(!state) state = Meteor.user().profile.state;
Meteor.users.update(user,{$set:{
                "profile.firstname": firstname,
                "profile.lastname": lastname,
                "profile.city": city,
                "profile.state": state
            }});
//console.log(user, username, firstname, lastname, city, state);
}
});
Template.myaccount.helpers({
first: function(){
    if(Meteor.user())
        return Meteor.user().profile.firstname;
}
});
Template.myaccount.helpers({
last: function(){
    if(Meteor.user())
     return Meteor.user().profile.lastname;
}
});
Template.myaccount.helpers({
city: function(){
    if(Meteor.user())
        return Meteor.user().profile.city;
}
});
Template.myaccount.helpers({
state: function(){
    if(Meteor.user())
        return Meteor.user().profile.state;
}
});
