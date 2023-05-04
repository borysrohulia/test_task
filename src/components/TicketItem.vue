<script setup lang="ts">
import type { ITicketItem, ISegment } from '../types/TicketItem';

interface TicketItemProps {
  ticket: ITicketItem
}
const props = defineProps<TicketItemProps>()

const word = ((stops: number): string => {
  if (!stops) {
    return 'Пересадок'
  }
  if (Number(stops.toString().slice(-1)) === 1) {
    return 'ПЕРЕСАДКА'
  } else if (Number(stops.toString().slice(-1)) < 5 && Number(stops.toString().slice(-1)) > 1) {
    return 'ПЕРЕСАДКИ'
  } else {
    return 'ПЕРЕСАДОК'
  }
})

const durationHours = (duration: number): number => {
  return Math.floor(duration/60)
}

const durationMinutes = (duration: number): number => {
  return Math.floor(duration%60)
}

function countTime (date: string): string {
  const hours = `${new Date(date).getUTCHours()}`
  const minutes = (new Date(date).getMinutes() < 10 ? '0' : '') + new Date(date).getMinutes()
  const time = `${hours}:${minutes}`
  return time
}

const time = (segment: ISegment): string => {
  const start = countTime(segment.date)
  const finishDate = new Date(segment.date)
  finishDate.setMinutes(finishDate.getMinutes() + segment.duration)
  const finish = countTime(finishDate.toString())
  return `${start}-${finish}`
}
</script>

<template>
  <article class="ticket-item">
    <header>
      <span class="ticket-item__price">{{ props.ticket.price }} P</span>
      <img :src="`https://pics.avs.io/99/36/${props.ticket.carrier}.png`" alt="logo">
    </header>

    <div class="ticket-item__details" v-for="(segment, key) in props.ticket.segments" :key="key">
      <div class="ticket-item__detail">
        <span class="top-row">{{ segment.origin }} - {{ segment.destination }}</span>
        <span class="bottom-row">{{ time(segment) }}</span>
      </div>
      <div class="ticket-item__detail">
        <span class="top-row">В ПУТИ</span>
        <span class="bottom-row">{{ durationHours(segment.duration) }}ч {{ durationMinutes(segment.duration) }}м</span>
      </div>
      <div class="ticket-item__detail">
        <span class="top-row">{{ segment.stops.length || 0 }} {{ word(segment.stops.length) }}</span>
        <span class="bottom-row" v-if="segment.stops && segment.stops.length">{{ segment.stops.join(', ') }}</span>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.ticket-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  max-width: 500px;
  margin-bottom: 20px;
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #2196F3;
  }
  &__details {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
  &__detail {
    display: flex;
    flex-direction: column;
    max-width: 33%;
    .top-row {
      color: #A0B0B9;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0.5px;
    }
    .bottom-row {
      color: #4A4A4A;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      white-space: break-spaces;
    }
  }
}
</style>