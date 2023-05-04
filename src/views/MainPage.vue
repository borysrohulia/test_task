<template>
  <main>
    <aside>
      <FilterComponent 
        title="Количество пересадок"
        :FilterItems="getFilterItems"
        @update="handleUpdate"
      />
    </aside>
    <section>
      <TabSection
        :tabs="tabs"
      />
      <RouterView />
      <button>ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</button>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia'

import FilterComponent from '../components/FilterComponent.vue';
import type { IFilterItem } from '../types/FilterItem';
import { useFilterStore } from '../stores/filter'

import TabSection from '../components/TabSection.vue'

import { useTicketStore } from '../stores/ticket'

import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

// Filter component section
const filterStore = useFilterStore()
const { getFilterItems } = storeToRefs(filterStore)
function handleUpdate(): void {
  filterStore.CHANGE_STATE_OF_CHECKBOX()
  const urlArray: string[] = []
  filterStore.$state.filterItems.forEach((item: IFilterItem) => {
    if (item.value) {
      urlArray.push(item.id)
    }
  })
  if (urlArray.length) {
    const queryParams = urlArray.join(',')
    router.push({ query: { 'transfer-count': queryParams } })
  } else {
    router.push({ name: `${String(route.name)}` })
  }
}

let transferCountArray: string[] = []
onMounted(() => {
  let params = new URLSearchParams(window.location.search)
  const transferCount = params.get('transfer-count')
  transferCountArray = transferCount ? Array.from(transferCount.split(',')) : []
  filterStore.SET_STATE_OF_CHECBOX_BY_URL(transferCountArray)
})

// Tabs component section
const tabs = reactive([
  {
    title: 'Самый дешевый',
    path: '/cheap-tickets'
  },
  {
    title: 'Самый быстрый',
    path: '/faster-tickets'
  },
  {
    title: 'Оптимальный',
    path: '/optimize-tickets'
  }
])

// ticket section
const ticketStore = useTicketStore()
onMounted(() => {
  ticketStore.FETCH_SEARCH_ID()
})
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  aside {
    width: 30%;
  }
  section {
    width: 65%;
    .tab {
      margin: 0 auto;
    }
    button {
      width: 100%;
      max-width: 500px;
      background-color: #2196F3;
      color: #FFFFFF;
      border-radius: 5px;
      padding: 15px 0;
      outline: none;
      border: none;
      cursor: pointer;
      text-transform: capitalize;
    }
  }
}

@media screen and (max-width: 768px) {
  main {
    flex-direction: column;
    aside {
      width: 100%;
    }
    section {
      width: 100%;
    }
  }
}
</style>