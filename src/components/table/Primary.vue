<template>
  <div class="primary-table">
    <!-- タイトル -->
    <template v-if="table.title">
      <h3 class="primary-table__title" :class="coloring">{{ table.title }}</h3>
    </template>
    <!-- テーブル -->
    <table class="primary-table__table">
      <tbody>
        <tr :class="cellRatio" v-for="body in table.body">
          <th>{{ body.key }}</th>
          <td>{{ body.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { Table } from "@/types/utility";

interface Props {
  table: Table;
  ratio?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  color?: String;
}

const { table, ratio, color } = defineProps<Props>();

// 動的クラス
const cellRatio = computed<string | null>(() => (ratio) ? `primary-table--${ratio}` : null);
const coloring = computed<string | null>(() => (color) ? `primary-table__title--${color}` : null);
</script>

<style ${2|scoped,|} lang="scss">
.primary-table {
  $this: &;
  color: color(darkblue);

  &__title {
    position: relative;
    margin-bottom: interval(1);
    padding-left: interval(3);
    font: bold 1.2rem/1 arial;

    &::before {
      content: '';
      display: block;
      width: interval(2);
      height: 1px;
      background-color: color(darkblue);
      @include position(absolute, $t: 50%, $l: 0);
      transform: translateY(-50%);
    }

    &--white {
      color: color(white);

      &::before {
        background-color: color(white);
      }
    }
  }

  &__table {
    width: 100%;
    border: 1px solid color(lightgray);
    border-bottom: 1px solid color(lightgray);

    tr {
      font: bold .9rem/1 arial;
      width: 100%;

      &:last-of-type {
        th,td {
          border-bottom: none;
        }
      }
    }

    th,td {
      font: bold .9rem/1.2 arial;
      letter-spacing: 1.1px;
      padding: interval(1.5) interval(2);
      vertical-align: middle;
    }

    th {
      width: 30%;
      background-color: color(lightgray);
      text-align: center;
      border-bottom: 1px solid darken($color: color(lightgray), $amount: 5%);
    }

    td {
      width: 70%;
      background-color: color(white);
      white-space: pre-wrap;
      border-bottom: 1px solid color(lightgray);
    }

    @for $i from 1 to 10 {
      #{$this}--#{$i} {
        th {
          width: calc(#{$i} * 10%);
        }
        td {
          width: calc(100% - (#{$i} * 10%));
        }
      }
    }
  }
}
</style>
