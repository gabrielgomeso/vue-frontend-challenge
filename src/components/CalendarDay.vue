<template>
  <div class="calendar-day">
    <span class="calendar-day__number">
      {{ props.day }}
    </span>
    <div class="calendar-day__reminder-list">
      <span
        class="calendar-day__reminder"
        v-for="(reminder, index) in reminders"
        :key="index"
        :style="{ backgroundColor: reminder.color }"
      >
        {{ stringTruncate(reminder.text) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useReminderStore } from '../stores/reminderStore'

const props = defineProps(['day'])
const { remindersOfDate, selectedMonth } = useReminderStore()

function stringTruncate(string) {
  let dots = string.length > 20 ? '...' : ''
  return string.substring(0, 20) + dots
}

const reminders = computed(() => {
  return remindersOfDate(new Date(2023, selectedMonth, props.day))
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
  cursor: pointer;
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
  color: white;
  padding: 0 5px 0 5px;
  border-radius: 5px;
}
</style>
