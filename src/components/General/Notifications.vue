<template>
  <transition name="notifications" mode="out-in" v-if="messages?.length">
    <div class="px-4 md:px-10 mx-auto w-full container mt-6">
      <transition-group name="message" tag="div" mode="out-in">
        <div v-for="message in messages" :key="message.id">
          <div
            class="text-white px-6 py-4 border-0 rounded relative mb-4"
            :class="colorClass(message.type)"
          >
            <span class="text-xl inline-block mr-5 align-middle">
              <font-awesome-icon
                :icon="['fas', 'check']"
                v-if="message.type === 'success'"
              />
              <font-awesome-icon
                :icon="['fas', 'exclamation-triangle']"
                v-if="message.type === 'warning'"
              />
              <font-awesome-icon
                :icon="['fas', 'exclamation-circle']"
                v-if="message.type === 'error'"
              />
            </span>
            <span class="inline-block align-middle mr-8">
              {{ message.text }}
            </span>
            <button
              class="
                absolute
                bg-transparent
                text-2xl
                font-semibold
                leading-none
                right-0
                top-0
                mt-4
                mr-6
                outline-none
                focus:outline-none
              "
              @click="removeNotification(message.id)"
            >
              <span>×</span>
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapGetters } from 'vuex'

  export default defineComponent({
    name: 'Notifications',
    computed: {
      ...mapGetters({ messages: 'general/messages' }),
    },
    methods: {
      ...mapActions({ removeMessage: 'general/removeMessage' }),
      removeNotification(id: number) {
        this.removeMessage(id)
      },
      colorClass(type) {
        switch (type) {
          case 'success':
            return 'bg-emerald-500'
          case 'warning':
            return 'bg-orange-500'
          case 'error':
            return 'bg-red-500'
          default:
            return 'bg-gray-500'
        }
      },
    },
  })
</script>
