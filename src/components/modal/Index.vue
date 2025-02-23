<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal" @click.self="$emit('close')" :class="backgroundColoring" v-if="open">
        <div class="modal__window" @click.self="$emit('close')" :class="scrollClass">
          <!-- 閉じるボタン -->
          <header class="modal__header">
            <button class="modal__close-button" @click="$emit('close')" :class="closeBtnColoring">
              <nuxt-svg :svg="closeIcon" :color="color"/>
            </button>
          </header>
          <slot><!-- コンテンツ --></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
// svg icon
import closeIcon from "@/assets/svg/close.svg?component";
import { Color } from "@/types/utility";

interface Props {
  open: boolean;
  scroll: boolean;
  color: Color;
  backgroundColor: Color;
  closeBtnColor: Color | undefined;
}
interface Emits {
  (e: 'close'): void;
}

// props
const {
  scroll = true,
  color = 'white',
  backgroundColor = 'darkblue',
  closeBtnColor = 'white'
} = defineProps<Props>();

// custom class
const scrollClass = computed<string>(() => (!scroll) ? `modal-window--disable-scroll` : '');
const backgroundColoring = computed<string>(() => `modal--${backgroundColor}`);
const closeBtnColoring = computed<string>(() => `modal__close-button--${closeBtnColor}`);

// emit event
const emit = defineEmits<Emits>();
</script>

<style ${2|scoped,|} lang="scss">
.modal {
  width: 100%;
  @include position(fixed, 0, 0, 0, 0, z-index(modal));
  @include flex(column nowrap);

  &--darkblue {
    background-color: rgba(color(darkblue), $alpha: .9);
  }

  &--white {
    background-color: rgba(color(white), $alpha: .9);
  }

  &--orange {
    background-color: rgba(color(orange), $alpha: .9);
  }

  &--navy {
    background-color: rgba(color(navy), $alpha: .9);
  }

  &__window {
    width: 100%;
    height: 100%;
    position: relative;
    max-height: 100%;
    overflow-y: auto;

    &--disable-scroll {
      overflow-y: scroll;
      max-height: none;
    }
  }

  &__header {
    width: 100%;
    @include position(sticky, $t: 0);
    text-align: end;
    pointer-events: none;
  }

  &__close-button {
    width: 4rem;
    padding: interval(2);
    border: none;
    pointer-events: auto;
    cursor: pointer;

    &--white {
      background: rgba($color: color(darkblue), $alpha: .9);
      svg {
        fill: color(white);
      }
    }

    &--navy {
      background: rgba($color: color(lightgray), $alpha: .9);
      svg {
        fill: color(navy);
      }
    }

    &--darkblue {
      background: rgba($color: color(white), $alpha: .9);
      svg {
        fill: color(darkblue);
      }
    }

    &--orange {
      background: rgba($color: color(white), $alpha: .9);
      svg {
        fill: color(orange);
      }
    }

    @include mq(md) {
      opacity: .5;
      transition: opacity .3s ease-out;
    }

    @include hover {
      opacity: 1;
    }
  }
}

// モーダル展開時のページスクロール制御
.modal-open {
  overflow: hidden;
}

// 開閉アニメーション
.fade {
  &-enter-active, &-leave-active {
    transition: .3s opacity cubic-bezier(0.39, 0.575, 0.565, 1), .5s transform cubic-bezier(0.39, 0.575, 0.565, 1);

    // オーバーレイに包含されているモーダルウィンドウのトランジション
    .modal-window {
      transition: .6s opacity cubic-bezier(0.39, 0.575, 0.565, 1), .8s transform cubic-bezier(0.39, 0.575, 0.565, 1);
    }
  }

  &-enter-from, &-leave-to {
    opacity: 0;
    transform: translate3d(0, 10px, 0);

    .modal-window {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
    }
  }

  &-enter-to, &-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0);

    .modal-window {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
