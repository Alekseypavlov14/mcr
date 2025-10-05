// header scrolling
const header = document.getElementById('header')
const headerScrollingClass = 'scrolling'
const headerScrollingBreakpoint = 50

window.addEventListener('scroll', () => {
  if (window.scrollY >= headerScrollingBreakpoint) header.classList.add(headerScrollingClass)
  else header.classList.remove(headerScrollingClass)
})
