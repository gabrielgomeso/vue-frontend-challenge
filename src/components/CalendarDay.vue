<template>
  <div class="calendar-day">
    <span class="calendar-day--number">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalendarDay',
});
</script>
<style>
.calendar-day {
  padding: 1rem;
  border: 1px solid black;
  position: relative;
}

.calendar-day--number {
  position: absolute;
  top: 0;
  left: 0;
}

.calendar-day:hover:before {
  content: "+";
}
</style>
