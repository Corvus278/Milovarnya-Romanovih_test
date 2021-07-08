function givButtonPosition() {
  const buttonSize = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_size')
  const buttonMargin = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_margin')
  const leftButton = document.querySelector('.gidrolat__next-button--left')
  const rightButton = document.querySelector('.gidrolat__next-button--right')
  const gidrolatMarginX = document.querySelector('.gidrolat-wrapper').getBoundingClientRect().left

  const buttonPositionX = gidrolatMarginX - parseInt(buttonSize) - parseInt(buttonMargin)
  console.log(`${parseInt(buttonMargin)} - отступ`)
  console.log(` ${parseInt(buttonSize)} - размер`)

  rightButton.style.setProperty('--button-position', String(buttonPositionX))
  leftButton.style.setProperty('--button-position', String(buttonPositionX))
  console.log(buttonPositionX)
}


document.addEventListener('DOMContentLoaded', () => {
  givButtonPosition()
  // const gidrolatWrapper = querySelector('.gidrolat-wrapper')

  // Изменение размера экрана
  window.addEventListener('resize', () => {
    givButtonPosition()
  })

  // Изменение ориентации экрана
  window.addEventListener("orientationchange", () => {
    givButtonPosition()
  })
})
