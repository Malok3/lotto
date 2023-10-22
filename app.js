function generateRandomInteger(max) {
    return Math.floor(Math.random() * max);
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
            document.getElementById('introText').classList.add('hidden')
            document.getElementById('yourNumbersMessage').classList.remove('hidden')
            
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
                userNumbers.push(Number(this.getAttribute('value')))
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
        if(amountSelected>6){
            showExtraGrid()
            document.getElementById("extra").checked = true;
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
        
        //document.getElementById('error').innerHTML=''

        if(amountExtraSelected<1 ) {     
            this.classList.add('red')
            this.setAttribute('selected',true)
            userExtraNumber = this.getAttribute('value')
            amountExtraSelected++
            printUserSelection()
        }else if(amountExtraSelected===1 ) { 
            if(this.hasAttribute('selected',true) ){//if user deselects a number
                this.classList.remove('red')
                this.removeAttribute('selected')     
                userExtraNumber = 0
                amountExtraSelected--
                printUserSelection()
            }
            else{
                displayError('Only one extra number can be selected')
            }
        }
        else{
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
    }, 3000);
}

function showNumbersGrid(){
    document.getElementById('grid-numbers').classList.remove('hidden')
    document.getElementById('grid-extra').classList.add('hidden')
}

function showExtraGrid(){
    document.getElementById('grid-numbers').classList.add('hidden')
    document.getElementById('grid-extra').classList.remove('hidden')
}


function lotto() {
    let results = new Array() 
   
    if (userNumbers.length===7 && userExtraNumber > 0){
       
         
        //hide grids and show gain board
        document.getElementById('grid-numbers').classList.add('hidden')
        document.getElementById('grid-extra').classList.add('hidden')
        document.getElementById('gainBoard').classList.remove('hidden')
        document.getElementById('grid-selector').classList.add('hidden')
        document.getElementById('lottoTitle').classList.remove('hidden')
        document.getElementById('start').classList.add('hidden')
        
        
        let userNumberswithExtra = userNumbers
        userNumberswithExtra.push(Number(userExtraNumber))
            
        document.getElementById('lotto').innerHTML=''
            
        //generate a random number then generate 6 others that are different from each other
        results[0]= generateRandomInteger(40)+1
        for (i=1;i<7;i++){
            randomNumber = generateRandomInteger(40)+1
            if (results.includes(randomNumber)){
                i--;
            }else {
                results[i]=randomNumber;
            }
        }
        results.sort(function(a, b){return a - b});
        //results.push(generateRandomInteger(40)+1)

        //compare results to user numbers then push found numbers to correctballs without extra number
        let amountCorrectBalls = 0;
        let correctBalls = new Array();
        for (i=0;i<=userNumberswithExtra.length-1;i++){
            if(results.includes(userNumberswithExtra[i])){
                amountCorrectBalls++
                correctBalls.push(userNumberswithExtra[i]) 
            }
        }
        let extraNumberFound = false;
        if(results.includes(userNumberswithExtra[7])){
            extraNumberFound = true;
        }

        
        //display results with a delay
        let currentIndex = 0;    
        async function displayNextValue() {
            if (currentIndex < results.length) {   
                //if a user number is in the result: add a decoration around the ball

                if(userNumberswithExtra.includes(results[currentIndex])){
                    document.getElementById('lotto').innerHTML+= '<span class="prout">'+ results[currentIndex] + '</span>'
                    currentIndex++;    
                }else{
                    document.getElementById('lotto').innerHTML+= '<span>'+ results[currentIndex] + '</span>'
                    currentIndex++;
                }        
            }
            else {
                clearInterval(interval);
            } 
            await new Promise(resolve => setTimeout(resolve, 7000));

            let winMoney = 0;

            if(amountCorrectBalls===1){
                 winMoney=2          
            }
            if(amountCorrectBalls===2){
                winMoney=10
            }
            if(amountCorrectBalls===3){
                winMoney=100
            }
            if(amountCorrectBalls===4){
                winMoney=500
            }
            if(amountCorrectBalls===5){
                winMoney=2000
            }
            if(amountCorrectBalls===6){
                winMoney=50000
            }
            if(amountCorrectBalls===7){
                winMoney=1000000
            }

            if(extraNumberFound===true){
                document.getElementById('extraFound').classList.remove('hidden')
                let winMoneyWithExtra = winMoney*2
                document.getElementById('winMoneyWithExtra').innerHTML=winMoneyWithExtra
            }

            document.getElementById('winningWaiting').classList.add('hidden')
            document.getElementById('winNumber').innerHTML = amountCorrectBalls;
            document.getElementById('winMoney').innerHTML = winMoney;
            document.getElementById('reset').classList.remove('hidden')
            document.getElementById('winSentence').classList.remove('hidden')

        }
        const interval = setInterval(displayNextValue, 1000);
        
        
        async function displayGain (){
            document.getElementById('gainBoard').classList.remove('hidden');
           
            for (i=0;i<correctBalls.length;i++){
                document.getElementById('winningsList').innerHTML+= '<span>'+ correctBalls[i] + ' </span>'
            }
            if (amountCorrectBalls === 0){
                document.getElementById('winningsList').innerHTML = 'No luck this time :('
            }   
        }

        async function startFunctions(){
            await displayNextValue();
            displayGain();
        }

        startFunctions();
        
        
    }else{
        displayError('Please select 7 numbers and one extra')
    }
  
} 

function reset(){
    location.reload();
}