// scrollable
const scrollableBlocks = Array.from(document.querySelectorAll('[data-scrollable]'))
const scrollingClass = 'scrolling'

scrollableBlocks.forEach(scrollable => {
  let startScrollX = 0
  let startMouseX = 0
  let isMouseDown = false
  let isTouching = false

  scrollable.addEventListener('mousedown', (e) => {
    scrollable.classList.add(scrollingClass)

    startScrollX = scrollable.scrollLeft
    startMouseX = e.clientX

    isMouseDown = true
  })
  scrollable.addEventListener('touchstart', (e) => {
    scrollable.classList.add(scrollingClass)
    isTouching = true
  })

  window.addEventListener('mousemove', (e) => {
    if (isTouching) return
    if (!isMouseDown) return

    const currentX = e.clientX
    const dx = currentX - startMouseX

    scrollable.scrollTo({ left: startScrollX - dx })
  })

  window.addEventListener('mouseup', () => {
    scrollable.classList.remove(scrollingClass)
    startScrollX = scrollable.scrollLeft
    isMouseDown = false
  })
  window.addEventListener('touchend', () => {
    scrollable.classList.remove(scrollingClass)
    isTouching = false
  })
})