var makeDeck = function(){
  // create 3 different lists containing ranks,names and suits of a deck of 52 cards respectively
  rankList = [1,2,3,4,5,6,7,8,9,10,10,10,10]
  nameList = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king']
  suitList = ['diamond','club','heart','spade']
  // create a deck filled with 52 objects whereby each object represents a card from a deck of 52 playing cards.
  // each object has 3 attributes: name,rank and suit
  deck = []
  for (i=0;i<suitList.length;i+=1){
    for (j=0;j<rankList.length;j+=1){
      var card = {
        name:nameList[j],
        rank:rankList[j],
        suit:suitList[i]
      }
      deck.push(card)
    }
  }
  return deck
}

var shuffleDeck = function(deck){
  //the function shuffles a deck by randomly assorting the cards around
  sizeOfDeck = deck.length;
  for (i=0;i<sizeOfDeck;i+=1){
    // create a random index 
    randomIndex = Math.floor(Math.random()*sizeOfDeck)
    // store the value of the current element 
    currentElement = deck[i] 
    // swap the value of the current element with the value of a random element in the deck
    deck[i] = deck[randomIndex]
    deck[randomIndex] = currentElement
  }
  return deck
}

var createSymbol = function(suit){
  var myOutputValue = `♦️`
  if (suit == 'club'){
    myOutputValue = `♣️`
  }
  else if (suit == 'heart'){
    myOutputValue = `♥️`
  }
  else if (suit == 'spade'){
    myOutputValue = `♠️`
  }
  return myOutputValue
}

var playerCards = []
var dealerCards = []
var totalScore = 0
var dealerTotalScore = 0
var startGame = function(){
  shuffledDeck = shuffleDeck(makeDeck())
  playerCards.push(shuffledDeck.pop())
  playerCards.push(shuffledDeck.pop())
  dealerCards.push(shuffledDeck.pop())
  dealerCards.push(shuffledDeck.pop())
  totalScore += playerCards[0].rank + playerCards[1].rank
  dealerTotalScore += dealerCards[0].rank + dealerCards[1].rank
  hitButton.disabled = false
  standButton.disabled = false
  button.disabled = true
}

var displayPlayerCards = function(){
  return `Hello!!<br><br>Your hand: <br>${playerCards[0].name} of ${createSymbol(playerCards[0].suit)} <br> ${playerCards[1].rank} of ${createSymbol(playerCards[1].suit)}`
}


var playerHit= function(){
  GAME_STATE = 'hit'
  topCard = shuffledDeck.pop()
  playerCards.push(topCard)
  totalScore += topCard.rank
}


var playerStand = function(){
  GAME_STATE = 'stand'
  hitButton.disabled = true
  standButton.disabled = true
  showdownButton.disabled = false

}

var restartGame= function(){
  playerCards = []
  dealerCards = []
  totalScore = 0
  dealerTotalScore = 0
  GAME_STATE = 'waiting to begin'
}
var generateOutputMessage = function(playerCounter){
  var myOutputValue = `Your hand:<br>`
  for (i=0;i<playerCards.length;i+=1){
    myOutputValue += `<br>${playerCards[i].name} of ${createSymbol(playerCards[i].suit)}`
  }
  return myOutputValue + `<br><br>Your hand totals to ${totalScore}.<br><br> Click 'Hit' to deal yourself another card or 'stand' to pass.`

}

var checkDealerWinner = function(){
  if (dealerTotalScore<=21 && totalScore>21){
    return true
  }
  if (dealerTotalScore<=21 && dealerTotalScore> totalScore){
    return true
  }
  if (totalScore<16){
    return true 
  }
  return false
}

var checkTie = function(){
  if (dealerTotalScore==totalScore){
    return true
  }
  if (dealerTotalScore>21 && totalScore>21){
    return true
  }
  return false
}

var playerShowdown= function(){
  GAME_STATE = 'showdown'
  button.disabled = false
  showdownButton.disabled = true

}
var checkBJ = function(Cards){
  firstCardRank = Cards[0].rank
  secondCardRank = Cards[1].rank
  if (firstCardRank==10 && secondCardRank==1){
    return true
  }
  if (firstCardRank==1 && secondCardRank==10){
    return true
  }
  if (firstCardRank==1 && secondCardRank==1){
    return true
  }
  return false 
}


var generateDealerMessage = function(){
  while (dealerTotalScore<16){
    topCard = shuffledDeck.pop()
    dealerCards.push(topCard)
    dealerTotalScore += topCard.rank
  }
  var myOutputValue = "<br><br>Dealer's hand:<br>"
  for (i=0;i<dealerCards.length;i+=1){
    myOutputValue += `<br>${dealerCards[i].name} of ${createSymbol(dealerCards[i].suit)}`
  }  
  return myOutputValue + `<br><br>Dealer's hand totals to ${dealerTotalScore}.`
}
var GAME_STATE = 'waiting to begin'
// MAIN function 
var main = function(){
  if (GAME_STATE== 'end'){
    // restart the game
    restartGame()
  }
  if (GAME_STATE == 'waiting to begin'){
    //player gets dealt two cards and gets a total score (starting the game)
    //dealer gets dealt his two cards last
    startGame()
    //show player what cards he got
    var myOutputValue = displayPlayerCards()
    // if both players blackjack
    if (checkBJ(playerCards) && checkBJ(dealerCards)){
      hitButton.disabled = true
      standButton.disabled = true
      button.disabled = false
      myOutputValue += `<br>Wow! You and the Dealer got a blackjack!Such luck!<br><br> Play again?` + '<br><br><img src="https://c.tenor.com/ASqf9UFYc8UAAAAC/sad-lonely.gif"/ class = "center">'
      GAME_STATE = 'end'
    }
    // if player blackjacks
    
    else if (checkBJ(playerCards)){
      hitButton.disabled = true
      standButton.disabled = true
      button.disabled = false
      myOutputValue += `<br>Wow! You got a blackjack!<br>Such luck! Such Stonk!<br><br> Play again?` + 
      '<br><br><img src="https://c.tenor.com/ixcE-G9MdMMAAAAC/tobey-maguire-hairflip.gif"/ class = "center">'
      GAME_STATE = 'end'
    }
    // if computer blackjacks
    else if (checkBJ(dealerCards)){
      hitButton.disabled = true
    standButton.disabled = true
      button.disabled = false
      myOutputValue += `<br>Oh no! The Dealer got a blackjack!<br>TOO BAD!<br><br> Play again?`+ '<br><br><img src="https://c.tenor.com/WIW1ONiEU_UAAAAd/tobey-maguire-tobey.gif"/ class = "center">'
      GAME_STATE = 'end'
    }
    // neither blackjack
    else{
      myOutputValue += `<br><br>Your hand totals to ${totalScore}. <br><br> Click 'Hit' to deal yourself another card or 'stand' to pass. ` +'<br><br><img src="https://c.tenor.com/7PpiVBTIBXQAAAAC/spiderman-tobey-maguire.gif"/ class = "center">'
    }
    
    return myOutputValue 
  }
  // when player press Hit 
  if (GAME_STATE== 'hit'){
    var myOutputValue = generateOutputMessage()
    // if total score is more than 21, player not allowed to hit anymore  
    if (totalScore>21){
      showdownButton.disabled = false
      hitButton.disabled = true
      standButton.disabled = true
      myOutputValue += `<br><br>You have exceeded the score of 21 :(<br>Hit the Showdown button!`+ '<br><br><img src="https://c.tenor.com/ASqf9UFYc8UAAAAC/sad-lonely.gif"/ class = "center">'
    }
    return myOutputValue + '<br><br><img src="https://c.tenor.com/Jyi28_-rggYAAAAC/spiderman-tobeymaguire.gif"/ class = "center">'
  }
  // when player press stand
  if (GAME_STATE=='stand'){
    return generateOutputMessage() + `<br><br>It is the Dealer's turn.<br>Click "Showdown" to view the Dealer's hand` + '<br><br><img src="https://c.tenor.com/64IvgK_QzagAAAAC/spider-man3-tobey-maguire.gif"/ class = "center">'
  }
  // make the showdown button appear when stand is pressed
  if (GAME_STATE == 'showdown'){
    var myOutputValue = generateOutputMessage() + generateDealerMessage()
    if (checkTie()){
      myOutputValue += "<br><br> Its a tie! Play again?" +'<br><br><img src="https://c.tenor.com/xvFtxVmfaXcAAAAC/spiderman-thats-it.gif"/ class = "center">'
    }
    else if (checkDealerWinner()){
      myOutputValue += "<br><br> You Lose. Play again?" + '<br><br><img src="https://c.tenor.com/iOGgrk1J9VsAAAAd/mr-ditkovich-spiderman.gif"/ class = "center">'
    }
    else{
      myOutputValue += `<br><br>You won!! Play again?` + '<br><br><img src="https://c.tenor.com/QyaGf0GUl4cAAAAC/spiderman-peter-parker.gif"/ class = "center">'
    }
    GAME_STATE = 'end'
    hitButton.disabled = true
  standButton.disabled = true
    return myOutputValue
  }

}
  