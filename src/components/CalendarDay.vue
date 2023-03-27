<template>
  <div class="calendar-day">
    <span class="calendar-day__number">
      {{  day }}
    </span>
    <div class="calendar-day__reminder-list">
      <span
        class="calendar-day__reminder"
        v-for="(reminder, index) in reminders"
        :key="index"
        :style="{ backgroundColor: reminder.color }"
      >
          {{  stringTruncate(reminder.text) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useReminderStore } from '../stores/reminderStore';

export default defineComponent({
  name: 'CalendarDay',
  props: ['day'],
  methods: {
    stringTruncate(string) {
      let dots = string.length > 20 ? '...' : '';
      return string.substring(0, 20) + dots;
    }
  },
  computed: {
    reminders() {
      const { remindersOfDate } = useReminderStore();
      
      return remindersOfDate(new Date(2023, 2, this.day));
    }
  }
});
</script>
<style>
.calendar-day {
  padding: 1rem;
  border: 1px solid black;
  position: relative;
  background-color: var(--vt-c-white-soft);
  min-width: 100px;
  min-height: 120px;
}

.calendar-day__reminder-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.calendar-day__number {
  position: absolute;
  top: 5px;
  left: 10px;
}

.calendar-day__reminder {
  text-align: justify;
  font-size: 11px;
}
</style>
