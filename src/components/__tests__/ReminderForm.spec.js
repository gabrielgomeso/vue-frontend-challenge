import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useReminderStore } from '../../stores/reminderStore'
import ReminderForm from '../ReminderForm.vue'

describe('ReminderForm', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(ReminderForm, { global: { plugins: [store] } })
    expect(wrapper.text()).toContain('Create new reminder')
  })

  it('allows user to add a new reminder', async () => {
    const { reminders } = useReminderStore()

    const wrapper = mount(ReminderForm, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.find('[name="reminder-date"]').setValue('2023-03-28')
    await wrapper.find('[name="reminder-time"]').setValue('12:00')
    await wrapper.find('[name="reminder"]').setValue('Test reminder')
    await wrapper.find('[name="city"]').setValue('Test city')

    await wrapper.find('[type="submit"]').trigger('click')

    expect(reminders[2]).toEqual({
      id: 3,
      date: new Date(2023, 2, 28),
      time: '12:00',
      text: 'Test reminder',
      city: 'Test city',
      color: 'black'
    })
  })
})
