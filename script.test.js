const test = require("node:test");
const assert = require("node:assert");
const { toggleNavState, nextIndex, getRevealSelectors } = require("./script.js");

test("toggleNavState flips the open state", () => {
  assert.strictEqual(toggleNavState(false), true);
  assert.strictEqual(toggleNavState(true), false);
});

test("nextIndex wraps forward and backward around the slide count", () => {
  assert.strictEqual(nextIndex(0, 5, 1), 1);
  assert.strictEqual(nextIndex(4, 5, 1), 0);
  assert.strictEqual(nextIndex(0, 5, -1), 4);
});

test("getRevealSelectors returns a non-empty list of valid CSS selectors", () => {
  const selectors = getRevealSelectors();
  assert.ok(Array.isArray(selectors));
  assert.ok(selectors.length > 0);
  selectors.forEach((s) => assert.strictEqual(typeof s, "string"));
});
