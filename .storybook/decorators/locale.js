export const withLocale = (Story,context) => {
  return (
    `<div class="lang-el" lang="${context.globals.locale}">
      ${Story(context)}
    </div>`
  )
}