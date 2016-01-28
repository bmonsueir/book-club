Books = new Mongo.Collection("books");

Template.mybooks.helpers({
books: function(){
    var title = [];
    var user = Meteor.userId();
    var book = Books.find().fetch({createdBy: user});
    // for(var i in book){
    //     title.push(book[i].title);
    // }

    for(var i in book){
        title.push({ title: book[i].title,
                    picture: "http://covers.openlibrary.org/w/id/" + book[i].bookurl + "-S.jpg",
                    author: book[i].author,
                    genre: book[i].genre
        });
    }
    console.log(title);
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
            console.log(result);
        });

});
}
});

Template.mybooks.events({
"click .addBook": function(event){
    var user = Meteor.userId();
    var title = $('[name=title]').val();
$.getJSON("http://openlibrary.org/search.json?title=" + title, function(result){

    Books.insert({
           createdBy: user,
           title: result.docs[0].title,
           author: result.docs[0].author_name,
           bookurl: result.docs[0].cover_i,
           //review: result.docs[i].review,
           genre: result.docs[0].subject[0],
           createdAt: new Date() // current time
         });
         console.log(result.docs[0].title, result.docs[0].author_name, result.docs[0].cover_i, result.docs[0].subject[0] );
    });
}

});
