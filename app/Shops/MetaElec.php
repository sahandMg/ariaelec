<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/21/18
 * Time: 12:16 AM
 */

namespace App\Shops;

use Symfony\Component\DomCrawler\Crawler;

class MetaElec
{

    /**
     * @param $response
     * @return mixed
     */
    public static function crawlSite($response,$keyword)
    {

        $price = $response->filterXPath('//p[contains(@class,"price")]')->extract(array('_text'));
        $part = $response->filterXPath('//div[contains(@class, "caption")]');


        $part = $part->each(
            function (Crawler $node, $i) {
                $first = $node->children()->first()->text();
                $last = $node->children()->last()->text();
                return $first;
            });

        $price = str_replace(' ', '', $price);
        $price = str_replace("\n", '', $price);

        $num = count($part);
        for ($p = 0; $p < $num; $p++) {

            if (!isset($price[$p])) {
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

            $out[$p] = ['shop'=>'MetaElec',"part"=>$part[$p],"price"=>$price[$p]];
        }

        if (!isset($out)) {
            return ['shop' => 'MetaElec', "part" => 'یافت نشد'];
        } else {

            return $out;
        }
    }

}