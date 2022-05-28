import { ref } from 'vue'
import type { Ref } from 'vue'

interface PositionData {
  cw: number
  ch: number
  sw: number
  sh: number
  cl: number
  ct: number
  x: number
  y: number
}

export type PositionDataRef = Ref<PositionData>

export const useStagePosition = (): PositionDataRef => {
  const { clientHeight, clientWidth } = document.documentElement
  const sw = 320,
    sh = 600
  let x = 0,
    y = 0,
    cl = 0,
    ct = 0,
    cw = 0,
    ch = 0

  cw = clientWidth * 2 - sw
  ch = 9999
  x = (cw - sw) / 2
  y = clientHeight - sh / 2
  cl = x - (clientWidth - sw) / 2
  ct = y - (clientHeight - sh) / 2
  return ref({
    cw,
    ch,
    sw,
    sh,
    x,
    y,
    cl,
    ct,
  })
}
