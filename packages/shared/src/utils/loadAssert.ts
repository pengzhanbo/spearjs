let head: HTMLHeadElement | null
export const scriptLoader = (
  url: string,
  name?: string
): [HTMLScriptElement, () => Promise<void>] => {
  const script = document.createElement('script')
  script.src = url
  script.type = 'text/javascript'
  script.async = true
  if (name) {
    script.setAttribute('data-name', name)
  }
  if (!head) {
    head = document.head
  }

  const promise = () =>
    new Promise<void>((resolve, reject) => {
      head!.appendChild(script)
      script.onload = () => resolve()
      script.onerror = (e) => reject(e)
    })
  return [script, promise]
}

export const styleSheetLoader = (
  url: string,
  name?: string
): [HTMLLinkElement, () => Promise<void>] => {
  const link = document.createElement('link')
  link.href = url
  link.rel = 'stylesheet'
  if (name) {
    link.setAttribute('data-name', name)
  }
  if (!head) {
    head = document.head
  }

  const promise = () =>
    new Promise<void>((resolve, reject) => {
      head!.appendChild(link)
      link.onload = () => resolve()
      link.onerror = (e) => reject(e)
    })
  return [link, promise]
}
