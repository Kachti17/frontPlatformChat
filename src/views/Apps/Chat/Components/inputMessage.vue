<template>
  <div class="relative h-10 m-1">
    <div style="border-top: 1px solid #e6e6e6" class="grid grid-cols-6">
      <input
        type="text"
        v-model="corps"
        @keyup.enter="sendMessage()"
        placeholder="Say something.."
        class="col-span-5 outline-none p-2"
      />
      <button
        @click="sendMessage()"
        class="place-self-end bg-gray-500 hover:bg-blue-700 p-1 mt-1 rounded text-white"
      >
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
          }
        )
        .then((response) => {
          console.log("khdem ama lezm itadaaa");
          console.log("heheh", this.response.status);

          if (response.status == 201) {
            this.coprs = "";
            this.$emit("message sent");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
