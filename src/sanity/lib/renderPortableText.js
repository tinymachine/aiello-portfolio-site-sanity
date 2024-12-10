export async function renderPortableText(blocks) {
  return blocks
    .map((block) => {
      if (block._type === 'block') {
        // Handle text blocks
        const childrenHtml = (block.children || [])
          .map((child) => renderSpan(child, block.markDefs || []))
          .join('')
        return `<p>${childrenHtml}</p>`
      }

      return ''
    })
    .join('')
}

function renderSpan(span, markDefs) {
  let text = span.text || ''
  const marks = span.marks || []

  for (const mark of marks) {
    if (mark === 'strong') {
      text = `<strong>${text}</strong>`
    } else if (mark === 'em') {
      text = `<em>${text}</em>`
    } else {
      // Handle marks defined in markDefs (e.g., links)
      const def = markDefs.find((d) => d._key === mark)
      if (def && def._type === 'link') {
        text = `<a href="${def.href}" rel="noopener noreferrer">${text}</a>`
      }
    }
  }

  return text
}
