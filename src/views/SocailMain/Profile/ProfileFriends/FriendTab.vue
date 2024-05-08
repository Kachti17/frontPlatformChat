<template>
  <div class="friend-list-tab mt-2">
    <tab-nav
      :pills="true"
      id="tab"
      class="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
    >
      <tab-nav-items
        liClass=" "
        :active="true"
        id="pills-all-friends"
        href="#all-friends"
        ariaControls="pills-all-friends"
        role="tab"
        :ariaSelected="true"
        title="All Friends"
      />
    </tab-nav>
    <div class="tab-content">
      <tab-content-item
        :active="true"
        id="all-friends"
        aria-labelled-by="pills-all-friends"
      >
        <div class="iq-card-body p-0">
          <div class="row">
            <div
              class="col-md-6"
              v-for="(utilisateur, index) in friends"
              :key="index"
            >
              <div class="iq-friendlist-block">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <a href="#">
                      <img
                        :src="
                          utilisateur.img_profile
                            ? utilisateur.img_profile
                            : defaultImageUrl2
                        "
                        alt="image de profil"
                        class="avatar-100 img-fluid"
                      />
                    </a>
                    <div class="friend-info ms-3">
                      <h5>{{ utilisateur.nom }} {{ utilisateur.prenom }}</h5>
                      <p class="mb-0">{{ utilisateur.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content-item>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "FriendTab",
  mounted() {
    // socialvue.index()
    this.getAllUsers();
  },
  components: {},
  data() {
    return {
      defaultImageUrl2: require("../../../../assets/images/user/user3.png"),
      friends: [], // Utilisez friends pour stocker les utilisateurs récupérés de l'API
    };
  },
  methods: {
    getAllUsers() {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://127.0.0.1:8000/api/usersList", { headers })
        .then((response) => {
          this.friends = response.data;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des utilisateurs:",
            error
          );
        });
    },
  },
};
</script>
