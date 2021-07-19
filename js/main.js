let counterForIdRadioButton = 0
let counterForIdQuestionSection = 1000
let numberQuestion = 0
let firstQuestionAnswer
let selectGidrolatList = []
const scrollAnimateDuration = 800
const pauseBeforeScroll = 300

// Вопросы
const dataQuestions = JSON.parse(data)


function removeSpaceAndCS(string) {
  // Удаление пробелов
  string = string.split(' ').join('')
  // Перевод строки в нижний регистр
  string = string.toLowerCase()


  return string
}


function animateScroll(href, removeLastQuestion = false) {
  jQuery(document).ready(function ($) {
    $('html, body').animate({
      scrollTop: $(href).offset().top
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
  if (window.scrollY !== 0) {
    document.body.style.paddingRight = String(scrollWidth()) + 'px'
  }
  document.body.style.overflow = "hidden"
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
  decorContainer.append(...[makeElement('div', ['decor', 'decor--left-top']), makeElement('div', ['decor', 'decor--right-top']), makeElement('div', ['decor', 'decor--right-bottom']), makeElement('div', ['decor', 'decor--left-bottom'])])
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


function createNewQuestion() {
  const section = makeElement('section', 'new-question')
  const container = makeElement('div', ['container', 'container--question'])
  const question = makeElement('h2', ['question-heading', 'question-heading--new-question'])
  const varianWithButtonY = makeAnswerVariant('Да', 'new question')
  const varianWithButtonN = makeAnswerVariant('Нет', 'new question')
  const answers = makeList([varianWithButtonY, varianWithButtonN], ['variants', 'variants--new-questions'], 'variant')
  const decorContainer = makeElement('div', 'decor-container')

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
            gidrolat = removeSpaceAndCS(gidrolat)
            const gidrolatIndex = selectGidrolatList.indexOf(gidrolat)
            selectGidrolatList.splice(gidrolatIndex, gidrolatIndex + 1)
          }
        } else {
          gidrolats = removeSpaceAndCS(gidrolats)
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
  decorContainer.append(...[makeElement('div', ['decor', 'decor--left-top', 'myata-bolshoi_left-top']), makeElement('div', ['decor', 'decor--right-top']), makeElement('div', ['decor', 'decor--right-bottom']), makeElement('div', ['decor', 'decor--left-bottom'])])
  section.append(decorContainer)
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
            selectGidrolatList.push(removeSpaceAndCS(i))
          }
        } else {
          selectGidrolatList.push(removeSpaceAndCS(selectGidrolatName))
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
        alert(selectGidrolatList)
        // Запрос к серверу
      }
    })
  }

}


document.addEventListener('DOMContentLoaded', () => {
  // Стартовая кнопка
  const startButton = document.querySelector('.main__start-test-buttom')

  // Кнопка возвращающая к предыдущему вопросу, берётся с главной страницы (там она display: none)
  window.questionBackButton = document.querySelector('.question__button-back')

  // Начало теста
  startButton.addEventListener('click', () => {
    createFirstQuestion()
    removeUserScroll()
    setTimeout(() => {
      animateScroll('#1000')
    }, pauseBeforeScroll)
  })
})
