<template>
  <div
    v-if="message.user.id === userData.id && message.deleted_at === null"
    class="message-right"
  >
    <div>
      <strong>{{ message.user.nom }} {{ message.user.prenom }}</strong>
    </div>
    <div class="chat-detail" @mouseleave="showDeleteBand = false">
      <div class="chat-message">
        <p @mouseover="showDeleteBand = true" class="message-content">
          {{ message.corps }}
        </p>
        <div
          v-if="
            (userData.role === 'admin' || message.user.id === userData.id) &&
            showDeleteBand
          "
          class="delete-band"
        >
          <img
            src="@/assets/images/icon/pbl.png"
            class="avatar-15 img-fluid"
            @click="deleteMessage(message.id)"
            alt=""
          />
          <!-- <button @click="deleteMessage(message.id)">Delete message</button> -->
        </div>
        <span class="chat-time mt-1"
          >{{ formatMessageTime(message.created_at) }} &nbsp; &nbsp; &nbsp;
        </span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="message-right">
      <p>This message was deleted</p>
      <span>{{ message.deleted_at }}</span>
    </div>
  </div>
  <div
    v-if="message.user.id !== userData.id && message.deleted_at === null"
    class="message-left"
  >
    <div>
      <strong>{{ message.user.nom }} {{ message.user.prenom }}</strong>
    </div>
    <div class="chat-detail" @mouseleave="showDeleteBand = false">
      <div class="chat-message">
        <p @mouseover="showDeleteBand = true" class="message-content">
          {{ message.corps }}
        </p>
        <div
          v-if="
            (userData.role === 'admin' || message.user.id === userData.id) &&
            showDeleteBand
          "
          class="delete-band"
        >
          <img
            src="@/assets/images/icon/pbl.png"
            class="avatar-15 img-fluid"
            @click="deleteMessage(message.id)"
            alt=""
          />
        </div>
        <span class="chat-time mt-1 mr-9"
          >{{ formatMessageTime(message.created_at) }}
        </span>
      </div>
    </div>
  </div>
  <!-- <div v-else>
    <div class="message-right">
      <p>This message was deleted</p>
      <span>{{ message.deleted_at }}</span>
    </div>
  </div> -->
</template>

<script>
import axios from "axios";

export default {
  props: ["message"],
  data() {
    return {
      showDeleteBand: false,
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
    };
  },

  methods: {
    handleHover() {
      console.log("Message lorsque vous survolez l'image de suppression.");
    },
    formatMessageTime(date) {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    deleteMessage(messageId) {
      const confirmed = window.confirm(
        "Do you really want to delete this message ?",
      );
      if (!confirmed) {
        return;
      }

      const token = localStorage.getItem("token");
      axios
        .delete(`http://127.0.0.1:8000/api/messages/${messageId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.message);
          // Rafraîchir les messages après suppression
          this.$emit("messageDeleted", messageId);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.delete-band-right {
  position: absolute;
  background-color: #f8f9fa; /* Couleur de fond */
  border: 1px solid #ced4da; /* Couleur de la bordure */
  border-radius: 5px; /* Coins arrondis */
  padding: 8px 12px; /* Espacement interne */
  z-index: 1; /* Assurez-vous que la bande est au-dessus des autres éléments */
  left: -120px; /* Ajustez la valeur selon votre mise en page */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Ombre légère */
  transition: right 0.3s ease; /* Animation de transition */
}

.delete-band-left {
  position: absolute;
  background-color: #f8f9fa; /* Couleur de fond */
  border: 1px solid #ced4da; /* Couleur de la bordure */
  border-radius: 5px; /* Coins arrondis */
  padding: 8px 12px; /* Espacement interne */
  z-index: 1; /* Assurez-vous que la bande est au-dessus des autres éléments */
  left: -120px; /* Ajustez la valeur selon votre mise en page */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Ombre légère */
  transition: left 0.3s ease; /* Animation de transition */
}
.message-item {
  /* Styles communs à tous les messages */
  padding: 10px; /* Augmente la taille des messages */
}
.message-right .chat-message .message-content {
  font-size: 16px; /* Taille du texte du message */
  line-height: 1.5; /* Hauteur de ligne pour le texte du message */
}

.message-left .chat-message .message-content {
  font-size: 16px; /* Taille du texte du message */
  line-height: 1.5; /* Hauteur de ligne pour le texte du message */
}

.message-right {
  /* Styles pour les messages de l'utilisateur actuel (à droite) */
  text-align: right;
  color: black; /* Couleur du texte */
  margin-right: 20px; /* Décalage vers la droite */
}
.message-left {
  /* Styles pour les messages des autres utilisateurs (à gauche) */
  text-align: left;
  margin-bottom: 0;
  color: black; /* Couleur du texte */
  margin-left: 20px; /* Décalage vers la droite */
}

.message-left .chat-detail {
  /* Styles pour le détail du message des autres utilisateurs */
  display: flex;
  justify-content: flex-start;
}

.message-right .chat-message {
  color: black; /* Couleur du texte */
}
.message-left .chat-message {
  /* Styles pour le message des autres utilisateurs */
  background-color: #dbdbdb; /* Couleur de fond pour les messages des autres utilisateurs */
  /* padding: 20px; */
  max-width: 600px;
  border-radius: 8px;
  color: black; /* Couleur du texte */
}
.message-right .chat-message {
  /* Styles pour le message des autres utilisateurs */
  background-color: #56a9ec6c; /* Couleur de fond pour les messages des autres utilisateurs */
  /* padding: 20px; */
  max-width: 600px;
  border-radius: 8px;
  color: black; /* Couleur du texte */
}

.message-left .chat-message p {
  margin: 0 10px; /* Réduit l'espace entre les paragraphes dans le message */
}
.message-right .chat-message p {
  margin: 0 10px; /* Réduit l'espace entre les paragraphes dans le message */
}

.message-left .chat-time {
  font-size: 0.8rem;
  color: #666; /* Couleur de l'heure du message des autres utilisateurs */
}
.message-right .chat-time {
  font-size: 0.8rem;
  color: #666; /* Couleur de l'heure du message de l'utilisateur actuel */
}

.chat-detail .chat-message .chat-time {
  position: none !important;
  bottom: -20px !important;
  right: 0 !important;
  color: #555770 !important;
  font-size: 0.8rem !important;
  white-space: nowrap !important;
  margin-top: 30px;
}
</style>
