// JavaScript source code
async function setCurrencies() {
    let request = await fetch('https://api.exchangeratesapi.io/latest?base=INR')
    let response = await request.json();
    return response
}
async function getCurrency(cur,sec) {


    let request = await fetch(`https://api.exchangeratesapi.io/latest?base=${cur}`);
    let response = await request.json();
    return response['rates'][sec]
}
let requestCurr = setCurrencies();

requestCurr.then((data) => {

    let currencies = data;
    let allCurrencies = Object.keys(currencies['rates']);
    let first = '';
    let second = '';
    // Adding the  options to both the dropdowns;
    allCurrencies.forEach(function (currency) {
        first += `<option>${currency}</option>`
        second += `<option>${currency}</option>`
    });
    document.getElementById('first').innerHTML = first;
    document.getElementById('second').innerHTML = second;


});


document.getElementById('button').addEventListener('click', function () {
    // Getting the values of the inputs of the user;
    
    let firstCurrency = document.getElementById('first').value;
    let secondCurrency = document.getElementById('second').value;
    // Sending new request to website to compare the websites;
    let request = getCurrency(firstCurrency, secondCurrency);
   

    request.then((value) => {
        document.getElementById('h3').innerHTML = `One ${firstCurrency} is equal to ${value} ${secondCurrency}`;})

        
    



});