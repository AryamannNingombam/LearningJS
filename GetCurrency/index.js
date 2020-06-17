
// Sending request to give all options to user 
// (Can enter values manually but it would be difficult to make updates if BY ANY 
 // CHANCE any currency gets added or removed... )
let request  = new XMLHttpRequest();

request.open('GET','https://api.exchangeratesapi.io/latest?base=INR',true);

request.onprogress = function(){
let  currencies  =   JSON.parse(this.responseText);
let allCurrencies = Object.keys(currencies['rates']);
let first = '';
let second = '';
// Adding the  options to both the dropdowns;
allCurrencies.forEach(function(currency){
first += `<option>${currency}</option>`
second += `<option>${currency}</option>`
});
document.getElementById('first').innerHTML = first;
document.getElementById('second').innerHTML = second;



};

request.send();
// MAIN CODE;

// This event will occur when the user clicks on the 'Compare Currencies' button;
document.getElementById('button').addEventListener('click',function(){
// Getting the values of the inputs of the user;
let hi  = new Date();
console.log(hi.getMilliseconds());
let firstCurrency = document.getElementById('first').value;
let secondCurrency = document.getElementById('second').value;
// Sending new request to website to compare the websites;
let request = new XMLHttpRequest();
request.open('GET',`https://api.exchangeratesapi.io/latest?base=${firstCurrency}`);

request.onprogress = function(){
let  currenciesReq  =   JSON.parse(this.responseText);
let allCurrencies = currenciesReq['rates'];
// Getting the currency value of second currency with respect to the first one;
let value = allCurrencies[secondCurrency];

document.getElementById('h3').innerHTML = `One ${firstCurrency} is equal to ${value} ${secondCurrency}`;
};



request.send();
let ha = new Date();
console.log(ha.getMilliseconds());
});