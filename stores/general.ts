import { defineStore } from "pinia";
import GeneralStoreState from "~~/types/stores";

export const useGeneralStore = defineStore("general", {
  state: (): GeneralStoreState => ({
    sidebar: true,
    messages: [],
    messageId: 0,
    bottleForm: false,
    reviewForm: false,
    journalForm: false,
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
    openSidebar() {
      this.sidebar = true;
    },
    toggleBottleForm() {
      this.bottleForm = !this.bottleForm;
    },
    toggleReviewForm() {
      this.reviewForm = !this.reviewForm;
    },
    toggleJournalForm() {
      this.journalForm = !this.journalForm;
    },
    openBottleForm() {
      this.bottleForm = true;
    },
    closeBottleForm() {
      this.bottleForm = false;
    },
  },
});
