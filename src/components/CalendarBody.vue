<template>
  <section class="calendar-body">
    <h1 class="calendar-body__title">Jobsity's 2023 Calendar</h1>
    <div class="calendar-body__months">
      <h3 @click="changeMonth(previousMonth)">← {{ previousMonth }}</h3>
      <h2>{{ selectedMonthName }}</h2>
      <h3 @click="changeMonth(nextMonth)">{{ nextMonth }} →</h3>
    </div>
    <div class="calendar-body__main">
      <span class="calendar-body__main--week-days">Sunday</span>
      <span class="calendar-body__main--week-days">Monday</span>
      <span class="calendar-body__main--week-days">Tuesday</span>
      <span class="calendar-body__main--week-days">Wednesday</span>
      <span class="calendar-body__main--week-days">Thursday</span>
      <span class="calendar-body__main--week-days">Friday</span>
      <span class="calendar-body__main--week-days">Saturday</span>
      <CalendarDay
        v-for="(day, index) in totalDaysInSelectedMonth"
        :key="day"
        :class="{ 'calendar-body__current-day': isCurrentDay(day) }"
        :style="{ gridColumnStart: index === 0 ? startDayColumn : 'auto' }"
        :day="day"
        @click="selectNewDay(day)"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, watchEffect, ref } from 'vue'
import CalendarDay from './CalendarDay.vue'
import { useReminderStore } from '../stores/reminderStore'
import { storeToRefs } from 'pinia'

const currentDate = ref(new Date());
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const { selectedDay, selectedMonth, totalDaysInSelectedMonth } = storeToRefs(useReminderStore())

function isCurrentDay(day) {
  if (currentDate.value.getDate() === day && selectedMonth.value == currentMonth.value) {
    return true
  }
  return false
}

function selectNewDay(day) {
  selectedDay.value = new Date(2023, selectedMonth.value, day)
}

function changeMonth(month) {
  const newMonth = monthNames.findIndex((element) => element == month)
  selectedMonth.value = newMonth
}

const startDayColumn = computed(() => {
  const firstDayOfWeek = new Date(currentYear.value, selectedMonth.value, 1).getDay()
  return firstDayOfWeek + 1
});

const currentMonth = computed(() => {
  return currentDate.value.getMonth()
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
});

const selectedMonthName = computed(() => {
  return monthNames[selectedMonth.value]
});

const nextMonth = computed(() => {
  if (selectedMonth.value + 1 == 12) {
    return monthNames[0]
  }
  return monthNames[selectedMonth.value + 1]
});

const previousMonth = computed(() => {
  if (selectedMonth.value - 1 == -1) {
    return monthNames[11]
  }
  return monthNames[selectedMonth.value - 1]
});

watchEffect((selectedMonthName) => {
  totalDaysInSelectedMonth.value = new Date(
    currentYear.value,
    monthNames.indexOf(selectedMonthName) + 1,
    0
  ).getDate()
});
</script>

<style>
.calendar-body__main {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
}

.calendar-body__months {
  display: flex;
  justify-content: space-evenly;
}

.calendar-body__months h3 {
  cursor: pointer;
}

.calendar-body__main--week-days {
  font-weight: 800;
  color: white;
  background-color: blueviolet;
}

.calendar-body__current-day {
  background-color: gray;
}
</style>
