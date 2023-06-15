import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    loggedIn: false,
    data: <any>{},
    initials: "",
    cellarId: 0,
    role: -1,
  }),
  getters: {
    isAdmin() {
      if (this.role === 1) return true;
      else return false;
    },
  },
  actions: {
    async fetchUser(user: { id: any } | null) {
      this.setLoggedIn(user != null);
      if (user) {
        this.setUser(user);
        try {
          let { data } = await $fetch("/api/user/profile", {
            method: "post",
            body: { id: user.id },
          });

          if (data) {
            this.setInitials(data.initials);
            this.setCellarId(data.cellar_id);
            this.setRole(data.role);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.setUser(null as any);
      }
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
    },
    setUser(data: {}) {
      this.data = data;
    },
    setInitials(value: string) {
      this.initials = value;
    },
    setCellarId(value: any) {
      this.cellarId = value;
    },
    setRole(value: any) {
      this.role = value;
    },
    logout() {
      this.setLoggedIn(false);
      this.setUser(null as any);
      this.setInitials("");
      this.setCellarId(0);
      this.setRole(-1);
    },
  },
});
