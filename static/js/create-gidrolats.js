function createElement(nameElement, className = nameElement) {
  let element = document.createElement(nameElement)
  if (Array.isArray(className)) {
    element.classList.add(...className)
  } else {
    element.classList.add(className)
  }
  return element
}


function createGidrolatArticle(gidrolatInfo) {
  // информация о гидролате
  const name = gidrolatInfo.name
  const imgUrl = gidrolatInfo.imgUrl
  const description = gidrolatInfo.description
  const howToUse = gidrolatInfo.howToUse
  const moreLink = gidrolatInfo.moreLink

  // ДОМ-элементы
  const article = createElement('article', 'gidrolat')
  const h2Heading = createElement('h2', 'gidrolat__heading')
  const img = createElement('img', 'gidrolat__img')
  const ulDescription = createElement('ul', ['gidrolat__description', 'gidrolat__text-list'])
  const h3HowToUse = createElement('h3', 'gidrolat__use-list-heading')
  const ulHowToUse = createElement('ul', ['gidrolat__as-using-list', 'gidrolat__text-list'])
  const pEndText = createElement('p', 'gidrolat__more-info')
  const aMoreLink = createElement('a', ['gidrolat__more-info-link', 'link'])

  // наполнение контентом
  h2Heading.textContent = name
  img.src = imgUrl

  for (const i of description) {
    const li = createElement('li', 'gidrolat__description-item')
    li.textContent = i
    ulDescription.append(li)
  }

  h3HowToUse.textContent = 'Как применять:'

  for (const i of howToUse) {
    const li = createElement('li', 'girolat__as-use-item')
    li.textContent = i
    ulHowToUse.append(li)
  }

  pEndText.textContent = 'Более подробно по '
  aMoreLink.href = moreLink
  aMoreLink.target = '_blank'
  aMoreLink.textContent = 'ссылке'

  // сборка элементов
  pEndText.append(aMoreLink)
  article.append(h2Heading, img, ulDescription, h3HowToUse, ulHowToUse, pEndText)

  return article
}


function createGidrolatWrapper(gidrolatArticleList) {
  const commonWrapper = createElement('div', 'swiper-wrapper')
  for (const gidrolatArticle of gidrolatArticleList) {
    const gidrolatWrapper = createElement('div', 'swiper-slide')
    gidrolatWrapper.append(gidrolatArticle)
    commonWrapper.append(gidrolatWrapper)
  }

  return commonWrapper
}


function addGidrolats(gidrolatInfoList) {
  const gidrolatWrapper = document.querySelector('.gidrolat-wrapper')
  const gidrolatArticleList = []
  if (Array.isArray(gidrolatInfoList)) {
    for (const gidrolatInfo of gidrolatInfoList) {
      gidrolatArticleList.push(createGidrolatArticle(gidrolatInfo))
    }
  } else {
    gidrolatArticleList.push(createGidrolatArticle(gidrolatInfoList))
  }

  gidrolatWrapper.append(createGidrolatWrapper(gidrolatArticleList))

  // Позиционирование кнопок
  const gidrolatImg = document.querySelector('.gidrolat__img')
  gidrolatImg.addEventListener('load', () => {
    givButtonPosition()
  })

  window.addEventListener('scroll', () => {
    givButtonPosition()
  })

  window.addEventListener('resize', () => {
    givButtonPosition()
  })

  window.addEventListener("orientationchange", () => {
    givButtonPosition()
  })

  // Активация слайдера
  startSwiper()
}


document.addEventListener('DOMContentLoaded', () => {
  const gidrolat = {
    name: 'Гидролат Алое',
    imgUrl: 'http://romylo.ru/pictures/product/big/5133_big.JPG',
    description: ['способствует синтезу коллагена;', 'тонизирует;'],
    howToUse: ['В чистом виде как тоник для кожи', 'Распыление непосредственно на кожу во время отопительного и летнего сезона для увлажнения и питания.'],
    moreLink: 'http://romylo.ru/products/gidrolat-aloe-1'
  }


  const gidrolats = [
    {
      name: 'Гидролат Алое',
      imgUrl: 'http://romylo.ru/pictures/product/big/5133_big.JPG',
      description: ['способствует синтезу коллагена;', 'тонизирует;'],
      howToUse: ['В чистом виде как тоник для кожи', 'Распыление непосредственно на кожу во время отопительного и летнего сезона для увлажнения и питания.'],
      moreLink: 'http://romylo.ru/products/gidrolat-aloe-1'
    },
    {
      name: 'Гидролат Алое',
      imgUrl: 'http://romylo.ru/pictures/product/big/5133_big.JPG',
      description: ['способствует синтезу коллагена;', 'тонизирует;'],
      howToUse: ['В чистом виде как тоник для кожи', 'Распыление непосредственно на кожу во время отопительного и летнего сезона для увлажнения и питания.'],
      moreLink: 'http://romylo.ru/products/gidrolat-aloe-1'
    }
  ]


  // addGidrolats(gidrolats)
})
