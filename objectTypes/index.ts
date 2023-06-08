interface SomeType {
	readonly name: string;
}

function doName(obj: SomeType) {
	obj.name = 'john paul';
}

interface Home {
	readonly resident: {
		name: string;
		age: number
	}
}

function visitForBirthday(home: Home) {
	// ** We can read and update properties from 'home.resident'.
	console.log(`Happy Birthday ${home.resident.name}`);
	home.resident.age++;
}

function evict(home:Home) {
  // ** But we can't write to the 'resident' property itself on a 'Home'.
	home.resident = {
		name: 'blues',
		age: 20
	};
}

interface NewPerson {
	name: string;
	age: number;
}

interface ReadOnlyPerson {
	readonly name: string;
	readonly age: number;
}

let writablePerson: NewPerson = {
	name: "Person full name",
	age: 20
}

// works
let readonlyPerson: ReadOnlyPerson = writablePerson;

console.log(readonlyPerson.age); // 42
writablePerson.age++;
console.log(readonlyPerson.age); // 43

// index signatures
interface NewStringArray {
	[index: number] : string;
}

function getStringArray() {
	return ['name1', 'name2']
}

const myArray: NewStringArray = getStringArray()
const secondItem = myArray[2];

interface NumberDictionary {
	readonly [index: string] : number | string;

	// length: number;
	// name: string
}

let NewMyArr : NumberDictionary = getStringArray();
NewMyArr[2] = 'Home'

// excess property checks
interface SquareConfig {
	color?: string;
	width?: number;
	[propName: string]: any;
}

function createSquare(config:SquareConfig) : { color: string, area: number} {
	return {
		color: config.color ||  'red',
		area: config.width ? config.width * config.width : 20
	}
}

let mySquare = createSquare({colour: "red", width: 100})

interface BasicAddress {
	name?: string;
	street: string;
	city: string;
	country: string;
	postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
	unit: string;
}

interface Colorful {
	color: string
}

interface Circle {
	radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc : ColorfulCircle = {
	color: 'red',
	radius: 42
}

// Intersection Types

type ColorfulCircleIT = Colorful & Circle;

function draw(circle:ColorfulCircleIT) {
	console.log(`Color was ${circle.color}`);
	console.log(`Radius was ${circle.radius}`);
}

// ** okay
draw({ color: "blue", radius: 22 })
draw({ color: "blue", radiuss: 22 })

interface Box {
	contents: unknown
}

let xx: Box = {
	contents: "Hello world"
}

// ** we could check 'xx.contents'
if (typeof xx.contents === "string") {
	console.log(xx.contents.toLowerCase());
}

// ** or we could use a type assertion
console.log((xx.contents as string).toLowerCase());

interface IBox<T> {
	contents: T
}

function doStuff(values: ReadonlyArray<string>) {
	// ** we can read from 'values'...
	const copy = values.slice();
	console.log(`The first value is ${values[0]}`);

	//** ...but we can't mutate 'values'.
	values.push()
}













