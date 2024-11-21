<template>
  <div class="chat-room-messages">
    <ul>
      <li v-for="message in messages" :key="message.id">
        <div class="message">{{ message.corps }}</div>
        <!-- <div class="message-meta">{{ message.user.nom }} {{ message.user.prenom }} - {{ message.created_at }}</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    roomAccessId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      messages: [], // Initialiser avec les messages de la salle de discussion spécifiée
    };
  },
  methods: {
    loadMessages(roomAccessId) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      axios
        .get(`http://127.0.0.1:8000/api/messages/room/${roomAccessId}`, {
          headers,
        })
        .then((response) => {
          this.messages = response.data.messages;
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des messages :", error);
        });
    },
  },
  mounted() {
    // Charger les messages lors du montage du composant
    this.loadMessages(this.roomAccessId);
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant ChatRoomMessages */
.chat-room-messages {
  /* Styles pour la zone des messages de la salle de discussion */
}
.message {
  /* Styles pour chaque message individuel */
}
.message-meta {
  /* Styles pour les métadonnées du message (expéditeur, horodatage, etc.) */
}
</style>
