<template>
  <div>
    <iq-card
      id="post-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <modal
        id="newModal"
        dialogClass="modal-fullscreen-sm-down  modal-margin"
        tabindex="-1"
        title="New Modal Title"
        aria-labelledby="newModalLabel"
        aria-hidden="true"
      >
        <model-header>
          <h5 class="modal-title" id="modalsLabel">Update Post</h5>
          <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
            <span class="material-symbols-outlined">close</span>
          </a>
        </model-header>
        <model-body>
          <div class="d-flex align-items-center">
            <div class="user-img">
              <img
                :src="
                  userData.img_profile ? userData.img_profile : defaultImageUrl2
                "
                alt="image de profil"
                class="avatar-30 img-fluid"

              />
            </div>

            <form class="post-text ms-3 w-100" action="javascript:void();">
              <input
                type="text"
                class="form-control rounded"
                placeholder="Write something here ..."
                v-model="contenu.texte"
                required
                style="border: none"
              />

              <img
                v-if="contenu.image_path"
                :src="contenu.image_path"
                alt="Selected Image"
                style="max-width: 70%; max-height: 70px; margin-top: 10px"
              />
              <button
                v-if="contenu.image_path"
                type="button"
                class="btn btn-danger mt-2"
                @click="effacerImage"
              >
                Effacer l'image
              </button>
            </form>
          </div>
          <br />
          <br />

          <ul class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
            <li class="me-3 mb-md-0 mb-2">
              <label for="input-photo-social" class="btn btn-soft-primary">
                <img
                  src="../../../../assets/images/small/07.png"
                  alt="icon"
                  class="img-fluid me-2"
                />
                Pictureeeee
                <input
                  id="input-photo-social"
                  type="file"
                  ref="image_path"
                  style="display: none"
                  class="form-control"
                  @change="handleFileInputChange2"
                />
              </label>
            </li>



            <li class="me-3 mb-md-0 mb-2">
              <a
                href="#"
                class="btn btn-soft-primary"
                @click.prevent="showLinkInput = !showLinkInput"
                ><img
                  src="../../../../assets/images/icon/link.png"
                  alt="icon"
                  class="img-fluid me-2"
                />
                Link</a
              >
            </li>
            <div v-if="showLinkInput">
              <input
                type="url"
                placeholder="Enter the link here..."
                class="rounded form-control my-2"
                v-model="contenu.lien"
                style="border: none"
              />
            </div>
          </ul>
          <button
            class="btn btn-primary d-block w-100 mt-3"
            type="button"
            data-bs-dismiss="modal"
            @click="modifierPublication(publicationId)"
          >
            Update
          </button>
        </model-body>
      </modal>
    </iq-card>
  </div>

  <div class="col-sm-12">
    <div>
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="card card-block card-stretch card-height"
      >
        <div class="card-body">
          <div class="user-post-data">
            <div class="d-flex justify-content-between">
              <div class="me-3">
                <img
                  :src="
                    userData.img_profile ? userData.img_profile : defaultpic
                  "
                  alt="image de profil"
                  class="avatar-40 img-fluid"
                />
              </div>
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <div v-if="post" class="">
                    <h5 class="mb-0 d-inline-block">
                      {{ userData.nom }} {{ userData.prenom }}
                    </h5>
                    <p class="mb-0 text-primary">
                      {{ formatDateTime(post.contenu.updated_at) }}
                    </p>
                  </div>

                  <div class="card-post-toolbar">
                    <div class="dropdown">
                      <span
                        class="dropdown-toggle material-symbols-outlined"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        more_horiz
                      </span>
                      <div class="dropdown-menu m-0 p-0">
                        <a
                          class="dropdown-item p-3"
                          @click="UpdatePost(post)"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#newModal"
                        >
                          <div class="d-flex align-items-top">
                            <span class="material-symbols-outlined">
                              edit
                            </span>
                            <div class="data ms-2">
                              <h6>Edit Post</h6>
                              <p class="mb-0">
                                Update your post and saved items
                              </p>
                            </div>
                          </div>
                        </a>
                        <div>
                          <iq-card
                            id="post-modal-data"
                            body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
                          >
                            <!-- <modal
                              id="newModal"
                              dialogClass="modal-fullscreen-sm-down  modal-margin"
                              tabindex="-1"
                              title="New Modal Title"
                              aria-labelledby="newModalLabel"
                              aria-hidden="true"
                            >
                              <model-header>
                                <h5 class="modal-title" id="modalsLabel">
                                  Update Post
                                </h5>
                                <a
                                  href="javascript:void(0);"
                                  class="lh-1"
                                  data-bs-dismiss="modal"
                                >
                                  <span class="material-symbols-outlined"
                                    >close</span
                                  >
                                </a>
                              </model-header>
                              <model-body>
                                <div class="d-flex align-items-center">
                                  <div class="user-img">
                                    <img
                                      src="@/assets/images/user/1.jpg"
                                      alt="userimg"
                                      class="avatar-60 rounded-circle img-fluid"
                                    />
                                  </div>

                                  <form
                                    class="post-text ms-3 w-100"
                                    action="javascript:void();"
                                  >
                                    <input
                                      type="text"
                                      class="form-control rounded"
                                      placeholder="Write something here ..."
                                      v-model="contenu.texte"
                                      required
                                      style="border: none"
                                    />
                                    <img
                                      v-if="contenu.image_path"
                                      :src="contenu.image_path"
                                      alt="Selected Image"
                                      style="
                                        max-width: 70%;
                                        max-height: 70px;
                                        margin-top: 10px;
                                      "
                                    />
                                    <button
                                      v-if="contenu.image_path"
                                      type="button"
                                      class="btn btn-danger mt-2"
                                      @click="effacerImage"
                                    >
                                      Effacer l'image
                                    </button>
                                  </form>
                                </div>
                                <br />
                                <br />

                                <ul
                                  class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap"
                                >
                                  <li class="me-3 mb-md-0 mb-2">
                                    <label
                                      for="input-photo-social"
                                      class="btn btn-soft-primary"
                                    >
                                      <img
                                        src="../../../../assets/images/small/07.png"
                                        alt="icon"
                                        class="img-fluid me-2"
                                      />
                                      Pictureeeee
                                      <input
                                        id="input-photo-social"
                                        type="file"
                                        ref="image_path"
                                        style="display: none"
                                        class="form-control"
                                        @change="handleFileInputChange2"
                                      />
                                    </label>
                                  </li>

                                  <li class="me-3 mb-md-0 mb-2">
                                    <label
                                      for="input-video"
                                      class="btn btn-soft-primary"
                                    >
                                      <img
                                        src="../../../../assets/images/small/08.png"
                                        alt="icon"
                                        class="img-fluid me-2"
                                      />
                                      Video
                                      <input
                                        id="input-video"
                                        type="file"
                                        ref="video_path"
                                        style="display: none"
                                        @change="handleVideoChange"
                                      />
                                    </label>
                                  </li>

                                  <li class="me-3 mb-md-0 mb-2">
                                    <a
                                      href="#"
                                      class="btn btn-soft-primary"
                                      @click.prevent="
                                        showLinkInput = !showLinkInput
                                      "
                                      ><img
                                        src="../../../../assets/images/small/09.png"
                                        alt="icon"
                                        class="img-fluid me-2"
                                      />
                                      Link</a
                                    >
                                  </li>
                                  <div v-if="showLinkInput">
                                    <input
                                      type="url"
                                      placeholder="Enter the link here..."
                                      class="rounded form-control my-2"
                                      v-model="contenu.lien"
                                      style="border: none"
                                    />
                                  </div>
                                </ul>
                              </model-body>
                            </modal> -->
                          </iq-card>
                        </div>
                        <a
                          class="dropdown-item p-3"
                          @click="supprimerPublication(post.id)"
                        >
                          <div class="d-flex align-items-top">
                            <span class="material-symbols-outlined"
                              >delete</span
                            >
                            <div class="data ms-2">
                              <h6>Delete</h6>
                              <p class="mb-0">Remove this Post on Timeline</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="post.contenu">
            <template v-if="post.contenu.texte !== null">
              <p>{{ post.contenu.texte }}</p>
            </template>
            <template v-if="post.contenu.lien !== null">
              <a :href="post.contenu.lien" target="_blank"
                >{{ post.contenu.lien }}
              </a>
            </template>
            <template v-if="post.contenu.image_path !== null">
              <img
                  :src="post.contenu.image_path"
                  alt="Image du post"
                  class="img-fluid rounded w-35"
                  style="width: 70%"
                />
            </template>
          </div>
          <div
            v-if="showApproved === true && post.isApproved === 1"
            class="comment-area mt-3"
          >
            <div
              class="d-flex justify-content-between align-items-center flex-wrap"
            >
              <div
                class="like-block position-relative d-flex align-items-center"
              >
                <div class="d-flex align-items-center">
                  <div class="like-data">
                    <div class="dropdown" @click.stop="">
                      <span
                        class="dropdown-toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        <img
                          ref="reactionImage"
                          :src="
                            userReactionData[post.id] === true
                              ? defaultImageUrl3
                              : defaultImageUrl2
                          "
                          class="img-fluid"
                          alt=""
                          @click="
                            handleReactionOrUnreact(post.id),
                              checkUserReaction(post.id)
                          "
                        />
                      </span>
                    </div>
                  </div>
                  <div class="total-like-block ms-2 me-3">
                    <div class="dropdown">
                      <span
                        data-bs-toggle=""
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        {{ post.nbr_react }} Likes
                      </span>
                    </div>
                  </div>
                </div>

                <!-- <div class="d-flex align-items-center">
                  <div class="like-data">
                    <div class="dropdown">
                      <span
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        <img
                          src="@/assets/images/icon/01.png"
                          class="img-fluid"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                  <div class="total-like-block ms-2 me-3">
                    <div class="dropdown">
                      <span
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        {{ post.nbr_react }} Likes
                      </span>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Max Emum</a>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="total-comment-block">
                  <div class="dropdown">
                    <!-- <a class="iq-icons-list" href="#"
                      ><i class="las la-comment"></i
                    ></a> -->

                    <span
                      data-bs-toggle=""
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="button"
                    >
                      {{ post.nbr_comm }} Comment
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="total-comment-block commentaire-scrollable">
              <div
                v-for="commentaire in post.commentaires"
                :key="commentaire.id"
              >
                <template v-if="commentaire.pub_id === post.id">
                  <div class="d-flex flex-wrap mt-3">
                    <div class="user-img">
                      <img
                        :src="
                          commentaire.user.img_profile
                            ? commentaire.user.img_profile
                            : defaultpic
                        "
                        alt="image de profil"
                        class="avatar-30 img-fluid"
                      />
                    </div>
                    <!-- <div class="comment-data-block ms-3">
                      <h5>
                        <b
                          >{{ commentaire.user.nom }}
                          {{ commentaire.user.prenom }}</b
                        >
                      </h5>

                      <h5 class="font-normal">
                        {{ commentaire.contenu_comm }}
                      </h5>
                      <div
                        class="d-flex flex-wrap align-items-center comment-activity"
                      >
                        <span>{{
                          formatDateTime(commentaire.created_at)
                        }}</span>
                      </div>

                      <div
                        v-if="commentaire.user_id === userData.id"
                        class="d-flex flex-wrap mt-3"
                      >
                        <button
                          @click="openEditModal(commentaire)"
                          class="btn btn-primary me-2"
                        >
                          Update
                        </button>
                        <button
                          @click="deleteComment(commentaire.id)"
                          class="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div> -->

                    <div class="comment-data-block ms-3">
                      <h5>
                        <b
                          >{{ commentaire.user.nom }}
                          {{ commentaire.user.prenom }}</b
                        >
                      </h5>

                      <h5 class="font-normal">
                        {{ commentaire.contenu_comm }}
                      </h5>
                      <div
                        class="d-flex flex-wrap align-items-center comment-activity"
                      >
                        <span class="small-text"
                          >{{ formatDateTime(commentaire.created_at) }}
                          &nbsp; &nbsp;
                          <img
                            v-if="commentaire.user_id === userData.id"
                            class="avatar-15 img-fluid"
                            src="@/assets/images/icon/edit.png"
                            alt="Modifier"
                            @click="openEditModal(commentaire)"
                          />
                          &nbsp; &nbsp;
                          <img
                            v-if="
                              commentaire.user_id === userData.id ||
                              userData.role === 'admin'
                            "
                            class="avatar-15 img-fluid"
                            src="@/assets/images/icon/pb.png"
                            alt="Supprimer"
                            @click="deleteComment(commentaire.id)"
                          />
                        </span>
                      </div>
                    </div>

                    <div class="card-post-toolbar ml-auto">
                      <div
                        v-if="
                          isEditModalOpen && commentToEdit.id === commentaire.id
                        "
                        class="edit-modal"
                      >
                        <div class="modal-overlay"></div>
                        <div class="modal-content">
                          <span class="close" @click="closeEditModal"
                            >&times;</span
                          >
                          <textarea
                            class="form-control"
                            v-model="editedComment"
                            rows="4"
                          ></textarea>
                          <div class="modal-buttons">
                            <button
                              class="btn btn-primary"
                              @click="confirmEdit"
                            >
                              Confirmer
                            </button>
                            <button
                              class="btn btn-secondary"
                              @click="closeEditModal"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <form
              class="comment-text d-flex align-items-center mt-3"
              @submit.prevent="ajouterCommentaire(post.id)"
            >
              <input
                type="text"
                class="form-control rounded"
                placeholder="Enter Your Comment"
                v-model="nouveauxCommentaires[post.id]"
              />
              <button type="submit" class="btn btn-primary mr-2">
                Ajouter Commentaire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddSocialPost from "../../../Apps/Social/Components/AddSocialPost";
import axios from "axios";
export default {
  name: "AddSocialPostNew",
  //components: { AddSocialPost },
  data() {
    return {
      userReactionData: {},
      commentLimit: 2,
      defaultpic: require("@/assets/images/user/user3.png"),
      userLoggedInID: "",
      user: null,
      commentToEditId: null,
      showUpdateButton: false,
      commentaires: "",
      unapprovedPublications: [],
      approvedPublications: [],
      waitingForModificationPublications: [],
      showApproved: true,
      newCommentContent: "",
      nouveauxCommentaires: {},
      defaultImageUrl2: require("../../../../assets/images/icon/unlike.png"),
      defaultImageUrl3: require("../../../../assets/images/icon/02.png"),
      publicationId: null,
      selectedPostId: null,
      editPostDialog: false,
      modalVisible: false,
      showLinkInput: false,
      texte: "",
      contenu: {
        id: "",
        texte: "",
        image_path: "",
        video_path: "",
        lien: "",
      },
      nouveauCommentaire: "",

      editedComment: "",
      commentToEdit: null,
      isEditModalOpen: false,
      commentId: null,
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
      posts: [],
    };
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
    this.filterByUserId();
    // this.posts.forEach((post) => {
    //   this.loadCommentaires(post.id);
    // });
    this.loadUserDetails();
  },

  methods: {
    async confirmEdit() {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token depuis le local storage

        const response = await axios.put(
          `http://127.0.0.1:8000/api/modifierCommentaire/${this.commentToEdit.id}`,
          {
            contenu_comm: this.editedComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le token d'authentification dans les en-têtes
            },
          },
        );

        console.log(response.data);
        this.filterByUserId();
        this.closeEditModal();
      } catch (error) {
        console.error(error);
      }
    },
    async checkUserReaction(pubId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/publication/${pubId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        this.userReactionData[pubId] = response.data;
        return this.userReactionData;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async handleReactionOrUnreact(pubId) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://127.0.0.1:8000/api/publication/${pubId}/react-or-unreact`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        this.filterByUserId();
      } catch (error) {
        console.error(error);
      }
    },

    openEditModal(commentaire) {
      this.commentToEdit = commentaire;
      this.editedComment = commentaire.contenu_comm;
      this.isEditModalOpen = true;
    },

    closeEditModal() {
      this.isEditModalOpen = false;
      this.commentToEdit = null;
      this.editedComment = "";
    },
    loadCommentaires(postId, nombreCommentaires) {
      axios
        .get(`http://127.0.0.1:8000/api/commentaires/${postId}`, {
          params: {
            nombreCommentaires: nombreCommentaires,
          },
        })
        .then((response) => {
          this.commentaires = response.data.commentaires;
          console.log("Commentaires chargés :", this.commentaires); // Vérification des données chargées
          console.log("gegeg", postId);
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des commentaires. Veuillez réessayer plus tard.",
          );
        });
    },

    filterByUserId() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .get("http://127.0.0.1:8000/api/publications/filterByUserId", {
          headers,
        })
        .then((response) => {
          this.posts = response.data;
          this.loadUserDetails();
          for (const publication of this.posts) {
            console.log("fefe", this.publication);

            if (publication.isApproved === 1) {
              this.loadCommentaires(publication.id, 2);
              // console.log("gege", this.loadCommentaires);
              this.checkUserReaction(publication.id);
            }
          }

          console.log("psts", this.posts);
        })
        .catch((error) => {
          console.error(
            "Erreur lors du filtrage des publications par ID utilisateur :",
            error.response.data.error,
          );
        });
    },
    async handleReaction(pubId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://127.0.0.1:8000/api/publication/${pubId}/react`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        this.filterByUserId();

        if (this.$refs.reactionImage && this.$refs.reactionImage.classList) {
          this.$refs.reactionImage.classList.add("reacted");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async unreact(pubId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://127.0.0.1:8000/api/publication/${pubId}/unreact`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchComment(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comment/${id}`,
        );
        this.editedComment = response.data.contenu_comm;
        this.commentId = id;
        this.commentToEditId = id;

        this.$refs.commentToEdit.focus();
        this.showUpdateButton = true;
      } catch (error) {
        console.error(error);
      }
    },

    async editComment() {
      try {
        const token = localStorage.getItem("token");
        console.log("rrrr", this.commentToEditId);
        const response = await axios.put(
          `http://127.0.0.1:8000/api/modifierCommentaire/${this.commentToEditId}`,
          {
            contenu_comm: this.editedComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        this.editedComment = "";
        this.commentToEditId = null;
      } catch (error) {
        console.error(error);
      }
    },

    ajouterCommentaire(publicationId) {
      const contenuComm = this.nouveauxCommentaires[publicationId];

      if (contenuComm) {
        const token = localStorage.getItem("token");

        axios
          .post(
            `http://127.0.0.1:8000/api/commenter/${publicationId}`,
            {
              contenu_comm: contenuComm,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => {
            console.log(response.data);
            this.nouveauxCommentaires[publicationId] = "";
            this.filterByUserId();
          })
          .catch((error) => {
            console.error("Erreur lors de l'ajout du commentaire :", error);
          });
      }
    },

    deleteComment(commentId) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://127.0.0.1:8000/api/supprimerCommentaire/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.filterByUserId();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression du commentaire :",
            error,
          );
        });
    },

    handleFileInputChange2(event) {
      const file = event.target.files[0];
      const fileType = file.type.split("/")[1];
      if (!file) {
        console.error("No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("test oussema ");

        console.log("nourrr ", fileType);
        const base64String =
          `data:application/${fileType};base64,` + reader.result.split(",")[1]; // Prepend data URL
        // this.fileToUpload = base64String;
        this.contenu.image_path = base64String;
        console.log("oussema ", this.contenu.image_path);
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    },

    modifierPublication(publicationId) {
      const token = localStorage.getItem("token");

      const headers = { Authorization: `Bearer ${token}` };
      if (this.contenu.image_path !== this.fileToUpload) {
    this.contenu.image_path = this.fileToUpload; // Mettez à jour l'image
  }
      console.log("tswr:", this.contenu.image_path);
      axios
        .put(
          `http://127.0.0.1:8000/api/modifierPublication/${this.publication.id}`,
          this.contenu,
          { headers },
        )
        .then((response) => {
          console.log("Publication updated:", response.data);
          this.filterByUserId();
          this.loadWaitingForModificationPublications();
        })

        .catch((error) => {
          console.error(
            "Erreur lors de la modification de la publication:",
            error.response.data.error,
          );
        });

      // window.location.reload();
    },
    UpdatePost(item) {
      this.publication = item;
      this.contenu = item.contenu;
      this.showLinkInput = true;
    },
    effacerImage() {
      this.contenu.image_path = null; // ou null
    },
    formatDateTime(datetime) {
      const options = {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(datetime).toLocaleDateString("en-US", options);
    },

    supprimerPublication(publicationId) {
      // Récupérer le token JWT du local storage
      const token = localStorage.getItem("token");

      // Configurer les headers de la requête DELETE avec le token JWT
      const headers = { Authorization: `Bearer ${token}` };

      // Envoyer la requête DELETE avec les headers configurés
      axios
        .delete(
          `http://127.0.0.1:8000/api/supprimerPublication/${publicationId}`,
          { headers },
        )
        .then((response) => {
          console.log(response.data.message);
          this.filterByUserId();
          window.location.reload();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de la publication:",
            error.response.data.error,
          );
        });
    },

    loadUserDetails() {
      axios
        .get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data;
          console.log("gegeg", this.user);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.commentaire-scrollable {
  max-height: 278px; /* Définissez la hauteur maximale selon vos besoins */
  overflow-y: auto; /* Active le défilement vertical si nécessaire */
}
</style>
