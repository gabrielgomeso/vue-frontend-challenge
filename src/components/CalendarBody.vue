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
        v-for="(days, index) in totalDays"
        :key="days"
        :class="{ 'current-day': isCurrentDay(days) }"
        :style="{ gridColumnStart: index === 0 ? startDayColumn : 'auto' }"
        @click="selectDate(selectedMonth, days, selectedYear)"
        :reminders="sortReminders(selectedMonth, days, selectedYear)"
      >
          {{  days  }}
      </CalendarDay>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import CalendarDay from './CalendarDay.vue';

export default defineComponent({
  name: 'CalendarBody',
  components: {
    CalendarDay,
  },
  data() {
    return {
      totalDays: 0,
      currentDate: new Date(),
      selectedMonth: 0,
      selectedYear: 0,
      selectedDay: 0,
      isReminderOpen: false,
      reminders: [],
      reminderText: '',
      reminderCity: '',
      reminderColor: 'red',
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
    selectDate(selectedMonth, day, selectedYear) {
      console.log(selectedMonth, day, selectedYear);
      this.selectedDay = day;
      this.isReminderOpen = true;
    },
    addReminder() {
      let newReminder = {
        date: new Date(this.selectedYear, this.selectedMonth, this.selectedDay),
        reminder: this.reminderText,
        city: this.reminderCity,
        color: this.reminderColor
      };

      console.log(newReminder.date);

      this.reminders.push(newReminder);
    },
    sortReminders(selectedMonth, day, selectedYear) {
      let reminderDate = new Date(selectedYear, selectedMonth, day);
      console.log(reminderDate);
      const filteredReminders = this.reminders.filter((reminder) => reminder.date === reminderDate);
      return filteredReminders;
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
    }
  },
  beforeMount() {
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.currentYear;
    this.totalDays = this.getDays(2023, 3);
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

.calendar-reminder {
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  justify-content: center;
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