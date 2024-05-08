<template>
  <div class="message-item">{{ message.user.nom }} : {{ message.corps}}</div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
