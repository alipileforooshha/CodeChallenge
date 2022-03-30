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
const req = new XMLHttpRequest();
const reqq = new XMLHttpRequest();
var url = 'https://api.coingecko.com/api/v3/simple/price?ids=';
//Make complete url with imploding the coins array to make query params and and concatinating to make final request url
string = coins.join('%2C');
var url = url + 
        string +
        '&vs_currencies=usd';
const coin_name = document.getElementsByClassName('coin-name');
const coin_price = document.getElementsByClassName('coin-price');
function getCoinPrice(){
    req.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var response = JSON.parse(this.responseText);
            response = sortObjectByKeys(response);
            keys = Object.keys(response);
            values = Object.values(response);
            for (let i = 0; i < 10; i++) {
                coin_name[i].innerHTML = keys[i];
                coin_price[i].innerHTML = values[i]['usd'];          
            }
            sendData = JSONToArray(response);
            // console.log(sendData);
            // console.log(typeof(sendData));
            reqq.open('post','http://127.0.0.1:8000/api/store');
            reqq.setRequestHeader('Accept','application/json');
            reqq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            reqq.send(sendData);
            reqq.addEventListener("readystatechange", function () {
                console.log("what the fuck"+this.responseText);
            });
        }
    });
    req.open('get',url);
    req.send();
}
function sortObjectByKeys(response) {
    return Object.keys(response).sort().reduce((r, k) => (r[k] = response[k], r), {});
}
function JSONToArray(obj){
    result = [];
    mstring = "";
    for(var i in obj){
        result.push(i, obj[i]['usd']);
    }
    console.log(result);
    for(var j of result){
        parted = result.toString();
    }
    console.log(parted);
    obj = {
        'var':mstring
    }
    return result;
}
setInterval(getCoinPrice, 5000);
new FormData
