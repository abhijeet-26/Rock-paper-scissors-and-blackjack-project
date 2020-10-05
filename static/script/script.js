function ageInDays()
{
    var birthYear=prompt("What is your age?");
    var days=(2020-birthYear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+days+' days old');
    h1.setAttribute('id','days');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset()
{
    document.getElementById('days').remove();
}

function generateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}

// challenge 3: Rock,paper and scissors
function rpsGame(yourChoice)
{
    // console.log(yourChoice);
    // console.log(yourChoice.src);
    var humanChoice, botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randToRpsInt());
    results=decideWinner(humanChoice,botChoice);// it return array; like [0,1] human loss|bot wins

    message=finalMessage(results);//{'message':'you wins','color':'green'}

    rpsFrontEnd(yourChoice.id,botChoice,message);

}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}
function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'rock':0,'scissors':0.5}
    }

    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore])
{
    if(yourScore==0){
        return{'message':'you lost!','color':'red'};
    }
    else if(yourScore==0.5){
        return{'message':'you tied','color':'yellow'};
    }
    else{
        return {'message':'you won!','color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImangeChoice,finalMessage){
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }


    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+imageDatabase[humanImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color: "+finalMessage['color']+"; font-size:60px; padding:30px;'>"+finalMessage['message']+"</h1>"
    botDiv.innerHTML="<img src='"+imageDatabase[botImangeChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

    
}

//challenge 4: change color of all buttons

var all_buttons=document.getElementsByTagName('button');


var copyAllButtons=[];
for (let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}



function buttonColorChange(buttonThingy){
    if(buttonThingy.value=='red'){
        buttonsRed();
    }
    else if(buttonThingy.value=='green'){
        buttonsGreen();
    }
    else if(buttonThingy.value=='reset'){
        buttonsReset();
    }
    else if(buttonThingy.value=='random'){
        randomColors();
    }
}

function buttonsRed()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }

}

function buttonsReset()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    let choice=['btn-primary','btn-warning','btn-danger','btn-success'];
    for(let i=0;i<all_buttons.length;i++){
        var randomNumber=Math.floor(Math.random()*4);

        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choice[randomNumber]);
    }
}

// challenge 5:Blackjack
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'card':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer']

const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3');
const lossSound=new Audio('static/sounds/aww.mp3');



document.querySelector("blackjack-hit-button").addEventListener("click",blackjackhit());
document.querySelector("blackjack-deal-button").addEventListener("click",blackjackdeal());
document.querySelector("blackjack-stand-button").addEventListener("click",dealerLogic());

function blackjackhit(){
if(blackjackGame['isStand']===false){
  let card=randomCards();
  updateScore(card,YOU);
  showCard(card,YOU);
  showScore(YOU);
}
}

function showCard(card,activePlayer){
if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`static/images_card/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}
}

function balckjackdeal()
{
if(blackjackGame['turnOver']===true){
    blackjackGame['isStand']=false;
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }
    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='white';
    document.querySelector('#dealer-blackjack-result').style.color='white';


    document.querySelector('#blackjack-result').textContent="Let's Play";
    document.querySelector('#blackjack-result').style.color='black';
    blackjackGame['turnOver']=true;
}
    
}

function randomCards()
{
    let randomIndex=Math.floor(Math.random()*13);

    return blackjackGame['card'][randomIndex];
}

function updateScore(card,activePlayer){
    if(card=='A'){
    //If adding 11 keeps me below 21, add 11. otherwise, add 1
    if(activePlayer['score']+blackjackGame['cardMap'][card]<=21){
        activePlayer['score']+=blackjackGame['cardMap'][card][1];
    }else{
        activePlayer['score']+=blackjackGame['cardMap'][card][0];
    }
   } else{
    activePlayer['score']+=blackjackGame['cardMap'][card];
   }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){ 
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];

    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}


async function dealerLogic()
{blackjackGame['isStand']=true;
while(DEALER['score']<16 & blackjackGame['isStand']===true){    
    
    let card=randomCards();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(100);
}


   
    blackjackGame['turnOver']=true;
    let winner=computeWinner();
    showResult(winner);
    
    
}

function computeWinner()
{
    let winner;
    if(YOU['score']>DEALER['score']||DEALER['score']>21){
        blackjackGame['wins']++;
        winner=YOU;
    }else if(YOU['score']<DEALER['score']){
        blackjackGame['losses']++;
        winner=DEALER;
    }
    else if(YOU['score']==DEALER['score']){
       blackjackGame['draws']++;

    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;
    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;

    }
    console.log('winner is '+winner);
    return winner;
} 

function showResult(winner)
{
if(blackjackGame['turnOver']===true){
    let message, messageColor;
    if(winner==YOU){
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message='You won !';
        messageColor='green';
        winSound.play();
    }
    else if(winner==DEALER){
        document.querySelector('#losses').textContent=blackjackGame['losses'];
        message='You lost !';
        messageColor='red';
        lossSound.play();
    }
    else{
        document.querySelector('#draws').textContent=blackjackGame['draws'];
        message='You Drew! ';
        messageColor='black';
    }

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
}
}