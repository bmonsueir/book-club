Template.allbooks.helpers({
books: function(){
    var title = [];
    var book = Books.find().fetch();

    for(var i in book){
        title.push({ title: book[i].title,
                    picture: "http://covers.openlibrary.org/w/id/" + book[i].bookurl + "-M.jpg",
                    author: book[i].author
        });
    }
    return title;
}

});
