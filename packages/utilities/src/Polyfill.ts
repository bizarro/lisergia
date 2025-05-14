declare interface HTMLElement {
  forEach: Function
}

declare interface NodeList {
  filter: Function
  find: Function
  map: Function
}

const HTMLElementPrototype = HTMLElement.prototype as {
  forEach: Function
}

const NodeListPrototype = NodeList.prototype as {
  filter: Function
  find: Function
  map: Function
}

/**
 * Allow `forEach` to work with single HTMLElement.
 */
if (!HTMLElementPrototype.forEach) {
  HTMLElementPrototype.forEach = function (callback: Function, thisArg: any) {
    thisArg = thisArg || window

    callback.call(thisArg, this, this, this)
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
