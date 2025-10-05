const tabs = Array.from(document.querySelectorAll('[data-tabs]'))
const tabsActiveClass = 'active'

tabs.forEach(tab => {
  const links = Array.from(tab.querySelectorAll('[data-tabs-link]'))
  const pages = Array.from(tab.querySelectorAll('[data-tabs-page]'))

  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      links.forEach(link => link.classList.remove(tabsActiveClass))
      pages.forEach(page => page.classList.remove(tabsActiveClass))

      links[index].classList.add(tabsActiveClass)
      pages[index].classList.add(tabsActiveClass)
    })
  })
})
