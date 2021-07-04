var counterForIdRadioButton = 0


function makeElement(nameElement, className = nameElement) {
  let element = document.createElement(nameElement)
  if (Array.isArray(className)) {
    element.classList.add(...className)
  } else {
    element.classList.add(className)
  }
  return element
}


function makeRadioButton(value, name, style) {
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
  const radioButton = makeRadioButton(answerText, inputName, inputStyle)
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

function createFirstQuestion() {
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
  const ul = makeList(elements, 'variants', 'variant')
  const container = makeElement('div', 'container')
  const questionHeader = makeElement('h2', 'question-header')

  questionHeader.textContent = 'Пожалуйста, укажите ваш тип кожи:'
  container.append(questionHeader)
  container.append(ul)
  section.append(container)
  document.querySelector('main').append(section)
}


function createNewQuestion() {
  const section = makeElement('section', 'new-question')
  const container = makeElement('div', 'container')
  const question = makeElement('h2', ['question-header', 'question-header--new-question'])
  const varianWithButtonY = makeAnswerVariant('Да', 'new question')
  const varianWithButtonN = makeAnswerVariant('Нет', 'new question')
  const answers = makeList([varianWithButtonY, varianWithButtonN], ['variants', 'variants--new-questions'], 'variant')

  question.textContent = 'Нужна защита от агрессивных факторов окружающей среды?'

  container.append(question)
  container.append(answers)
  section.append(container)
  document.querySelector('main').append(section)
}


// Тестовая сборка
document.addEventListener('DOMContentLoaded', () => {
  createFirstQuestion()
  createNewQuestion()
})
