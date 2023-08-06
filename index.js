// $('h1').html('hello boys')
/** generate random number
 *  add number to array
 * trigger that tile to have animation (opacity?) and trigger sound
 *  have player repeat same tile hit
*   punish player if wrong 
if player is right, generate another number
add to array
trigger both tiles in sequence array to go off
verify that player hits them in that same order
repeat if player is correct
*/
buttonColors = ['green', 'red', 'yellow', 'blue']
gamePattern = []
userChoicePattern = []
level = 1
gameStart = false
$('body').on('keypress', function (e) {
    if (e.key == 'a' || e.key == 'A') {
        if (gameStart == false) {
            game()
        }
    } else {
        console.log(e.key)
    }
})

function game() {
    gameStart = true
    gamePattern = []
    nextSequence()

}
function checkAnswer(currentLevel) {
    if (userChoicePattern[currentLevel] == gamePattern[currentLevel]) {
        console.log('success!')
        if (userChoicePattern.length == gamePattern.length) {
            setTimeout(nextSequence, 2000)
        }
    } else {
        $('h1').html('failure!')
        gameStart = false
        playSound('wrong')
        level = 1
        $('body').toggleClass('game-over')
        setTimeout(function () {
            $('body').toggleClass('game-over')

        }, 200)
    }
}

$('.btn').on('click', function (e) {
    console.log(this)
    userChoicePattern.push(this.id)
    playSound(this.id)
    animateButton(this.id)
    checkAnswer(userChoicePattern.length - 1)

})

function nextSequence() {
    userChoicePattern = []
    $('h1').html('Level ' + level)
    randomNumber = Math.floor(Math.random() * 4)
    console.log(randomNumber)
    randomColor = buttonColors[randomNumber]
    gamePattern.push(randomColor)

    playSound(randomColor)
    animateButton(randomColor)
    level++
}

function playSound(color) {
    var sound = new Audio('sounds/' + color + ".mp3")
    sound.play()
}

function animateButton(color) {
    $("#" + color).toggleClass('pressed')
    setTimeout(function () {
        $("#" + color).toggleClass('pressed')
    }, 200)
}