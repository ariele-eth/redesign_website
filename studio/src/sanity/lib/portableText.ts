type PortableTextBlock = {
  _type?: string
  children?: Array<{ text?: string }>
}

export function toPlainText(value: unknown): string {
  if (!Array.isArray(value)) return ''

  return value
    .map((block) => {
      const typed = block as PortableTextBlock
      if (typed._type !== 'block' || !Array.isArray(typed.children)) return ''
      return typed.children.map((child) => child.text ?? '').join('')
    })
    .filter(Boolean)
    .join(' ')
    .trim()
}
