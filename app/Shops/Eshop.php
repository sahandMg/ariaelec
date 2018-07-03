<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/20/18
 * Time: 11:55 PM
 */

namespace App\Shops;

use Symfony\Component\DomCrawler\Crawler;

class Eshop
{

    public static function crawlSite($response,$keyword)
    {
        $part = $response->filterXPath('//a[contains(@class,"product-name")]')->extract(array('_text'));
        $price = $response->filterXPath('//span[contains(@itemprop, "price")]')->extract(array('_text'));

        $num = count($part);
        for($p=0;$p<$num;$p++){

            if(!isset($price[$p])){
                $price[$p] = 0;

            }

                if($price[$p] == 0 || stripos($part[$p],$keyword) === false){
                    unset($part[$p]);
                    unset($price[$p]);

                }
        }

        return self::resetArray($part,$price);

    }


    private static function resetArray($part,$price){

        $part = array_values($part);
        $price = array_values($price);

        for($p=0;$p<count($part);$p++){

            $out[$p] = ['shop'=>'Eshop',"part"=>$part[$p],"price"=>$price[$p]];
        }

        if (!isset($out)) {
            return ['shop' => 'Eshop', "part" => 'یافت نشد'];
        } else {

            return $out;
        }
    }
}