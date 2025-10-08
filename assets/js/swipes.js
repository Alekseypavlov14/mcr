// element: HTMLElement
// direction: 'top' | 'bottom' | 'left' | 'right'
const SWIPE_MIN_DISTANCE = 30
const SWIPE_DIRECTION_COEFFICIENT = 1.5
const TOUCHPAD_DISTANCE_MULTIPLIER = 10

function onSwipe(element, direction, callback) {
  let startX = 0
  let startY = 0
  let dx = 0
  let dy = 0
  let isDown = false
  
  function handler() {
    const distance = Math.sqrt(dx ** 2 + dy ** 2)

    if (distance >= SWIPE_MIN_DISTANCE && isCorrectDirection(direction, dx, dy)) callback() 
  }

  element.addEventListener('mousedown', (e) => {
    startX = e.clientX
    startY = e.clientY
    isDown = true
  })
  element.addEventListener('mousemove', (e) => {
    if (!isDown) return

    dx = e.clientX - startX
    dy = e.clientY - startY
  })
  element.addEventListener('mouseup', () => {
    handler()
    isDown = false
  })

  element.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    isDown = true
  })
  element.addEventListener('touchmove', (e) => {
    if (!isDown) return

    dx = e.touches[0].clientX - startX
    dy = e.touches[0].clientY - startY
  })
  element.addEventListener('touchend', (e) => {
    handler()
    isDown = false
  })

  window.addEventListener('wheel', (e) => {
    dx = -e.deltaX
    dy = -e.deltaY

    handler()
  })

  function isCorrectDirection(direction, dx, dy) {
    // all directions are inverted for swipes
    if (direction === 'top') return (Math.abs(dy) / Math.abs(dx)) >= SWIPE_DIRECTION_COEFFICIENT && dy > 0
    if (direction === 'right') return (Math.abs(dx) / Math.abs(dy)) >= SWIPE_DIRECTION_COEFFICIENT && dx < 0
    if (direction === 'bottom') return (Math.abs(dy) / Math.abs(dx)) >= SWIPE_DIRECTION_COEFFICIENT && dy < 0
    if (direction === 'left') return (Math.abs(dx) / Math.abs(dy)) >= SWIPE_DIRECTION_COEFFICIENT && dx > 0
  }
}