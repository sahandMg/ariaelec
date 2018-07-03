<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 6/6/18
 * Time: 11:46 AM
 */

namespace App\Shops;
use App\Component;
use App\Helper;
use App\PersianName;
use GuzzleHttp\Client as GuzzleClient;
use League\Flysystem\Exception;
use Symfony\Component\DomCrawler\Crawler;
use Tymon\JWTAuth\Facades\JWTAuth;
use Psr\Http\Message\ResponseInterface;

class AminPart
{
    public $resp = [];
    public $url = '';

//    Gets aminPart part's table cols

    public function aminPart(){

        $url = $this->url;
        $client = new GuzzleClient();
        $promise1 = $client->requestAsync('GET',$url)->then(function (ResponseInterface $response) {
            $this->resp = $response->getBody()->getContents();
            return $this->resp;
        });
        $promise1->wait();

        $crawler = new Crawler($this->resp);

        $part = $crawler->filterXPath('//div[contains(@class,"rTableRow tblheader")]')->text();

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

//        $part = str_replace(' ', '_', $part);
//        $part = str_replace('-', '', $part);
//        $part = str_replace('/', '', $part);
//        $part = str_replace('(', '', $part);
//        $part = str_replace(')', '', $part);
//        $part = str_replace('__', '_', $part);
//        $part = str_replace(',', '', $part);
//        $part = str_replace('.', '', $part);
//        $part = preg_replace('/[0-9]+/', '', $part);
        $part = array_slice($part,15);
        return $part;


    }

//  Saves aminPart column names with the page link in database

    public function getLinks(){


        $url = 'https://aminpart.com/products/integrated%20circuits%20(ics)';
        $client = new GuzzleClient();
        $promise1 = $client->requestAsync('GET',$url)->then(function (ResponseInterface $response) {
            $this->resp = $response->getBody()->getContents();
            return $this->resp;
        });
        $promise1->wait();

        $crawler = new Crawler($this->resp);

        $links = $crawler->filterXPath('//span[contains(@style,"padding-left:40px;line-height: 25px;")]');
        $links = $links->each(
            function (Crawler $node, $i) {
                $last = $node->children()->first()->attr('href');
                return $last;
            });
        $num = count($links);
    for($t=1;$t<$num;$t++){

        $this->url = 'https://aminpart.com'.$links[$t];
        $tableData[$t] = $this->aminPart();
        $helper = new PersianName();
        $helper->names = serialize($tableData[$t]);
        $helper->links = $this->url;
        $helper->type = 'IC';
            $helper->common_id = $t;
        $helper->save();
//        sleep(3);
    }

    }

    public function components(){

        $url = 'https://aminpart.com/products/integrated%20circuits%20(ics)';
        $client = new GuzzleClient();
        $promise1 = $client->requestAsync('GET',$url)->then(function (ResponseInterface $response) {
            $this->resp = $response->getBody()->getContents();
            return $this->resp;
        });
        $promise1->wait();

        $crawler = new Crawler($this->resp);

        $texts = $crawler->filterXPath('//span[contains(@style,"padding-left:40px;line-height: 25px;")]');

        $texts = $texts->each(
            function (Crawler $node, $i) {
                $last = $node->children()->first()->text();
                return $last;
            });

        unset($texts[15]);
        $texts = array_values($texts);
        $num = count($texts);

        for($t=1;$t<$num;$t++){
        if($t==37){
            Component::where('id',759)->first()->update(['persian_name'=>'رابط - سنسور، لمس خازنی']);
        }elseif($t>37){

            Component::where('id',722+$t)->first()->update(['persian_name'=>$texts[$t-1]]);
        }else{
            Component::where('id',722+$t)->first()->update(['persian_name'=>$texts[$t]]);
        }

        }

    }


}