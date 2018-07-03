<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 6/6/18
 * Time: 11:46 AM
 */

namespace App\Shops;
use App\Helper;
use GuzzleHttp\Client as GuzzleClient;
use League\Flysystem\Exception;
use Symfony\Component\DomCrawler\Crawler;
use Tymon\JWTAuth\Facades\JWTAuth;
use Psr\Http\Message\ResponseInterface;

class Digikey
{
    public $resp = [];
    public $url = '';

//    Gets digikey part's table row

    public function digikey(){

        $url = $this->url;
        $client = new GuzzleClient();
        $promise1 = $client->requestAsync('GET',$url)->then(function (ResponseInterface $response) {
            $this->resp = $response->getBody()->getContents();
            return $this->resp;
        });
        $promise1->wait();

        $crawler = new Crawler($this->resp);

        $part = $crawler->filterXPath('//thead[contains(@id,"tblhead")]')->text();

        $part = str_replace("\r\n", '', $part);
        $part = str_replace("\t", '', $part);
        $part = explode('  ', strtolower($part));
        $num = count($part);
        for($i=0;$i<$num;$i++){
            if($part[$i] == null){
                unset($part[$i]);
            }
        }

            $part = array_values($part);

        $part = str_replace(' ', '_', $part);
        $part = str_replace('-', '', $part);
        $part = str_replace('/', '', $part);
        $part = str_replace('(', '', $part);
        $part = str_replace(')', '', $part);
        $part = str_replace('__', '_', $part);
        $part = str_replace(',', '', $part);
        $part = str_replace('.', '', $part);
        $part = preg_replace('/[0-9]+/', '', $part);
        array_pop($part);
        array_pop($part);
        $part = array_slice($part,13,count($part)-13);
        dd($part);
            return $part;


}

//  Saves digikey column names with the page link in database

public function getLinks(){


    $url = 'https://www.digikey.com/products/en/integrated-circuits-ics/32';
    $client = new GuzzleClient();
    $promise1 = $client->requestAsync('GET',$url)->then(function (ResponseInterface $response) {
        $this->resp = $response->getBody()->getContents();
        return $this->resp;
    });
    $promise1->wait();

    $crawler = new Crawler($this->resp);

//    $links = $crawler->filterXPath('//ul[contains(@class,"catfiltersub")]');
    $links = $crawler->filterXPath('//a[contains(@class,"catfilterlink")]')->extract('href');
    dd($links);
//    for($t=93;$t<94;$t++){
//
//
//        $this->url = 'https://www.digikey.com'.$links[$t];
//        $tableData[$t] = $this->digikey();
//    $helper = new Helper();
//    $helper->helper = serialize($tableData[$t]);
//    $helper->links = $this->url;
//    $helper->type = 'IC';
//    $helper->save();
////        sleep(3);
//    }

}


}