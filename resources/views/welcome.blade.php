<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
            <script src="https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js"></script>
           <script src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.js"></script>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>

     <form style="padding: 20px;" method="POST" action="{{route('addImage')}}" enctype="multipart/form-data">
              <input type="hidden" name="_token" value="{{csrf_token()}}">
         <input type="file" name="image">

            <button type="submit" class="btn btn-primary">ثبت نام </button>

           </form>


     <a href="{{route('googleLogin')}}" class="btn btn-primary">Google +</a>

        <div class="flex-center position-ref full-height" id="post">


            <div class="content">
                <div class="title m-b-md">
                    Laravel
                </div>

                <div class="links">
                    <a href="https://laravel.com/docs">Documentation</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div>
            </div>
        </div>

        <script>

//            new Vue({
//
//                el:'#post',
//                data:{
//                    level:''
//                },
//                created:function () {
//                    vm = this
////            var url = 'http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=CE19708F198D1C59D03BA98664831BEF&steamid=76561198362786552';
//
//                    axios.post('http://test.charesh.ir/api/update-data',{ 'url':'localhost','period':'10','ip':'192.168.1.2','scroll':0,'likes':2,'dislikes':4}).then(function (response) {
//
//                        console.log(response.data)
//                    })
//
//                    axios.post('http://test.charesh.ir/api/get-data',{ 'url':'localhost','ip':'192.168.1.2999','httpref':'google.com'}).then(function (response) {
//
//                        console.log(response.data)
//                    })
//
////
//                }
//            })

        </script>

    </body>
</html>
