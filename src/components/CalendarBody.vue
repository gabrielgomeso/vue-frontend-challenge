<template>
  <section class="calendar-body">
    <h1 class="calendar-body__title">
      Jobsity's Calendar
    </h1>
    <div class="calendar-body__main">
      <span class="calendar-body__main--week-days">Sunday</span>
      <span class="calendar-body__main--week-days">Monday</span>
      <span class="calendar-body__main--week-days">Tuesday</span>
      <span class="calendar-body__main--week-days">Wednesday</span>
      <span class="calendar-body__main--week-days">Thursday</span>
      <span class="calendar-body__main--week-days">Friday</span>
      <span class="calendar-body__main--week-days">Saturday</span>
      <CalendarDay
        v-for="(day, index) in totalDaysInCurrentMonth"
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
import { defineComponent } from 'vue';
import CalendarDay from './CalendarDay.vue';
import { useReminderStore } from '../stores/reminderStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'CalendarBody',
  components: {
    CalendarDay,
  },
  data() {
    return {
      currentDate: new Date(),
      selectedMonth: 0,
      selectedYear: 0,
      selectedDay: 0,
    };
  },
  methods: {
    isCurrentDay(day) {
      if (this.currentDate.getDate() === day) {
        return true;
      }
      return false;
    },
    selectNewDay(day) {
      const { selectedDay } = storeToRefs(useReminderStore());
      selectedDay.value = new Date(2023, 2, day)
    }
  },
  computed: {
    startDayColumn() {
      const firstDayOfWeek = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return firstDayOfWeek + 1; // Add 1 to make it 1-indexed for grid-column-start
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    totalDaysInCurrentMonth() {
      let { totalDaysInCurrentMonth } = useReminderStore();
      return totalDaysInCurrentMonth;
    }
  },
});
</script>

<style>
.calendar-body__main {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
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