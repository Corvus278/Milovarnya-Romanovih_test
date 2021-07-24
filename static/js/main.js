let counterForIdRadioButton = 0
let counterForIdQuestionSection = 1000
let numberQuestion = 0
let firstQuestionAnswer
let selectGidrolatList = []
let gidrolatInfoList
const scrollAnimateDuration = 800
const pauseBeforeScroll = 300

// Вопросы
const dataQuestions = JSON.parse(data)


function animateScroll(href, removeLastQuestion = false, removeFirstPage = false, scrollShiftOfTopHref = 0) {
  jQuery(document).ready(function ($) {
    $('html, body').animate({
      scrollTop: $(href).offset().top + scrollShiftOfTopHref
    }, {
      duration: scrollAnimateDuration,   // по умолчанию «400»
      // easing: "linear" // по умолчанию «swing»
    });
  }, pauseBeforeScroll);

  // Удаление последнего вопроса со страницы
  if (removeLastQuestion) {
    setTimeout(() => {
      const allQuestions = document.getElementsByClassName('new-question')
      const lastQuestion = allQuestions[allQuestions.length - 1]

      lastQuestion.remove()
    }, pauseBeforeScroll + scrollAnimateDuration)
  }

  // Удаление всего кроме секции с финальной страницей
  if (removeFirstPage) {
    const sections = Array.from(document.querySelectorAll('section'))
    setTimeout(() => {
      sections.forEach((element, i, arr) => {
        if (i !== arr.length - 1) {
          element.remove()
        }
      })
      // Позиционирование кнопок для слайдера
      givButtonPosition()
    }, pauseBeforeScroll + scrollAnimateDuration)
  }
}


function makeElement(nameElement, className = nameElement) {
  let element = document.createElement(nameElement)
  if (Array.isArray(className)) {
    element.classList.add(...className)
  } else {
    element.classList.add(className)
  }
  return element
}


function makeVariant(value, name, style) {
  const radioButton = document.createElement('input')
  radioButton.name = name
  radioButton.value = value
  radioButton.type = 'radio'

  if (Array.isArray(style)) {
    radioButton.classList.add(...style)
  } else {
    radioButton.classList.add(style)
  }

  counterForIdRadioButton++
  const id = counterForIdRadioButton
  radioButton.id = id

  return radioButton;
}


function makeAnswerVariant(answerText, inputName, inputStyle = 'variant__radioButton', labelStyle = 'variant__text') {
  // Return array with radio button and label
  const radioButton = makeVariant(answerText, inputName, inputStyle)
  const label = makeElement('label', labelStyle)
  label.textContent = answerText
  label.htmlFor = radioButton.id
  return [radioButton, label]
}


function makeList(items, ulStyle = 'ul', liStyle = 'li') {
  const ul = document.createElement('ul')
  // Если классов будет несколько (массив), они добавятся корректно
  if (Array.isArray(ulStyle)) {
    ul.classList.add(...ulStyle)
  } else {
    ul.classList.add(ulStyle)
  }
  for (i of items) {
    const li = document.createElement('li')
    // Если элементов для добавление в li несколько (массив) они добавятся корректно
    if (Array.isArray(i)) {
      for (j of i) {
        li.append(j)
      }
    } else {
      li.append(i);
    }
    if (Array.isArray(liStyle)) {
      li.classList.add(...liStyle)
    } else {
      li.classList.add(liStyle)
    }
    ul.append(li);
  }
  return ul;
}


function giveIndentYAllPage(element) {
  const windowHeight = window.innerHeight
  const elementHeight = element.offsetHeight

  let indent = (windowHeight - elementHeight) / 2
  element.style.paddingTop = String(indent) + 'px'
  element.style.paddingBottom = String(indent) + 'px'
}


function scrollWidth() {
  const div = $('<div>').css({
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100px",
    height: "100px",
    visibility: "hidden",
    overflow: "scroll"
  });

  $('body').eq(0).append(div);

  const width = div.get(0).offsetWidth - div.get(0).clientWidth;

  div.remove();

  return width;
}


function removeUserScroll() {
  const scrollW = scrollWidth()
  document.querySelector('html').style.setProperty('--scroll-width', String(scrollW) + 'px')
  document.body.style.overflow = "hidden"
}


function giveRandomNumber(max, min = 0) {
  const range = Math.abs(max - min)
  return Math.round(Math.random() * range) + min
}


function addDecor(element) {
  const allDecorClasses = {
    leftTopRightBottom: {
      common1: 'decor--left-top',
      individual1: ['myata-bolshoi_left-top', 'venochek-roza-perets_left-top', 'listvennitsa-ekhinatse-reverse_left-top', 'kolokolchick_left-top'],
      common2: 'decor--right-bottom',
      individual2: ['dushitsa-shalfei_right-bottom', 'listvennitsa-ekhinatse_right-bottom', 'myata-limon_right-bottom', 'rose_right-bottom']
    },
    rightTopLeftBottom: {
      common1: 'decor--right-top',
      individual1: ['dushitsa-shalfei_right-top', 'listvennitsa-ekhinatse_right-top', 'myata-limon_right-top'],
      common2: 'decor--left-bottom',
      individual2: ['myata-bolshoi_left-bottom', 'listvennitsa-ekhinatse-reverse_left-bottom', 'venochek-roza-perets_left-bottom', 'rose_left-bottom']
    }
  }

  // Выбор с каких сторон страницы будет декор
  const selectDecorSide = allDecorClasses[Object.keys(allDecorClasses)[giveRandomNumber(Object.keys(allDecorClasses).length - 1)]]

  // Выбор классов
  const common1 = selectDecorSide['common1']
  const individual1 = selectDecorSide['individual1'][giveRandomNumber(selectDecorSide['individual1'].length - 1)]
  const common2 = selectDecorSide['common2']
  const individual2 = selectDecorSide['individual2'][giveRandomNumber(selectDecorSide['individual2'].length - 1)]

  // создание блоков с декором
  const div1 = makeElement('div', ['decor', common1, individual1])
  const div2 = makeElement('div', ['decor', common2, individual2])
  const commonCont = makeElement('div', 'decor-container')

  // добавление блоков к элементу
  commonCont.append(...[div1, div2])
  element.append(commonCont)
}


function removeSpaceAndCS(list) {
  const newList = []
  for (const string of list) {
    // Удаление пробелов
    let newString = string.split(' ').join('')
    // Перевод строки в нижний регистр
    newString = newString.toLowerCase()
    newList.push(newString)
  }
  return newList
}


function filterProductList(productList) {
  const newList = []
  for (const product of productList) {
    if (!newList.includes(product)) {
      newList.push(product)
    }
  }
  return newList
}


function removeExcessProduct(list, countItemKeep = 3) {
  const newList = []
  let i = 0
  while ((i < countItemKeep) && (i < list.length)) {
    newList.push(list[i])
    i++
  }
  return newList
}


function createFirstQuestion() {
  // Создание вопроса
  const variants = dataQuestions['firstQuestion']

  const elements = []
  for (let variant of variants) {
    const inputWithLabel = makeAnswerVariant(variant, 'first question')
    elements.push(inputWithLabel)
  }

  const section = makeElement('section', 'first-question-page')
  const ul = makeList(elements, ['variants', 'variants--first-question'], 'variant')
  const container = makeElement('div', ['container', 'container--question'])
  const questionHeading = makeElement('h2', 'question-heading')
  const decorContainer = makeElement('div', 'decor-container')

  // id для скролла
  section.id = counterForIdQuestionSection

  // Добавление вопроса на страницу
  questionHeading.textContent = 'Пожалуйста, укажите ваш тип кожи:'
  container.append(questionHeading)
  container.append(ul)
  decorContainer.append(makeElement('div', ['decor', 'decor--left-top', 'kolokolchick_left-top']))
  section.append(container)
  section.append(decorContainer)
  document.querySelector('main').append(section)

  // Вопрос получает отступы для занятия всей страницы
  const questionContainer = document.querySelector('.first-question-page')
  giveIndentYAllPage(questionContainer)

  // Индивидуальный обработчик для первого вопроса
  const radioButtonsLabels = document.querySelector('.variants--first-question').getElementsByClassName('variant__radioButton')
  for (const radioButtonsLabel of radioButtonsLabels) {
    radioButtonsLabel.addEventListener('click', () => {
      firstQuestionAnswer = radioButtonsLabel.value
      createNewQuestion()
      setTimeout(() => {
        const href = '#1001'
        animateScroll(href)
      }, pauseBeforeScroll)
    })
  }
}


function formNotification(statusCode) {
  const notifier = document.querySelector('.form-notification')
  const message = statusCode === 200 ? 'Спасибо! Данные отправлены' : 'Ошибка:( Попробуйте отправить ещё раз'
  notifier.querySelector('.form-notification__message').textContent = message

  notifier.classList.remove('form-notification--hidden')
  setTimeout(() => {
    notifier.classList.add('form-notification--hidden')
  }, 3000)
}


function createNewQuestion() {
  const section = makeElement('section', 'new-question')
  const container = makeElement('div', ['container', 'container--question'])
  const question = makeElement('h2', ['question-heading', 'question-heading--new-question'])
  const varianWithButtonY = makeAnswerVariant('Да', 'new question')
  const varianWithButtonN = makeAnswerVariant('Нет', 'new question')
  const answers = makeList([varianWithButtonY, varianWithButtonN], ['variants', 'variants--new-questions'], 'variant')

  // Кнопка для возвращения к предыдущему вопросу
  const dupQuestionBackButton = questionBackButton.cloneNode(true)
  dupQuestionBackButton.style.display = 'block'
  dupQuestionBackButton.addEventListener('click', () => {
    counterForIdQuestionSection--
    animateScroll('#' + String(counterForIdQuestionSection), true)
    if (counterForIdQuestionSection !== 1000) {
      const nowSection = document.getElementById(counterForIdQuestionSection)
      const questionText = nowSection.querySelector('.question-heading').textContent
      let gidrolats = dataQuestions[firstQuestionAnswer][questionText]

      // Удаление гидролата из списка, если он был добавлен в него после ответа на вопрос
      const radioButtonYes = nowSection.querySelector('.done')
      if (radioButtonYes !== null) {
        if (Array.isArray(gidrolats)) {
          for (let gidrolat of gidrolats) {
            gidrolat = gidrolat
            const gidrolatIndex = selectGidrolatList.indexOf(gidrolat)
            selectGidrolatList.splice(gidrolatIndex, gidrolatIndex + 1)
          }
        } else {
          gidrolats = gidrolats
          const gidrolatIndex = selectGidrolatList.indexOf(gidrolats)
          selectGidrolatList.splice(gidrolatIndex, gidrolatIndex + 1)
        }
      }
      numberQuestion--
    }
  })

  // Определение текста вопроса
  questionDict = dataQuestions[firstQuestionAnswer]
  const questionList = Object.keys(questionDict)
  question.textContent = questionList[numberQuestion]

  // id для скролла
  counterForIdQuestionSection++
  section.id = counterForIdQuestionSection

  // Добавление вопроса на страницу
  container.append(question)
  container.append(answers)
  container.append(dupQuestionBackButton)
  section.append(container)
  addDecor(section)

  // section.append(decorContainer)
  document.querySelector('main').append(section)

  // Вопрос получает отступы для занятия всей страницы
  const questionContainer = document.getElementsByClassName('new-question')[document.getElementsByClassName('new-question').length - 1]
  giveIndentYAllPage(questionContainer)

  // обработчик для создания следующего вопроса
  const lastQuestions = document.getElementsByClassName('new-question')[document.getElementsByClassName('new-question').length - 1]
  const lastRadioButtonsLabels = lastQuestions.getElementsByClassName('variant__text')

  for (const lastRadioButtonsLabel of lastRadioButtonsLabels) {
    lastRadioButtonsLabel.addEventListener('click', () => {
      // Занесение гидролата в список
      if (lastRadioButtonsLabel.textContent === 'Да') {
        // Класс для определения положительного ответа
        lastRadioButtonsLabel.classList.add('done')

        const selectGidrolatName = questionDict[question.textContent]
        if (Array.isArray(selectGidrolatName)) {
          for (const i of selectGidrolatName) {
            selectGidrolatList.push(i)
          }
        } else {
          selectGidrolatList.push(selectGidrolatName)
        }
      }

      if (numberQuestion < questionList.length - 1) {
        numberQuestion++
        createNewQuestion()
        setTimeout(() => {
          const href = '#' + String(counterForIdQuestionSection)
          animateScroll(href)
        }, pauseBeforeScroll)
      } else {
        // Если юзер не ответил положительно ни на один вопрос, ему будет предложено первые три гидролата, подходящие его коже
        if (selectGidrolatList.length === 0) {
          const firstAnswerQuestions = dataQuestions[firstQuestionAnswer]
          const firstAnswerGidrolats = Object.values(firstAnswerQuestions)

          firstAnswerGidrolats.slice(0, 3).forEach((element) => {
            selectGidrolatList.push(element)
          })
        }
        // Запрос к серверу
        // fetch('http://192.168.88.240:5000/giveResult', {
        //   body: JSON.stringify({
        //     'productsNames': removeSpaceAndCS(removeExcessProduct(filterProductList(selectGidrolatList)))
        //   }),
        //   headers: { 'Content-Type': 'application/json;charset=utf-8' },
        //   method: 'POST',
        // })
        //   .then((response) => { return response.json() })
        //   .then((data) => {
        //     gidrolatInfoList = data.products
        //     // Добавление гидролата
        //     createFinalPage()
        //   })
      }
    })
  }
}


function createFinalPage() {
  const finalPage = document.querySelector('.final-page')
  finalPage.style.display = 'block'
  finalPage.id = ++counterForIdQuestionSection
  const mainTeg = document.querySelector('main')
  mainTeg.append(finalPage)

  addGidrolats(gidrolatInfoList)

  setTimeout(() => {
    const href = '#' + String(counterForIdQuestionSection)
    const mainMarginTop = parseInt(getComputedStyle(document.querySelector('main')).marginTop)
    animateScroll(href, false, true, -mainMarginTop)
  }, pauseBeforeScroll)
  // Возвращаем скролл
  document.body.style.overflow = ""
  document.querySelector('html').style.setProperty('--scroll-width', '0px')
}


document.addEventListener('DOMContentLoaded', () => {
  // Стартовая кнопка
  const startButton = document.querySelector('.main__start-test-buttom')

  // Кнопка возвращающая к предыдущему вопросу, берётся с главной страницы (там она display: none)
  window.questionBackButton = document.querySelector('.question__button-back')

  // Начало теста
  // startButton.addEventListener('click', () => {
  //   createFirstQuestion()
  //   removeUserScroll()
  //   setTimeout(() => {
  //     animateScroll('#1000')
  //   }, pauseBeforeScroll)
  // })

  gidrolatInfoList = [{
    name: 'Гидролат Алое',
    imgUrl: 'http://romylo.ru/pictures/product/big/5133_big.JPG ',
    description: 'способствует синтезу коллагена;тонизирует;увлажняет;успокаивает кожу после принятия солнечных ванн, при укусах насекомых и ожогах различного характера;освежает кожу;'.split(';'),
    howToUse: 'В чистом виде как тоник для кожи;Распыление непосредственно на кожу во время отопительного и летнего сезона для увлажнения и питания;В качестве обогащающего компонента в масках для лица: смешать гидролат с белой или розовой глиной или порошковой маской, нанести на лицо на 10-15 минут;В виде косметического льда для тонизирования и матовости кожи.'.split(';'),
    moreLink: 'http://romylo.ru/products/gidrolat-aloe-1'
  }]
  createFinalPage()

  // Обработчик для отправки формы обратной связи
  const form = document.querySelector('.feedback-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formName = form.querySelector('.feedback-form__input--name')
    const formEmail = form.querySelector('.feedback-form__input--email')

    fetch('/sendData', {
      body: JSON.stringify(
        {
          name: formName.value,
          email: formEmail.value,
          gidrolats: removeExcessProduct(filterProductList(selectGidrolatList)).join(', ')
        }
      ),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      method: 'POST'
    })
      .then((response) => {
        formNotification(response.status)
        console.log(response.statusCode)
        // document.querySelector('.feedback-form__submit').disabled = true
      })
  })
})
