// Function syntax includes parameter names
let first: (a: any, b: any) => any = (a, b) => a;

// or more precisely:
let fst: <T, U>(a: T, b: U) => T = (a, b) => a;
// -- end

// Object literal type syntax closely mirrors object literal value syntax:
let o: { n: number; xs: object[] } = { n: 1, xs: [] };

/*
  with "noImplicitAny": false in tsconfig.json, anys: any[]
  const anys = [];
  anys.push(1);
  anys.push("oh no");
  anys.push({ anything: "goes" });
  return errors
*/
const nums: number[] = [];
nums.push(1);
nums.push(2);
nums.push(3);
console.log(nums);

// @strict: false
let o1 = { x: "hi", extra: 1 }; // ok
let o2: { x: string } = o1; // ok

type One = { p: string };
interface Two {
  p: string;
}
class Three {
  p = "Hello";
}

let x: One = { p: "hi" };
let two: Two = x;
two = new Three();

// Unions
// NOTE: discriminate types in a union using built-in tags or other properties
function start(arg: string | string[] | (() => string) | { s: string }): string {
  // this is super common in JavaScript
  if (typeof arg === 'string') {
    return commonCase(arg)
  } else if (Array.isArray(arg)) {
    return arg.map(commonCase).join(",")
  } else if (typeof arg === 'function') {
    return commonCase(arg())
  } else {
    return commonCase(arg.s)
  }

  function commonCase(s: string) {
    // finally, just convert a string to another string
    return s;
  }
}

// Intersections
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };

// Unit Types
declare function pad(s: string, n: number, direction: "left" | "right"): string;
pad("h1", 10, "left");
let s: "left" | "right" = "right";
pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'

// Contextual typing
// declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
declare function map<T, U>(ts: T[], f: (t: T) => U): U[];
let sns = map([1, 2, 3], (n) => n.toString());

declare function run<T>(thunk: (t: T) => void): T;
let i: { inference: string } = run((o) => {
  o.inference = "INSERT STATE HERE";
});

// Type aliases
type Size = [number, number, string?];
let x2: Size = [101.1, 999.9];

// The closest equivalent to newtype is a tagged intersection:
type FString = string & { __compileTimeOnly: any };

// Discriminated Unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === 'square') {
    return s.x * s.x
  } else {
    return (s.x * s.y) / 2
  }
}

// Type Parameters
function liftArray<T>(t: T): Array<T> {
  return [t]
}

function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}
function length2<T extends ArrayLike<unknown>>(t: T): number { return 0 }
function length3(t: ArrayLike<unknown>): number { return 0 }

console.log(firstish([10, 20], [30, 40, 50]));

// readonly and const
const a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; // D:

// TypeScript additionally has a readonly modifier for properties.
interface Rx {
  readonly x: number;
}
let rx: Rx = { x: 1 };
// rx.x = 12; // error

// It also ships with a mapped type Readonly<T> that makes all properties readonly:
interface X {
  x: number;
}
let rxs: Readonly<X> = { x: 1 };
// rxs.x = 12; // error

// And it has a specific ReadonlyArray<T> type that removes side-affecting methods 
// and prevents writing to indices of the array, as well as special syntax for this type:
let a1: ReadonlyArray<number> = [1, 2, 3];
let b2: readonly number[] = [1, 2, 3];
// a1.push(102); // error
// b2[0] = 101; // error

// You can also use a const-assertion, which operates on arrays and object literals:
let ab = [1, 2, 3] as const;
// ab.push(102); // error
// ab[0] = 101; // error

// Classes
class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person:Person) {
  return "Hello, " + person.firstName + " " + person.lastName
}

let students = new Student("John", "Dash", "Joe")
console.log(students);












