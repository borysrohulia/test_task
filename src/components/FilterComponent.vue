<script setup lang="ts">
import type { IFilterItem } from '../types/FilterItem'
import { onBeforeUpdate } from 'vue'

interface FilterComponentProps {
  title: string | null
  FilterItems: IFilterItem[] | null
}

const props = defineProps<FilterComponentProps>()
const emit = defineEmits(['update'])

onBeforeUpdate(() => {
  emit('update', props.FilterItems)
})
</script>

<template>
  <div class="filter-component">
    <header v-if="props.title">{{ props.title }}</header>
    <div class="filter-box">
      <div class="filter-box__item" v-for="(item, key) in props.FilterItems" :key="key">
        <input type="checkbox" class="filter-box__checkbox" v-model="item.value" :id="`filterItem-${key}`" :disabled="item.disabled">
        <label :for="`filterItem-${key}`" class="filter-box__label">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-component {
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  max-width: 232px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  header {
    padding: 10px 20px;
  }
  .filter-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    &__item {
      display: flex;
      align-items: center;
      align-content: center;
      width: 100%;
      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    &__checkbox {
      display: none;
      & + label::before {
        content: '';
        margin-right: 10px;
        width: 20px;
        height: 20px;
        background: white;
        border: solid 2px #9ABBCE;
        display: inline-block;
        border-radius: 2px;
      }
      &:checked + label::before {
        border: solid 2px #2196F3;
      }
      &:checked + label::after {
        content: '';
        position: absolute;
        left: 25px;
        top: 20px;
        width: 2px;
        height: 2px;
        background: #2196F3;
        box-shadow: 
        2px 0 0 #2196F3,
        4px 0 0 #2196F3,
        4px -2px 0 #2196F3,
        4px -4px 0 #2196F3,
        4px -6px 0 #2196F3,
        4px -8px 0 #2196F3;
      transform: rotate(45deg);
      }
      &:disabled + label {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    &__label {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background: #F1FCFF;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .filter-component {
    max-width: 100%;
    margin-bottom: 20px;
    .filter-box {
      flex-wrap: wrap;
      max-width: 100%;
      flex-direction: row;
      &__item {
        width: fit-content;
      }
    }
  }
}
</style>