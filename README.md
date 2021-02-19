# vue3-modal

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Usage

```
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Modal from './components/Modal/plugin'

createApp(App)
  .use(Modal)
  .mount('#app')
```

```
// App.vue
<template>
  <button @click="handleShowModal">click to show modal</button>
  <modal
    width="300"
    title="标题"
    content="今天是个好日子"
    :dangerouslyUseHTMLString="true"
    :show-cancel-button="true"
    :overlay="overlay"
    :overlay-style="{ 'z-index': 100 }"
    @open="handleOpen"
    @close="handleClose"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const overlay = ref(false)
    const handleShowModal = () => {
      overlay.value = true
    }
    const handleOpen = () => {
      alert('Modal被打开了')
    }
    const handleClose = () => {
      overlay.value = false
      alert('Modal被关闭了')
    }
    const handleCancel = () => {
      overlay.value = false
      alert('点击了取消')
    }
    const handleConfirm = () => {
      overlay.value = false
      alert('点击了确认')
    }

    return {
      overlay,
      handleShowModal,
      handleOpen,
      handleClose,
      handleCancel,
      handleConfirm,
    }
  },
})
</script>
```

### Props

- width
  - type：[Number, String]
  - default: 300
  - 描述：模态框宽度（单位 px）
- title
  - type：String
  - 描述：模态框标题
- dangerouslyUseHTMLString
  - Boolean
  - default: false
  - 描述：是否将 content 属性作为 HTML 片段处理。如果设置为 true,将会对\n 进行转义
- confirmButtonText
  - type：String
  - default: '确认'
  - 描述：确认按钮的文案
- cancelButtonText
  - type：String
  - default: '取消'
  - 描述：取消按钮的文案
- showCancelButton
  - type：Boolean
  - default: true
  - 描述：是否展示取消按钮
- confirmButtonColor
  - type：String
  - default: '#f00'
  - 描述：确认按钮的字体颜色
- cancelButtonColor
  - type：String
  - default: '#333'
  - 描述：取消按钮的字体颜色
- overlay
  - type：Boolean
  - default: false
  - 描述：是否展示遮罩层
- overlayStyle
  - type：Object
  - 描述：自定义遮罩层样式
- closeOnClickOverlay
  - type：Boolean
  - default: true
  - 描述：点击遮罩层时是否关闭弹窗

### Methods

- open：打开弹窗时触发
- close：关闭弹窗时触发
- confirm：点击确认按钮时触发
- cancel：点击取消按钮时触发

### Slots

- title 自定义标题
- content 自定义内容
