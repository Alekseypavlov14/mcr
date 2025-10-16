// scrollable
const scrollableBlocks = Array.from(document.querySelectorAll('[data-scrollable]'))
const scrollingClass = 'scrolling'
const activeClass = 'active'

const SCROLL_TIMEOUT = 50
const MIN_SCROLL_DISTANCE = 100

scrollableBlocks.forEach(scrollable => {
  const slider = scrollable.querySelector('[data-scrollable-slider]')
  const items = Array.from(scrollable.querySelectorAll('.scrollable__item'))
  const links = Array.from(scrollable.querySelectorAll('[data-scrollable-link]'))

  // initial scrollable scrollLeft
  let startScrollX = 0
  // initial mouse x
  let startMouseX = 0

  let isMouseDown = false
  let isTouching = false
  let isSnapping = false

  // initial positioning
  scrollToNearest()

  // for mouse
  slider.addEventListener('mousedown', (e) => {
    if (isSnapping) return

    slider.classList.add(scrollingClass)

    startScrollX = slider.scrollLeft
    startMouseX = e.clientX

    isMouseDown = true
  })
  window.addEventListener('mousemove', (e) => {
    if (isSnapping) return
    if (isTouching) return
    if (!isMouseDown) return
    
    const currentX = e.clientX
    const dx = currentX - startMouseX
    
    slider.scrollTo({ left: startScrollX - dx })
  })
  window.addEventListener('mouseup', (e) => {
    if (isSnapping) return
    
    slider.classList.remove(scrollingClass)

    // scroll till next item if needed
    const itemsCoordinates = getItemsCoordinates()
    const currentScrollableX = slider.scrollLeft
    const scrollDistance = e.clientX - startMouseX

    // scroll to target item
    if (Math.abs(scrollDistance) >= MIN_SCROLL_DISTANCE) {
      if (scrollDistance > 0) {
        const targetItemCoordinate = itemsCoordinates.findLast(coordinate => coordinate < currentScrollableX)
        if (targetItemCoordinate > 0) slider.scrollTo({ left: targetItemCoordinate, behavior: 'smooth' })
      } else if (scrollDistance < 0) {  
        const targetItemCoordinate = itemsCoordinates.find(coordinate => coordinate > currentScrollableX)
        if (targetItemCoordinate > 0) slider.scrollTo({ left: targetItemCoordinate, behavior: 'smooth' })
      }
    }
    // otherwise go back 
    else {
      scrollToNearest()
    }

    startScrollX = slider.scrollLeft
    isMouseDown = false
  })
  
  // for touch devices
  slider.addEventListener('touchstart', () => {
    slider.classList.add(scrollingClass)
    isTouching = true
  })
  window.addEventListener('touchend', () => {
    slider.classList.remove(scrollingClass)
    isTouching = false
  })

  // technical
  window.addEventListener('resize', () => {
    scrollToNearest()

    startScrollX = 0
    startMouseX = 0
  })
  slider.addEventListener('scrollend', () => {
    if (isMouseDown || isTouching) return

    scrollToNearest()
  })

  // link nav
  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      const coordinates = getItemsCoordinates()
      slider.scrollTo({ left: coordinates[index], behavior: 'smooth' })
    })
  })

  function scrollToNearest() {
    if (isSnapping) return
    isSnapping = true

    // get closest point
    const snaps = getItemsCoordinates()
    const diffs = snaps.map(snap => Math.abs(snap - slider.scrollLeft))

    const minDiff = Math.min(...diffs)
    const minDiffIndex = diffs.indexOf(minDiff)

    // style nav
    links.forEach(link => link.classList.remove(activeClass))
    links[minDiffIndex].classList.add(activeClass)

    slider.scrollTo({ left: snaps[minDiffIndex], behavior: 'smooth' })

    setTimeout(() => {
      isSnapping = false
    }, SCROLL_TIMEOUT)
  }

  function getItemsCoordinates() {
    const containerSize = parseInt(getComputedStyle(slider).getPropertyValue('--container-size'))
    const containerPadding = parseInt(getComputedStyle(slider).getPropertyValue('--container-padding'))

    const scrollableSize = slider.clientWidth
    const scrollMargin = Math.max(0, scrollableSize - containerSize) / 2 + containerPadding

    return items.map(item => {
      return (
        item.getBoundingClientRect().left - 
        slider.getBoundingClientRect().left + 
        slider.scrollLeft - 
        scrollMargin
      )
    })
  }
})