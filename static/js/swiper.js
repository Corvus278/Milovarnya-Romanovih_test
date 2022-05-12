function startSwiper() {
  const swiper = new Swiper('.swiper', {
    speed: 800,
    spaceBetween: 50,

    // Breakpoints
    breakpoints: {
      970: {
        spaceBetween: 75
      },
      1280: {
        spaceBetween: 100
      }
    }
  })

  // Кнопки для переключения слайдов
  const buttonPrev = document.querySelector('.gidrolat__next-button--left')
  const buttonNext = document.querySelector('.gidrolat__next-button--right')

  buttonPrev.addEventListener('click', () => {
    swiper.slidePrev()
  })
  buttonNext.addEventListener('click', () => {
    swiper.slideNext()
  })
}
