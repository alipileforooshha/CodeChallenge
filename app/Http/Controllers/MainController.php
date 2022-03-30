<?php

namespace App\Http\Controllers;

use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MainController extends Controller
{
    public function index(){
        return view('welcome');
    }
    public function store(Request $coin){
        $keys = array_keys($coin->all());
        $coins = explode(",", $keys[0]);
        if(Coin::exists()){
            for($i=0; $i < 20; $i = $i + 2) {
                $coin = Coin::where('name',$coins[$i])->first();
                $coin->price = str_replace('_','.',$coins[$i+1]);
                $coin->save();
            }
        }
        else{
            for ($i=0; $i < 20; $i = $i + 2) { 
                Coin::create([
                    'name' => $coins[$i],
                    'price'=> str_replace('_','.',$coins[$i+1])
                ]);
            }
            return 200;
        }
    }
}
