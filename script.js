var arr = [
    FoodData = {},
    ExerciseData = {}
]

window.onload = function(){
    var btn = document.querySelector('form')
    btn.addEventListener('submit',getUserDetails)
}

function getUserDetails(){
    event.preventDefault()
    var userInput = document.getElementsByClassName('input')

    // these lines of codes checks, if a particular food or exercise is already present, if yes add the calories else make a new entry
    if( FoodData[userInput[0].value]){
        FoodData[userInput[0].value] = Number(arr[0][userInput[0].value]) + Number(userInput[1].value)
    }
    else{
        FoodData[userInput[0].value] = Number(userInput[1].value)
    }

    if(ExerciseData[userInput[2].value]){
        ExerciseData[userInput[2].value] = Number(arr[1][userInput[2].value]) + Number(userInput[3].value)
    }
    else{
        ExerciseData[userInput[2].value] = Number(userInput[3].value)
    }
    console.log(arr)

    emptyInputElements()
}

// it removes the input values after submiting the values
function emptyInputElements(){

    renderTable()

    var userInput = document.getElementsByClassName('input')
    for(var i = 0; i < userInput.length; i++){
        if(i == 0 || i == 2){
            userInput[i].value = ''
        }
        else{
            userInput[i].value = 0
        }
    }

}



function renderTable(){

    var table = document.getElementById('userResult')

    var userInput = document.getElementsByClassName('input')
    var foodItem = userInput[0].value
    var foodCalorie = Number(userInput[1].value)
    var exerciseItem = userInput[2].value
    var exerciseCalorie = Number(userInput[3].value)

    var row = document.createElement('tr')

    var calConsumed = document.createElement('td')
    if(foodItem == ''){
        calConsumed.textContent = ''
    }
    else{
        calConsumed.textContent = foodItem + " : " + foodCalorie
    }
    
    var calSpent = document.createElement('td')
    if(exerciseItem == ''){
        calSpent.textContent = ''
    }
    else{
        calSpent.textContent = exerciseItem + " : " + exerciseCalorie
    }


    var netCalorie = getNetCalorie()
    showMessage(netCalorie)
    var netCal = document.createElement('td')
    netCal.textContent = netCalorie



    row.append(calConsumed, calSpent, netCal)
    table.append(row)

}


function getNetCalorie(){
    var calConsumed = Object.values(arr[0])
    var calSpent = Object.values(arr[1])
    var countFoodCalorie = calConsumed.reduce(function(a,b){
        return Number(a)+Number(b)
    })
    var countExerciseCalorie = calSpent.reduce(function(a,b){
        return Number(a)+Number(b)
    })

    console.log(countFoodCalorie, countExerciseCalorie)

    if(countFoodCalorie > countExerciseCalorie){
        return ("+" + (countFoodCalorie - countExerciseCalorie) )
    }
    if(countFoodCalorie < countExerciseCalorie){
        return ("-" + (countExerciseCalorie - countFoodCalorie))
    }
    else{
        return 0
    }
    
}


function showMessage(str){
    var displayMessage = document.getElementById('resultMessage')

    if(str != 0){
        str = str.split('')
        var symbol = str.shift()
        var weightEquivalentOfCalorie = getWeightEquivalentOfCalorie(str.join(''))
       
    
        if(symbol == '+'){
            displayMessage.textContent = 'You have gained calories, equivalent to ' + weightEquivalentOfCalorie + ' kgs'
            displayMessage.setAttribute('class','gainedWeight')
        }
    
        if(symbol == '-'){
            displayMessage.textContent = 'You have lost calories, equivalent to ' + weightEquivalentOfCalorie + ' kgs'
            displayMessage.setAttribute('class','lostWeight')
        }
    }
    else{
        displayMessage.textContent = 'You have neither gained, nor lost calories'
    }

}

function getWeightEquivalentOfCalorie(input){
    input = Number(input)

    var weightEquivalent = Math.round((1/7000)*input*1000)/1000
    return weightEquivalent
}