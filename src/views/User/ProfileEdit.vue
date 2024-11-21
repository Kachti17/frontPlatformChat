<template>
  <div class="row">
    <div class="col-lg-12">
      <iq-card>
        <div class="iq-card-body p-0">
          <div class="iq-edit-list">
            <tab-nav
              :pills="true"
              id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items edit-profile"
            >
              <tab-nav-items
                class="col-sm-3 p-0"
                :active="true"
                id="pills-peronal-tab"
                href="#personal-information"
                ariaControls="pills-personal"
                role="tab"
                :ariaSelected="true"
                title="Personal Information"
              />
              <tab-nav-items
                class="col-sm-3 p-0"
                :active="false"
                id="pills-password-tab"
                href="#chang-pwd"
                ariaControls="pills-password"
                role="tab"
                :ariaSelected="false"
                title="Change Password"
              />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-lg-12">
      <div class="iq-edit-list-data">
        <div class="tab-content">
          <tab-content-item
            :active="true"
            id="personal-information"
            aria-labelled-by="pills-peronal-tab"
          >
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Personal Information</h4>
              </template>
              <template v-slot:body>
                <div
                  v-if="errorMessage"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ errorMessage }}
                </div>
                <div class="profile-img-edit">
                  <img
                    :src="
                      userData.img_profile
                        ? userData.img_profile
                        : defaultImageUrl2
                    "
                    alt="image de profil"
                    class="avatar-130 img-fluid"
                  />
                  <input
                    type="file"
                    id="image"
                    @change="handleFileInputChange"
                    class="form-control"
                  />
                </div>

                <form @submit.prevent="saveChanges()">
                  <div class="form-group row align-items-center">
                    <div class="col-md-12"></div>
                  </div>
                  <div class="row align-items-center">
                    <div class="form-group col-sm-6" v-if="user">
                      <label for="fname" class="form-label">First Name *</label>
                      <input
                        type="text"
                        class="form-control"
                        id="fname"
                        v-model="user.nom"
                        placeholder="Nom"
                      />
                    </div>
                    <div class="form-group col-sm-6" v-if="user">
                      <label for="lname" class="form-label">Last Name *</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lname"
                        v-model="user.prenom"
                        placeholder="user.prenom"
                      />
                    </div>
                    <div class="form-group col-sm-6" v-if="user">
                      <label for="phone" class="form-label"
                        >Phone number
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="lname"
                        v-model="user.tel"
                        placeholder="user.tel"
                      />
                    </div>
                  </div>
                  <button class="btn btn-primary me-2">Submit</button>
                  <button type="reset" class="btn bg-soft-danger">
                    Cancel
                  </button>
                </form>
              </template>
            </iq-card>
          </tab-content-item>
          <tab-content-item
            :active="false"
            id="chang-pwd"
            aria-labelled-by="pills-password-tab"
          >
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Change Password</h4>
              </template>
              <template v-slot:body>
                <form>
                  <div class="form-group">
                    <label for="cpass" class="form-label">Email:</label>
                    <input
                      type="password"
                      class="form-control"
                      id="cpass"
                      v-model="user.email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="cpass" class="form-label"
                      >Current Password *</label
                    >
                    <a href="/auth/recoverpassword" class="float-end"
                      >Forgot Password</a
                    >

                    <input
                      type="password"
                      class="form-control"
                      id="cpass"
                      v-model="user.mot_de_passe_actuel"
                    />
                  </div>
                  <div class="form-group">
                    <label for="npass" class="form-label">New Password *</label>
                    <input
                      type="password"
                      class="form-control"
                      id="npass"
                      v-model="user.nouveau_mot_de_passe"
                    />
                  </div>
                  <div class="form-group">
                    <label for="vpass" class="form-label"
                      >Verify Password *</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="vpass"
                      v-model="user.verification_mot_de_passe"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary me-2"
                    @click.prevent="changerMotDePasse"
                  >
                    Submit
                  </button>
                  <button type="reset" class="btn bg-soft-danger">
                    Cancel
                  </button>
                </form>
              </template>
            </iq-card>
          </tab-content-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileEdit",
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      errorMessage: "",

      user: {
        id: "",
        nom: "",
        prenom: "",
        tel: "",
        img_profile: "",
      },
      profile: {
        img_profile: "",
      },
      defaultImageUrl2: require("../../../../../../../../socialv/socialV-main/socialV-main/bs5/code-vue/src/assets/images/user/user3.png"),
    };
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
    console.log(this.userData);
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.user = { ...response.data }; // Copie des données pour éviter la liaison réactive directe
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des détails de l'utilisateur :",
          error,
        );
      });
  },
  methods: {
    validateName(name) {
      const regex = /^[a-zA-Z]+$/;
      return regex.test(name);
    },
    validateLastName(lastName) {
      const regex = /^[a-zA-Z]+$/;
      return regex.test(lastName);
    },

    async saveChanges() {
      if (!this.validateName(this.user.nom)) {
        this.errorMessage = "The name must contain letters only.";

        return;
      }

      if (!this.validateLastName(this.user.prenom)) {
        this.errorMessage = "Last name must contain letters only.";
        return;
      }
      try {
        console.log("Données envoyées à l'API :", this.user);

        const response = await axios.post(
          `http://127.0.0.1:8000/api/profile/${this.user.id}`,
          {
            nom: this.user.nom,
            prenom: this.user.prenom,
            tel: this.user.tel,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );

        console.log("Réponse de l'API :", response.data);

        this.user = { ...response.data }; // Mettre à jour les données avec la réponse du backend
        localStorage.setItem("userData", JSON.stringify(this.user));
        this.$emit('profileUpdated');
        alert("Profile successfully updated !");
      } catch (error) {
        if (error.response) {
          this.errorMessage = "An error occurred while updating the profile.";
        } else {
          this.errorMessage = "Network error. Please try again.";
        }
        console.error("Erreur lors de la mise à jour du profil :", error);
      }
    },

    async changerMotDePasse() {
      try {
        let formData = new FormData();
        formData.append("email", this.user.email);
        formData.append("mot_de_passe_actuel", this.user.mot_de_passe_actuel);
        formData.append("nouveau_mot_de_passe", this.user.nouveau_mot_de_passe);
        formData.append(
          "verification_mot_de_passe",
          this.user.verification_mot_de_passe,
        );

        const response = await axios.post(
          "http://127.0.0.1:8000/api/changer-mot-de-passe",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );

        console.log("Réponse de l'API :", response.data);
        alert("Password successfully changed.");
        this.user.email = "";
        this.user.mot_de_passe_actuel = "";
        this.user.nouveau_mot_de_passe = "";
        this.user.verification_mot_de_passe = "";
      } catch (error) {
        console.error("Erreur lors du changement de mot de passe :", error);
        alert("An error occurred while changing password.");
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
    },

    handleFileInputChange(event) {
      const file = event.target.files[0];
      const fileType = file.type.split("/")[1];
      if (!file) {
        console.error("No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String =
          `data:application/${fileType};base64,` + reader.result.split(",")[1]; // Prepend data URL
        this.fileToUpload = base64String;
        this.validateUpload();
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    },
    validateUpload() {
      const token = localStorage.getItem("token");
      this.userData.img_profile = this.fileToUpload;
      console.log("base64: ", this.fileToUpload);
      if (!this.fileToUpload) {
        console.error("Aucun fichier sélectionné.");
        return;
      }

      const formData = new FormData();
      // formData.append("img_profile", this.fileToUpload);
      this.profile.img_profile = this.fileToUpload;
      axios
        .put("http://127.0.0.1:8000/api/imgProfile", this.profile, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          //this.profile.img_profile = response.data.img_profile;
          this.userData = response.data.user;
          localStorage.setItem("userData", JSON.stringify(response.data.user));

          // console.log("Upload successful. Message:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors du téléchargement de l'image :", error);
        });
    },
  },
};
</script>

<style>
.profile-img-edit {
  position: relative;
  display: inline-block;
  height: 150px;
  width: 150px;
}
.profile-pic {
  max-width: 100%;
  display: block;
}
.p-image {
  position: absolute;
  top: auto;
  right: 8px;
  bottom: 10px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: #50b5ff;
  color: #fff;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.file-upload {
  display: none;
}
.upload-button {
  font-size: 1.5em;
}
</style>
