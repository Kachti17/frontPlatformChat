<template>
  <div class="chat-page p-0">
    <div
      class="sidebar sidebar-chat sidebar-base border-end shadow-none scrollable-content"
    >
      <br />
      &nbsp; &nbsp;
      <button type="button" class="btn btn-primary" @click="goBack">
        Go back
      </button>
      <br />
      <br />

      <h5 class="mb-3 fs-5 d-flex">
        <span
          ><img
            :src="userData.img_profile ? userData.img_profile : defaultImageUrl"
            alt="image de profil"
            class="avatar-60 img-fluid ms-3"
          />&nbsp;
          <strong> {{ userData.nom }} {{ userData.prenom }}</strong></span
        >
      </h5>

      <div class="chat-sidebar-channel scroller mt-4 ps-3">
        <h5 class="fs-4 mb-3">
          Chat Room : {{ room ? room.name : "No room selected" }}
        </h5>
        <tab-nav
          :pills="true"
          :vertical="true"
          class="iq-chat-ui"
          id="chat-list-data"
        >
          <template v-for="room in chatRooms" :key="room.id">
            <tab-nav-items
              :id="`v-pills-${room.id}`"
              :href="`#v-pills-${room.id}`"
              :ariaControls="`v-pills-${room.id}`"
              role="tab"
              @mouseenter="handleHover(room.id, true)"
              @mouseleave="handleHover(room.id, false)"
              @click="selectChatRoom(room.id)"
              :class="{
                'chat-room-hover': room.hovered,
                'chat-room-selected': room.selected,
              }"
            >
              <template v-slot:title>
                <h6 class="fs-5 mb-0 d-block">{{ room.name }}</h6>
              </template>
              <template v-slot:content></template>
            </tab-nav-items>
          </template>
        </tab-nav>
      </div>
    </div>

    <main class="main-content">
      <tab-content id="v-pills-tabContent">
        <div v-if="!room && !roomSelected" class="no-room-selected">
          <h5 class="fs-4 mb-3">Chat Room : No room selected</h5>
        </div>
        <div v-else>
          <!-- <div v-if="loading">
            <Loader />
          </div> -->
          <div>
            <div
              v-if="messages.length > 0 && room"
              class="message-container"
              ref="messageContainer"
            >
              <!-- Vérifiez s'il y a des messages à afficher -->
              <ul class="message-list">
                <li
                  v-for="message in messages"
                  :key="message.id"
                  :class="getMessageClass(message)"
                >
                  <div class="chat-message">
                    <img
                      :src="
                        message.room_access.user.img_profile
                          ? message.room_access.user.img_profile
                          : defaultImageUrl
                      "
                      alt="image de profil"
                      class="avatar-45 img-fluid"
                    />&nbsp;
                    <strong>
                      {{ message.room_access.user.nom }}
                      {{ message.room_access.user.prenom }}</strong
                    >
                    <p class="message-content">
                      <template v-if="message.deleted_at">
                        <div class="deleted-message">
                          <span class="deleted-message-text">
                            {{ message.room_access.user.nom }}
                            {{ message.room_access.user.prenom }} has deleted a
                            message
                          </span>
                        </div>
                      </template>
                      <template v-else>
                        {{ message.corps }}
                      </template>
                    </p>
                    <span class="chat-time" v-if="!message.deleted_at">
                      {{ formatMessageTime(message.created_at) }}
                    </span>
                    <span class="chat-time" v-else>
                      {{ formatMessageTime(message.deleted_at) }}
                    </span>
                    <img
                      v-if="
                        !message.deleted_at &&
                        message.room_access.user.id === userData.id
                      "
                      src="@/assets/images/icon/pbl.png"
                      class="avatar-15 img-fluid delete-icon"
                      @click="deleteMessage(message.id)"
                      alt="Supprimer le message"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <p v-else>No Message</p>
          </div>
          <div class="message-input-bar">
            <input
              type="text"
              placeholder="Entrez votre message..."
              v-model="corps"
              @keyup.enter="sendMessage()"
            />
            <button @click="sendMessage()">Send</button>
          </div>
        </div>
      </tab-content>
    </main>
  </div>
</template>

<script>
import { socialvue } from "../../../config/pluginInit";

import { Users, MessagesUser1 } from "../../../FackApi/api/chat";
import axios from "axios";
import Loader from "@/components/Loader.vue";

export default {
  name: "Index",

  // components: {
  //   Loader,
  // },

  mounted() {
    socialvue.index();
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
    // Appeler la méthode pour récupérer les salles de discussion de l'utilisateur
    this.fetchUserChatRooms();
  },
  computed: {
    filteredList() {
      return this.usersList.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    publicList() {
      return this.usersList.filter((item) => {
        return !item.isPrivate
          ? item.name.toLowerCase().includes(this.search.toLowerCase())
          : false;
      });
    },
    privateList() {
      return this.usersList.filter((item) => {
        return item.isPrivate
          ? item.name.toLowerCase().includes(this.search.toLowerCase())
          : false;
      });
    },
  },
  data() {
    return {
      loading: true, // Add loading state

      selectedRoomAccessId: null, // ID de l'accès à la salle sélectionnée
      defaultpic: require("@/assets/images/user/user3.png"),
      defaultImageUrl: require("../../../assets/images/user/user3.png"),

      chatRooms: [], // Initialisez la liste des salles de discussion
      messages: [], // Initialisation de la variable messages
      corps: "",
      room: null, // Ajout de la propriété room

      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      usersList: Users,
      chat: MessagesUser1,
      active: true,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    connect() {
      if (this.room) {
        console.log("Connecting to private channel:", this.room);
        let vm = this;
        this.loadMessages();
        window.Echo.channel("chat").listen("message", (e) => {
          console.log("test");
          vm.loadMessages();
        });
      } else {
        console.error("Echo or current room ID is undefined.");
      }
    },
    getMessageClass(message) {
      return {
        "message-right": message.room_access.user.id === this.userData.id,
        "message-left": message.room_access.user.id !== this.userData.id,
      };
    },
    handleHover(roomId, isHovered) {
      const room = this.chatRooms.find((room) => room.id === roomId);
      if (room) {
        room.hovered = isHovered;
      }
    },
    // selectChatRoom(roomId) {
    //   this.chatRooms.forEach((room) => {
    //     if (room.id === roomId) {
    //       room.selected = true; // Marquer la chambre comme sélectionnée
    //     } else {
    //       room.selected = false; // Déselectionner les autres chambres
    //     }
    //   });
    //   this.loadMessages(roomId); // Charger les messages de la chambre sélectionnée
    // },
    selectChatRoom(roomId) {
      this.room = this.chatRooms.find((room) => room.id === roomId);
      if (!this.room) {
        console.error("La chambre sélectionnée n'a pas été trouvée.");
        return;
      }
      this.loadMessages(roomId);
    },

    sendMessage() {
      const token = localStorage.getItem("token");

      console.log("Room avant envoi du message :", this.room); // Vérifiez la valeur de this.room

      if (!this.room || !this.room.id) {
        console.error("La chambre est indéfinie ou n'a pas d'ID.");
        return;
      }

      if (this.corps.trim() === "") {
        console.log("Message vide, l'envoi est annulé.");
        return;
      }

      axios
        .post(
          `http://127.0.0.1:8000/api/new-message/${this.room.id}`,
          {
            corps: this.corps.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          console.log("Message envoyé :", response.data);
          this.corps = ""; // Réinitialiser le champ du message après l'envoi
          this.loadMessages(this.room.id); // Recharger les messages après l'envoi
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du message :", error);
        });
    },

    loadMessages(roomId) {
      this.loading = true;

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .get(`http://127.0.0.1:8000/api/messages/room/${roomId}`, {
          headers,
        })
        .then((response) => {
          this.messages = response.data.messages;
          this.sortMessagesByDate(); // Trier les messages par date
          console.log("Messages chargés :", this.messages);

          setTimeout(() => {
            if (this.room && this.room.id === roomId) {
              this.loadMessages(roomId); // Recharger les messages pour le même chat room
              this.loading = false;
            }
          }, 2000);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des messages :", error);
        });
    },
    // scrollToBottom() {
    //   window.scrollTo(0, document.body.scrollHeight);
    // },
    sortMessagesByDate() {
      this.messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    },

    // async loadMessages(roomAccessId) {
    //   const token = localStorage.getItem("token");
    //   const headers = { Authorization: `Bearer ${token}` };
    //   try {
    //     // Charger les messages de la salle de discussion spécifique en utilisant Axios
    //     const response = await axios.get(
    //       `http://127.0.0.1:8000/api/messages/room/${roomAccessId}`,
    //       { headers },
    //     );
    //     this.chat = response.data.messages; // Mettre à jour les messages du chat
    //   } catch (error) {
    //     console.error("Error loading messages:", error);
    //     // Gérer les erreurs côté front-end
    //   }
    // },
    async fetchUserChatRooms() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          "http://127.0.0.1:8000/api/userChatRooms",
          { headers },
        );
        this.chatRooms = response.data.chatRooms; // Mettre à jour la liste des salles de discussion
      } catch (error) {
        console.error("Error fetching user chat rooms:", error);
        // Gérer les erreurs côté front-end
      }
    },
    checkUser(item, type) {
      const user = this.usersList.find((user) => user.id === item);
      let final;
      if (user !== undefined) {
        switch (type) {
          case "name":
            final = user.name;
            break;
          case "image":
            final = user.image;
            break;
          case "role":
            final = user.role;
            break;
        }
        return final;
      }
      return require("../../../assets/images/user/user-5.jpg");
    },
    formatMessageTime(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },

    async deleteMessage(messageId) {
      const token = localStorage.getItem("token");

      try {
        // Envoyer une requête DELETE à l'API pour supprimer le message
        await axios.delete(`http://127.0.0.1:8000/api/messages/${messageId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Supprimer le message de la liste locale
        this.messages = this.messages.filter(
          (message) => message.id !== messageId,
        );
        this.loadMessages(this.room.id); // Recharger les messages après l'envoi

        this.$emit("messageDeleted", messageId); // Émettre un événement si nécessaire
      } catch (error) {
        console.error("Erreur lors de la suppression du message:", error);
      }
    },
  },
};
</script>

<style>
.no-room-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Utiliser toute la hauteur de la fenêtre */
}
.scrollable-content {
  overflow-y: auto; /* Défilement vertical */
  max-height: 700px; /* ou ajustez la hauteur maximale selon vos besoins */
  /* Vous pouvez ajuster la valeur max-height selon vos besoins */
}
.delete-icon {
  position: absolute;
  left: 10px; /* Ajustez selon vos besoins */
  transform: translateY(-50%);
  bottom: 10px;
}
.deleted-message {
  background-color: #f0f0f0; /* Bande grise */
  color: #666; /* Couleur du texte */
  padding: 0px; /* Espacement intérieur */
  border-radius: 5px; /* Coins arrondis */
  margin: 5px 0; /* Espacement extérieur */
  display: flex;
  align-items: center;
}

.deleted-message-text {
  font-style: italic; /* Italique pour le texte */
}

.chat-room-hover {
  background-color: #f0f0f0; /* Couleur grise pour le survol */
}
.chat-room-selected {
  background-color: #f0f0f0; /* Couleur grise pour la sélection */
}
.message-right {
  /* Styles pour les messages de l'utilisateur actuel (à droite) */
  text-align: right;
  color: black; /* Couleur du texte */
  margin-left: 550px; /* Décalage vers la droite */
}
.message-left {
  /* Styles pour les messages des autres utilisateurs (à gauche) */
  text-align: left;
  margin-bottom: 15px;
  color: black; /* Couleur du texte */
}

.message-left .chat-message {
  /* Styles pour le message des autres utilisateurs */
  background-color: #dbdbdb; /* Couleur de fond pour les messages des autres utilisateurs */
  /* padding: 20px; */
  max-width: 600px;
  max-height: 100%;
  border-radius: 8px;

  color: black; /* Couleur du texte */
}
.message-right .chat-message {
  /* Styles pour le message des autres utilisateurs */
  background-color: #56a9ec6c; /* Couleur de fond pour les messages des autres utilisateurs */
  /* padding: 20px; */
  max-width: 600px;
  max-height: 100%;
  border-radius: 8px;

  color: black; /* Couleur du texte */

  max-width: calc(100% - 20px); /* Largeur maximale ajustée */
}
.message-item {
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message-content {
  margin-bottom: 5px;
  font-size: 100%;
}
.message-input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  margin-left: 20%;
  width: 70%;
  background-color: #f8f9fa;
  border-top: 1px solid #ced4da;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
}

/* Styles pour l'input de message */
.message-input-bar input {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  outline: none;
}

/* Styles pour le bouton d'envoi */
.message-input-bar button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  right: 0; /* Décalage complet vers la droite */
}

/* Styles supplémentaires pour la liste des messages */
.message-list {
  margin-bottom: 60px; /* Espacement en bas pour la barre d'entrée de message */
  /* Ajoutez plus de styles au besoin */
}
</style>
