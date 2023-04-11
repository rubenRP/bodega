<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet>
              <v-list>
                <v-list-item> HOLA </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <!--<Notifications />-->
  <main class="container">
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/stores/general";

const store = useGeneralStore();
const showSidebar = store.sidebar;
const toggleSidebar = () => store.toggleSidebar;
</script>
