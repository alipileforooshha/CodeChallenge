//Name of coins to retrieve
const coins = [
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

// XML Object to retrieve from API
const API_getter = new XMLHttpRequest();
// XML Object to send data to controller
const database_saver = new XMLHttpRequest();

//Base URL to make Request
var url = 'https://api.coingecko.com/api/v3/simple/price?ids=';

//Make complete url by joining the coins array elements to make query params and and concatinating to make final request url
string = coins.join('%2C');
var url = url + 
        string +
        '&vs_currencies=usd';

// Array of coin name and coin prices in the view
const coin_name = document.getElementsByClassName('coin-name');
const coin_price = document.getElementsByClassName('coin-price');

//Function to Retrieve Data from API 
function getCoinPrice(){
    // Make Request to API and Retrieve Data With GET Method
    API_getter.open('get',url);
    API_getter.send();
    // Add Eventlistener to fire every time a response is recieved
    API_getter.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //Convert response to JSON Format for further Process
            var response = JSON.parse(this.responseText);
            //Sort response based on Coin names
            response = sortObjectByKeys(response);
            //Save coin names and prices in different variables
            coin_names = Object.keys(response);
            coin_prices = Object.values(response);
            //Display coin names and prices to view
            for (let i = 0; i < 10; i++) {
                coin_name[i].innerHTML = coin_names[i];
                coin_price[i].innerHTML = coin_prices[i]['usd'];          
            }
            callController(response)
        }
    });
}
// Run function to retrieve and update data every 15 seconds
setInterval(getCoinPrice, 15000);

//Function to Sort response from API based on coin names
function sortObjectByKeys(response) {
    return Object.keys(response).sort().reduce((r, k) => (r[k] = response[k], r), {});
}

// Function to convert JSON to Array
function JSONToArray(obj){
    //Initiallize empty array for pushing coin name and coin price
    result = [];
    // Iterate JSON to push to array
    for(var i in obj){
        result.push(i, obj[i]['usd']);
    }
    return result;
}

function callController(response){
    //Convert response to array to pass to Controller
    sendData = JSONToArray(response);
    //Send Request with Post method
    database_saver.open('post','http://127.0.0.1:8000/api/store');
    // Set proper Request Headers
    database_saver.setRequestHeader('Accept','application/json');
    database_saver.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    database_saver.send(sendData);
}