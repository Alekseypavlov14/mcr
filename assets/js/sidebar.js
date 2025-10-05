const burgerButton = document.getElementById('burger-button')
const sidebar = document.getElementById('sidebar')

const burgerButtonActiveCSSClass = 'active'
const sidebarOpenedCSSClass = 'opened'
const bodyFixedCSSClass = 'body--fixed'

burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle(burgerButtonActiveCSSClass)
  sidebar.classList.toggle(sidebarOpenedCSSClass)
  document.body.classList.toggle(bodyFixedCSSClass)
})

// sidebar dropdown
const sidebarDropdowns = Array.from(document.querySelectorAll('[data-sidebar-dropdown]'))
const sidebarDropdownOpenedClass = 'opened'

sidebarDropdowns.forEach(sidebar => {
  sidebar.addEventListener('click', () => {
    sidebar.classList.toggle(sidebarDropdownOpenedClass)
  })
})
