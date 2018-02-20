"use strict"

const main = $('main')
const loader = $('.loader')
const HIDDEN = 'hidden'

if (browserSupportsCSSProperty('animation')) {
  // Show the loader for a random amount of time
  const randomTime = (1.5 + Math.random()) * 1000

  loader.classList.remove(HIDDEN)
  setTimeout(() => {
    loader.classList.add(HIDDEN)
    main.classList.remove(HIDDEN)
  }, randomTime)
} else {
  main.classList.remove(HIDDEN)
}

function $ (selector) {
  return document.querySelector(selector)
}

function browserSupportsCSSProperty (propertyName) {
  const elm = document.createElement('div')
  propertyName = propertyName.toLowerCase()

  if (elm.style[propertyName] !== undefined) return true

  const propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1)
  const domPrefixes = 'Webkit Moz ms O'.split(' ')

  for (let i = 0; i < domPrefixes.length; i++) {
    if (elm.style[domPrefixes[i] + propertyNameCapital] !== undefined) return true
  }

  return false
}
