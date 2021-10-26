import { mount } from '@vue/test-utils'
import SchanaLogo from '@/components/SchanaLogo.vue'

describe('SchanaLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SchanaLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
