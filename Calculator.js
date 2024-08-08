const operationsX = document.querySelectorAll('#operationX');
const operationsY = document.querySelectorAll('#operationY');
const numbers = document.querySelectorAll('#num');
const mathButtons = document.querySelectorAll('#math_btn');
const calInput = document.getElementById('cal');
const calOutput = document.getElementById('res');
const buttons = document.querySelectorAll('button');
let calArray = [];
let signArray = [];
let finalArray = [];
let newNumber;
let result;
let lastDigit;
let newSign;
let oldArray;
let resOps;
let opsVal;
let expression;
let finalEq;
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const allSigns = ['+', '-', '*', '/', '.', '%','√','sin', 'cos', 'tan', 'log', 'ln', '^', '(','', ')', 'sin⁻¹','cos⁻¹','tan⁻¹'];
const parentheses = ['(', ')']
const OpYSigns= ['√','sin', 'cos', 'tan','sin⁻¹','cos⁻¹','tan⁻¹' ,'log', 'ln']
const mathSigns = ['+', '-', '*', '/', '%', '^'];
let mathOps = ['+', '-', '*', '/','^'];
const sign = ['+', '-', '*', '/', '.', '%','√','sin', 'cos', 'tan', 'log', 'ln', '^', '(',''];
const errorHandle = ['+', '-', '*', '/', '.', '%','sin', 'cos', 'tan', 'log', 'ln','√', '^', '!'];
let clickCount = 0;
let openCount = 0;
let closeCount = 0;
let backSpaceCount = 0;
let invClickCount = 0;
let expValue = Number(Math.exp(1).toFixed(7));

//-------------------------------------start of code-----------------------------------------------//


//1. Cleaning Operation 
//2. Show Output in the calculator
//3. Number button Activation
//4. Math button Activation
//5. OperationX button Activation
//6. OperationY button Activation
//7. Pi button Activation
//8. Exponential button Activation
//9. Point button Activation
//10.Parentheses Handling Operation
//11.Parentheses button Activation
//12.AC button Activation
//13. Answer button Activation
//14. Equal button Activation
//15.Backspaced button Activation
//16. Sign changing Operation
//17. Subparentheses Operation
//18. Inverse button Activation
//19. Math Calculation
//20. Get an error message when the calculation is not possible
//21. instantSignChange operation









//---------------------------------------------------------------------------------------------------//
//1. Cleaning Operation 
calInput.style.fontSize = '15px';
calOutput.style.fontSize = '15px';
const cleanAutomatically = function(){
    if(calInput.value.trim() !== ' ' && calOutput.value.trim() !== ' '){
        calOutput.value = ' ';
        calArray = [];
        oldArray = ' ';
        calInput.value = " ";
        clickCount = 0;
        if(document.getElementById('bracket').disabled == true){
            document.getElementById('bracket').disabled = false;
        }
        if(document.getElementById('point').disabled == true){
            document.getElementById('point').disabled = false;
        }

        openCount = 0;
        closeCount = 0;

        
    }
    
}
//2. Show Output in the calculator
const showOutput = function(calArray){
    oldArray = calArray.join("");
    calInput.value = oldArray;  
}
//3. Number button activation
numbers.forEach((number)=>{number.addEventListener('click', ()=>{
    let num = Number(number.innerHTML);
    cleanAutomatically();
    if(calArray[calArray.length -1] =='%'){
        alert("Please enter a sign !");
    }
    else{
        calArray.push(num);
        showOutput(calArray);
        equalBtn();
    }
    
})
})
//4. Math button activation
mathButtons.forEach((mathButton) =>{mathButton.addEventListener('click', () =>{
    cleanAutomatically();
    if(mathOps.includes(calArray[calArray.length-1])){
        calArray.pop();
    }
    if(document.getElementById('bracket').disabled == true){
        document.getElementById('bracket').disabled = false;
    }
    if(document.getElementById('point').disabled == true){
        document.getElementById('point').disabled = false;
    }
    calArray.push(mathButton.innerHTML);
    showOutput(calArray);
    equalBtn();
})
})
//5. OperationX button activation
operationsX.forEach((operationX) =>{
    operationX.addEventListener('click', ()=>{
        cleanAutomatically();
        opsVal = operationX.innerHTML;
        if(calArray[calArray.length-1] ===''){
            alert('Please enter any digit!')
        }
        else if( typeof calArray[calArray.length -1] === 'number'){
            calArray.push(opsVal);
            showOutput(calArray);
            equalBtn();
        }
        
        
    })
})
//6. OperationY button activation
operationsY.forEach((operationY) =>{
    operationY.addEventListener('click', ()=>{
        opsVal = operationY.innerHTML;
            cleanAutomatically();
            calArray.push(opsVal);
            calArray.push('(');
            openCount++;
            clickHandling();
            showOutput(calArray);
            equalBtn();

    })
})
//7. Pi button Activation
document.getElementById('pi').addEventListener('click', () =>{
    calArray.push(Math.PI);
    showOutput(calArray);
})
//8. Exponential button Activation
document.getElementById('exp').addEventListener('click', () =>{
    if(calArray[calArray.length -1] =='(' && OpYSigns.includes(calArray[calArray.length -2])){
        calArray.push(expValue,')');
            document.getElementById('bracket').disabled = true;
            setTimeout(() => {
                if(document.getElementById('bracket').disabled == true){
                    document.getElementById('bracket').disabled = false;
                }
                
            }, 2000);
    }
    else{
        calArray.push(expValue);
    } 
    showOutput(calArray);
})
//9. Point button Activation
document.getElementById('point').addEventListener('click', () =>{
    if(isNaN(calArray[calArray.length-1]) || calArray[calArray.length-1] == ''){
        calArray.push(0);
        calArray.push('.');
    }
    else if(calArray[calArray.length -1] == expValue){
        alert("More than one decimal point can't be placed within one number !")

    }
    else{
        calArray.push('.');
    }
    showOutput(calArray);
    document.getElementById('point').disabled = true;
})

//10. Parentheses Handling Operation
const clickHandling = function(){
    let lastElement = calArray[calArray.length - 1];
    if(mathOps.includes(lastElement) || calArray.length == 0 ||OpYSigns.includes(lastElement)){
        calArray.push('(');
        showOutput(calArray);
        openCount++;
    }
    if(numArr.includes(lastElement) || lastElement ==')' && openCount !== closeCount){
        calArray.push(')');
        closeCount++;
        showOutput(calArray);
        if(openCount === closeCount){
            document.getElementById('bracket').disabled = true;
            setTimeout(() => {
                if(document.getElementById('bracket').disabled == true){
                    document.getElementById('bracket').disabled = false;
                }
            }, 2000);
            showOutput(calArray);
            openCount = 0;
            closeCount = 0;
        }
        
    }
}
//11. Parentheses button Activation
document.getElementById('bracket').addEventListener('click', clickHandling);

//12. AC button Activation
document.getElementById("on_off").addEventListener('click', ()=>{
    if(document.getElementById('bracket').disabled == true){
        document.getElementById('bracket').disabled = false;
    }
    if(document.getElementById('point').disabled == true){
        document.getElementById('point').disabled = false;
    }
    calInput.value = ' ';
    calOutput.value = " ";
    calArray = [];
    clickCount = 0;

})
//13. Answer button Activation

document.getElementById('ANS').addEventListener('click', () =>{
    if(calArray[calArray.length-1] =='(' && OpYSigns.includes(calArray[calArray.length-2])){
        calArray.push(parseFloat(result.toFixed(7)));
        calArray.push(')');
        showOutput(calArray);
    }
    else{
        calInput.value = '';
        calInput.value = parseFloat(result.toFixed(7));
        calArray = [parseFloat(result.toFixed(7))];
        calOutput.value = ' ';
    }
})

//14. Equal button Activation
const equalBtn = function(){
    document.querySelector('#equal').addEventListener('click', mathCal);

}

//15.Backspaced button Activation
    document.getElementById('backspace').addEventListener('click', ()=>{
        let lastElement = calArray[calArray.length - 1];
        if(lastElement === '('){
            calArray.pop();
            openCount--;
        }
        else if(lastElement === ')'){
            calArray.pop();
            closeCount--;
        }
        else if(lastElement === '.'){
            calArray.pop();
            if(document.getElementById('point').disabled == true){
                document.getElementById('point').disabled = false;
            }

        }
        else{calArray.pop()
        }
            showOutput(calArray);
            backSpaceCount = 0;
        })
//16. Sign changing Operation
const factorial = function (n){
    if(n ==0 || n == 1 ){
        return 1;
    }
    else{
        return n * factorial(n-1);
    }
}
const signReplace = function(event) {
return event
    .replace(/√\(?(\d+(\.\d+)?)\)?/g, (match, number) => {if(match){
        return  `Math.sqrt(${number})`;
    }}) 
    .replace(/\(?(\d+)\)?\^\(?(\d+)\)?/g, (match, base, power) => {if(match){
        return  `${base} ** ${power}`;
    }}) 
    .replace(/\(?(\d+)\)?!/g, (match, number) => {if(match){
        return  `${factorial(number)}`;
    }}) 
    .replace(/sin\(?(\d+(\.\d+)?)\)?/g, (match, number) => {if(match){
        return  `Math.sin(${(number)*Math.PI/180})`;
    }})
    .replace(/cos\(?(\d+(\.\d+)?)\)?/g, (match, number) => {if(match){
        return  `Math.cos(${(number)*Math.PI/180})`;
    }})
    .replace(/tan\(?(\d+(\.\d+)?)\)?/g, (match, number) => {if(match){
        return  `Math.tan(${(number)*Math.PI/180})`;
    }})
    .replace(/ln\(?(\d+(\.\d+)?)\)?/g, (match, number) =>{if(match){
        return `${Math.log10(number)/ Math.log10(Math.exp(1))}`;
    }})
    .replace(/log\(?(\d+(\.\d+)?)\)?/g, (match, number) => {if(match){
        return  `Math.log10(${number})`;
    }})
    .replace(/\(?(\d+(\.\d+)?)\)?%/g, (match, number) => {if(match){
        return  `${number / 100}`;
    }})
    .replace(/sin⁻¹\(?(\d+(\.\d+)?)\)?/g, (match,number) =>  {if(match){
        return  `Math.asin(${(number)})`;
    }})
    .replace(/cos⁻¹\(?(\d+(\.\d+)?)\)?/g, (match,number) =>  {if(match){
        return  `Math.acos(${(number)})`;
    }})
    .replace(/tan⁻¹\(?(\d+(\.\d+)?)\)?/g, (match,number) => {if(match){
        return  `Math.atan(${(number)})`;
    }})
    .replace(/e\(?(\d+)\)?/g, (match,number) => {if(match){
        return  `Math.exp(${(number)})`;
    }})
    .replace(/ten\(?(\d+(\.\d+)?)\)?/g, (match,number) => {
        if(match){
            return `10 ** (${(number)})`;
        }}
    )}
//17.Subparentheses Operation
let subParenthesesOperation = function (string){
    console.log(string);
    let resultString = string.split(/([+\-*/()^])/).filter(Boolean);
    console.log(resultString);
    let emptyArr = [];
    let newEmptyArr = [];
    for (let i = 0; i < resultString.length; i++) {
        const element = resultString[i].trim();
        if(!isNaN(Number(element))){
            resultString[i] = Number(element);
            console.log(resultString);
        }
        console.log(resultString);  
    }
    for (let i = 0; i < resultString.length; i++) {
        if(resultString[i] === '(' && resultString[i + 1] === '-' && typeof resultString[i + 2] === 'number'){
            resultString[i+2] = -resultString[i+2];
            resultString.splice(i + 1, 1);
        }
        console.log(resultString);  
    }
    for (let i = 0; i < resultString.length; i++) {
        if(resultString[i] === '(' && typeof resultString[i + 1] === 'number' && mathSigns.includes(resultString[i+2])){
            newEmptyArr.push(resultString[i+1]);
            console.log(newEmptyArr);
            
            for (let j = i+2; j < resultString.length; j++) {
                if(resultString[j] !==')'){
                    newEmptyArr.push(resultString[j]);
                    
                }
                if(resultString[j] === ')'){
                    let innerString = newEmptyArr.join('');
                    console.log(innerString);
                    let innerEquation = signReplace(innerString);
                    let innerNumber = eval(innerEquation);
                    console.log(innerNumber);
                    console.log(newEmptyArr.length);
                    resultString.splice(i+1, newEmptyArr.length -1);
                    resultString[i+1] = innerNumber;
                    newEmptyArr = [];
                   
                }
                
                
                
            }
        }
        console.log(resultString);  
    }
    
    for (let i = 0; i < resultString.length; i++) {
        if(OpYSigns.includes(resultString[i]) && resultString[i+1]=='(' && typeof resultString[i+2] =='number'){
            let signChangedVal = instantSignChange(resultString[i]);
            emptyArr.push(signChangedVal, '(', resultString[i+2],')');
            console.log(signChangedVal);
            emptyArr[0] = signChangedVal;
            console.log(emptyArr);
            let joinedString = emptyArr.join('');
            let calculateVal = eval(joinedString);
            resultString.splice(i,3);
            resultString[i] = calculateVal;
            console.log(resultString);
            emptyArr = [];
            string = '';
            string = resultString.join('');
            console.log(string);
            return subParenthesesOperation(string);
            
        }  
    }
    finalEq = signReplace(string);
    if (sign.includes(finalEq[finalEq.length - 1])) {
        calOutput.value = 'Format Error';
        console.log(calOutput.value);
    }
    else{
        result = eval(finalEq);
        calOutput.value = parseFloat(result.toFixed(10));
        console.log(result);
        return result;
        }
}

//18. Inverse button Activation
document.getElementById('inverse').addEventListener('click', () =>{
    invClickCount++;
    if(invClickCount ==1){
        operationsY.forEach((operationY) =>{
                let inverseSign = operationY.textContent;
            switch (inverseSign) {
                case 'sin':
                    operationY.textContent = 'sin⁻¹';
                    break;
                case 'cos':
                    operationY.textContent = 'cos⁻¹';
                    break
                case 'tan':
                    operationY.textContent = 'tan⁻¹';
                    break
                case 'ln':
                    operationY.textContent = 'e';
                    break
                case 'log':
                    operationY.textContent = 'ten';
                    break
                default:
                    break;
            }
            
            })
    }
    else if(invClickCount ==2){
            operationsY.forEach((operationY) =>{
                    let inverseSign = operationY.textContent;
                 switch (inverseSign) {
                    case 'sin⁻¹':
                         operationY.textContent = 'sin';
                        break;
                    case 'cos⁻¹':
                        operationY.textContent = 'cos';
                        break
                case 'tan⁻¹':
                        operationY.textContent = 'tan';
                        break
                case 'e':
                        operationY.textContent = 'ln';
                        break
                case 'ten':
                        operationY.textContent = 'log';
                default:
                    invClickCount = 0;
                   break;
                }
            
            })
    }
    
    
    

})

//19.Math Calculation
const mathCal = function(){
    console.log(calArray);
    expression = calArray.join('');
    subParenthesesOperation(expression);
    
    
}
//20. Get an error message when the calculation is not possible
    window.onerror = function() {
    calOutput.value = `Error`;
    return true;
};
//21. instantSignChange operation
const instantSignChange = function(string) {
    return string
        .replace(/sin⁻¹/g, 'Math.asin')
        .replace(/cos⁻¹/g, 'Math.acos')
        .replace(/tan⁻¹/g, 'Math.atan')
        .replace(/\bsin\b/g, 'Math.sin') 
        .replace(/\bcos\b/g, 'Math.cos') 
        .replace(/\btan\b/g, 'Math.tan') 
        .replace(/√/g, 'Math.sqrt')
        .replace(/\blog\b/g, 'Math.log10')
        .replace(/\bln\b/g, 'Math.log')
}
//22. Set the Maximum limit of Array length