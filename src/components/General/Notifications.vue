<template>
  <template>
    <transition name="notifications" mode="out-in">
      <div v-if="hasMesages">
        <transition-group name="message" tag="div" mode="out-in">
          <div v-for="message in messages" :key="message.id">
            {{ message.text }}
          </div>
        </transition-group>
      </div>
    </transition>
  </template>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapState } from 'vuex'

  export default defineComponent({
    name: 'Notifications',
    computed: {
      ...mapState('messages', ['general/messages']),
      hasMesages: () => this.messages.length > 0,
    },
  })
</script>
