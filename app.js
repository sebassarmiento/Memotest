var playButton = document.getElementById('play')
var mainContainer = document.getElementById('main-container')
var startPage = document.getElementById('start')

playButton.onclick = setUp

var piecesArray = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8']
var memoryValues = []
var memoryValuesId = []
var piecesFlipped = 0

function setUp(){
    startPage.classList.add('no-display')
    mainContainer.classList.remove('no-display')
    piecesArray.sort(function(a, b){return 0.5 - Math.random()})
    for(var i = 0;i<piecesArray.length;i++){
        backPiece[i].innerHTML = piecesArray[i]
        backPiece[i].classList.add('piece-letter')
        backPiece[i].id = i
    }
    start()
}

var backPiece = document.getElementsByClassName('back')
var boxes = document.getElementsByClassName('box')

for(var i = 0;i<boxes.length;i++){
    boxes[i].onclick = flipBox
}

function flipBox(event){
    var boxClicked = event.target
    if(memoryValues.length < 2){
        boxClicked.parentNode.classList.add('flip')
        if(memoryValues.length===0){
            memoryValues.push(boxClicked.firstElementChild.innerHTML)
            memoryValuesId.push(boxClicked.firstElementChild.id)
            console.log('entro 1', boxClicked.firstElementChild.innerHTML)
        }else if(memoryValues.length===1){
            memoryValues.push(boxClicked.firstElementChild.innerHTML)
            memoryValuesId.push(boxClicked.firstElementChild.id)
            if(memoryValues[0]===memoryValues[1]){
                console.log('Son iguales')
                piecesFlipped += 2
                memoryValues = []
                memoryValuesId = []
                if(piecesFlipped===piecesArray.length){
                    console.log('Entro al finished game')
                    stop()
                    setTimeout(finishedGame, 800)
                }
            }else{
                console.log('No son iguales')
                let piece1 = document.getElementById(memoryValuesId[0].toString())
                let piece2 = document.getElementById(memoryValuesId[1].toString())
                setTimeout(function(){
                    console.log('Corre la funcion')
                    piece1.parentNode.parentNode.classList.remove('flip')
                    piece2.parentNode.parentNode.classList.remove('flip')
                }, 700)
                memoryValues = []
                memoryValuesId = []
            }
        }
    }
}


function flipBack(){
    boxClicked.parentNode.classList.remove('flip')
}

var playAgainButton = document.getElementById('play-again')

playAgainButton.onclick = newGame

var finishTextNode = document.getElementById('finish-text')

var inputNodeName = document.getElementById('input-name')

var timer = document.getElementById('time')

function finishedGame(){
    if(!finishTextNode.classList.contains('d-none')){
        timer.classList.add('d-none')
        playAgainButton.classList.remove('d-none')
    let finishText = document.createElement('h1')
    finishText.id = 'finish-text'
    finishText.classList.add('text-center', 'pt-4')
    finishText.innerHTML = 'Congratulations '+inputNodeName.value+'!'+'\n Your time is '+convertSeconds(value)
    finishTextNode.appendChild(finishText)
    }else{
        timer.classList.add('d-none')
        let finishText = document.getElementById('finish-text')
        finishText.innerHTML = '<h1>Congratulations '+inputNodeName.value+'!'+'\n Your time is '+convertSeconds(value)+'</h1>'
        finishText.classList.add('text-center', 'pt-4', 'font-color')
        finishTextNode.classList.remove('d-none')
        playAgainButton.classList.remove('d-none')
    }
}

function newGame(){
    start()
    timer.classList.remove('d-none')
    for(var i = 0;i<boxes.length;i++){
        boxes[i].classList.remove('flip')
    }
    piecesArray.sort(function(a, b){return 0.5 - Math.random()})
    for(var i = 0;i<piecesArray.length;i++){
        backPiece[i].innerHTML = piecesArray[i]
        backPiece[i].classList.add('piece-letter')
        backPiece[i].id = i
    }
    piecesFlipped = 0
    playAgainButton.classList.add('d-none')
    finishTextNode.classList.add('d-none')
}


// Temporizador

function changeValue(){
    value++
    timer.innerHTML = convertSeconds(value)
}

var timeInterval = null

function start(){
    stop()
    value = 0
    timeInterval = setInterval(changeValue, 1000)
}

function stop(){
    clearInterval(timeInterval)
}

function convertSeconds(s){
    var min = Math.floor(s/60)
    var sec = s%60
    if(sec<10){
        sec = '0'+sec
    }
    return min+':'+sec
}