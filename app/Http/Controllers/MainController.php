<?php

namespace App\Http\Controllers;

use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MainController extends Controller
{
    public function index(){
        //Name of coins to retrieve
        $coins = [
            'bitcoin',
            'ethereum',
            'tether',
            'dogecoin',
            'tron',
            'cardano',
            'polkadot',
            'dai',
            'stellar',
            'waves'
        ];
        //Base URL to make an api request
        $url = 'https://api.coingecko.com/api/v3/simple/price?ids=';
        //Make complete url with imploding the coins array to make query params and and concatinating to make final request url
        $string = implode("%2C",$coins);
        $url = $url . 
                $string .
                '&vs_currencies=usd';
        //Make Request using GET Method
        $request = Http::get($url);
        //Converting the response to JSON Format
        $response = $request->collect();
        // dd($response);

        // foreach($response as $coin){
        //     dd($coin);
        // }
        return view('welcome');
    }
}
