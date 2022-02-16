export const withDirection = (Story,context) => {
  return (
    `<div class="dir-el" dir="${context.globals.dir}">
      ${Story(context)}
    </div>`
  )
}