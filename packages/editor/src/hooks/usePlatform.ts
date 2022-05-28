import type { Platform } from '@spearjs/shared'

export interface PlatformRectItem {
  x: number
  y: number
  cw: number
  ch: number
  sw: number
  sh: number
}

export type PlatformRect = Record<Platform, PlatformRectItem>

export const platformRect = ((): PlatformRect => {
  const mobile: PlatformRectItem = {
    cw: 9999,
    ch: 9999,
    sw: 320,
    sh: 768,
    x: 0,
    y: 0,
  }

  mobile.x = Math.floor((mobile.cw - mobile.ch) / 2)
  mobile.y = Math.floor((mobile.ch - mobile.sh) / 2)

  const pc: PlatformRectItem = {
    cw: 9999,
    ch: 9999,
    sw: 1024,
    sh: 768,
    x: 0,
    y: 0,
  }

  pc.x = Math.floor((pc.cw - pc.ch) / 2)
  pc.y = Math.floor((pc.ch - pc.sh) / 2)

  return {
    mobile,
    pc,
  }
})()
