// element: HTMLElement
// direction: 'top' | 'bottom' | 'left' | 'right'
const SWIPE_MIN_DISTANCE = 30
const SWIPE_DIRECTION_COEFFICIENT = 1.5

function onSwipe(element, direction, callback) {
  let startX = 0
  let startY = 0
  let currentX = 0
  let currentY = 0
  let isDown = false
  
  function handler() {
    const dx = currentX - startX
    const dy = currentY - startY

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

    currentX = e.clientX
    currentY = e.clientY
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

    currentX = e.touches[0].clientX
    currentY = e.touches[0].clientY
  })
  element.addEventListener('touchend', (e) => {
    handler()
    isDown = false
  })

  function isCorrectDirection(direction, dx, dy) {
    // all directions are inverted for swipes
    if (direction === 'top') return (Math.abs(dy) / Math.abs(dx)) >= SWIPE_DIRECTION_COEFFICIENT && dy > 0
    if (direction === 'right') return (Math.abs(dx) / Math.abs(dy)) >= SWIPE_DIRECTION_COEFFICIENT && dx < 0
    if (direction === 'bottom') return (Math.abs(dy) / Math.abs(dx)) >= SWIPE_DIRECTION_COEFFICIENT && dy < 0
    if (direction === 'left') return (Math.abs(dx) / Math.abs(dy)) >= SWIPE_DIRECTION_COEFFICIENT && dx > 0
  }
}