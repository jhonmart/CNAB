import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeView from '../../views/HomeView.vue'

describe('HomeView', () => {
  it('simple render', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toMatchSnapshot()
  })
})
