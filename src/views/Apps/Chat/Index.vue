<template>
  <div class="chat-page p-0">
    <div class="sidebar sidebar-chat sidebar-base border-end shadow-none">
      <div class="chat-search pt-3 ps-3">
        <ToggleButton toggleShow="#user-detail-popup">
          <template v-slot:media>
            <img :src="user.image" alt="chat-user" class="avatar-60" />
          </template>
          <template v-slot:body>
            <h5 class="mb-0">{{ userData.nom }} {{ userData.prenom }}</h5>
            <p class="m-0">{{ user.role }}</p>
          </template>
        </ToggleButton>
        <ToggleContent id="user-detail-popup" body-class="text-left">
          <template v-slot:media>
            <img :src="user.image" alt="avatar" />
          </template>
          <template v-slot:title>
            <div class="user-name mt-4">
              <h4>{{ user.name }}</h4>
            </div>
            <div class="user-desc">
              <p>{{ user.role }}</p>
            </div>
          </template>
        </ToggleContent>
        <div class="chat-searchbar mt-4">
          <div class="form-group chat-search-data m-0">
            <input
              type="text"
              class="form-control round"
              id="chat-search"
              placeholder="Search"
              v-model="search"
            />
            <i class="material-symbols-outlined"> search </i>
          </div>
        </div>
      </div>
      <div class="chat-sidebar-channel scroller mt-4 ps-3">
        <h5>Public Channel</h5>
        <tab-nav
          :pills="true"
          :vertical="true"
          class="iq-chat-ui"
          id="chat-list-data"
        >
          <template v-for="(item, index) in privateList" :key="index">
            <tab-nav-items
              :id="`v-pills-${item.id}`"
              href="#v-pills-home"
              :ariaControls="`v-pills-${item.id}`"
              role="tab"
              @click="active = false"
            >
              <template v-slot:title>
                <ChatItem :item="item" />
              </template>
            </tab-nav-items>
          </template>
        </tab-nav>
      </div>
    </div>
    <!-- <div class="col-lg-9 chat-data p-0 chat-data-right" :style="`background: url(${require('../../../assets/images/page-img/100.jpg')}) no-repeat scroll center center;background-size: cover;`">
                </div> -->
    <main class="main-content">
      <tab-content id="v-pills-tabContent">
        <tab-content-item
          :active="active"
          id="v-pills-default"
          aria-labelled-by="v-pills-default"
        >
          <ToggleButton
            :mini-toggle="true"
            :close-button="false"
            toggleShow="#chat-user-detail-popup"
            mediaClass="chat-user-profile"
          >
            <template v-slot:media> </template>
            <template v-slot:body> </template>
          </ToggleButton>
          <div class="chat-start">
            <span
              class="text-primary avatar-100 rounded-pill bg-white d-flex align-items-center justify-content-center"
            >
              <i class="material-symbols-outlined md-42" style="font-size: 3rem"
                >sms</i
              >
            </span>
            <button id="chat-start" class="btn bg-white mt-3">
              Start Conversation!
            </button>
          </div>
        </tab-content-item>
        <tab-content-item id="v-pills-home" aria-labelled-by="v-pills-default">
          <div class="chat-head">
            <header
              class="d-flex justify-content-between align-items-center bg-white pt-3 pe-3 pb-3"
            >
              <ToggleButton
                :mini-toggle="true"
                :close-button="false"
                toggleShow="#chat-user-detail-popup"
                mediaClass="chat-user-profile"
              >
                <template v-slot:media>
                  <img
                    :src="checkUser(5, 'image')"
                    alt="avatar"
                    class="avatar-50"
                  />
                </template>
                <template v-slot:body>
                  <h5 class="mb-0">{{ checkUser(5, "name") }}</h5>
                </template>
              </ToggleButton>
            </header>
          </div>
          <div class="chat-content scroller">
            <template v-for="(item, index) in chat" :key="index">
              <div class="chat d-flex other-user" v-if="!item.me">
                <div class="chat-user">
                  <a class="avatar m-0">
                    <img
                      :src="checkUser(item.userId, 'image')"
                      alt="avatar"
                      class="avatar-35"
                    />
                  </a>
                  <span class="chat-time mt-1">{{ item.time }}</span>
                </div>
                <div class="chat-detail">
                  <div class="chat-message">
                    <p>{{ item.text }}</p>
                  </div>
                </div>
              </div>
              <div class="chat chat-left" :key="index" v-if="item.me">
                <div class="chat-user">
                  <a class="avatar m-0">
                    <img
                      :src="checkUser(item.userId, 'image')"
                      alt="avatar"
                      class="avatar-35"
                    />
                  </a>
                  <span class="chat-time mt-1">{{ item.time }}</span>
                </div>
                <div class="chat-detail">
                  <div class="chat-message">
                    <p>{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="chat-footer p-3 bg-white">
            <form
              class="d-flex align-items-center"
              action="javascript:void(0);"
            >
              <input
                type="text"
                class="form-control me-3"
                placeholder="Type your message"
              />
              <button
                type="submit"
                class="btn btn-primary d-flex align-items-center p-2"
              >
                <i class="far fa-paper-plane"></i
                ><span class="d-none d-lg-block ms-1">Send</span>
              </button>
            </form>
          </div>
        </tab-content-item>
      </tab-content>
    </main>
  </div>
</template>

<script>
import { socialvue } from "../../../config/pluginInit";
import ChatItem from "../../../components/custom/Chat/ChatItem";
import ToggleButton from "../../../components/custom/Chat/ToggleButton";
import ToggleContent from "../../../components/custom/Chat/ToggleContent";
import { Users, MessagesUser1 } from "../../../FackApi/api/chat";
import User from "../../../Model/User";

export default {
  name: "Index",
  components: {
    ChatItem,
    ToggleButton,
    ToggleContent,
  },
  mounted() {
    socialvue.index();
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
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
      search: "",
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      user: new User({
        id: 1,
        name: "Bni Jordan",
        role: "Web Designer",
        image: require("../../../assets/images/user/1.jpg"),
        isActive: true,
      }),
      usersList: Users,
      chat: MessagesUser1,
      active: true,
    };
  },
  methods: {
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
  },
};
</script>

<style>
.remove-toggle::after {
  content: unset;
}
</style>
