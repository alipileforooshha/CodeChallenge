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
        // Using explode function to make array of coin names and prices
        $keys = array_keys($coin->all());
        $coins = explode(",", $keys[0]);

        // Iterating in the coins array to Insert and Update 
        for ($i=0; $i < 20; $i = $i + 2) {
            // Retrieve coin to see if it exists
            $coin = Coin::where('name',$coins[$i])->first();
            if($coin == null){
                // Coin does not already exist in the database
                // Insert names and prices of the coins to the database 
                Coin::create([
                    'name' => $coins[$i],
                    'price'=> str_replace('_','.',$coins[$i+1])
                ]);
            }
            else{
                // Coin is already in the database 
                // Update coin price
                $coin->price = str_replace('_','.',$coins[$i+1]);
                $coin->save();
            }
        }
        return 200;
    }
}
