<template>
  <div class="h-screen">
    <Header />
    <!--<Notifications />-->
    <main class="px-4 md:px-10 mx-auto w-full container">
      <div
        class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      ></div>
      <div>
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>
