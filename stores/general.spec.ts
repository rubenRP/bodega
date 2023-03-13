import { setActivePinia, createPinia } from 'pinia'
import { useGeneralStore } from './general'
import { describe, beforeEach, it, expect } from 'vitest'

describe('General store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('adds Message', () => {
    const generalStore = useGeneralStore()
    generalStore.addMessage({
      message: 'Hello',
      type: 'info',
    })
    expect(generalStore.messages).toEqual([
      {
        message: 'Hello',
        type: 'info',
        id: 0,
      },
    ])
  })
  it('removes Message', () => {
    const generalStore = useGeneralStore()
    generalStore.addMessage({
      message: 'Hello',
      type: 'info',
    })
    generalStore.removeMessage(0)
    expect(generalStore.messages).toEqual([])
  })
  it('adds more Messages', () => {
    const generalStore = useGeneralStore()
    generalStore.addMessage({
      message: 'Hello 1',
      type: 'info',
    })
    generalStore.addMessage({
      message: 'Hello 2',
      type: 'info',
    })
    expect(generalStore.messages).toEqual([
      {
        message: 'Hello 1',
        type: 'info',
        id: 0,
      },
      {
        message: 'Hello 2',
        type: 'info',
        id: 1,
      },
    ])
  })
  it('toggles Sidebar', () => {
    const generalStore = useGeneralStore()
    generalStore.toggleSidebar()
    expect(generalStore.sidebar).toBe(true)
  })
  it('closes Sidebar', () => {
    const generalStore = useGeneralStore()
    generalStore.closeSidebar()
    expect(generalStore.sidebar).toBe(false)
  })
})
