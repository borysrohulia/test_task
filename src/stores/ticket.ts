import { defineStore, storeToRefs } from 'pinia'
import type { ISegment, ITicketItem } from '../types/TicketItem'
import { API } from '../api'
import { useFilterStore } from './filter'

const filterStore = useFilterStore()
const { getFilterItems } = storeToRefs(filterStore)

interface ITicketStore {
  tickets: ITicketItem[] | null
  searchId: string
  errorsCounter: number
  errorMessage: string,
  loading: boolean
}

// sort function

function sortByPrice (a: ITicketItem, b: ITicketItem) {
  return a.price - b.price
}

function sortByDuration (a: ITicketItem, b: ITicketItem) {
  return (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration)
}

function optimizeSorting (a: ITicketItem, b: ITicketItem) {
  return calculateCoef(a) - calculateCoef(b)
}

// helpers

function calculateCoef (item: ITicketItem) {
  // in this function we calculate few coef with different weights
  // ticket with less finalCoef is more optimal
  // P.S. of course we need more time and tools for search optimize tickets and also we need criteria: what is optimal tickets
  const coef1 = item.segments[0].duration/1000 + (item.price*item.segments[0].stops.length)/10000
  const coef2 = item.segments[1].duration/1000 + (item.price*item.segments[1].stops.length)/10000
  const multiple = Math.sqrt((coef1 - coef2) ** 2) + 1
  const middleValue = (coef1 + coef2)/2
  const finalCoef = middleValue * multiple + (item.segments[0].duration + item.segments[1].duration)/1000
  return finalCoef
}

function sortTickets (state: ITicketStore, callback: any) {
  const transferCount: string[] = []
      getFilterItems.value.map(item => {
        if (item.value) {
          transferCount.push(item.id)
        }
      })
      if (state.tickets) {
        if ((transferCount.length && transferCount.includes('all')) || !transferCount.length) {
          return state.tickets.sort(callback)
        } else {
          const arr = state.tickets.filter((iTicketItem: ITicketItem) => {
            return iTicketItem.segments.every((segment: ISegment) => {
              return transferCount.includes((segment.stops.length).toString())
            })
          }).sort(callback)
          return arr
        }
      }
      return []
}

export const useTicketStore = defineStore('ticket', {
  state: (): ITicketStore => {
    return {
      tickets: [],
      searchId: '',
      errorsCounter: 0,
      errorMessage: '',
      loading: true
    }
  },
  getters: {
    getCheapestTickets (state): ITicketItem[] {
      return sortTickets(state, sortByPrice)
    },
    getFasterTickets (state): ITicketItem[] {
      return sortTickets(state, sortByDuration)
    },
    getOptimizeTickets (state): ITicketItem[] {
      return sortTickets(state, optimizeSorting)
    }
  },
  actions: {
    async FETCH_SEARCH_ID () {
      try {
        const res = await API.getSearchId()
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err)
        }
        const data = await res.json()
        this.$state.searchId = data.searchId
        this.FETCH_TICKETS()
      } catch (err: any) {
        this.$state.errorMessage = err.errorMessage
        return err
      }
    },
    async FETCH_TICKETS () {
      try {
        const res = await API.getTicketsList(this.$state.searchId)
        if (!res.ok) {
          this.$state.errorsCounter++
          const err = await res.json()
          if (this.$state.errorsCounter === 5) {
            this.$state.errorMessage = 'Сервер 5 раз отдал ошибку'
            return err
          }
          this.FETCH_TICKETS()
        }
        this.$state.errorsCounter = 0
        const data = await res.json()
        data.tickets.forEach((item: ITicketItem) => {
          this.$state.tickets?.push(item)
        })
        if (!data.stop) {
          this.FETCH_TICKETS()
        } else {
          this.$state.loading = false
        }
      } catch (err) {
        return err
      }
    }
  }
})