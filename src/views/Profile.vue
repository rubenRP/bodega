<template>
  <h2
    class="
      my-6
      text-2xl
      font-semibold
      text-gray-700
      dark:text-gray-200
      flex
      items-center
      justify-between
    "
  >
    <span>{{ $t('user.profile') }}</span>
  </h2>
  <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
    General
  </h4>
  <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <form class="form-widget" @submit.prevent="updateProfile">
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t('user.email')
        }}</span>
        <input
          class="
            block
            w-full
            mt-1
            text-sm
            dark:border-gray-600 dark:bg-gray-700
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
            dark:text-gray-300 dark:focus:shadow-outline-gray
            border-gray-200 border
            rounded-md
            px-3
            py-2
          "
          :value="getUser.email"
          disabled
        />
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t('user.name')
        }}</span>
        <input
          class="
            block
            w-full
            mt-1
            text-sm
            dark:border-gray-600 dark:bg-gray-700
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
            dark:text-gray-300 dark:focus:shadow-outline-gray
            border-gray-200 border
            rounded-md
            px-3
            py-2
          "
          v-model="username"
        />
      </label>
      <div
        class="
          flex flex-col
          items-center
          justify-end
          px-6
          py-3
          -mx-6
          -mb-4
          space-y-4
          sm:space-y-0 sm:space-x-6 sm:flex-row
        "
      >
        <button
          @click="logout"
          class="
            w-full
            px-5
            py-3
            text-sm
            font-medium
            leading-5
            text-gray-700
            transition-colors
            duration-150
            border border-gray-300
            rounded-lg
            dark:text-gray-400
            sm:px-4 sm:py-2 sm:w-auto
            active:bg-transparent
            hover:border-gray-500
            focus:border-gray-500
            active:text-gray-500
            focus:outline-none focus:shadow-outline-gray
          "
        >
          {{ $t('user.logout') }}
        </button>
        <input
          type="submit"
          class="
            w-full
            px-5
            py-3
            text-sm
            font-medium
            leading-5
            text-white
            transition-colors
            duration-150
            bg-pink-900
            border border-transparent
            rounded-lg
            sm:w-auto sm:px-4 sm:py-2
            active:bg-pink-600
            hover:bg-pink-700
            focus:outline-none focus:shadow-outline-purple
          "
          :value="$t('general.update')"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { mapActions, mapGetters } from 'vuex'
  import { getProfileInfo, logout } from '@/api/user'
  import { supabase } from '@/supabase'

  export default defineComponent({
    name: 'Profile',
    components: {},
    data() {
      return {
        username: '',
        email: '',
        avatar_url: '',
      }
    },
    created() {
      this.getProfile()
    },
    destroyed() {},
    computed: {
      ...mapGetters({
        getUser: 'user/data',
      }),
    },
    methods: {
      async getProfile() {
        try {
          let { data, error, status } = await getProfileInfo(this.getUser.id)

          if (error && status !== 406) throw error

          if (data) {
            this.username = data.username
            this.avatar_url = data.avatar_url
          }
        } catch (error) {
          alert(error.message)
        }
      },
      async updateProfile() {
        try {
          const updates = {
            id: this.getUser.id,
            username: this.username,
            initials: this.username
              .split(' ')
              .map((n) => n[0])
              .join(''),
            avatar_url: this.avatar_url,
            updated_at: new Date(),
          }

          let { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal',
          })

          if (error) throw error
        } catch (error) {
          console.log(error.message)
        }
      },
      async logout() {
        await logout()
        this.$router.push('/login')
      },
    },
  })
</script>
