<template>
  <div class="grid grid-cols-2">
    <div class="font-bold text-lg">{{ selected.name }} chat</div>
  </div>
  <div>
    <!-- <div class="wrapper">
      <input type="checkbox" id="toogle" class="hidden-trigger" />
      <label for="toogle" class="circle">
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="48"
          height="48"
          xml:space="preserve"
          version="1.1"
          viewBox="0 0 48 48"
        >
          <image
            width="48"
            height="48"
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAbElEQVR4Ae3XwQnFQAiE4eVVsGAP1mkPFjwvQvYSWCQYCYGZv4Dv5MGB5ghcIiDQI+kCftCzNsAR8y5gYu2rwCBAgMBTgEC3rek2yQEtAZoDjso8AyaKexmIDJUZD40AAQIE0gwx449GgMC9/t0b7GTsa7J+AAAAAElFTkSuQmCC"
          ></image>
        </svg>
      </label>

      <div class="subs">
        <button class="sub-circle" @click="changeRoom(room)">
          <input
            v-model="selected"
            value="1"
            name="sub-circle"
            type="checkbox"
            id="sub6"
            class="hidden-sub-trigger"
          />

          <label for="sub6">l²</label>
        </button>
      </div>
    </div> -->

    <select
      v-model="selected"
      @change="$emit('roomchanged', selected)"
      class="float-right"
    >
      <option v-for="(room, index) in filteredRooms" :key="index" :value="room">
        {{ room.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["rooms", "currentRoom"],
  data: function () {
    return {
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      selected: "",
    };
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
  },
  computed: {
    filteredRooms() {
      console.log("een",this.userData.departement);

      if (this.userData.departement === "It department") {
        return this.rooms.filter(
          (room) => room.name === "IT department" || room.name === "General",
        );
      } else if (this.userData.departement === "Call center") {
        return this.rooms.filter(
          (room) => room.name === "Call center" || room.name === "General",
        );
      } else {
        return this.rooms;
      }
    },
  },
  created() {
    this.selected = this.currentRoom;
  },
  methods: {
    changeRoom(room) {
      this.selected = room;
      this.$emit("roomchanged", room);
    },
  },
};
</script>
