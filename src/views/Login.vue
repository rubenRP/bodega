<template>
  <div class="h-32 md:h-auto md:w-1/2">
    <img
      aria-hidden="true"
      class="object-cover w-full h-full"
      src="../assets/img/cellar-bg.jpeg"
      alt="Bodega"
    />
  </div>
  <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
    <div class="w-full">
      <div
        class="mb-6 block w-4/12 text-xl lg:w-6/12 lg:text-3xl m-auto pink-900"
      >
        <Logo />
      </div>
      <h1 class="mb-4 text-xl font-semibold text-gray-700 hidden">Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <input
            type="submit"
            class="bg-pink-900 text-white active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full cursor-pointer"
            :value="loading ? 'Loading' : 'Login with Google'"
            :disabled="loading"
          />

          <div
            class="flex items-center justify-between px-4 py-2 mt-8 text-sm border-pink-900 bg-pink-100 rounded-lg focus:border-pink-800 border"
            v-if="message"
          >
            <div class="flex items-center">{{ message }}</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import Logo from '@/components/General/Logo.vue'
  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { supabase } from '@/supabase'
  import { mapState } from 'pinia'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Login',
    components: {
      Logo,
    },

    setup: () => {
      const loading = ref(false)
      let message = ref('')

      const handleLogin = async () => {
        try {
          loading.value = true
          const { error } = await supabase.auth.signIn(
            { provider: 'google' },
            {
              redirectTo: '/',
            }
          )
          if (error) throw error
        } catch (error: any) {
          message.value = error.error_description || error.message
        } finally {
          loading.value = false
        }
      }

      return {
        loading,
        handleLogin,
        message,
      }
    },
    computed: { ...mapState(useUserStore, { isLoggedIn: 'loggedIn' }) },
    watch: {
      isLoggedIn: {
        handler: (isLoggedIn) => {
          if (isLoggedIn) {
            router.push('/')
          }
        },
      },
    },
  })
</script>
