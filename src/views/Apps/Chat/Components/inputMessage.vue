<template>
  

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="corps"
          @keyup.enter="sendMessage()"
          placeholder="Say something.."
        />
        <div class="input-group-append">
          <button @click="sendMessage()" type="button" class="btn btn-primary">
        Send
      </button>
        </div>
      </div>


</template>

<script>
import axios from "axios";
// import func from "vue-editor-bridge";
// import Input from "../../jetstream/Input.vue";
export default {
  props: ["room"],
  // components: { Input },
  data: function () {
    return {
      corps: "",
    };
  },
  mounted() {
    console.log(this.room);
  },
  methods: {
    sendMessage() {
      const token = localStorage.getItem("token");

      if (this.corps == "") {
        console.log("fergh el msg");
        return;
      }
      console.log("room:", this.room);
      axios
        .post(
          "http://127.0.0.1:8000/api/chat/room/" + this.room.id + "/message",
          {
            corps: this.corps,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          // this.getMessages();
          console.log("heheh", response);

          this.corps = "";
          this.$emit("message sent");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getMessages() {
    //   const token = localStorage.getItem("token");

    //   axios
    //     .get(
    //       "http://127.0.0.1:8000/api/chat/room/" +
    //         this.currentRoom.id +
    //         "/messages",
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       },
    //     )

    //     .then((response) => {
    //       this.messages = response.data;
    //       console.log("current room:", this.currentRoom.id, response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
