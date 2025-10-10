// scrollable
const scrollableBlocks = Array.from(document.querySelectorAll('[data-scrollable]'))
const scrollingClass = 'scrolling'
const mouseScrollingClass = 'mouse-scrolling'
const MOUSE_SCROLLING_TIMEOUT = 300

scrollableBlocks.forEach(scrollable => {
  const items = Array.from(document.querySelectorAll('.scrollable__item'))

  let startScrollX = 0
  let startMouseX = 0
  let isMouseDown = false
  let isTouching = false

  scrollable.addEventListener('mousedown', (e) => {
    scrollable.classList.add(scrollingClass, mouseScrollingClass)

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
    scrollToNearest()

    scrollable.classList.remove(scrollingClass)

    setTimeout(() => {
      scrollable.classList.remove(mouseScrollingClass)
    }, MOUSE_SCROLLING_TIMEOUT)

    startScrollX = scrollable.scrollLeft
    isMouseDown = false
  })
  window.addEventListener('touchend', () => {
    scrollable.classList.remove(scrollingClass, mouseScrollingClass)
    isTouching = false
  })

  function scrollToNearest() {
    const snaps = items.map(item => item.offsetLeft)
    const normalizedSnaps = snaps.map(snap => snap - snaps[0])
    const diffs = normalizedSnaps.map(snap => Math.abs(snap - scrollable.scrollLeft))

    const minDiff = Math.min(...diffs)
    const minDiffIndex = diffs.indexOf(minDiff)

    const containerSize = parseInt(getComputedStyle(scrollable).getPropertyValue('--container-size'))
    const containerPadding = parseInt(getComputedStyle(scrollable).getPropertyValue('--container-padding'))

    const scrollableSize = scrollable.clientWidth
    const scrollMargin = Math.max(0, scrollableSize - (containerSize - containerPadding * 2)) / 2

    scrollable.scrollTo({ left: snaps[minDiffIndex] - scrollMargin, behavior: 'smooth' })
  }
})