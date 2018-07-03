<?php

namespace App\Repository;
class Cropper{

// Cropper crops images into 100*100 pix
    public static function crop($request,$img,$size,$time){


        if (null != $request->file('image')) {
            $imgName = $time.'.'.$request->file('image')->getClientOriginalExtension();
            $imgEx = $request->file('image')->getClientOriginalExtension();
//            $imgNameNoEx = basename($request->file('image')->getClientOriginalExtension());
            $imgNameNoEx = $time;
            exec("convert /applications/xampp/xamppfiles/htdocs/ariaelec/public/files/images/$imgName  /applications/xampp/xamppfiles/htdocs/ariaelec/public/files/images/$imgNameNoEx.jpg ");
            $img->update(['image' => $imgNameNoEx.'.jpg']);

            if(public_path('files/images/' . $imgName) != null &&  $imgEx != 'jpg'){

                unlink(public_path('files/images/' . $imgName));

            }
            exec("mogrify  -resize '100x100!' /applications/xampp/xamppfiles/htdocs/ariaelec/public/files/images/$imgNameNoEx.jpg");

        } else {

            $img->update(['image' => 'Blank100_100.png']);
        }




    }
}