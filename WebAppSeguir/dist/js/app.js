
(function ($) {

    var app = $.sammy('#app', function () {

        this.use('Template');

        var current_user = false;
        //var login = sessionStorage.getItem("Chave").toString();
        var login = true;

        var usuario = sessionStorage.getItem("Chave");
        var objUser = JSON.parse(usuario);
        //objUser = JSON.parse(usuario);
       

        $("#userlogado").text(objUser.usu_tx_login);



        //if ((usuario == "undefined") || (usuario == null)) {
        //    login = false;
        //}


        function checkLoggedIn(callback) {
            // /session returns a JSON representation of the logged in user
            // or an empty object
            
            if (!current_user) {
                //$.getJSON('/session', function (json) {
                //    if (json.login) {
                //        // show the user as logged in
                //        current_user = json;
                //        // execute the route path
                //        callback();
                //    } else {
                //        // show the user as not logged in
                //        current_user = false;
                //        // the context of aroundFilters is an EventContext
                //        this.redirect('#/login');
                //    }
                //});
                if (login == true) {
                    current_user = true;
                    callback();
                } else {
                    current_user = false;
                    //this.redirect('#/login');
                    alert('Por favor, efetue o login.');
                    location.href = 'logout.html';
                      
                }
            } else {
                // execute the route path
                  callback();
            }
        };

        this.around(checkLoggedIn);




    //this.around(function (callback) {
    //  //alert('****');
    //  var context = this;
    //  //this.load('data/articles.json')
    //  //    .then(function(items) {
    //  //      context.items = items;
    //  //    })
    //  //    .then(callback);
    //});

      //$("#btn_login").click(function () {
      //    this.redirect('#/login');
      //});

        //this.get("", function () {
        //    this.app.runRoute("get", "#login");
        //});

    this.get('#/', function(context) {
      context.app.swap('');
      $.each(this.items, function(i, item) {
        context.render('templates/article.template', {id: i, item: item})
               .appendTo(context.$element());
      });
    });

    this.get('#/home/', function (context) {
        this.redirect('#/login');
    });

    this.get('#/login/', function (context) {
        alert('entrou no get login');
        var str = location.href.toLowerCase();
        context.app.swap('');
        context.render('templates/login.template', {})
            .appendTo(context.$element());
    });

    this.get('#/about/', function(context) {
        var str=location.href.toLowerCase();
        context.app.swap('');
        context.render('templates/about.template', {})
               .appendTo(context.$element());
    });

    this.get('#/motoristas/', function (context) {
        var str = location.href.toLowerCase();
        context.app.swap('');
        context.render('templates/datatable.template', {})
            .appendTo(context.$element());
    });

    this.get('#/article/:id', function(context) {
      this.item = this.items[this.params['id']];
      if (!this.item) { return this.notFound(); }
      this.partial('templates/article-detail.template');
    });


    this.before('.*', function() {

        var hash = document.location.hash;
        $("nav").find("a").removeClass("current");
        $("nav").find("a[href='"+hash+"']").addClass("current");
    });

  });

   $(function () {
     app.run('#/motoristas/');
  });


})(jQuery);
