<template>
  <transition name="fade">
    <div
      class="overlay"
      v-show="overlay"
      :style="overlayStyle"
      @click.self="handleClickOverlay"
    >
      <div class="modal-container" :style="{ width: `${width}px` }">
        <slot name="title">
          <div class="header" v-if="showHeader">{{ title }}</div>
        </slot>

        <slot name="content">
          <div
            class="content"
            :class="showHeader ? 'has-title' : ''"
            v-if="dangerouslyUseHTMLString"
            v-html="contentText"
          ></div>
          <div class="content" v-else>{{ contentText }}</div>
        </slot>

        <div class="footer">
          <button
            v-if="showCancelButton"
            class="button"
            :style="{ color: `${cancelButtonColor}` }"
            @click.stop="hancleClickCancelButton"
          >
            {{ cancelButtonText }}
          </button>
          <button
            class="button"
            :style="{ color: `${confirmButtonColor}` }"
            @click.stop="handleClickConfirmButton"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    /**
     * 模态框宽度，单位px
     */
    width: {
      type: [Number, String],
      default: 300,
    },
    /**
     * 模态框标题
     */
    title: {
      type: String,
    },
    /**
     * 模态框内容
     */
    content: {
      type: String,
      required: true,
    },
    /**
     * 是否将 content 属性作为 HTML 片段处理
     */
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false,
    },
    /**
     * 确认按钮的文案
     */
    confirmButtonText: {
      type: String,
      default: "确认",
    },
    /**
     * 取消按钮的文案
     */
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    /**
     * 是否展示取消按钮
     */
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    /**
     * 确认按钮的字体颜色
     */
    confirmButtonColor: {
      type: String,
      default: "#f00",
    },
    /**
     * 取消按钮的字体颜色
     */
    cancelButtonColor: {
      type: String,
      default: "#333",
    },
    /**
     * 是否展示遮罩层
     */
    overlay: {
      type: Boolean,
      default: false,
    },
    /**
     * 自定义遮罩层样式
     */
    overlayStyle: {
      type: Object,
    },
    /**
     * 点击遮罩层时是否关闭弹窗
     */
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const {
      title,
      content,
      dangerouslyUseHTMLString,
      closeOnClickOverlay,
    } = props;

    watch(
      () => props.overlay,
      (val, oldVal) => {
        if (val) {
          emit("open");
        }
      }
    );

    // 是否显示header
    const showHeader = computed(() => {
      if (title === undefined || title.trim() === "") {
        return false;
      }
      return true;
    });

    // 如果将 content 属性作为 HTML 片段处理，则转义\n
    const contentText = computed(() => {
      if (dangerouslyUseHTMLString) {
        return content.replace(/\\n/g, "<br>");
      } else {
        return content;
      }
    });

    // 点击遮罩层
    const handleClickOverlay = (): void => {
      if (closeOnClickOverlay) {
        emit("close");
      }
    };

    // 点击取消按钮
    const hancleClickCancelButton = () => {
      emit("cancel");
    };

    // 点击确认按钮
    const handleClickConfirmButton = () => {
      emit("confirm");
    };

    return {
      showHeader,
      contentText,
      handleClickOverlay,
      hancleClickCancelButton,
      handleClickConfirmButton,
    };
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-container {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  overflow: hidden;
  font-size: 16px;
  background-color: #fff;
  border-radius: 16px;
}
.header {
  padding-top: 26px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
}
.content {
  flex: 1;
  max-height: 60vh;
  padding: 26px 24px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  text-align: center;
  word-wrap: break-word;
}
.content.has-title {
  padding-top: 8px;
  color: #646566;
}
.footer {
  display: flex;
}
.footer .button {
  flex: 1;
  color: #323233;
  background-color: #fff;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 44px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  border: 0 none;
  outline: 0;
}
.footer .button :focus {
  outline: 0;
}
.footer .button:active {
  background-color: #eee;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
