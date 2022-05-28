<template>
  <div class="side-brand">
    <img src="/images/logo_128.png" alt="SpearJs Logo" />
    <span aria-label="SpearJs">SpearJs</span>
  </div>
</template>
<style lang="scss" scoped>
.side-brand {
  @apply flex items-center mr-8 select-none;

  img {
    width: 32px;
  }

  span {
    @apply ml-4 text-2xl font-bold;

    color: var(--c-brand);
  }
}
</style>
