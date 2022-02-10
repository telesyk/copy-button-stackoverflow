const codeClassName = 's-code-block';
const defaultColor = 'var(--black-400)';
const successColor = 'var(--green-400)';
const containerStyles = {
  'position': 'relative',
};
const buttonStyles = {
  'font-size': '11px',
  'border': 'none',
  'border-radius': '2px',
  'background-color': defaultColor,
  'padding': '2px 3px',
  'position': 'absolute',
  'top': '3px',
  'right': '3px',
  'cursor': 'pointer',
  'color': 'var(--black-800)',
};
const captions = {
  default: 'Copy',
  success: 'Copied',
  idStart: 'copyButtonTarget',
};

const codeElements = document.querySelectorAll('pre');

function updateButton(btn) {
  const prevText = btn.textContent;
  btn.textContent = captions.success;
  btn.style.backgroundColor = successColor;
  setTimeout(() => {
    btn.textContent = prevText;
    btn.style.backgroundColor = defaultColor;
  }, 1500);
}

function createCopyButton() {
  const button = document.createElement('button');

  for (const prop in buttonStyles) {
    button.style[prop] = buttonStyles[prop];
  }

  button.textContent = captions.default;
  button.addEventListener('click', event => {
    const current = event.target;
    const targetElement = document.getElementById(current.dataset.target);
    const copyContent = targetElement.childNodes[0].innerText;
    navigator.clipboard.writeText(copyContent);
    updateButton(button);
  })

  return button;
}

function extendCodeElement(code, index) {
  const copyButton = createCopyButton();
  if (code.contains(copyButton)) return;

  const containerCopyButton = document.createElement('div');
  copyButton.setAttribute('data-target', `${captions.idStart}${index}`);
  containerCopyButton.appendChild(copyButton);

  for (const prop in containerStyles) {
    containerCopyButton.style[prop] = containerStyles[prop];
  }
  code.setAttribute('id', `${captions.idStart}${index}`);
  code.before(containerCopyButton);

  return;
}

codeElements.forEach((element, index) => {
  if (!element.classList.contains(codeClassName)) return;

  extendCodeElement(element, index);
});
