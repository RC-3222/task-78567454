export function switchTheme() {
  const calculator = document.querySelector('body')

  calculator.classList.toggle('switched__theme')
}

export function initThemeSwitcher() {
  const themeSwitch = document.getElementById('switchThemeButton')
  themeSwitch.addEventListener('click', switchTheme)
}
