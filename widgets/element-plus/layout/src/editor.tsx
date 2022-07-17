import { defineEditorConfig } from '@spearjs/shared'
import { ElAside, ElContainer, ElFooter, ElHeader, ElMain } from 'element-plus'

export default defineEditorConfig({
  preview() {
    return (
      <ElContainer style={{ width: '200px', backgroundColor: '#fff' }}>
        <ElHeader style={{ backgroundColor: '#f2f2f2' }}>Header</ElHeader>
        <ElContainer>
          <ElAside width="80px" style={{ backgroundColor: '#ccc' }}>
            Aside
          </ElAside>
          <ElContainer>
            <ElMain>Main</ElMain>
            <ElFooter style={{ backgroundColor: '#f2f2f2' }}>Footer</ElFooter>
          </ElContainer>
        </ElContainer>
      </ElContainer>
    )
  },
  description() {
    return (
      <div>
        <p>Element-Plus 布局容器。</p>
        <p>支持可选择的三栏布局、两栏布局、侧边栏等</p>
      </div>
    )
  },
  layer: {
    display: 'block',
  },
  slots: ({ header, aside, footer }) => {
    return [header && 'header', aside && 'aside', 'main', footer && 'footer'].filter(Boolean)
  },
  props: [
    {
      key: 'header',
      type: 'switch',
      label: '启用Header',
      defaultValue: true,
    },
    {
      key: 'headerConfig',
      type: 'object',
      label: '顶栏设置',
      showProp: (props) => props.header,
      props: [
        {
          key: 'height',
          label: '高度',
          type: 'number',
          defaultValue: 60,
          tips: '顶栏（header）高度，单位：px，默认： 60px',
        },
        {
          key: 'bgColor',
          label: '背景颜色',
          type: 'color',
          showAlpha: true,
        },
        {
          key: 'fixed',
          label: '窗口固定',
          type: 'switch',
          defaultValue: true,
        },
        {
          key: 'marginBottom',
          label: '下边距',
          type: 'number',
          defaultValue: 20,
        },
      ],
    },
    {
      key: 'aside',
      type: 'switch',
      label: '启用侧边栏',
      defaultValue: true,
    },
    {
      key: 'asideConfig',
      type: 'object',
      label: '侧边栏设置',
      showProp: (props) => props.aside,
      props: [
        {
          key: 'width',
          label: '宽度',
          type: 'number',
          defaultValue: 300,
          tips: '侧边栏栏（aside）宽度，单位：px，默认： 300px',
        },
        {
          key: 'height',
          label: '高度',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: '自适应', value: 'auto' },
            { label: '填充剩余高度', value: 'fill' },
          ],
        },
        {
          key: 'bgColor',
          label: '背景颜色',
          type: 'color',
          showAlpha: true,
        },
        {
          key: 'fixed',
          label: '窗口固定',
          type: 'switch',
          defaultValue: true,
        },
      ],
    },
    {
      key: 'mainConfig',
      type: 'object',
      label: '主要区域设置',
      props: [
        {
          key: 'height',
          label: '高度',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: '自适应', value: 'auto' },
            { label: '填充剩余高度', value: 'fill' },
          ],
        },
        {
          key: 'bgColor',
          label: '背景颜色',
          type: 'color',
          showAlpha: true,
        },
        {
          key: 'marginLeft',
          label: '左外边距',
          type: 'number',
          defaultValue: 20,
        },
        {
          key: 'paddingY',
          label: '上下内边距',
          type: 'number',
          defaultValue: 20,
        },
        {
          key: 'paddingX',
          label: '左右内边距',
          type: 'number',
          defaultValue: 20,
        },
      ],
    },
    {
      key: 'footer',
      type: 'switch',
      label: '启用Footer',
      defaultValue: true,
    },
    {
      key: 'footerConfig',
      type: 'object',
      label: '底栏设置',
      showProp: (props) => props.footer,
      props: [
        {
          key: 'height',
          label: '高度',
          type: 'number',
          defaultValue: 60,
          tips: '底栏（footer）高度，单位：px，默认： 60px',
        },
        {
          key: 'bgColor',
          label: '背景颜色',
          type: 'color',
          showAlpha: true,
        },
        {
          key: 'fixed',
          label: '窗口固定',
          type: 'switch',
          defaultValue: true,
        },
        {
          key: 'marginTop',
          label: '上边距',
          type: 'number',
          defaultValue: 20,
        },
      ],
    },
  ],
})
