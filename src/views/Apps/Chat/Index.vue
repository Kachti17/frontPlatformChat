<template>
  <h2 class="font-semibold text-xl text-gray-800 leading-tight">
    <chat-room-selection
      v-if="currentRoom.id"
      :rooms="chatRooms"
      :currentRoom="currentRoom"
      v-on:roomchanged="setRoom($event)"
    />
  </h2>

  <div class="main-chat">
    <div class="py-12">
      <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
        <message-container :messages="messages" />
        {{ currentRoom }}
        <input-message :room="currentRoom" v-on:messagesent="getMessages()" />
      </div>
    </div>
  </div>
</template>

<script>
import chatRoomSelection from "./Components/chatRoomSelection.vue";
import messageContainer from "./Components/messageContainer.vue";
import inputMessage from "./Components/inputMessage.vue";
import axios from "axios";
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
    // this.getRooms();
    // this.getMessages();
  },
  methods: {
    connect() {
      if (this.currentRoom.id) {
        let vm = this;
        this.getMessages();
        // window.Echo.private("chat." + this.currentRoom.id).listen(
        //   ".message.new",
        //   (e) => {
        //     vm.getMessages();
        //   },
        // );
      }
    },
    disconnect(room) {
      window.Echo.leave("chat." + room.id);
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

      axios
        .get(
          "http://127.0.0.1:8000/api/chat/room/" +
            this.currentRoom.id +
            "/messages",
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
    },
  },
  created() {
    this.getRooms();
  },
};
</script>

<style scoped>
/* Styles spécifiques à la page principale */
</style>
