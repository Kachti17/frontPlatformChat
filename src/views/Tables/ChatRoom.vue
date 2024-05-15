<template>
  <div class="row row-cols-1 w-100 mx-auto">
    <div class="col-sm-28" style="height: 480%">
      <div
        class="card position-relative inner-page-bg bg-primary"
        style="height: 150px"
      >
        <div class="inner-page-title">
          <h3 class="text-white">Table of Chat Rooms</h3>
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
            <h1>Liste des chat rooms</h1>
            <!-- Bouton pour afficher le formulaire d'ajout de room -->
            <span class="table-add float-end mb-3 mr-2">
              <button
                @click="showAddForm"
                class="btn btn-sm btn-success d-flex align-items-center"
              >
                <i class="material-symbols-outlined me-1 md-18">add</i>Add Chat
                room
              </button>
            </span>

            <!-- Formulaire d'ajout de room -->
            <div v-if="showForm" class="add-room-form">
              <h2>Add Chat Room</h2>
              <form @submit.prevent="addChatRoom">
                <div class="mb-3">
                  <label for="roomName" class="form-label"
                    >Enter chat room name</label
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

            <!-- Barre de recherche -->
            <form action="#" class="searchbox d-flex align-items-center">
              <a
                class="search-link d-none d-lg-block"
                href="javascript:void(0);"
              >
                <span class="material-symbols-outlined">search</span>
              </a>
              <input
                type="text"
                v-model="searchText"
                @input="searchUsers"
                class="text search-input form-control bg-soft-primary w-75"
                placeholder="Search here...(name / Last name)"
              />
              <a
                class="d-lg-none d-flex align-items-center"
                href="javascript:void(0);"
              >
                <span class="material-symbols-outlined">search</span>
              </a>
            </form>
            <!-- Fin de la barre de recherche -->
            <div class="table-responsive-md">
              <table class="table table-bordered table-striped text-left">
                <thead>
                  <tr>
                    <th>Room name</th>
                    <th>Users Accessing This Room</th>

                    <th>Created At</th>
                    <!-- <th>Updated At</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="room in chatRooms" :key="room.id">
                    <td>{{ room.name }}</td>
                    <td></td>

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
export default {
  data() {
    return {
      deleteIndex: null, // Index de l'utilisateur à supprimer dans la liste
      searchText: "", // Texte de recherche saisi par l'utilisateur
      chatRooms: [],
      showForm: false,
      newRoomName: "",
    };
  },
  mounted() {
    this.fetchChatRooms();
    console.log("aaa", this.fetchChatRooms);
  },
  methods: {
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
    async fetchChatRooms() {
      const token = localStorage.getItem("token");

      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/chat-rooms",
          { headers },
        ); // Remplacez '/api/chat-rooms' par votre route API correcte
        this.chatRooms = response.data.data;
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
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
        const response = await fetch(
          `http://127.0.0.1:8000/api//chat-rooms/{id}`,
          { headers },
          {
            method: "DELETE",
          },
        );
        this.fetchChatRooms();
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
</style>
