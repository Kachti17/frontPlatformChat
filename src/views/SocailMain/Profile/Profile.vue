<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card>
        <div class="iq-card-body profile-page p-0">
          <div class="profile-header">
            <div class="cover-container">
              <img
                src="../../../assets/images/page-img/profile-bg1.jpg"
                alt="profile-bg"
                class="rounded img-fluid"
              />
            </div>
            <div class="user-detail text-center mb-3">
              <div class="profile-img">
                <img
                  :src="
                    userData.img_profile
                      ? userData.img_profile
                      : defaultImageUrl
                  "
                  alt="profile-img"
                  class="avatar-130 img-fluid"
                />
              </div>
              <h1>{{ userData.nom }} {{ userData.prenom }}</h1>
            </div>
            <div
              class="profile-info p-4 d-flex align-items-center justify-content-between position-relative"
            >
              <div class="social-links">
                <ul
                  class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0"
                >
                  <li
                    v-for="(item, index) in social"
                    :key="index"
                    class="text-center pe-3"
                  >
                    <a href="javasctipt:void(0)"
                      ><img
                        :src="item"
                        class="img-fluid rounded"
                        alt="facebook"
                    /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </iq-card>
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav
              :pills="true"
              id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
            >
              <tab-nav-items
                class="col-sm-3 p-0"
                :active="true"
                id="pills-feed-tab"
                href="#profile-feed"
                ariaControls="pills-home"
                role="tab"
                :ariaSelected="true"
                title="Timeline"
              />
              <tab-nav-items
                class="col-sm-3 p-0"
                :active="false"
                id="pills-activity-tab"
                href="#profile-activity"
                ariaControls="pills-profile"
                role="tab"
                :ariaSelected="false"
                title="About"
              />
              <tab-nav-items
                class="col-sm-3 p-0"
                :active="false"
                id="pills-friend-tab"
                href="#profile-friends"
                ariaControls="pills-contact"
                role="tab"
                :ariaSelected="false"
                title="Friends"
              />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-sm-12">
      <div class="tab-content">
        <tab-content-item
          :active="true"
          id="profile-feed"
          aria-labelled-by="pills-feed-tab"
        >
          <div class="iq-card-body p-0">
            <div class="row">
              <div class="col-lg-12">
                <div id="post-modal-data" class="iq-card">
                  <AddSocialPostNew @addPost="addPost"></AddSocialPostNew>
                  <div v-for="post in filteredPublications" :key="post.id">
                    <social-post :post="post"></social-post>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-content-item>
        <tab-content-item
          :active="false"
          id="profile-activity"
          aria-labelled-by="pills-activity-tab"
        >
          <iq-card>
            <template v-slot:body>
              <About />
            </template>
          </iq-card>
        </tab-content-item>
        <tab-content-item
          :active="false"
          id="profile-friends"
          aria-labelled-by="pills-friend-tab"
        >
          <iq-card>
            <template v-slot:body>
              <h2>Friends</h2>
              <FriendTab />
            </template>
          </iq-card>
        </tab-content-item>
        <tab-content-item
          :active="false"
          id="profile-profile"
          aria-labelled-by="pills-profile-tab"
        >
        </tab-content-item>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { socialvue } from "../../../config/pluginInit";
import FriendTab from "./ProfileFriends/FriendTab";
import About from "./ProfileFriends/About";
import AddSocialPostNew from "../../Apps/Social/Components/AddSocialPostNew";
import Post from "../../../Model/Post";
import { Posts } from "../../../FackApi/api/SocialPost";
export default {
  name: "Profile",
  mounted() {
    socialvue.index();
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
    console.log(this.userData);
    console.log("NOMBRE", this.filteredPublications.length);
  },
  components: {
    FriendTab,
    AddSocialPostNew,
    About,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      post: new Post(),
      socialPosts: Posts,
      filteredPublications: [],
      user: {
        id: "",
        nom: "",
        prenom: "",
        tel: "",
        img_profile: null,
      },
      defaultImageUrl: require("../../../assets/images/user/user3.png"),

      social: [
        require("../../../assets/images/icon/08.png"),
        require("../../../assets/images/icon/09.png"),
        require("../../../assets/images/icon/10.png"),
        require("../../../assets/images/icon/11.png"),
        require("../../../assets/images/icon/12.png"),
        require("../../../assets/images/icon/13.png"),
      ],
    };
  },

  methods: {
    filterByUserId() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .get("http://127.0.0.1:8000/api/publications/filterByUserId", {
          headers,
        })
        .then((response) => {
          this.filteredPublications = response.data;
          console.log(this.filteredPublications);
          this.nombreDePostes = this.filteredPublications.length;
        })
        .catch((error) => {
          console.error(
            "Erreur lors du filtrage des publications par ID utilisateur :",
            error.response.data.error
          );
        });
    },
    addPost(post) {
      this.socialPosts.unshift(post);
    },

    loadCommentaires(publicationId) {
      axios
        .get(`http://127.0.0.1:8000/api/commentaires/${publicationId}`)
        .then((response) => {
          //console.log("fgg", response.data);
          this.commentaires = response.data;
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des commentaires. Veuillez réessayer plus tard."
          );
        });
    },
    
  },
};
</script>
