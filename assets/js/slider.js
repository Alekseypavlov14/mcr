const sliders = Array.from(document.querySelectorAll('[data-slider]'))
const linkActiveClass = 'active'

sliders.forEach(slider => {
  const links = Array.from(slider.querySelectorAll('[data-slider-link]'))

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      links.forEach(link => link.classList.remove(linkActiveClass))
      link.classList.add(linkActiveClass)
      
      slider.style.setProperty('--index', index)
    })
  })
})
