
Template.allbooks.helpers({
books: function(){
    var title = [];
    var book = Books.find().fetch();

    for(var i in book){
        title.push({ title: book[i].title,
                    picture: "http://covers.openlibrary.org/w/id/" + book[i].bookurl + "-M.jpg",
                    author: book[i].author,
                    createdBy: book[i].createdBy,
                    _id: book[i]._id
        });
    }
    return title;
}

});

Template.allbooks.events({
"click .selectBook": function(event){
    //var index = event.currentTarget.id;
    var username = Meteor.user().username;
    var user = Meteor.userId();
    if(user != this.createdBy){
        Books.update({_id: this._id}, {$set:{requestor: username}});
        //console.log(this);
    } else {
        alert("You Can't Trade for Your Own Book!");
    }
}
});
