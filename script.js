const screen = document.querySelector('#screen')
const numbers = document.querySelectorAll(`button[class='c-button num']`);
const operators = document.querySelectorAll(`button[class='c-button operator']`);
const del = document.getElementById('del');
const cancle = document.getElementById('ac');
const equalButton = document.getElementById('equal')
const periodButton = document.getElementById('period')
let Contents = [] // list that keeps track of contents to be printed on screen
let index = 0; // index of contents list
let content; //content that is printed on the screen
let Numbers = []// keeps track of numbers to be calculated
let Operator; //keeps track of operation to be performed

numbers.forEach((number) => number.addEventListener('click', printText));

operators.forEach((operator) => operator.addEventListener('click', (e) => {
    let numBefore = Number(Contents[index-1])
    
    if(!isNaN(numBefore)){
        printText(e)
        operators.forEach((operator) => operator.disabled = true)
        periodButton.disabled = false
    }
}));

del.addEventListener('click', delPrevious)
cancle.addEventListener('click', cancleAll)
equalButton.addEventListener('click', calculate)
periodButton.addEventListener('click', (e) => {
    printText(e);
    periodButton.disabled = true
})

function printText(e){
    index++
    Contents.push(`${e.target.textContent}`);
    content = Contents.join('')
    screen.textContent = `${content}`
}

function delPrevious(){
    let contentRemoved = Contents.pop()
    operators.forEach((operator) => {
        if (contentRemoved === operator.textContent){
            operators.forEach((operator) => operator.disabled = false)
        }
    })
    if(contentRemoved === '.'){periodButton.disabled = false}
    index--
    content = Contents.join('')
    screen.textContent = `${content}`
}

function cancleAll(){
    Contents = [];
    index = 0;
    screen.textContent = ''
    operators.forEach((operator) => operator.disabled = false)
    periodButton.disabled = false
}

function calculate(){
    operators.forEach((operator) => operator.disabled = false)
    periodButton.disabled = false
    getnumbers()
    let num1 = Number(Numbers[0].join(''))
    let num2 = Number(Numbers[1].join(''))
    console.log(num1)
    if (Operator === 'x'){content = num1 * num2}
    if (Operator === '/'){content = num1 / num2} 
    if (Operator === '+'){content = num1 + num2}
    if (Operator === '-'){content = num1 - num2}
    if (Operator === '^'){content = num1 ** num2}
    if (Operator === '%'){content = num1 % num2}
    screen.textContent = content
    Contents = Array.from(String(content));
    index = Contents.length
    Numbers = []
}
 
function getnumbers(){
    let temp = []
    Contents.forEach((contnt) => {
        if(!isNaN(Number(contnt)) || contnt === '.'){
            console.log(contnt)
            temp.push(contnt)
        }
        else{
            Numbers.push(temp)
            Operator = contnt
            temp = []
        }
    })
    Numbers.push(temp)
    temp = []
    console.log(Numbers)
}