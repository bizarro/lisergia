type HTMLElementForEach = (
  this: HTMLElement,
  callback: (value: HTMLElement, key: HTMLElement, parent: HTMLElement) => void,
  thisArg?: unknown,
) => void

declare interface HTMLElement {
  forEach: HTMLElementForEach
}

declare interface NodeList {
  filter: typeof Array.prototype.filter
  find: typeof Array.prototype.find
  map: typeof Array.prototype.map
}

const HTMLElementPrototype = HTMLElement.prototype as {
  forEach: HTMLElementForEach
}

const NodeListPrototype = NodeList.prototype as {
  filter: typeof Array.prototype.filter
  find: typeof Array.prototype.find
  map: typeof Array.prototype.map
}

/**
 * Allow `forEach` to work with single HTMLElement.
 */
if (!HTMLElementPrototype.forEach) {
  HTMLElementPrototype.forEach = function (callback, thisArg) {
    callback.call(thisArg ?? window, this, this, this)
  }
}

/**
 * Allow `filter` to work with NodeList.
 */
if (!NodeListPrototype.filter) {
  NodeListPrototype.filter = Array.prototype.filter
}

/**
 * Allow `find` to work with NodeList.
 */
if (!NodeListPrototype.find) {
  NodeListPrototype.find = Array.prototype.find
}

/**
 * Allow `map` to work with NodeList.
 */
if (!NodeListPrototype.map) {
  NodeListPrototype.map = Array.prototype.map
}
