var test = 'test car bus bike scooter plane boat ship';
test1 = test.split(' ');

test2 = test1.splice(3).join(" ");
test1 = test1.join(" ");

console.log(test1);
console.log(test2);
