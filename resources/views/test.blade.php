<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
                <script src="https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js"></script>
               <script src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.js"></script>
                <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>Document</title>
</head>
<body>
<div id="app">
 <form style="padding: 20px;" method="POST" action="{{route('addImage')}}" enctype="multipart/form-data">
          <input type="hidden" name="_token" value="{{csrf_token()}}">
       <div class="form-group">
         <label for="name">نام کاربری</label>
         <input name="image" type="file"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="نام کاربری خود را وارد کنید">
       </div>


     <a href="{{url('login/google')}}">Google+</a>

     <button type="submit" class="btn btn-primary">ثبت نام </button>

       </form>

 <div class="form-group">
     <label for="name">نام کاربری</label>
     <input name="search" v-model="searcher" @keyup="find" type="search"  class="form-control" id="exampleInputEmail1"  placeholder="find your part">
     <button type="button"   class="btn btn-primary">Find</button>
 </div>

    {{--<ul>--}}
{{--@foreach($parts as $part)--}}

    {{--<li>{{$part}}</li>--}}
{{--@endforeach--}}
    {{--</ul>--}}

    <div>Image</div>
    <img src="{{'storage/photos/myImage.jpg'}}" alt="">
    
 {{--<div>--}}
     {{--<ul>--}}
         {{--<li v-for="part in parts">@{{part.component.name}}</li>--}}
     {{--</ul>--}}
 {{--</div>--}}
</div>
 <script>

     new Vue({

         el:'#app',
         data:{
            searcher:'',
             parts:['']
         },
         methods:{
             find:function () {
                vm = this;
                 axios.get('api/search?name='+vm.searcher).then(function (response) {
                     vm.parts = response.data
                     console.log(response.data)
                 })
             }
         }
     })
 </script>
</body>
</html>