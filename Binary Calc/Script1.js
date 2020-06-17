// JavaScript source code
 /*   < !--	#res	Contains the result of button presses.
    #btns	A button container that displays all eight calculator buttons.
    0	btn0	A button expressing binary digit.
    1	btn1	A button expressing binary digit.
C	btnClr	A button to clear the contents of.
    = btnEql	A button to evaluate the contents of the expression in .
    + btnSum	A button for the addition operation.
    - btnSub	A button for the subtraction operation.
    * btnMul	A button for the multiplication operation.
    / btnDiv	A button for the integer division operation.-- >*/
let inputResult = '';

const convertToInt = (str) => {
    str = Array.from(str);
    let arith = str.pop();
    let binaryToInt = parseInt(str.join(''), 2);
    return `${binaryToInt}${arith}`
};

let btns = document.getElementById('btns').children;

for (btn of btns) {
    btn.addEventListener('click', (e) => {
        let value = e.target.innerText;
        if (value === '=') {
            let re = Array.from(document.getElementById('res').innerText);
            let temp = [];
            let arith = ['+', '-', '*', '/'];
            re.push('+');
            let i = 0;
            while (re.length !== 0) {
                if (arith.indexOf(re[i]) > -1) {
                    temp.push(re.splice(0, i +1).join(''));
                    i =-1;
                }

                i++;
            };
            
            
            let resultEval = '';
            for (str of temp) {
                resultEval += convertToInt(str);
            };
            resultEval = Array.from(resultEval);
            resultEval.pop();
            resultEval = Math.floor(eval(resultEval.join('')));
            document.getElementById('res').innerText = (resultEval).toString(2);

        } else if (value === 'C') {
            document.getElementById('res').innerText = '';
            inputResult = '';

        } else {
            
            document.getElementById('res').innerText += value;


        }; 
    });
};
