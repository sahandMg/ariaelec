<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/21/18
 * Time: 4:52 PM
 */

namespace App\Shops;


use Symfony\Component\DomCrawler\Crawler;

class Electronic724
{

    public static function crawlSite($response,$keyword)
    {
        $price = $response->filterXPath('//div[contains(@class,"pi-price")]');
        $part = $response->filterXPath('//div[contains(@class,"product-item")]');
        $price = $price->each(
            function (Crawler $node, $i) {
                $first = $node->children()->first()->text();
                return $first;
            });

        $part = $part->each(
            function (Crawler $node, $i) {
                $first = $node->children()->eq(1)->text();
                return $first;
            });

        $part = str_replace('  ', '', $part);
        $part = str_replace("\r\n", '', $part);
        $num = count($part);
        for($p=0;$p<$num;$p++){

            if(!isset($price[$p])){
                $price[$p] = 0;
            }


            if(preg_match('/[0-9]/', $price[$p]) == 0 || stripos($part[$p],$keyword) === false){
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

            $out[$p] = ['shop'=>'Elecrtonic724',"part"=>$part[$p],"price"=>$price[$p]];
        }

        if (!isset($out)) {
            return ['shop' => 'Elecrtonic724', "part" => 'یافت نشد'];
        } else {

            return $out;
        }
    }

}