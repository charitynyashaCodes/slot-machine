//1.deposit some money
//2. determine number of lines to bet
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6.give the user their winnings
//7.play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,

  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    //why are the for loops nested inside eachother what effectdoes that
    for (let i = 0; i < count; i++) {
      symbols.push(symbol); //how did this affesct the output of the arrays ,what effect does this have on the arrays
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length); //WHAT DOES THE MATH.RANDOM DO
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1); // hey explain how thegame works and why we need to remove the selected symbol give me a visual representation of this game so i can see how it actuaally works i dont understand why we need to remove a selscted symbol and how we actually select this symbol
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (let row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (numberBet, numberOfLines, rows) => {
  let winnings = 0;

  for (let row = 0; row < numberOfLines; row++) {
    // tell me what tis condition does and how iys impacting ths loop and what the var stated does and ow it affects the block of code
    const symbols = rows[row]; // explain this one to me and also what does this rows[row] mean
    let allsame = true; // i want to understand why to do we state var inside the for loops what its for
    for (let symbol of symbols) {
      if (symbol !== symbols[0]) {
        allsame = false;
        break;
      }
    }
    if (allsame){
        winnings += numberBet * SYMBOLS_VALUES[symbols[0]]; // what does putting the bracket mean
    }
   
  }
  return winnings;
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("invalid deposit amount please try again");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("invalid number of lines please ,try again");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, numberOfLines) => {
  while (true) {
    const bet = prompt("Enter the total bet per line: ");
    const numberBet = parseFloat(bet);
    if (
      isNaN(numberBet) ||
      numberBet <= 0 ||
      numberBet > balance / numberOfLines
    ) {
      console.log("invalid number of bet please ,try again");
    } else {
      return numberBet;
    }
  }
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of $" + balance.toString());
    console.log(balance);
    const numberOfLines = getNumberOfLines();
    console.log(numberOfLines);
    const numberBet = getBet(balance, numberOfLines);
    console.log(numberBet);
    balance -= numberBet * numberOfLines;
    const reels = spin();
    console.log(reels);
    const rows = transpose(reels);
    console.log(rows);
    printRows(rows);
    const winnings = getWinnings(numberBet, numberOfLines, rows); // why does it refuse to return results when i put in (bet,lines,rows) but when i pass it in a function it doesn't
    balance += winnings;
    console.log("You Won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You have run out of money");
      break;
    }
    const playAgain = prompt("Do you want to continue playing (y/n)");
    if (playAgain != "y") break;
  }
};
game();
