<template>
  <section class="reminder-list__body">
    <div>
      <h2>Reminders from {{ selectedDay.toDateString() }}</h2>
      <div class="reminder-list__list">
        <span
          class="reminder-list__reminder"
          v-for="(reminder, index) in reminders"
          :key="index"
        >
          <span class="reminder-list__reminder--color" :style="{ backgroundColor: reminder.color }"></span>
          {{ reminder.text }} - {{  reminder.time }} - {{ reminder.date.toLocaleDateString() }} At {{  reminder.city }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { useReminderStore } from '../stores/reminderStore';

export default defineComponent({
  name: 'ReminderList',
  computed: {
    selectedDay() {
      const { selectedDay } = useReminderStore();
      return selectedDay;
    },
    reminders() {
      const { remindersOfDate } = useReminderStore();
      
      return remindersOfDate(this.selectedDay);
    }
  }
});
</script>

<style>
.reminder-list__body {
  padding: 1rem;
}
.reminder-list__list {
  display: flex;
  flex-direction: column;
}

.reminder-list__reminder {
  text-align: justify;
}

.reminder-list__reminder--color {
  display: inline-block;
  width: 10px;
  height: 10px;
}

</style>