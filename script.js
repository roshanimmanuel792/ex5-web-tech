// Ex.5 - JavaScript DOM Elements and Events (CarePlus Hospital)

// 1. Shortest and longest word in a string
function findWords() {
  var str = document.getElementById("text").value.trim();
  if (str == "") {
    alert("Please type a note");
    return;
  }
  var words = str.split(/\s+/);
  var shortest = words[0];
  var longest = words[0];
  for (var i = 1; i < words.length; i++) {
    if (words[i].length < shortest.length) shortest = words[i];
    if (words[i].length > longest.length) longest = words[i];
  }
  document.getElementById("shortest").innerHTML = "'" + shortest + "'";
  document.getElementById("longest").innerHTML = "'" + longest + "'";
}

// 2. BMI = weight / (height * height)
function calculate() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value);
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }
  var bmi = weight / (height * height);
  var type;
  if (bmi < 18) type = "Underweight";
  else if (bmi <= 25) type = "Normal";
  else if (bmi <= 30) type = "Overweight";
  else type = "Obese";

  document.getElementById("score").innerHTML = bmi.toFixed(2);
  document.getElementById("type").innerHTML = type;

  var types = ["Underweight", "Normal", "Overweight", "Obese"];
  for (var i = 0; i < types.length; i++) {
    document.getElementById("row-" + types[i]).className = "";
  }
  document.getElementById("row-" + type).className = "active";
}

// 3. Grid of random occupied / vacant beds
function grow() {
  var rows = parseInt(document.getElementById("rows").value);
  var cols = parseInt(document.getElementById("columns").value);
  if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1 || rows > 10 || cols > 10) {
    alert("Please enter rows and columns between 1 and 10");
    return;
  }
  var arr = ["occupied.svg", "vacant.svg"];
  var garden = document.getElementById("garden");
  garden.innerHTML = "";
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var number = Math.floor(Math.random() * 2); // 0 or 1, equal chance
      garden.innerHTML += "<img src='" + arr[number] + "' width='90' height='90'>";
    }
    garden.innerHTML += "<br>";
  }
}

// 4. Rupees to dollars and dollars to rupees
function convert() {
  var amount = parseFloat(document.getElementById("data").value);
  if (isNaN(amount) || amount < 0) {
    alert("Please enter a valid amount");
    return;
  }
  var from = document.getElementById("from");
  var to = document.getElementById("to");
  var fromValue = from[from.selectedIndex].value;
  var toValue = to[to.selectedIndex].value;
  var result;
  if (fromValue == toValue) result = amount;
  else if (fromValue == "INR") result = amount * 0.015;
  else result = amount * 67.12;
  document.getElementById("answer").innerHTML = result.toFixed(2) + " " + toValue;
}

// 5. Coin flip: heads (day shift) or tails (night shift)
var heads = 0;
var tails = 0;
document.getElementById("flip").addEventListener("click", flipFunction);

function flipFunction() {
  var coin = document.getElementById("coin");
  if (Math.random() < 0.5) {
    coin.src = "heads.svg";
    heads++;
    document.getElementById("num_heads").innerHTML = heads;
  } else {
    coin.src = "tails.svg";
    tails++;
    document.getElementById("num_tails").innerHTML = tails;
  }
}

// 6. Checkup booking total with 9% tax and service charge
document.getElementById("submit").addEventListener("click", calculateOrder);

function calculateOrder() {
  var basic = parseInt(document.getElementById("small").value) || 0;
  var standard = parseInt(document.getElementById("medium").value) || 0;
  var premium = parseInt(document.getElementById("large").value) || 0;
  var tip = parseInt(document.querySelector('input[name="tip"]:checked').value);
  if (basic < 0 || standard < 0 || premium < 0 || basic + standard + premium == 0) {
    alert("Please enter the number of checkups");
    return;
  }
  var cost = basic * 100 + standard * 200 + premium * 400;
  var tax = cost * 0.09;
  var tipAmount = (cost + tax) * tip / 100;
  var total = cost + tax + tipAmount;

  document.getElementById("price").innerHTML = "Rs." + total.toFixed(2);
  document.getElementById("details").innerHTML = "Checkups: Rs." + cost.toFixed(2) +
    " + Tax: Rs." + tax.toFixed(2) + " + Service (" + tip + "%): Rs." + tipAmount.toFixed(2);
}
