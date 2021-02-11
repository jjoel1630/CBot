var test = 'test car bus bike scooter plane boat ship test1';
testArray = test.split(' ');

testString1 = testArray.splice(3).join(" ");
testString1Array = testString1.split(' ');
testString2 = testString1Array.splice(3).join(" ");
testString3 = testArray.join(" ");

console.log(testString1);
console.log(testString2);
console.log(testString3);
