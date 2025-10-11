// scrollable
const scrollableBlocks = Array.from(document.querySelectorAll('[data-scrollable]'))
const scrollingClass = 'scrolling'
const SCROLL_TIMEOUT = 100

scrollableBlocks.forEach(scrollable => {
  const items = Array.from(scrollable.querySelectorAll('.scrollable__item'))

  let startScrollX = 0
  let startMouseX = 0
  let isMouseDown = false
  let isTouching = false
  let isSnapping = false

  scrollToNearest()

  scrollable.addEventListener('mousedown', (e) => {
    scrollable.classList.add(scrollingClass)

    startScrollX = scrollable.scrollLeft
    startMouseX = e.clientX

    isMouseDown = true
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

    scrollToNearest()
  })
  
  scrollable.addEventListener('touchstart', (e) => {
    scrollable.classList.add(scrollingClass)
    isTouching = true
  })
  window.addEventListener('touchend', () => {
    scrollable.classList.remove(scrollingClass)
    isTouching = false
  })

  window.addEventListener('resize', () => {
    scrollToNearest()
  })
  scrollable.addEventListener('scrollend', () => {
    if (isMouseDown || isTouching) return

    scrollToNearest()
  })

  function scrollToNearest() {
    if (isSnapping) return
    isSnapping = true

    const snaps = getItemsCoordinates()
    const diffs = snaps.map(snap => Math.abs(snap - scrollable.scrollLeft))

    const minDiff = Math.min(...diffs)
    const minDiffIndex = diffs.indexOf(minDiff)

    const containerSize = parseInt(getComputedStyle(scrollable).getPropertyValue('--container-size'))
    const containerPadding = parseInt(getComputedStyle(scrollable).getPropertyValue('--container-padding'))

    const scrollableSize = scrollable.clientWidth
    const scrollMargin = Math.max(0, scrollableSize - containerSize) / 2 + containerPadding

    scrollable.scrollTo({ left: snaps[minDiffIndex] - scrollMargin, behavior: 'smooth' })

    setTimeout(() => {
      isSnapping = false
    }, SCROLL_TIMEOUT)
  }

  function getItemsCoordinates() {
    return items.map(item => {
      return item.getBoundingClientRect().left - scrollable.getBoundingClientRect().left + scrollable.scrollLeft
    })
  }
})