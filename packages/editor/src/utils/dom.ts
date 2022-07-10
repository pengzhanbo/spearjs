/**
 * 获取元素相对于其祖先定位元素的 计算定位信息、计算宽高
 * @param el 当前元素
 * @param root 祖先定位元素，默认为 body
 */
export const getElOffset = (el: HTMLElement, root: HTMLElement = document.body) => {
  let { offsetLeft, offsetTop } = el
  const { offsetHeight, offsetWidth } = el
  while ((el = el.offsetParent as HTMLElement) && el !== root) {
    offsetLeft += el.offsetLeft
    offsetTop += el.offsetTop
  }

  return {
    offsetLeft,
    offsetTop,
    offsetHeight,
    offsetWidth,
  }
}
