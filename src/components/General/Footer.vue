<template>
  <footer class="px-4 md:px-10 container mx-auto w-full mt-12">
    <div class="block py-4">
      <div class="">
        <hr class="mb-6 border-b-1 border-slate-600" />
        <div
          class="flex flex-wrap items-center md:justify-between justify-center"
        >
          <div class="w-full md:w-4/12">
            <div
              class="text-sm text-slate-500 font-semibold py-1 text-center md:text-left"
            >
              Created by
              <a
                className="text-slate-500 hover:text-slate-700 text-sm font-semibold py-1"
                href="https://rubenr.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rubén Rodríguez
              </a>
            </div>
          </div>

          <div class="w-full md:w-8/12">
            <ul class="flex flex-wrap list-none md:justify-end justify-center">
              <li>
                <a
                  className="text-slate-500 hover:text-slate-700 text-sm font-semibold py-1"
                  href="https://github.com/rubenrp/bodega"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Footer',
  })
</script>
