function makeElement(nameElement, className = nameElement) {
  let element = document.createElement(nameElement)
  if (Array.isArray(className)) {
    element.classList.add(...className)
  } else {
    element.classList.add(className)
  }
  return element
}


function createGidrolatArticle(baseText, gidrolatInfo) {
  // информация о гидролате
  const name = gidrolatInfo.name
  const imgUrl = gidrolatInfo.imgUrl
  const description = gidrolatInfo.description
  const howToUse = gidrolatInfo.howToUse
  const moreLink = gidrolatInfo.moreLink

  // ДОМ-элементы
  const article = createElement('article', 'gidrolat')
  const h2Heading = createElement('article', 'gidrolat__heading')
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

  // сборка элементов
  pEndText.append(aMoreLink)
  article.append(h2Heading, img, ulDescription, h3HowToUse, ulHowToUse, pEndText)

  return article
}


function gidrolatWrapper(gidrolatArticleList) {
  const commonWrapper = createElement('div', 'swiper-wrapper')
  for (const gidrolatArticle of gidrolatArticleList) {
    const gidrolatWrapper = createElement('div', 'swiper-slide')
    gidrolatWrapper.append(gidrolatArticle)
    commonWrapper.append(gidrolatWrapper)
  }

  return commonWrapper
}
