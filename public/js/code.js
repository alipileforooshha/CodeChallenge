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
            // console.log(response);
            response = sortObjectByKeys(response);
            keys = Object.keys(response);
            values = Object.values(response);
            console.log(response);
            for (let i = 0; i < 10; i++) {
                coin_name[i].innerHTML = keys[i];
                coin_price[i].innerHTML = values[i]['usd'];          
            }
            // console.log(keys);
            // keys.forEach(element => {
            //     console.log(response[element]['usd']);
            // });
            // console.log(response['bitcoin']['usd']);
        }
        // for(let i = 0; i<10; i++){
        //     trow = document.createElement('tr');
        //     for(let j = 0; j<2; j++){
        //         tdes = document.createElement('td');
        //         text = document.createTextNode('wow');
        //         tdes.appendChild(text);
        //         trow.appendChild(tdes);                
        //         trow.appendChild(tdes);               
        //     }
        //     table.appendChild(trow);
        // }
    });
    req.open('get',url);
    req.send();
}

function sortObjectByKeys(response) {
    return Object.keys(response).sort().reduce((r, k) => (r[k] = response[k], r), {});
}
setInterval(getCoinPrice, 10000);
//Base URL to make an api request
// console.log(url);