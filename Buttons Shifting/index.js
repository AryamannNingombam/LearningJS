// JavaScript source code
let centerButton = document.getElementById('btn5')


centerButton.addEventListener('click', () => {
    let allButtons = Array.from(document.getElementsByClassName('buttons'));

    let obj = {};
    for (button of allButtons) {
        obj[button.id] = button.innerText;
    };
    document.getElementById('btn1').innerText = obj['btn4'];
    document.getElementById('btn2').innerText = obj['btn1'];
    document.getElementById('btn3').innerText = obj['btn2'];
    document.getElementById('btn4').innerText = obj['btn7'];
    
    document.getElementById('btn6').innerText = obj['btn3'];
    document.getElementById('btn7').innerText = obj['btn8'];
    document.getElementById('btn8').innerText = obj['btn9'];
    document.getElementById('btn9').innerText = obj['btn6'];
    

});