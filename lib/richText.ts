type LexicalNode = {
  children?: LexicalNode[]
  text?: string
  type?: string
}

type RichTextValue = {
  root?: LexicalNode
} | null | undefined

export const richTextFromText = (text: string) => ({
  root: {
    type: 'root',
    children: text
      .split(/\n{2,}/)
      .map((paragraph) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: paragraph.replace(/\n/g, ' '),
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const collectText = (node?: LexicalNode): string => {
  if (!node) {
    return ''
  }

  if (typeof node.text === 'string') {
    return node.text
  }

  return node.children?.map(collectText).filter(Boolean).join(' ') || ''
}

export const richTextToParagraphs = (value: RichTextValue): string[] => {
  const children = value?.root?.children

  if (!children?.length) {
    return []
  }

  return children.map(collectText).map((text) => text.trim()).filter(Boolean)
}
