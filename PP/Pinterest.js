var loggedIn=0;
var pinUrl="";
var embedCode="";

function pinterest(){

    console.log(loggedIn);
    if(loggedIn==0){
        
        console.log('starting pinterest login');

        window.pAsyncInit = function() {
            initPinterest();

            //login
            PDK.login({ scope : 'read_relationships,read_public' }, function(response){
                if (!response || response.error) {
                  console.log('Error occurred logging in with Pinterest');
                } else {
                    loggedIn=1;
                    console.log('logged in to Pinterest');
                    console.log(loggedIn);
                    //console.log(JSON.stringify(response));
                }

                toggleLoginButtonState();

                getBoardInfo();

            });
            //end login
        };

        addPinterestScript();
    }
    else{
     pinterestLogout();   
    }
}

function initPinterest(){
    console.log('initiating PDK');
    PDK.init({
            appId: "4852715001519025313",
            cookie: true
        });
    console.log('completed initiating PDK');
}

function getBoardInfo(){
    //console.log('here getting info');
    //get board info
    var pins = [];
    
    /*$("#pins").ajaxStart(function(){
    $(this).show();
    });
    $("#pins").ajaxStop(function(){
    $(this).show();
    });*/
    
    PDK.request('/v1/me/', function (response) {
        if (!response || response.error) {
            alert('Error occurred');
          } else {
            //console.log(JSON.stringify(response));
            //console.log('Got info from Pinterest');
              
            /*$.get("https://api.pinterest.com/v1/me/pins?access_token="+PDK.getSession().accessToken+"&limit=3",
                  function(data) {
                $.each(data.data, function(k, v) {
                    //Pin Creator Name
                    pinUrl = data.data[k].url;
                    $("#pins").append(getPinEmbedUrl());

                });*/
                
                var resp = $.ajax({url: "https://api.pinterest.com/v1/me/pins?access_token="+PDK.getSession().accessToken+"&limit=3",
                                   cache: false,
                                   success: function (data) {
                                       $.each(data.data, function(k, v) {
                                           console.log(data.data[k].id);
                                           pinId = data.data[k].id;
                                           embedCode += "<div>" + pinId + "<\div><br \>";
                                       });
                                       $("#pins").append(embedCode);
                                   }
                                  });
            }
    });
              
}

function addPinterestScript(){
 (function(d, s, id){
        var js, pjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://assets.pinterest.com/sdk/sdk.js";
        pjs.parentNode.insertBefore(js, pjs);
    }(document, 'script', 'pinterest-jssdk'));   
}

function toggleLoginButtonState(){
    if(loggedIn){
        console.log('changing button text to Logout');
        $('#login_btn span').text('Logout');
        $('#login_btn').width("50px");
    }
    else {
        console.log('changing button text to Login');
        $('#login_btn span').text('Login with Pinterest');
        $('#login_btn').width("150px");
    }
}

function pinterestLogout(){
    PDK.logout();
    loggedIn=0;
    console.log(loggedIn);
    toggleLoginButtonState();
    $("#me").text("");
    $("#boards").text("");
    $("#pins").text("");
}

function getPinEmbedUrl(){
    var a = "<a data-pin-do=\"embedPin\" href=\"" + pinUrl + "\"></a>";
    console.log(a);
    return a;
}

