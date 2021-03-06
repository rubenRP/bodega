import { getProfileInfo } from '@/api/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    data: <any>{},
    initials: '',
    cellarId: 0,
    role: -1,
  }),
  getters: {
    isAdmin() {
      if (this.role === 1) return true
      else return false
    },
  },
  actions: {
    async fetchUser(user: { id: any } | null) {
      this.setLoggedIn(user != null)
      if (user) {
        this.setUser(user)
        try {
          let { data, error, status } = await getProfileInfo(user.id)
          if (error && status !== 406) throw error

          if (data) {
            this.setInitials(data.initials)
            this.setCellarId(data.cellar_id)
            this.setRole(data.role)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this.setUser(null as any)
      }
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value
    },
    setUser(data: {}) {
      this.data = data
    },
    setInitials(value: string) {
      this.initials = value
    },
    setCellarId(value: any) {
      this.cellarId = value
    },
    setRole(value: any) {
      this.role = value
    },
  },
})
