var makeDeck = function(){
  // create 3 different lists containing ranks,names and suits of a deck of 52 cards respectively
  rankList = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  nameList = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack,','queen','king']
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


console.log(makeDeck())
console.log(shuffleDeck(makeDeck()))
console.log(checkDuplicates(shuffleDeck(makeDeck())))
