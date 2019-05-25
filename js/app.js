//  an array of all the cards and empty arrays used for opened and matched cards
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
let openedCards = [];
let matchedCards = [];

// variables given to certain parts of the index.html
const cardsContainer = document.querySelector(".deck");
const stars = document.querySelectorAll(".fa-star");

// variable on moves counter 
let movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

// starts the game upon opening webpage
startGame();

// shuffle function used to shuffle the icons array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// function to start the game
function startGame() {

    shuffle(icons);
    // for loop used to add the cards into the index.html
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        click(card);
    }
    
    // timer variable also implement data to the index.html
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 Mins 0 Secs";
    clearInterval(interval);
}

// function upon clicking card using event listner
function click(card) {

    card.addEventListener("click", function() {
        
        const currentCard = this;
        const previousCard = openedCards[0];

        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disabled");
            openedCards.push(this);

            compare(currentCard, previousCard);

        } else {
        
            currentCard.classList.add("open", "show", "disabled");
            openedCards.push(this);
        }
        
    });
}

// function to compare cards, if cards match remain open and disabled from clicking
function compare(currentCard, previousCard) {

    if(currentCard.innerHTML === previousCard.innerHTML) {
                
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        congratulations();

    } else {
        
        // if cards dont match, they will disappear with a little timeout
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disabled");
            previousCard.classList.remove("open", "show", "disabled");
            
        }, 250);

        openedCards = [];
        
    }
    addMove();
}

// each attempt to match a card will increase the move stat. 
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

// upon first move the timer will start.  
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }

// star rating depending on how many moves have been made
    if (moves > 14 && moves < 18){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 25){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// timer function 
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" Mins "+second+" Secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// reset button initiate startGame function
let restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    
    cardsContainer.innerHTML = "";

    startGame();

    reset();
});

// reset function on matched cards, moves, and stars
function reset() {

    matchedCards = [];

    moves = 0;
    movesContainer.innerHTML = moves;  

    for (var i= 0; i < stars.length; i++){
        stars[i].style.visibility = "visible";
    }
}

// function to congratulate player on finishing game
function congratulations(){
    if (matchedCards.length === icons.length){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //show move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

    };
}

// click to reset game
function playAgain(){
    modal.classList.remove("show");
    
    cardsContainer.innerHTML = "";

    startGame();

    reset();
}