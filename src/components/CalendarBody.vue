<template>
  <section class="calendar-body">
    <h1 class="calendar-body__title">Jobsity's Calendar</h1>
    <div class="calendar-body__months">
      <h3 @click="changeMonth(previousMonth)">← {{ previousMonth }}</h3>
      <h2>{{ selectedMonthName }} {{  currentYear }}</h2>
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
        :class="{ 'current-day': isCurrentDay(day) }"
        :style="{ gridColumnStart: index === 0 ? startDayColumn : 'auto' }"
        :day="day"
        @click="selectNewDay(day)"
      />
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import CalendarDay from './CalendarDay.vue'
import { useReminderStore } from '../stores/reminderStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'CalendarBody',
  components: {
    CalendarDay
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDay: 0,
      monthNames: [
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
    }
  },
  methods: {
    isCurrentDay(day) {
      if (this.currentDate.getDate() === day) {
        return true
      }
      return false
    },
    selectNewDay(day) {
      const { selectedDay, selectedMonth } = storeToRefs(useReminderStore())
      selectedDay.value = new Date(2023, selectedMonth.value, day)
    },
    changeMonth(month) {
      const { selectedMonth } = storeToRefs(useReminderStore())
      const newMonth = this.monthNames.findIndex((element) => element == month)
      selectedMonth.value = newMonth
    }
  },
  computed: {
    startDayColumn() {
      const { selectedMonth } = storeToRefs(useReminderStore())
      const firstDayOfWeek = new Date(this.currentYear, selectedMonth.value, 1).getDay()
      return firstDayOfWeek + 1 // Add 1 to make it 1-indexed for grid-column-start
    },
    currentMonth() {
      return this.currentDate.getMonth()
    },
    currentYear() {
      return this.currentDate.getFullYear()
    },
    totalDaysInSelectedMonth() {
      const { totalDaysInSelectedMonth } = useReminderStore()
      return totalDaysInSelectedMonth
    },
    selectedMonthName() {
      const { selectedMonth } = storeToRefs(useReminderStore())
      return this.monthNames[selectedMonth.value]
    },
    nextMonth() {
      const { selectedMonth } = storeToRefs(useReminderStore())
      if(selectedMonth.value + 1 == 12) {
        return this.monthNames[0]
      }
      return this.monthNames[selectedMonth.value + 1]
    },
    previousMonth() {
      const { selectedMonth } = storeToRefs(useReminderStore())
      if(selectedMonth.value - 1 == -1) {
        return this.monthNames[11]
      }
      return this.monthNames[selectedMonth.value - 1]
    }
  },
  watch: {
    selectedMonthName(newValue) {
      const { totalDaysInSelectedMonth } = storeToRefs(useReminderStore())
      totalDaysInSelectedMonth.value = new Date(this.currentYear, this.monthNames.indexOf(newValue) + 1, 0).getDate()
    }
  }
})
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

.current-day {
  background-color: gray;
}
</style>
