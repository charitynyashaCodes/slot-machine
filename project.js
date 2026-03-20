//1.deposit some money
//2. determine number of lines to bet
//3. collect a bet amount
//4. spin the slot machine 
//5. check if the user won
//6.give the user their winnings
//7.play again

const prompt = require("prompt-sync")()

const deposit = () => {
   while(true){
   const depositAmount = prompt("Enter a deposit amount: ");
   const numberDepositAmount = parseFloat(depositAmount)
   if(isNaN(numberDepositAmount) || numberDepositAmount<= 0){
      console.log("invalid deposit amount please try again")
   }
   else{
      return numberDepositAmount
   }
   }
   
}

let balance = deposit()
console.log(balance)

const getNumberOfLines = () => {
   while(true){
   const lines = prompt("Enter the number of lines to bet on (1-3)");
   const numberOfLines= parseFloat(lines)
   if(isNaN(numberOfLines) || numberOfLines <= 0 ||  numberOfLines >3 ){
      console.log("invalid number of lines please ,try again")
   }
   else{
      return numberOfLines
   }
   }
   
}

const numberOfLines = getNumberOfLines()
console.log(numberOfLines)

const getBet = (balance,numberOfLines) => {
   while(true){
   const bet = prompt("Enter the total bet per line:");
   const numberBet= parseFloat(bet)
   if(isNaN(numberBet) || numberBet <= 0 ||  numberBet > balance / numberOfLines ){
      console.log("invalid number of bet please ,try again")
   }
   else{
      return numberBet
   }
   }
   
}

const numberBet = getBet(balance,numberOfLines)
console.log(numberBet)
