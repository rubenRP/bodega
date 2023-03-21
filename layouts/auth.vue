<template>
  <div class="flex items-center min-h-screen p-6">
    <main
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <slot />
      </div>
    </main>
  </div>
</template>
