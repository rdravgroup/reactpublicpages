/** Individual rule functions — return error string or null */
export const rules = {
  required: (v) =>
    !v || !String(v).trim() ? 'This field is required.' : null,

  email: (v) => {
    if (!v) return null
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())
      ? null
      : 'Enter a valid email address.'
  },

  phone: (v) => {
    if (!v) return null
    const clean = String(v).replace(/\D/g, '')
    return /^[0-9]{10}$/.test(clean)
      ? null
      : 'Enter a valid phone number (10 digits).'
  },

  minLen: (min) => (v) =>
    !v || String(v).trim().length < min
      ? `Must be at least ${min} characters.`
      : null,

  maxLen: (max) => (v) =>
    v && String(v).trim().length > max
      ? `Must be ${max} characters or fewer.`
      : null,
}

/** Run a value through multiple rule fns; return first error or null */
export function validate(value, ruleFns) {
  for (const fn of ruleFns) {
    const err = fn(value)
    if (err) return err
  }
  return null
}

/** Validate the whole contact form object; return { field: errorMsg } */
export function validateContact(form) {
  const errors = {}

  const name = validate(form.name, [rules.required, rules.minLen(2), rules.maxLen(80)])
  if (name) errors.name = name

  const email = validate(form.email, [rules.required, rules.maxLen(33), rules.email])
  if (email) errors.email = email

  const countryCode = validate(form.countryCode, [rules.required])
  if (countryCode) errors.countryCode = countryCode

  const phone = validate(form.phone, [rules.required, rules.phone])
  if (phone) errors.phone = phone

  const service = validate(form.service, [rules.required])
  if (service) errors.service = service

  const message = validate(form.message, [rules.required, rules.minLen(10), rules.maxLen(2000)])
  if (message) errors.message = message

  if (!form.agreed) errors.agreed = 'You must accept the Privacy Policy.'

  return errors
}
