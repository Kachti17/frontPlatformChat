<template>


      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="corps"
          @keyup.enter="sendMessage()"
          placeholder="Say something.."
        />
        <button @click="sendMessage()">
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>Send</span>
      </button>
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
button {
  font-family: inherit;
  font-size: 20px;
  background: royalblue;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

button:hover span {
  transform: translateX(5em);
}

button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
</style>
