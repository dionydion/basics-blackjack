var makeDeck = function(){
  // create 3 different lists containing ranks,names and suits of a deck of 52 cards respectively
  rankList = [11,2,3,4,5,6,7,8,9,10,10,10,10]
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

var checkBlackJack = function(array){
  totalScore = array[0].rank + array[1].rank
  if (array.length==2 && totalScore>=21){
    return true 
  }
  return false
}

/*
// create a variable shuffledDeck that stores a shuffled deck
var shuffledDeck = shuffleDeck(makeDeck())
console.log(shuffledDeck)
var PLAYERS_SPECIFIED = false
var numOfPlayers = 'not specified yet' 
var HIT_OR_STAND_ROUND = false 
var advanceRound = false 
var playerScoreArray = []
var playerCounter = 0
// Create a blackJack game for multiple players
var main = function(input){ 
  // receive input from client on how many players will be playing
  if (PLAYERS_SPECIFIED == false){
    PLAYERS_SPECIFIED = true
    numOfPlayers = input
    return `Number of Players in this round: ${numOfPlayers}<br><br> Click the Submit Button to begin the game!`
  }
  // This is the pre round where the output shows everyones cards before they get to choose whether they want to hit or stand
  if (HIT_OR_STAND_ROUND == false){
    // every player gets two cards initally then the dealer gets two cards
    playerCardsList = []
    for (i=0;i<numOfPlayers;i+=1){
      playerCards = [] 
      // draw two cards from the top of the deck and add them to the centralised pool of players cards
      playerCards.push(shuffledDeck.pop())
      playerCards.push(shuffledDeck.pop())
      playerCardsList.push(playerCards)
    }

    // dealer then draws two cards after every player gets their cards
    dealerCardsList = []
    dealerCardsList.push(shuffledDeck.pop())
    dealerCardsList.push(shuffledDeck.pop())
    
    // output everyones individual cards
    var myOutputValue = ``
    counter = 0
    for (i=0;i<playerCardsList.length;i+=1){
      myOutputValue += `Player ${counter + 1} hand: ${playerCardsList[counter][0].name} of ${playerCardsList[counter][0].suit} & ${playerCardsList[counter][1].name} of ${playerCardsList[counter][1].suit}<br> `
      counter += 1
    }
    HIT_OR_STAND_ROUND =true
    return myOutputValue + `<br><br> Hit the submit button to advance to the hit or stand round for each player `
  }
  // this is the hit or stand round where each player gets to decide if they want to hit or stand
  // fill up an array containing every single players total score
  for (i=0;i<playerCardsList.length;i+=1){
    totalScore = playerCardsList[i][0].rank + playerCardsList[i][1].rank
    playerScoreArray.push(totalScore)
    console.log(playerScoreArray)
  } 
  // if all players have taken their turn its time to showdown with the dealer
  if (numOfPlayers == playerCounter){
    dealerScore = dealerCardsList[0].rank + dealerCardsList[1].rank
    while (dealerScore<16){
      topCard = shuffledDeck.pop()
      dealerScore += topCard.rank
    }
    var myOutputValue = `The dealer drew ${dealerCardsList[0].name} of ${dealerCardsList[0].suit} & ${dealerCardsList[1].name} of ${dealerCardsList[1].suit}.<br> He has a total score of ${totalScore}`
    // if dealer gets blackJack 
    if (checkBlackJack(dealerCardsList)){
      myOutputValue += `<br> The dealer has a blackJack! `
      for (i=0;i<numOfPlayers;i+=1){
        if (playerScoreArray[i] <1000){
          myOutputValue += `<br> Player ${i+1} loses!`
        }
        myOutputValue += `<br> Player ${i+1} wins!`
      }
      return myOutputValue
    }
    for (i=0;i<numOfPlayers;i+=1){
      if (playerScoreArray[i]>dealerScore){
        myOutputValue += `<br>Player ${i+1} wins!`
      }
      else if (playerScoreArray[i]<dealerScore){
        
        myOutputValue += `<br>Player ${i+1} loses!`
      }
    return myOutputValue
    }
  }
    // show each player score and see if they wanna hit or stand
    if (advanceRound == false){
    var myOutputValue = `Hello Player ${playerCounter+1}!<br><br> Your hand: ${playerCardsList[playerCounter][0].name} of ${playerCardsList[playerCounter][0].suit} & ${playerCardsList[playerCounter][1].name} of ${playerCardsList[playerCounter][1].suit}<br>Your total score: ${playerScoreArray[playerCounter]}`
    // the player automatically wins if they get a blackjack
    if (checkBlackJack[playerCardsList[playerCounter]]){
      playerCounter += 1
      playerScoreArray[playerCounter] = 100
      return  myOutputValue + `<br><br>BlackJack! You won!<br>Hit the submit button for players ${playerCounter+2}'s turn!`

    }
    advanceRound = true
    return myOutputValue + `<br> Would you like to hit or stand?<br>Type it into the box and hit the submit button!`
    }
    if (advanceRound = true){
      hitOrStand = input
      // if player wants to take a hit, then will continue adding score to his total score
      if (hitOrStand == 'hit'){
        topCard = shuffledDeck.pop()
        playerScoreArray[playerCounter] += topCard.rank
        // if the players score exceeds 21 he automatically loses and it will be the next players turn 
        if (playerScoreArray[playerCounter]>21){
          playerScore = playerScoreArray[playerCounter]
          playerScoreArray[playerCounter] = 0 
          playerCounter += 1
          advanceRound = false
          return `You drew ${topCard.name} of ${topCard.suit}!<br><br> You have a total score of ${playerScore}<br><br> You Lost!<br><br> Hit the submit button!`
        }
        // check if the current player still intends to continue hitting or stand
        var newOutputValue = `You drew ${topCard.name} of ${topCard.suit}!<br><br> Your total score is now:${playerScoreArray[playerCounter]}<br><br>Would you like to hit or stand?<br>Type it into the box and hit the submit button!`
        return newOutputValue
      }
      // if the player stands the next player gets his turn 
      if (hitOrStand == 'stand'){
        playerCounter += 1
        advanceRound = false
        if (playerCounter = numOfPlayers){
          ` Hit the submit button for Showdown with the dealer!!`
        }
        return` Hit the submit button for the next players turn!`
      }
    }
}
*/


var main = function(input){
  //input number of players
  //every player gets dealt two cards and gets a total score 
  //dealer gets dealt his two cards last
  //show everyone what cards they got
  //Let each player make their decision as to whether they want to hit or stand using the hit or stand buttons 
  //Every player has settled their choices, showdown with the dealer
}