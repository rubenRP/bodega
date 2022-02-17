import { defineStore } from 'pinia'

interface State {
  sidebar: boolean
  messages: Array<{ id: number }>
  messageId: number
}

export const useGeneralStore = defineStore('general', {
  state: (): State => ({
    sidebar: false,
    messages: [],
    messageId: 0,
  }),
  actions: {
    addMessage(message: {}) {
      this.messages.push({
        ...message,
        id: this.messageId++,
      })
      setTimeout(() => {
        this.removeMessage(this.messageId - 1)
      }, 5000)
    },
    removeMessage(messageId: number) {
      this.messages = this.messages.filter(
        (message: { id: number }) => message.id !== messageId
      )
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    closeSidebar() {
      this.sidebar = false
    },
  },
})
