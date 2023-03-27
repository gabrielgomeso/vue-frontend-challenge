<template>
  <div class="calendar-day">
    <span class="calendar-day--number">
      <slot></slot>
      {{  reminders }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalendarDay',
  props: ['reminders'],
});
</script>
<style>
.calendar-day {
  padding: 1rem;
  border: 1px solid black;
  position: relative;
  background-color: var(--vt-c-white-soft);
  min-width: 100px;
  min-height: 100px;
}

.calendar-day--number {
  position: absolute;
  top: 5px;
  left: 10px;
}

.calendar-day:hover:before {
  content: "+";
}
</style>
