const widgetList = [
  {
    id: '',
    name: '',
    version: '',
    url: '',
  },
]

const cacheMap = {}
function loadWidget(widget) {
  const key = `${widget.id}-${widget.version}`
  if (cacheMap[key]) {
    return Promise.resolve(cacheMap[key])
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = widget.url
    script.type = 'text/javascript'
    script.setAttribute('data-widget', key)
    script.setAttribute('data-widget-name', widget.name)
    document.head.appendChild(script)
    script.onload = function () {
      cacheMap[key] = window.__spearjs_low_code__.widgetMap[key]
      resolve(cacheMap[key])
    }
    script.onerror = function (e) {
      reject(e)
    }
  })
}

async function loadAllWidget() {
  const result = await Promise.all(widgetList.map(loadWidget))

  // widget enhance 扩展，为 widget做前置准备
  result.forEach(async (widget) => {
    if (widget.enhance) await widget.enhance({ app, router })
  })
}
