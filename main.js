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
  let variants = {
    'Сухая': 'dry',
    'Жирная': 'oily',
    'Чувствительная': 'sensitive',
    'Комбинированная': 'combined',
    'Проблемная': 'problematic',
    'Зрелая': 'mature',
    'Нормальная': 'normal',
    'Я не уверен/а (ищу подарок)': 'not sure',
    'Я ищу гидролат для волос': 'hair'
  }

  variants = Object.entries(variants)
  const elements = []
  for (i of variants) {
    const radioButton = makeRadioButton(i[1], 'first question', 'question__radioButton')
    const label = document.createElement('label')
    label.textContent = i[0]
    label.htmlFor = radioButton.id
    label.classList = 'question__text'
    elements.push([radioButton, label])
  }

  const ul = makeList(elements, 'main-questions', 'question')
  const container = makeElement('div', 'container')
  const questionHeader = makeElement('h2', 'main-question__header')

  questionHeader.textContent = 'Пожалуйста, укажите ваш тип кожи:'
  container.append(questionHeader)
  container.append(ul)
  document.querySelector('.question-page').append(container)
}


// Тестовая сборка первого вопроса
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.main__start-test-buttom').addEventListener('click', runFirstQuestion)
})
