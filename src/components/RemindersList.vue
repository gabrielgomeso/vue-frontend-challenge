<template>
  <section class="reminder-list__body">
    <h2>Reminders from 23 March 2023</h2>
    <div class="reminder-list__list">
      <span
        class="reminder-list__reminder"
        v-for="(reminder, index) in reminders"
        :key="index"
      >
        <span class="reminder-list__reminder--color" :style="{ backgroundColor: reminder.color }"></span>
        {{ reminder.text }} - {{  reminder.time }} - {{ reminder.date }}
        At {{  reminder.city }}
      </span>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { useReminderStore } from '../stores/reminderStore';

export default defineComponent({
  name: 'ReminderList',
  computed: {
    reminders() {
      const { reminders } = useReminderStore();
      return reminders;
    }
  }
});
</script>

<style>
.reminder-list__list {
  display: flex;
  flex-direction: column;
}
.reminder-list__reminder--color {
  display: inline-block;
  width: 10px;
  height: 10px;
}

</style>