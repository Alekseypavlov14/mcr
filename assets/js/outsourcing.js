const outsourcingAdvantagesBlocks = Array.from(document.querySelectorAll('[data-outsourcing-advantages]'))
const outsourcingAdvantagesActiveClass = 'active'
const OUTSOURCING_SCROLL_TIMEOUT = 300

outsourcingAdvantagesBlocks.forEach(outsourcingAdvantages => {
  const cardsContainer = outsourcingAdvantages.querySelector('[data-outsourcing-advantages-cards]')
  const cards = Array.from(outsourcingAdvantages.querySelectorAll('[data-outsourcing-advantages-card]'))
  const links = Array.from(outsourcingAdvantages.querySelectorAll('[data-outsourcing-advantages-link]'))

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      scrollByIndex(index)
    })
  })

  cardsContainer.addEventListener('scrollend', () => scrollToNearest())
  window.addEventListener('resize', () => scrollToNearest())

  function scrollByIndex(index) {
    const cardsCoordinates = getCardCoordinates()
    cardsContainer.scrollTo({ left: cardsCoordinates[index], behavior: 'smooth' })
    updateActiveLink(index)
  }

  function scrollToNearest() {
    const cardsCoordinates = getCardCoordinates()
    const diffs = cardsCoordinates.map(cardsCoordinate => Math.abs(cardsCoordinate - cardsContainer.scrollLeft))

    const minDiff = Math.min(...diffs)
    const minDiffIndex = diffs.indexOf(minDiff)

    cardsContainer.scrollTo({ left: cardsCoordinates[minDiffIndex], behavior: 'smooth' })
    updateActiveLink(minDiffIndex)
  }

  function updateActiveLink(index) {
    links.forEach(link => link.classList.remove(outsourcingAdvantagesActiveClass))
    links[index].classList.add(outsourcingAdvantagesActiveClass)
  }

  function getCardCoordinates() {
    return cards.map(card => {
      return card.getBoundingClientRect().left - cardsContainer.getBoundingClientRect().left + cardsContainer.scrollLeft
    })
  }
})
