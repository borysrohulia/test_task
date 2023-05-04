import { defineStore } from 'pinia'
import type { IFilterItem } from '../types/FilterItem'

interface IFilterState {
  filterItems: IFilterItem[]
}

export const useFilterStore = defineStore('filter', {
  state: (): IFilterState => {
    return {
      filterItems: [{
        id: 'all',
        label: 'Все',
        value: false,
        disabled: false
      },
      {
        id: '0',
        label: 'Без пересадок',
        value: false,
        disabled: false
      },
      {
        id: '1',
        label: '1 пересадка',
        value: false,
        disabled: false
      },
      {
        id: '2',
        label: '2 пересадки',
        value: false,
        disabled: false
      },
      {
        id: '3',
        label: '3 пересадки',
        value: false,
        disabled: false
      }]
    }
  },
  getters: {
    getFilterItems: (state) => state.filterItems
  },
  actions: {
    CHANGE_STATE_OF_CHECKBOX () {
      const condition: boolean = this.$state.filterItems.some((item: IFilterItem) => {
        return item.id === 'all' && item.value === true
      })
      if (condition) {
        this.$state.filterItems.map((item: IFilterItem) => {
          if (item.id !== 'all') {
            item.disabled = true
            item.value = false
          }
        })
      } else {
        this.$state.filterItems.map((item: IFilterItem) => {
          item.disabled = false
        })
      }
    },
    SET_STATE_OF_CHECBOX_BY_URL (array: string[]) {
      array.forEach((item: string)=> {
        this.$state.filterItems.map((filterItem: IFilterItem) => {
          if (item === filterItem.id) {
            filterItem.value = true
          }
        })
      })
      this.CHANGE_STATE_OF_CHECKBOX()
    }
  }
})
