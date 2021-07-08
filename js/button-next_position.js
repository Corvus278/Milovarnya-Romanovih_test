function givButtonPosition() {
  const gidrolatImg = document.querySelector('.gidrolat__img')
  const buttonSize = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_size')
  const buttonPosition = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('--arrow-button_margin')
  const buttons = document.querySelectorAll('.gidrolat__next-button')
  const leftButton = document.querySelector('.gidrolat__next-button--left')
  const rightButton = document.querySelector('.gidrolat__next-button--right')
  const gidrolatPositionX = document.querySelector('.gidrolat-wrapper').getBoundingClientRect().left

  // Позиция по оси Х
  const buttonPositionX = gidrolatPositionX - parseInt(buttonSize) - parseInt(buttonPosition)

  rightButton.style.setProperty('--button_position-X', String(buttonPositionX))
  leftButton.style.setProperty('--button_position-X', String(buttonPositionX))

  // Позиция по оси Y
  const buttonPositionY = (parseInt(gidrolatImg.getBoundingClientRect().top) + window.scrollY) + ((parseInt(gidrolatImg.offsetHeight) / 2) - (parseInt(buttonSize) / 2))
  for (const button of buttons) {
    button.style.setProperty('--button_position-Y', String(buttonPositionY))
  }
}


document.addEventListener('DOMContentLoaded', () => {
  givButtonPosition()

  // Изменение размера экрана
  window.addEventListener('resize', () => {
    givButtonPosition()
  })

  // Изменение ориентации экрана
  window.addEventListener("orientationchange", () => {
    givButtonPosition()
  })
})
