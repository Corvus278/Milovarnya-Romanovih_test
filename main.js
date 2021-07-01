function makeRadioButton(value, name, style) {
  const radioButton = document.createElement('input');
  radioButton.name = name;
  radioButton.value = value;
  radioButton.type = 'radio';
  radioButton.classList.add(style);
  return radioButton;
}


function makeList(items, ulStyle = 'ul', liStyle = 'li') {
  const ul = document.createElement('ul');
  ul.classList.add(ulStyle)
  for (i of items) {
    const li = document.createElement('li');
    li.append(i);
    li.classList.add(liStyle);
    ul.append(li);
  }
  return ul;
}


// Тестовая сборка первого вопроса
document.addEventListener('DOMContentLoaded', () => {
  let variants = {
    'Сухая': 'dry',
    'Жирная': 'oily',
    'Нормальная': 'normal'
  }

  variants = Object.entries(variants)
  const elements = []
  for (i of variants) {
    const div = document.createElement('div');
    const radioButton = makeRadioButton(i[1], 'first question', 'question__radioButton')
    const p = document.createElement('p')
    p.textContent = i[0]
    p.classList = 'question__text'
    div.append(radioButton)
    div.append(p)
    elements.push(div)
  }

  const ul = makeList(elements, 'main-questions', 'question')
  document.body.append(ul)
})
