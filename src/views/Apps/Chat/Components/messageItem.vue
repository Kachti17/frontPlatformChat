<template>
  <div v-if="message.user.id === userData.id" class="message-right">
    <div>
      <strong>{{ message.user.nom }} {{ message.user.prenom }}</strong>
    </div>
    <div class="chat-detail">
      <div class="chat-message">
        <p>{{ message.corps }}</p>
        <span class="chat-time mt-1">{{
          formatMessageTime(message.created_at)
        }}</span>
      </div>
    </div>
  </div>
  <div v-else class="message-left">
    <div>
      <strong>{{ message.user.nom }} {{ message.user.prenom }}</strong>
    </div>
    <div class="chat-detail">
      <div class="chat-message">
        <p>{{ message.corps }}</p>
        <span class="chat-time mt-1">{{
          formatMessageTime(message.created_at)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
    };
  },
  methods: {
    formatMessageTime(date) {
      // Format the message time as HH:MM
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.message-item {
  /* Styles communs à tous les messages */
  padding: 10px; /* Augmente la taille des messages */
}

.message-right {
  /* Styles pour les messages de l'utilisateur actuel (à droite) */
  text-align: right;
}
.message-left {
  /* Styles pour les messages des autres utilisateurs (à gauche) */
  text-align: left;
  margin-bottom: 0;
}

.message-left .chat-detail {
  /* Styles pour le détail du message des autres utilisateurs */
  display: flex;
  justify-content: flex-start;
}

.message-left .chat-message {
  /* Styles pour le message des autres utilisateurs */
  background-color: #797979; /* Couleur de fond pour les messages des autres utilisateurs */
  padding: 10px;
  border-radius: 8px;
}

.message-left .chat-message p {
  margin: 0; /* Réduit l'espace entre les paragraphes dans le message */
}

.message-left .chat-time {
  font-size: 0.8rem;
  color: #666; /* Couleur de l'heure du message des autres utilisateurs */
}
</style>
