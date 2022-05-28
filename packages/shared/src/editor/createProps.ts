import { EditorProps } from '../types'

export interface EditorPropOptions {
  label: string
  defaultValue?: any
  tips?: string
}

export type EditorInputPropOptions = EditorPropOptions

export function createEditorInputProp({
  label,
  defaultValue,
  tips,
}: EditorInputPropOptions): EditorProps {
  return {
    type: 'input',
    label,
    defaultValue,
    tips,
  }
}

export interface EditorInputNumberPropOptions extends EditorPropOptions {
  max?: number
  min?: number
}

export function createEditorInputNumberProp({
  label,
  defaultValue,
  tips,
  max,
  min,
}: EditorInputNumberPropOptions): EditorProps {
  return {
    type: 'inputNumber',
    label,
    defaultValue,
    tips,
    max,
    min,
  }
}

export type EditorModelBindPropOptions = EditorPropOptions

export function createEditorModelBindProp({
  label = '字段绑定',
  defaultValue,
  tips,
}: EditorModelBindPropOptions): EditorProps {
  return {
    type: 'modelBind',
    label,
    tips,
    defaultValue,
  }
}

export type EditorModelSwitchOptions = EditorPropOptions

export function createEditorSwitchProp({
  label,
  defaultValue,
  tips,
}: EditorModelBindPropOptions): EditorProps {
  return {
    type: 'switch',
    label,
    tips,
    defaultValue,
  }
}
