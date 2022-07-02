interface User {
  name: string;
  id: number
}

const user1: User = {
  id: 0,
  name: "Hayes",
}

class UserAccount {
  id: number;
  name: string;

  constructor(name: string, id: number) {
    this.id = id;
    this.name = name;
  }
}

const user: User = new UserAccount("Murhpy", 10);

function getAdminUser(): User {
  return {
    id: 0,
    name: "paul"
  }
}

function deleteUser(user: User) {
  return ''
}

type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}

function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;

// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();

// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add('23');

interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point: Point = { x: 1, y: 2 };
logPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3);

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

// const color = { hex: "#187ABF" };
// logPoint(color);

class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"

// Object Types
function printCoord(pt: { x: number, y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 4 });

function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last?.toUpperCase());

  // Object is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

// *** union type ***
// union type is a type formed from two or more other types, representing values that may be any one of those types. 
function printId(id: number | string) {
  console.log("Your ID is: " + id);

  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

printId(101); // OK
printId("202"); // OK
// printId({ myID: 22342 }); // Error

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

type Points = {
  x: number;
  y: number;
};

interface IPoint {
  x: number;
  y: number;
}

// Exactly the same as the earlier example
function printCoords(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoords({ x: 100, y: 100 });

/*
  Differences Between Type Aliases and Interfaces
  Type aliases and interfaces are very similar, and in many cases you can choose between them freely. 
  Almost all features of an interface are available in type, the key distinction is that a type cannot 
  be re-opened to add new properties vs an interface which is always extendable.
*/
// Extending an interface
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

type Animals = {
  name: string
}

type Bears = Animal & {
  honey: boolean
}

// Adding new fields to an existing interface
// interface Window {
//   title: string
// }

// interface Window {
//   ts: TypeScriptAPI
// }

// const src = 'const a = "Hello World"';
// window.ts.transpileModule(src, {});

// A type cannot be changed after being created
// type Window = {
//   title: string
// }

// type Window = {
//   ts: TypeScriptAPI
// }
// Error: Duplicate identifier 'Window'.

// Prior to TypeScript version 4.2, type alias names may appear in error messages, sometimes in place of the 
// equivalent anonymous type(which may or may not be desirable).Interfaces will always be named in error messages.
// Type aliases may not participate in declaration merging, but interfaces can.
// Interfaces may only be used to declare the shapes of objects, not rename primitives.
// Interface names will always appear in their original form in error messages, but only when they are used by name.

