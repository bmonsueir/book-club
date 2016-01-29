Books = new Mongo.Collection("books");

Template.mybooks.helpers({
books: function(){
    var title = [];
    var user = Meteor.userId();
    var book = Books.find().fetch();
    for(var i in book){
        if(book[i].createdBy == user){
        title.push({ title: book[i].title,
                    picture: "http://covers.openlibrary.org/w/id/" + book[i].bookurl + "-S.jpg",
                    author: book[i].author,
                    genre: book[i].genre,
                    requestor: book[i].requestor,
                    trade: book[i].trade,
                    username: book[i].username,
                    _id: book[i]._id
                });
        }
    }
    //console.log(book);
    return title;
}

});

Template.mybooks.events({
"input #findIt": function(event){
    var title = $('[name=title]').val();
    var titles = [];
    $.getJSON("http://openlibrary.org/search.json?title=" + title, function(result){
        for(var i in result.docs){
            titles.push(result.docs[i].title);
        }

        //console.log(result.docs[0].author_name);
        $(function() {
            $("#findIt").autocomplete({
                source: titles
            });

        });

});
}
});

Template.mybooks.events({
"click .addBook": function(event){
    var user = Meteor.userId();
    var username = Meteor.user().username;
    var title = $('[name=title]').val();
$.getJSON("http://openlibrary.org/search.json?title=" + title, function(result){

    Books.insert({
           createdBy: user,
           username: username,
           title: result.docs[0].title,
           author: result.docs[0].author_name,
           bookurl: result.docs[0].cover_i,
           genre: result.docs[0].subject[0],
           createdAt: new Date() // current time
         });
         //console.log(result.docs[0].title, result.docs[0].author_name, result.docs[0].cover_i, result.docs[0].subject[0] );
    });
}

});
Template.mybooks.helpers({
requested: function(){
    var title = [];
    var username = Meteor.user().username;
    var book = Books.find().fetch();
    for(var i in book){
        //console.log(username, book[i].username);
        if(book[i].requestor == username){
        title.push({ title: book[i].title,
                    image: "http://covers.openlibrary.org/w/id/" + book[i].bookurl + "-S.jpg",
                    requestor: book[i].username,
                    accepted: book[i].accepted
                });
        }
    }
    return title;
}
});

Template.mybooks.events({
    "click .accept": function(event){
            console.log(this._id);
            Books.update({_id: this._id}, {$set:{accepted: "Yes"}});


    }
});
