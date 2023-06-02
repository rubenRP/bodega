export default interface GeneralStoreState {
  sidebar: boolean;
  messages: Array<{ id: number }>;
  messageId: number;
  bottleForm: boolean;
  reviewForm: boolean;
  journalForm: boolean;
}
