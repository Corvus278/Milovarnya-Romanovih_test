var counterForIdRadioButton = 0
function makeElement(nameElement, className = nameElement) {
  let element = document.createElement(nameElement)
  element.classList.add(className)
  return element
}


function makeRadioButton(value, name, style) {
  const radioButton = document.createElement('input')
  radioButton.name = name
  radioButton.value = value
  radioButton.type = 'radio'
  radioButton.classList.add(style)

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
  ul.classList.add(ulStyle)
  for (i of items) {
    const li = document.createElement('li')
    if (Array.isArray(i)) {
      for (j of i) {
        li.append(j)
      }
    } else {
      li.append(i);
    }
    li.classList.add(liStyle)
    ul.append(li);
  }
  return ul;
}

function runFirstQuestion() {
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
  const ul = makeList(elements, 'main-questions', 'variant')
  const container = makeElement('div', 'container')
  const questionHeader = makeElement('h2', 'main-question__header')

  questionHeader.textContent = 'Пожалуйста, укажите ваш тип кожи:'
  container.append(questionHeader)
  container.append(ul)
  section.append(container)
  document.querySelector('main').append(section)
}


// Тестовая сборка
document.addEventListener('DOMContentLoaded', () => {
  runFirstQuestion()
})
