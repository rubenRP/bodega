import { defineStore } from "pinia";
import GeneralStoreState from "~~/types/stores";

export const useGeneralStore = defineStore("general", {
  state: (): GeneralStoreState => ({
    sidebar: false,
    messages: [],
    messageId: 0,
  }),
  actions: {
    addMessage(message: {}) {
      this.messages.push({
        ...message,
        id: this.messageId++,
      });
      setTimeout(() => {
        this.removeMessage(this.messageId - 1);
      }, 5000);
    },
    removeMessage(messageId: number) {
      this.messages = this.messages.filter(
        (message: { id: number }) => message.id !== messageId
      );
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
    closeSidebar() {
      this.sidebar = false;
    },
  },
});
