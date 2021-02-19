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
