function givButtonPosition() {
  const gidrolatImg = document.querySelector('.gidrolat__img')
  const buttonSize = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_size')
  const buttonMargin = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_margin')
  const leftButton = document.querySelector('.gidrolat__next-button--left')
  const rightButton = document.querySelector('.gidrolat__next-button--right')
  const gidrolatPositionX = document.querySelector('.gidrolat-wrapper').getBoundingClientRect().left

  // Позиция по оси Х
  const buttonPositionX = gidrolatPositionX - parseInt(buttonSize) - parseInt(buttonPosition)

  rightButton.style.setProperty('--button-position', String(buttonPositionX))
  leftButton.style.setProperty('--button-position', String(buttonPositionX))

  // Позиция по оси Y
  const buttonPositionY = gidrolatImg.getBoundingClientRect().top + (gidrolatImg.offsetHeight / 2)
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
