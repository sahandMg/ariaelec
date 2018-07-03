<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/17/18
 * Time: 11:35 PM
 */

namespace App\Shops;
use Carbon\Carbon;
use GuzzleHttp\Client as GuzzleClient;
use League\Flysystem\Exception;
use Symfony\Component\DomCrawler\Crawler;
use Tymon\JWTAuth\Facades\JWTAuth;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;


class GetSiteContent
{

    public $resp =[];
    public $keyword;
    public $fail = 0;
    public $stop = 0;
    public $flag = [];
    public $state = [];

    static public $website= [
        'App\Shops\Eshop'=>'https://eshop.eca.ir/جستجو?'.'search_query=',
        'App\Shops\MetaElec'=>'http://metaelec.ir/search&search=',
        'App\Shops\IranMicro'=>'https://iran-micro.com/index.php?route=product/search&description&model=1&search=',
        'App\Shops\Electronic724'=>'http://www.electronic724.com/index.php?searchstring='



    ];



    public function getSite($keyword)
    {

        for($i=0 ; $i<count(self::$website);$i++){
            self::$website[array_keys(self::$website)[$i]] = array_values(self::$website)[$i].$keyword;
    }
        $start = \Carbon\Carbon::now();

        $client = new GuzzleClient();


//     _________________ Looking for searched item in shops _________________

        $config = [
                    'referer' => true,
                     'headers' => [
                         'User-Agent' => '${YOUR TOOL NAME}/v1.0',
                         'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                         'Accept-Encoding' => 'gzip, deflate, br',
            ],
        ];
        for($t=0;$t<count(self::$website);$t++){

            $promise[$t] = $client->requestAsync('GET',array_values(self::$website)[$t],$config)->then(function (ResponseInterface $response) use($t) {
                $this->resp[$t] = $response->getBody()->getContents();
                return $this->resp[$t];
            });

        }

            $promise[count(self::$website) -1]->wait();
            $start = Carbon::now();
        while ($this->stop == 0){

            for($t=0;$t<count(self::$website);$t++){

                $this->state[$t] = $promise[$t]->getState();
                if($this->state[$t] == 'pending' || $this->state[$t] == 'rejected'){
                    $this->flag[$t] = 0;
                }else{
                    $this->flag[$t] = 1;
                };
            }

            if(preg_match('/[0]/', implode($this->flag)) == 1 ){

                $this->stop = 0 ;
            }else{
                $this->stop = 1 ;
            }



            if(Carbon::now()->diffInSeconds($start)>5){
                $this->fail = 1;
                break;
            }
        }



// ------------- Search Has been Failed ------------------

        if(preg_match('/[1]/', implode($this->flag)) == 0 || $this->fail == 1 ){
            return '0';
        }
// -------------------------------------------------------
            dd($this->flag);
        for($t=0;$t<count($this->resp);$t++){

                $crawler[$t] = new Crawler($this->resp[$t]);
            }

        return $crawler;


    }
}