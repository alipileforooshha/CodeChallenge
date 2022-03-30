<?php

namespace App\Http\Controllers;

use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MainController extends Controller
{
    // Function to simply return the welcome view
    public function index(){
        return view('welcome');
    }
    // Function to store and update coin data to database
    public function store(Request $coin){
        // Ssing explode function to make array of coin names and prices
        $keys = array_keys($coin->all());
        $coins = explode(",", $keys[0]);

        // Check if Coins table is empty or not and decide to update or insert coins
        if(Coin::exists()){
            // Update only the price of coins 
            for($i=0; $i < 20; $i = $i + 2) {
                // Finding the coin based on name and updating the price
                $coin = Coin::where('name',$coins[$i])->first();
                $coin->price = str_replace('_','.',$coins[$i+1]);
                $coin->save();
            }
            // return 200 response code 
            return 200;
        }
        else{
            for ($i=0; $i < 20; $i = $i + 2) {
                // Inserting names and prices of the coins to the database 
                Coin::create([
                    'name' => $coins[$i],
                    'price'=> str_replace('_','.',$coins[$i+1])
                ]);
            }
            // return 200 response code 
            return 200;
        }
    }
}
