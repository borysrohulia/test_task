<script setup lang="ts">
import type { ITabItem } from '../types/TabItem';
import { useRoute } from 'vue-router'

const route = useRoute()

interface TabSectionProps {
  tabs: ITabItem[]
}
const props = defineProps<TabSectionProps>()
</script>

<template>
  <div class="tab-section">
    <router-link 
      v-for="(tab, key) in props.tabs"
      :key="key" class="tab-section__link"
      @click="$emit('handleClick', tab)"
      :to="{  path: `${tab.path}`, query: route.query }"
    >
      {{ tab.title }}
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.tab-section {
  width: 100%;
  max-width: 500px;
  display: flex;
  border-radius: 7px;
  border: 1px solid #DFE5EC;
  background: #FFFFFF;
  border-collapse: collapse;
  margin-bottom: 20px;
  &__link {
    border: 1px solid #DFE5EC;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 20px;
    color: #4A4A4A;
    padding: 15px;
    background: #FFFFFF;
    width: 34%;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .router-link-active {
    background: #2196F3;
    color: #FFF;
  }
}
</style>