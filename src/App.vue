<template>
  <div>
    Calendar
        <div class="week-days">
          <p>Sunday</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
          <CalendarDay
            v-for="(days, index) in totalDays"
            :key="days"
            :class="{ 'current-day': isCurrentDay(days) }"
            :style="{ gridColumnStart: index === 0 ? startDayColumn : 'auto' }"
          >
              {{  days  }}
          </CalendarDay>
        </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CalendarDay from './components/CalendarDay.vue';

export default defineComponent({
  name: 'App',
  components: {
    CalendarDay,
  },
  data() {
    return {
      totalDays: 0,
      currentDate: new Date(),
    };
  },
  methods: {
    getDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    isCurrentDay(days) {
      if (this.currentDate.getDate() === days) {
        return true;
      }
      return false;
    },
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
  },
  beforeMount() {
    console.log(this.currentMonth);
    console.log(this.currentYear);
    this.totalDays = this.getDays(2023, 3);
  },
});
</script>

<style>
.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
}

.current-day {
  background-color: gray;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
