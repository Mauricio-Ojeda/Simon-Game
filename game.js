const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [],
    userClickedPattern = [],
    level = 0,
    started = false;

// repite todo el patron del juego si el usuario no se equivoca
function myGamePatternLoop() { //  create a loop function
    setTimeout(function() { //  call a setTimeout when the loop is called
        $('#' + gamePattern[i]).fadeOut(100).fadeIn(100);

        let audio = new Audio('sounds/' + gamePattern[i] + '.mp3');
        audio.play(); //  your code here
        i++; //  increment the counter
        if (i < gamePattern.length) { //  if the counter < al largo del arrelgo gamePattern, call the loop function
            myGamePatternLoop(); //  ..  again which will trigger another 
        } //  ..  setTimeout()
    }, 370)
};


function nextSequence() {
    userClickedPattern = [];

    i = 0 // inicializacion para myGamePatternLoop()
        //step 2
    const randomNumber = Math.floor(Math.random() * 4); // se elige un nuevo color de manera random
    let randomChosenColour = buttonColours[randomNumber];// se captura el color del arreglo button color

    level++;
    $('#level-title').text('Level ' + level); // se aumenta el nivel en 1 y se muestra en panatalla

    gamePattern.push(randomChosenColour); // se agrega al patron de juego el nuevo color elegido
    myGamePatternLoop(); 



};

const playSound = (name) => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const animatePress = (currentColour) => {
    $('#' + currentColour).addClass('pressed');

}

// se arma el patron del usuario

$('.btn').on('click', function() {

    let userChosenColour = $(this).attr('id'); // se captura el id donde el usuario hace click

    userClickedPattern.push(userChosenColour); // se arma el arreglo del patron del usuario

    playSound(userChosenColour);

    animatePress(userChosenColour);

    setTimeout(function() {
        $('#' + userChosenColour).removeClass('pressed');
    }, 150);

    checkAnswer(userClickedPattern.length - 1);
});

// se resetea el juego
const startOver = () => { 
    level = 0;
    gamePattern = [];
    started = false;
};

// se compara el patron del juego con el del usuario

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { 
        console.log("bien");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { // si son iguales se arma otra secuencia
                nextSequence()
            }, 1000);
        }


    }else { 
        // Si el patron no es igual se manda un msj de error y se reinicia el juego 
        const audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $('#level-title').text('Game Over, Press Any Key to Restart or click the button');
        $('.myButton').text('Restart');
        $('body').addClass('game-over')
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
        
    }


}

// The game start if any key is pressed

$(document).keypress( () => {
    if (!started) {
        nextSequence()
        started = true;
        console.log("entro al if de game start");
    }
});

// The game start if click the button
$('.myButton').click( () => {
    if (!started) {
        nextSequence()
        started = true;
        $('.myButton').text('Start Game');
        console.log("entro al if de game start por el button");
    }
})
