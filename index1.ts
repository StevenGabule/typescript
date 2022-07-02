// Type Assertions
// combining literals into unions,
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "left");
type returnValues = -1 | 0 | 1;
function compare(a: string, b: string): returnValues {
  return a === b ? 0 : a > b ? 1 : -1;
}

// combine these with non-literal types:
interface Options {
  width?: number;
  automatic?: boolean;
}

function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure({ automatic: true });

/*
// Change 1:
const req = { url: "https://example.com", method: "GET" } as const;
// Change 2
handleRequest(req.url, req.method);
*/

// Non-null Assertion Operator (Postfix!)
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

// NARROWING
/** @type {{ padding: number | string }} */
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
