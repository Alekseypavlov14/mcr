const sliders = Array.from(document.querySelectorAll('[data-slider]'))
const linkActiveClass = 'active'

sliders.forEach(slider => {
  const links = Array.from(slider.querySelectorAll('[data-slider-link]'))
  const MAX_INDEX = links.length - 1

  let currentIndex = 0

  onSwipe(slider, 'right', () => {
    updateCurrentIndex(currentIndex + 1)
  })
  onSwipe(slider, 'left', () => {
    updateCurrentIndex(currentIndex - 1)
  })

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      links.forEach(link => link.classList.remove(linkActiveClass))
      link.classList.add(linkActiveClass)
      
      updateCurrentIndex(index)
    })
  })
  
  function updateCurrentIndex(index) {
    const adjustedIndex = clamp(0, index, MAX_INDEX)

    currentIndex = adjustedIndex

    slider.style.setProperty('--index', adjustedIndex)

    links.forEach(link => link.classList.remove(linkActiveClass))
    links[currentIndex].classList.add(linkActiveClass)
  }
})

function clamp(min, value, max) {
  if (value <= min) return min
  if (value >= max) return max
  return value
} 
