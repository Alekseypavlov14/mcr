// form fields
const formFields = Array.from(document.querySelectorAll('[data-form-field]'))
const mapFieldTypeToActivePlaceholder = {
  tel: '+7 (___) ___-__-__',
  email: 'mail@mail.com',
}

formFields.forEach(field => {
  const input = field.querySelector('input')
  if (!input) return

  const defaultPlaceholder = input.getAttribute('placeholder')
  const type = field.getAttribute('data-form-field')

  const activePlaceholder = mapFieldTypeToActivePlaceholder[type] ?? defaultPlaceholder

  input.addEventListener('focus', () => {
    input.setAttribute('placeholder', activePlaceholder)
  })
  input.addEventListener('blur', () => {
    input.setAttribute('placeholder', defaultPlaceholder)
  })
})