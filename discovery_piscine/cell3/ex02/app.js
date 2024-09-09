const operand1 = document.getElementById('operand1');
const operator = document.getElementById('operator');
const operand2 = document.getElementById('operand2');
const calculate = document.getElementById('calculate');

function parseOperand(operand) {
  const value = operand.value;

  if (value === '')
	  return (0);
  if (isNaN(value) || value.includes('.'))
	return -1;
  // Parse the value to an integer
  const parsedValue = parseInt(value);


  // Ensure the parsed value is a non-negative integer
  return (parsedValue >= 0) ? parsedValue : -1;
}

function operate(operand1, operator, operand2) {
  if (operand1 === -1 || operand2 === -1) 
    return -1;
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
    case '%':
      return operand1 % operand2;
    default:
      return 42;
  }
}

function displayResult(result) {
  const resultElement = document.getElementById('result');
  if (result === -1)
    return "Error :(";
  else if (result === Infinity || isNaN(result))
    return "It's over 9000!";
  else
    return "Result: " + result;
}

calculate.addEventListener('click', function() {
  const operand1Value = parseOperand(operand1);
  const operand2Value = parseOperand(operand2);
  const operatorValue = operator.value.trim(); // Ensure the operator value is correctly retrieved

  const result = operate(operand1Value, operatorValue, operand2Value);
  alert(displayResult(result));
  console.log(displayResult(result));
});