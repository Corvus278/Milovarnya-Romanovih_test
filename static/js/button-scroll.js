document.addEventListener('DOMContentLoaded', () => {
  const gidrolat = document.querySelector(".gidrolat")
  const button = document.querySelector('.gidrolat__next-button')

  const gidrolatHeight = gidrolat.offsetHeight
  const buttonPositionTopBasic = button.offsetTop
  let buttonPositionTopCurrent = buttonPositionTopBasic
  const gidrolatPositionTop = gidrolat.getBoundingClientRect().top + window.scrollY
  const viewport = window.innerHeight
  const viewportCenter = viewport / 2
  const buttonPositionGlobal = gidrolatPositionTop + buttonPositionTopBasic

  let lastScroll = 0

  document.addEventListener('scroll', () => {
    if (buttonPositionGlobal - window.scrollY <= viewportCenter) {
      button.classList.add('gidrolat__next-button--fixed')
      // button.style.top = String(button.offsetTop + (window.scrollY - lastScroll)) + 'px'
      // console.log(window.scrollY - lastScroll)
      lastScroll = window.scrollY
    }
  })
})
