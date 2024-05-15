<template>
  <div class="row">
    <div class="col-md-6" v-for="(utilisateur, index) in friends" :key="index">
      <iq-card body-class="profile-page p-0 card-body">
        <template v-slot:body>
          <div class="profile-header-image">
            <div class="cover-container">
              <img
                :src="backgroundImage"
                alt="arrière-plan du profil"
                class="rounded img-fluid w-100"
                loading="lazy"
              />
            </div>
            <div class="profile-info p-4">
              <div class="user-detail">
                <div
                  class="d-flex flex-wrap justify-content-between align-items-start"
                >
                  <div class="profile-detail d-flex">
                    <div class="profile-img pe-4">
                      <img
                        :src="
                          utilisateur.img_profile
                            ? utilisateur.img_profile
                            : defaultImageUrl
                        "
                        alt="image de profil"
                        class="avatar-130 img-fluid"
                      />
                    </div>
                    <div class="user-data-block mt-md-0 mt-2">
                      <h4 class="text-primary">
                        <a href="/profil-ami"> {{ utilisateur.nom }}</a>
                      </h4>
                      <h6>{{ utilisateur.prenom }}</h6>
                      <p>{{ utilisateur.tel }}</p>
                      <p><strong>Role : </strong> {{ utilisateur.role }}</p>
                      <p>
                        <strong>Department : </strong>
                        {{ utilisateur.departement }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
  name: "FriendList",
  mounted() {
    this.getAllUsers();
  },
  data() {
    return {
      defaultImageUrl: require("../../../assets/images/user/user3.png"),
      backgroundImage: require("../../../assets/images/page-img/profile-bg1.jpg"),
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
            error,
          );
        });
    },
  },
};
</script>
