type PortableTextChild = {
  _type: 'span'
  text: string
  marks: string[]
}

type PortableTextBlock = {
  _type: 'block'
  style: 'normal' | 'h2'
  children: PortableTextChild[]
  markDefs: []
  listItem?: 'bullet'
  level?: number
}

function span(text: string): PortableTextChild {
  return {
    _type: 'span',
    text,
    marks: [],
  }
}

export function ptParagraph(text: string): PortableTextBlock {
  return {
    _type: 'block',
    style: 'normal',
    children: [span(text)],
    markDefs: [],
  }
}

export function ptHeading(text: string): PortableTextBlock {
  return {
    _type: 'block',
    style: 'h2',
    children: [span(text)],
    markDefs: [],
  }
}

export function ptBullet(text: string): PortableTextBlock {
  return {
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [span(text)],
    markDefs: [],
  }
}
