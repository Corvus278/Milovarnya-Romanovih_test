var counterForIdRadioButton = 0
var counterForIdQuestion = 1000
var scrollAnimateDuration = 800
var pauseBeforeScroll = 300


function animatedScroll(href) {
  jQuery(document).ready(function ($) {
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, {
      duration: scrollAnimateDuration,   // по умолчанию «400»
      // easing: "linear" // по умолчанию «swing»
    });
  }, pauseBeforeScroll);
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

  // При клике будет создаваться новый вопрос
  radioButton.addEventListener('change', () => {
    createNewQuestion()
    setTimeout(() => {
      const href = '#' + String(counterForIdQuestion - 1)
      animatedScroll(href)
    }, pauseBeforeScroll)
  })
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


function giveMarginYAllPage(element) {
  const windowHeight = window.innerHeight
  const elementHeight = element.offsetHeight

  let margin = (windowHeight - elementHeight) / 2
  element.style.marginTop = String(margin) + 'px'
  element.style.marginBottom = String(margin) + 'px'
}


function createFirstQuestion() {
  // Создание вопроса
  let variants = [
    'Сухая',
    'Жирная',
    'Чувствительная',
    'Комбинированная',
    'Проблемная',
    'Зрелая',
    'Нормальная',
    'Я не уверен/а (ищу подарок)',
    'Я ищу гидролат для волос'
  ]

  const elements = []
  for (let variant of variants) {
    const inputWithLabel = makeAnswerVariant(variant, 'first question')
    elements.push(inputWithLabel)
  }

  const section = makeElement('section', 'first-question-page')
  const ul = makeList(elements, ['variants', 'variants--first-question'], 'variant')
  const container = makeElement('div', ['container', 'container--question'])
  const questionHeading = makeElement('h2', 'question-heading')

  // id для скролла
  section.id = counterForIdQuestion
  counterForIdQuestion++

  // Добавление вопроса на страницу
  questionHeading.textContent = 'Пожалуйста, укажите ваш тип кожи:'
  container.append(questionHeading)
  container.append(ul)
  section.append(container)
  document.querySelector('main').append(section)

  // Вопрос получает отступы для занятия всей страницы
  const questionContainer = document.querySelector('.container--question')
  giveMarginYAllPage(questionContainer)
}


function createNewQuestion() {
  const section = makeElement('section', 'new-question')
  const container = makeElement('div', ['container', 'container--question'])
  const question = makeElement('h2', ['question-heading', 'question-heading--new-question'])
  const varianWithButtonY = makeAnswerVariant('Да', 'new question')
  const varianWithButtonN = makeAnswerVariant('Нет', 'new question')
  const answers = makeList([varianWithButtonY, varianWithButtonN], ['variants', 'variants--new-questions'], 'variant')

  question.textContent = 'Нужна защита от агрессивных факторов окружающей среды?'

  // id для скролла
  section.id = counterForIdQuestion
  counterForIdQuestion++

  // Добавление вопроса на страницу
  container.append(question)
  container.append(answers)
  section.append(container)
  document.querySelector('main').append(section)

  // Вопрос получает отступы для занятия всей страницы
  const questionContainer = document.getElementsByClassName('container--question')[document.getElementsByClassName('container--question').length - 1]
  giveMarginYAllPage(questionContainer)
}


document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.main__start-test-buttom')
  startButton.addEventListener('click', () => {
    createFirstQuestion()
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      animatedScroll('#1000')
    }, pauseBeforeScroll)

  })
})
