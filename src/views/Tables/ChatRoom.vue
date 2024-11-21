<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else class="row row-cols-1 w-100 mx-auto">
    <div class="col-sm-28" style="height: 480%">
      <div
        class="card position-relative inner-page-bg bg-primary"
        style="height: 150px"
      >
        <div class="inner-page-title">
          <h3 class="text-white">Table of chat rooms</h3>
        </div>
      </div>
    </div>
    <div class="col-sm-60">
      <iq-card class="w-100">
        <template v-slot:headerTitle>
          <h4 class="card-title">Chat rooms</h4>
        </template>
        <template v-slot:body>
          <div id="table" class="table-editable">
            <h1>List of chat rooms</h1>
            <span class="table-add float-end mb-3 mr-2">
              <button
                @click="showAddForm"
                class="btn btn-sm btn-success d-flex align-items-center"
              >
                <i class="material-symbols-outlined me-1 md-18">add</i>Add a
                room
              </button>
            </span>

            <div v-if="showForm" class="add-room-form">
              <h2>Add a chat room</h2>
              <form @submit.prevent="addChatRoom">
                <div class="mb-3">
                  <label for="roomName" class="form-label"
                    >Chat room name</label
                  >
                  <input
                    type="text"
                    v-model="newRoomName"
                    class="form-control"
                    id="roomName"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
            <br />

            <div class="table-responsive-md">
              <table class="table table-bordered table-striped text-left">
                <thead>
                  <tr>
                    <th>Chat room name</th>
                    <th>Users with access</th>
                    <th>Created_at</th>
                    <th>Action</th>
                    <th>Add user</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="room in chatRooms" :key="room.id">
                    <td>{{ room.name }}</td>
                    <td>
                      <ul>
                        <li
                          v-for="user in usersWithAccess[room.id]"
                          :key="user.id"
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              {{ user.user.nom }} {{ user.user.prenom }}
                            </div>
                            <img
                              class="avatar-20 img-fluid"
                              src="@/assets/images/icon/remove.png"
                              alt="Supprimer"
                              @click="revokeAccess(room.id, user.user.id)"
                            />
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>{{ formatDate(room.created_at) }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="deleteRoom(room.id)"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="showAddUserForm(room.id)"
                      >
                        Add user
                      </button>
                      <transition name="modal">
                        <div
                          class="modal-mask"
                          v-if="showUserPopup && selectedRoomId === room.id"
                        >
                          <div class="modal-wrapper">
                            <div class="modal-container">
                              <div class="modal-header">
                                <h3>Give user access</h3>
                                <button
                                  class="close-btn"
                                  @click="closeUserPopup"
                                >
                                  &times;
                                </button>
                              </div>

                              <div class="modal-body">
                                <div class="user-list-grid">
                                  <b-card
                                    v-for="user in userList"
                                    :key="user.id"
                                    class="user-item"
                                  >
                                    <img
                                      :src="
                                        user.img_profile
                                          ? user.img_profile
                                          : defaultpic
                                      "
                                      alt="Profile Image"
                                      class="avatar-70 img-fluid"
                                    />
                                    <div class="user-info">
                                      <p>{{ user.nom }} {{ user.prenom }}</p>
                                      <button
                                        @click="
                                          addUserToRoom(user.id, selectedRoomId)
                                        "
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </b-card>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </iq-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      showUserPopup: false,
      selectedRoomId: null,
      deleteIndex: null,
      searchText: "",
      chatRooms: [],
      userList: [],
      usersWithAccess: {}, // Utilisez un objet pour stocker les utilisateurs avec accès par room
      showForm: false,
      newRoomName: "",
      defaultpic: require("@/assets/images/user/user3.png"),
      loading: true, // Add loading state
    };
  },
  mounted() {
    this.fetchChatRooms();
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
  },
  methods: {
    async addUserToRoom(userId, roomId) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        // Envoyer la requête au backend pour ajouter l'utilisateur à la salle
        const response = await axios.post(
          `http://127.0.0.1:8000/api/${roomId}/grant-access`,
          {
            user_id: userId,
          },
          { headers },
        );

        // Traiter la réponse du backend
        console.log(response.data.message); // Afficher le message du backend
        // Réactualiser ou traiter les données côté front-end si nécessaire

        this.showUserPopup = false;
        this.fetchChatRooms();
      } catch (error) {
        console.error("Error adding user to room:", error);
        // Gérer les erreurs côté front-end
      }
    },
    toggleSelection(user) {
      user.selected = !user.selected;
    },
    selectCard(userId) {
      this.selectedUserId = userId;
      console.log(this.selectedUserId);
    },
    isUserAdded(userId, roomId) {
      const usersWithAccess = this.usersWithAccess[roomId];
      if (
        usersWithAccess &&
        usersWithAccess.find((user) => user.id === userId)
      ) {
        return true; // L'utilisateur est déjà ajouté
      }
      return false; // L'utilisateur n'est pas encore ajouté
    },
    showAddUserForm(roomId) {
      this.selectedRoomId = roomId;

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      axios
        .get(`http://127.0.0.1:8000/api/${roomId}/users-without-access`, {
          headers,
        })
        .then((response) => {
          console.log("liste", response.data.data);
          this.userList = response.data.data; // Assurez-vous que la réponse correspond à la structure attendue
          this.showUserPopup = true; // Afficher la pop-up
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des utilisateurs :",
            error,
          );
        });
    },
    closeUserPopup() {
      this.showUserPopup = false; // Masquer la pop-up
    },

    async revokeAccess(roomId, userId) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/${roomId}/revoke-access`,
          { headers, data: { user_id: userId } },
        );
        alert(response.data.message); // Afficher un message de succès
        // Recharger les données après la révocation d'accès
        this.fetchChatRooms();
      } catch (error) {
        console.error("Erreur lors de la révocation de l'accès:", error);
        alert(
          "Access revocation error. Please consult the console for more details.",
        );
        // Gérer les erreurs selon votre cas d'utilisation
      }
    },

    async fetchChatRooms() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/chat-rooms",
          { headers },
        );
        this.chatRooms = response.data.data;
        this.chatRooms.forEach((room) => {
          this.getUsersWithAccess(room.id);
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des salles de discussion:",
          error,
        );
      }
    },
    async getUsersWithAccess(roomId) {
      this.loading = true;

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users-with-access/${roomId}`,
          { headers },
        );
        const users = response.data.data;
        // Assigner les utilisateurs avec accès à la salle de discussion correspondante
        (this.usersWithAccess = { ...this.usersWithAccess, [roomId]: users }),
          (this.loading = false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs avec accès:",
          error,
        );
      }
    },
    formatDate(isoDate) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      };
      return new Date(isoDate).toLocaleString("en-GB", options);
    },
    showAddForm() {
      this.showForm = true;
    },
    async addChatRoom() {
      const token = localStorage.getItem("token");

      const headers = { Authorization: `Bearer ${token}` };
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/chat-rooms",
          {
            name: this.newRoomName,
          },
          { headers },
        );
        this.newRoomName = ""; // Réinitialiser le champ du nom du room
        this.showForm = false; // Cacher le formulaire après l'ajout
        this.fetchChatRooms(); // Actualiser la liste des rooms
      } catch (error) {
        console.error("Error adding room:", error);
      }
    },

    async deleteRoom(roomId) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (window.confirm("Are you sure you want to delete this room?")) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/chat-rooms/${roomId}`,
            {
              method: "DELETE",
              headers: headers,
            },
          );

          if (response.ok) {
            // La suppression a réussi, vous pouvez mettre à jour votre liste de rooms ou effectuer d'autres actions nécessaires.
            this.fetchChatRooms(); // Supposons que cette fonction mette à jour la liste des rooms après la suppression.
          } else {
            // Gérer les cas où la suppression a échoué (par exemple, afficher un message d'erreur).
            console.error("Failed to delete room:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting room:", error);
        }
      }
    },

    async searchUsers() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/users?keyword=${this.searchText}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        this.users = usersData; // Mettre à jour la liste des utilisateurs filtrés dans les données de Vue.js
      } catch (error) {
        console.error("Error searching users:", error);
      }
    },
  },

  created() {
    this.fetchChatRooms(); // Appeler la méthode pour afficher les utilisateurs au chargement de la page
  },
};
</script>

<style>
.user-info button {
  align-self: flex-start; /* Alignez le bouton au début */
  margin-top: 10px; /* Espace au-dessus du bouton */
  padding: 5px 10px;
  background-color: #007bff; /* Couleur de fond */
  color: white; /* Couleur du texte */
  border: none;
  border-radius: 5px; /* Bords arrondis */
  cursor: pointer;
}

.user-info button:hover {
  background-color: #0056b3; /* Couleur de fond au survol */
}
.user-list-grid {
  display: flex;
  flex-wrap: wrap;
}

.user-item {
  width: calc(
    33.33% - 20px
  ); /* 33.33% pour 3 éléments par ligne avec un espace entre eux */
  margin-right: 20px; /* Espacement entre les éléments utilisateur */
  margin-bottom: 20px; /* Espacement entre les lignes d'utilisateurs */
  display: flex;
  align-items: center;
}

.user-info {
  margin-left: 10px; /* Espacement entre l'image de profil et les infos utilisateur */
}
.user-list-grid {
  display: flex;
  flex-wrap: wrap;
}

.user-item {
  width: calc(
    33.33% - 20px
  ); /* 33.33% pour 3 éléments par ligne avec un espace entre eux */
  margin-right: 20px; /* Espacement entre les éléments utilisateur */
  margin-bottom: 20px; /* Espacement entre les lignes d'utilisateurs */
  display: flex;
  align-items: center;
}

.user-info {
  margin-left: 10px; /* Espacement entre l'image de profil et les infos utilisateur */
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%; /* Ajustez la largeur selon vos besoins */
  max-width: 700px; /* Définissez une largeur maximale si nécessaire */
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  overflow-y: auto; /* Rendre le contenu scrollable verticalement */
  max-height: 400px; /* Définir une hauteur maximale pour la zone scrollable */
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.table-editable td.password-cell {
  max-width: 150px; /* Définir la largeur maximale de la cellule du mot de passe */
  word-wrap: break-word; /* Permettre le retour à la ligne pour les mots de passe longs */
}

/* Agrandir la table à droite */
.table-responsive-md {
  width: 100%;
}
.add-room-form {
  margin-top: 20px;
}
.notificationCard {
  width: 220px;
  height: 280px;
  background: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 35px;
  gap: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.123);
  border-radius: 20px;
}

.bellIcon {
  width: 50px;
  margin: 20px 0px;
}

.bellIcon path {
  fill: rgb(168, 131, 255);
}

.modal {
  display: flex;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.user-card {
  background-color: #f5f5f5; /* Couleur de fond */
  border: 1px solid #ddd; /* Bordure */
  border-radius: 10px; /* Coins arrondis */
  padding: 15px; /* Padding interne */
  margin-bottom: 10px; /* Espace entre les cartes */
  display: flex; /* Pour aligner les éléments en ligne */
  align-items: center; /* Aligner verticalement les éléments */
}
.user-card.selected-card {
  background-color: #d1e7dd; /* Couleur différente pour la carte sélectionnée */
  border-color: #0f5132; /* Bordure différente pour la carte sélectionnée */
}
.user-card button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.user-card button:hover {
  background-color: #0056b3;
}
.selected {
  border: 2px solid blue;
}
</style>
