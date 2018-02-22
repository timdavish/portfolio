"use strict"

const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight
const heroBackgroundParts = []
const colorArray = [
  '#DBE2EF',
  '#D53939',
  '#90D26D',
  '#FFEA85',
  '#53354A',
]

let lastColorIndex = 0
let uniqueId = Number.MAX_SAFE_INTEGER

if (browserSupportsCSSProperty('animations')) {
  // Show the loader for a random amount of time
  const randomTime = (1 + Math.random()) * 1000
  setTimeout(loadPage, randomTime)
} else {
  loadPage()
}

function loadPage () {
  $('.loader').addClass('hidden')
  $('main').removeClass('hidden')
  $('main').addClass('loaded')

  setTimeout(animateHero, 0)
}

function animateHero () {
  if (heroBackgroundParts.length >= 6) {
    $(`#${heroBackgroundParts.shift()}`).remove()
  }

  const id = (uniqueId--).toString(16)
  const moveX = getRandom(0, viewportWidth)
  const moveY = getRandom(0, viewportHeight)
  const scale = .7

  heroBackgroundParts.push(id)
  $('main').append(`<div class="hero_background_part" id="${id}"></div>`)

  let colorIndex = getRandom(0, colorArray.length - 1)
  while (lastColorIndex === colorIndex) colorIndex = getRandom(0, colorArray.length - 1)
  lastColorIndex = colorIndex

  setTimeout(() => {
    $(`#${id}`).css({
      left: `${moveX * scale}px`,
      top: `${moveY * scale}px`,
      width: viewportWidth,
      height: viewportWidth,
      'max-width': viewportWidth * 2,
      'max-height': viewportWidth * 2,
      transform: `scale3d(3, 3, 3)`,
      'background-color': colorArray[colorIndex]
    })
  }, 100)

  setTimeout(animateHero, 10000)
}

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
