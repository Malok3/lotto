function generateRandomInteger(max) {
    return Math.floor(Math.random() * max);
}


function lotto() {
    let array = new Array()    
    array[0]= generateRandomInteger(40)+1
  
    for (i=1;i<7;i++){
        randomNumber = generateRandomInteger(40)+1
        if (array.includes(randomNumber)){
            i--;
        }else {
            array[i]=randomNumber;
        }
    }
    array.sort(function(a, b){return a - b});

    //extra numbers: generating random number. If it doesn't
    //exist already in the array, add it to array
    for (i=0;i<array.length;i++){
        extraNumber=generateRandomInteger(40)+1
        if (array[i]!=extraNumber){
            break
        }    
    }
    
    //generating plus number
    plusNumber = generateRandomInteger(40)+1
    array.push(extraNumber)
    
    for (i=0;i<array.length;i++){
        displayResultNumber(i)
    }
    //document.getElementById('lotto').innerHTML=array
    //return (array)

    function displayResultNumber(i){
        setTimeout(function () {
            var resultEl = document.getElementById("lotto");
            resultEl.innerHTML += array[i].value;
          }, 1000);
    }
}




let userNumbers = new Array ()
let userExtraNumber = 0;
let amountSelected = 0;
let amountExtraSelected = 0;

//generate numbers grid
for (i=1;i<=40;i++){
    const button = document.createElement('button')
    button.innerText = i
    button.setAttribute('value',i)
    document.getElementById('grid-numbers').appendChild(button)

    button.addEventListener('click', function (){
        document.getElementById('error').innerHTML=''

        if(amountSelected<7) { //user selects seven numbers
            document.getElementById('checkNumbers').classList.add('hidden')
            if(this.hasAttribute('selected',true) ){//if user deselects a number
                this.classList.remove('red')
                this.removeAttribute('selected')
                //removes deselected number from array
                const index = userNumbers.indexOf(this.getAttribute('value'));
                const x = userNumbers.splice(index, 1);
                amountSelected--
                printUserSelection()
            }
            else{//user selects a number 
                this.classList.add('red')
                this.setAttribute('selected',true)
                userNumbers.push(this.getAttribute('value'))
                amountSelected++
                printUserSelection()
            }
        }
        else if(amountSelected===7){
           
            if(this.hasAttribute('selected',true) ){//if user deselects a number
                this.classList.remove('red')
                this.removeAttribute('selected')
                //removes deselected number from array
                const index = userNumbers.indexOf(this.getAttribute('value'));
                const x = userNumbers.splice(index, 1);
                amountSelected--
                printUserSelection()
            }
            else{
                displayError('You can only choose 7 numbers')
            }
        }
        else{
            displayError('You can only choose 7 numbers')
        }
    
   
    })
}

//generate extra number grid
for (i=1;i<=40;i++){
    const button = document.createElement('button')
    button.innerText = i
    button.setAttribute('value',i)
    document.getElementById('grid-extra').appendChild(button)
    button.addEventListener('click', function (){
        document.getElementById('error').innerHTML=''

        if(amountExtraSelected<1) { //user selects seven numbers
            
            if(this.hasAttribute('selected',true) ){//if user deselects a number
                this.classList.remove('red')
                this.removeAttribute('selected')
                userExtraNumber = 0
                amountExtraSelected--
                printUserSelection()
            }
            else {
                this.classList.add('red')
                this.setAttribute('selected',true)
                userExtraNumber = this.getAttribute('value')
                amountExtraSelected++
                printUserSelection()
            }
        }else{
            displayError('Only one extra number can be selected')
        }
    })
}


function printUserSelection() {
    userNumbers.sort(function(a, b){return a - b});
    document.getElementById('userNumbers').innerHTML = ''
    for (i=0;i<userNumbers.length;i++){
        document.getElementById('userNumbers').innerHTML += '<span>'+ userNumbers[i] + '</span>'
    }
    if (userExtraNumber>0 ){ 
        document.getElementById('userNumbers').innerHTML += ' + <span>' + userExtraNumber + '</span>'; 
        document.getElementById('checkExtra').classList.remove('hidden')
    }else {
        document.getElementById('checkExtra').classList.add('hidden')
    }

    //display checkmark when all numbers have been selected
    if(amountSelected===7){
        document.getElementById('checkNumbers').classList.remove('hidden')
    }else{
        document.getElementById('checkNumbers').classList.add('hidden')
    }

    //display start button when all numbers have been selected
    if (amountSelected===7 && userExtraNumber>0){
        document.getElementById('start').classList.remove('hidden')
    }else{
        document.getElementById('start').classList.add('hidden')
    }
   
    
    
}



function displayError(message) {
    var errorEl = document.getElementById("error");
    errorEl.innerHTML = message;
    errorEl.style.display = "block";

    // hide message after 2sec
    setTimeout(function () {
        errorEl.style.display = "none";
    }, 2000);
}


function showNumbersGrid(){
    document.getElementById('grid-numbers').classList.remove('hidden')
    document.getElementById('grid-extra').classList.add('hidden')
}

function showExtraGrid(){
    document.getElementById('grid-numbers').classList.add('hidden')
    document.getElementById('grid-extra').classList.remove('hidden')
}
