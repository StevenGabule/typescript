// Function syntax includes parameter names
var first = function (a, b) { return a; };
// or more precisely:
var fst = function (a, b) { return a; };
// -- end
// Object literal type syntax closely mirrors object literal value syntax:
var o = { n: 1, xs: [] };
/*
  with "noImplicitAny": false in tsconfig.json, anys: any[]
  const anys = [];
  anys.push(1);
  anys.push("oh no");
  anys.push({ anything: "goes" });
  return errors
*/
var nums = [];
nums.push(1);
nums.push(2);
nums.push(3);
console.log(nums);
// @strict: false
var o1 = { x: "hi", extra: 1 }; // ok
var o2 = o1; // ok
var Three = /** @class */ (function () {
    function Three() {
        this.p = "Hello";
    }
    return Three;
}());
var x = { p: "hi" };
var two = x;
two = new Three();
// Unions
// NOTE: discriminate types in a union using built-in tags or other properties
function start(arg) {
    // this is super common in JavaScript
    if (typeof arg === 'string') {
        return commonCase(arg);
    }
    else if (Array.isArray(arg)) {
        return arg.map(commonCase).join(",");
    }
    else if (typeof arg === 'function') {
        return commonCase(arg());
    }
    else {
        return commonCase(arg.s);
    }
    function commonCase(s) {
        // finally, just convert a string to another string
        return s;
    }
}
pad("h1", 10, "left");
var s = "right";
pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'
var sns = map([1, 2, 3], function (n) { return n.toString(); });
var i = run(function (o) {
    o.inference = "INSERT STATE HERE";
});
var x2 = [101.1, 999.9];
function area(s) {
    if (s.kind === "circle") {
        return Math.PI * s.radius * s.radius;
    }
    else if (s.kind === 'square') {
        return s.x * s.x;
    }
    else {
        return (s.x * s.y) / 2;
    }
}
// Type Parameters
function liftArray(t) {
    return [t];
}
function firstish(t1, t2) {
    return t1.length > t2.length ? t1 : t2;
}
function length2(t) { return 0; }
function length3(t) { return 0; }
console.log(firstish([10, 20], [30, 40, 50]));
// readonly and const
var a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; // D:
var rx = { x: 1 };
var rxs = { x: 1 };
// rxs.x = 12; // error
// And it has a specific ReadonlyArray<T> type that removes side-affecting methods 
// and prevents writing to indices of the array, as well as special syntax for this type:
var a1 = [1, 2, 3];
var b2 = [1, 2, 3];
// a1.push(102); // error
// b2[0] = 101; // error
// You can also use a const-assertion, which operates on arrays and object literals:
var ab = [1, 2, 3];
// ab.push(102); // error
// ab[0] = 101; // error
// Classes
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var students = new Student("John", "Dash", "Joe");
console.log(students);
