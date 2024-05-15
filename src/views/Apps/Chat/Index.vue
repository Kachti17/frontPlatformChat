<template>
  <div class="sticky-top">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
      <chat-room-selection
        v-if="currentRoom.id"
        :rooms="chatRooms"
        :currentRoom="currentRoom"
        v-on:roomchanged="setRoom($event)"
      />
    </h2>
  </div>

  <div class="content main-chat">
    <div class="py-12">
      <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
        <message-container :messages="messages" />
        <div class="input-message-wrapper">
          <input-message :room="currentRoom" v-on:messagesent="getMessages()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatRoomSelection from "./Components/chatRoomSelection.vue";
import messageContainer from "./Components/messageContainer.vue";
import inputMessage from "./Components/inputMessage.vue";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "12538d00cd9f62a899b9",
  cluster: "us2",
  encrypted: true,
});
window.Echo.channel("chat").listen("message", (data) => {
  console.log("Événement reçu :", data);
});

// Echo.channel("chat." + this.currentRoom.id).listen("NewChatMessage", (e) => {
//   console.log("nour event ",e);
// });

// import { ref, onMounted } from "vue";
export default {
  components: {
    chatRoomSelection,
    messageContainer,
    inputMessage,
  },
  data() {
    return {
      messages: [],
      chatRooms: [],
      currentRoom: [],
    };
  },

  watch: {
    currentRoom(val, oldVal) {
      if (oldVal.id) {
        this.disconnect(oldVal);
      }
      this.connect();
    },
  },
  mounted() {
    // window.Echo("chat." + this.currentRoom.id).listen(".message.new", (e) => {
    //   console.log(e);
    // });
    // this.getRooms();
    // this.getMessages();
  },
  methods: {
    connect() {
      if (this.currentRoom.id) {
        console.log("Connecting to private channel:", this.currentRoom.id);
        let vm = this;
        this.getMessages();
        window.Echo.channel("chat").listen("message", (e) => {
          console.log("test");
          vm.getMessages();
        });
      } else {
        console.error("Echo or current room ID is undefined.");
      }
    },
    disconnect(room) {
      window.Echo.leave("chat");
    },
    getRooms() {
      const token = localStorage.getItem("token");

      axios
        .get("http://127.0.0.1:8000/api/chat/rooms", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.chatRooms = response.data;
          this.setRoom(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setRoom(room) {
      this.currentRoom = room;
      // this.getMessages();
    },
    getMessages() {
      const token = localStorage.getItem("token");

      setInterval(() => {
        axios
          .get(
            `http://127.0.0.1:8000/api/chat/room/${this.currentRoom.id}/messages`,
            {
              headers: {
                "Content-Type": "application/json", // Utilisation de "application/json" pour le Content-Type
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => {
            this.messages = response.data;
            console.log("current room:", this.currentRoom.id, response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000); // 5000 millisecondes, soit 5 secondes
    },
  },
  created() {
    this.getRooms();
  },
};
</script>

<style scoped>
.content {
  padding-top: 100px; /* Ajoutez un espace équivalent à la hauteur de votre élément fixé */
}
.sticky-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Assurez-vous que le z-index est suffisamment élevé pour être au-dessus du contenu */
  background-color: #fff; /* Ajoutez une couleur de fond si nécessaire */
}
.input-message-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999; /* Assurez-vous que le composant est au-dessus des autres éléments */
  background-color: white; /* Fond blanc pour le rendre distinct */
}
</style>
