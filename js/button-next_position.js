function givButtonPosition() {
  const buttonSize = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_size')
  const buttonMargin = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_margin')
  const button = document.getElementsByClassName('gidrolat__next-button')
  const gidrolatMarginX = document.querySelector('.gidrolat-wrapper').getBoundingClientRect().right

  buttonPositionX = gidrolatMarginX - buttonSize - buttonMargin

  button.style.setProperty('--button-right_position', String(buttonPositionX))
}


document.addEventListener('DOMContentLoaded', () => {
  givButtonPosition()
})
