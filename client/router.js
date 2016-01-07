Router.configure({
    layoutTemplate:'layout'

});

Router.map(function(){

    this.route('home', {path:'/'});
    this.route('about', {path:'/about'});
    this.route('allbooks', {path:'/allbooks'});
    this.route('mybooks', {path:'/mybooks'});
    this.route('myaccount', {path:'/myaccount'});
    // this.route('mybooks', {
    //     template: 'mybooks',
    //     path:'/mybooks/:_id',
    //     data: function(){
    //         return Books.findOne(this.params._id);
    //     }
    // });

});
