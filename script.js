const screen = document.querySelector('#screen')
const numbers = document.querySelectorAll(`button[class='c-button num']`);
const operators = document.querySelectorAll(`button[class='c-button operator']`);
const del = document.getElementById('del');
const cancle = document.getElementById('ac');
let Contents = [] // list that keeps track of contents to be printed on screen
let index = 0; // index of contents list
let content; //content that is printed on the screen

numbers.forEach((number) => number.addEventListener('click', printText));
operators.forEach((operator) => operator.addEventListener('click', (e) => {
    let numBefore = Number(Contents[index-1])

    if(!isNaN(numBefore)){
        printText(e)
    }
}));
del.addEventListener('click', delPrevious)
cancle.addEventListener('click', cancleAll)



function printText(e){
    index++
    Contents.push(`${e.target.textContent}`);
    content = Contents.join('')
    screen.value = `${content}`
}

function delPrevious(){
    Contents.pop()
    index--
    content = Contents.join('')
    screen.value = `${content}`
}

function cancleAll(){
    Contents = [];
    index = 0;
    screen.value = ''
}