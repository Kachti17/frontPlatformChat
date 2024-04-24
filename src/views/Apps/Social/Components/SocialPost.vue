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
                src="@/assets/images/user/user3.png"
                alt="userimg"
                class="avatar-60 rounded-circle img-fluid"
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
            </form>
          </div>
          <br />
          <br />

          <ul class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
            <li class="me-3 mb-md-0 mb-2">
              <label for="input-photo" class="btn btn-soft-primary">
                <img
                  src="../../../../assets/images/small/07.png"
                  alt="icon"
                  class="img-fluid me-2"
                />
                Picture
                <input
                  id="input-photo"
                  type="file"
                  ref="image_path"
                  style="display: none"
                  @change="handleImageChange"
                />
              </label>
            </li>

            <li class="me-3 mb-md-0 mb-2">
              <label for="input-video" class="btn btn-soft-primary">
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
                @click.prevent="showLinkInput = !showLinkInput"
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
          <button
            class="btn btn-primary d-block w-100 mt-3"
            type="button"
            @click="modifierPublication()"
          >
            Update
          </button>
        </model-body>
      </modal>
    </iq-card>
  </div>

  <div class="col-sm-12">
    <div class="d-flex justify-content-between mb-3">
      <button @click="showApproved = true">Publications Approuvées</button>
      <button @click="showApproved = false">Publications Non Approuvées</button>
      <button @click="showApproved = null">
        Publications En Attente de Modification
      </button>
    </div>

    <div>
      <div
        v-for="(post, index) in filteredPublications"
        :key="index"
        class="card card-block card-stretch card-height"
      >
        <div class="card-body">
          <div class="user-post-data">
            <div class="d-flex justify-content-between">
              <div class="me-3">
                <img
                  :src="
                    post.user.img_profile ? post.user.img_profile : defaultpic
                  "
                  alt="image de profil"
                  class="avatar-45 img-fluid"
                />
              </div>
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <div v-if="post && post.user" class="">
                    <h5 class="mb-0 d-inline-block">
                      {{ post.user.nom }} {{ post.user.prenom }}
                    </h5>
                    <p class="mb-0 text-primary">
                      {{ formatDateTime(post.contenu.created_at) }}
                    </p>
                  </div>

                  <div
                    v-if="!showApproved"
                    class="d-flex justify-content-between mt-3"
                  >
                    <button @click="accepterPublication(post.id)">
                      Accepter</button
                    >&nbsp;
                    <button @click="refuserPublication(post.id)">
                      Refuser
                    </button>
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
                            <modal
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
                                  </form>
                                </div>
                                <br />
                                <br />

                                <ul
                                  class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap"
                                >
                                  <li class="me-3 mb-md-0 mb-2">
                                    <label
                                      for="input-photo"
                                      class="btn btn-soft-primary"
                                    >
                                      <img
                                        src="../../../../assets/images/small/07.png"
                                        alt="icon"
                                        class="img-fluid me-2"
                                      />
                                      Picture
                                      <input
                                        id="input-photo"
                                        type="file"
                                        ref="image_path"
                                        style="display: none"
                                        @change="handleImageChange"
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
                            </modal>
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
              <img :src="post.contenu.image_path" alt="Image du post" />
            </template>
            <template v-if="post.contenu.video_path !== null">
              <div class="ratio ratio-16x9">
                <iframe :src="post.contenu.video_path" allowfullscreen></iframe>
              </div>
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
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        <img
                          ref="reactionImage"
                          src="@/assets/images/icon/01.png"
                          class="img-fluid"
                          alt=""
                          @click="handleReaction(post.id)"
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
            <div class="total-comment-block">
              <h3 class="mb-3">commentaires</h3>
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
                    <div class="comment-data-block ms-3">
                      <h6>
                        {{ commentaire.user.nom }}
                        {{ commentaire.user.prenom }}
                      </h6>

                      <p class="mb-0">
                        {{ commentaire.contenu_comm }}
                      </p>
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
                v-model="nouveauCommentaire"
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
import axios from "axios";
export default {
  data() {
    return {
      //defaultImageUrl: require("../../../assets/images/user/user3.png"),
      defaultpic: require("@/assets/images/user/user3.png"),
      userLoggedInID: "",
      user: null,
      commentToEditId: null,
      showUpdateButton: false,
      userData: null,
      commentaires: "",
      unapprovedPublications: [],
      approvedPublications: [],
      waitingForModificationPublications: [],
      showApproved: true,
      newCommentContent: "",
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
    };
  },
  computed: {
    filteredPublications() {
      if (this.showApproved === true) {
        return this.approvedPublications;
      } else if (this.showApproved === false) {
        return this.unapprovedPublications;
      } else {
        return this.waitingForModificationPublications;
      }
    },
  },

  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
    console.log(this.userData);

    this.loadUserDetails();
    this.loadUnapprovedPublications();
    this.loadApprovedPublications();
    this.loadWaitingForModificationPublications();
    this.approvedPublications.forEach((post) => {
      if (post.isApproved === 1) {
        this.loadCommentaires(post.id);
      }
    });
  },

  methods: {
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
          }
        );

        console.log(response.data);
        this.loadApprovedPublications();
        this.closeEditModal();
      } catch (error) {
        console.error(error);
      }
    },

    // async getUserReactionImage(pubId) {
    //   try {
    //     const response = await axios.get(
    //       `http://127.0.0.1:8000/api/publication/${pubId}/userReacted`
    //     );
    //     const usersWhoReacted = response.data;
    //     const userReacted = usersWhoReacted.some(
    //       (user) => user.id === this.user.id
    //     );

    //     // Retourner l'URL de l'image appropriée en fonction de la réaction de l'utilisateur
    //     return userReacted
    //       ? require("@/assets/images/icon/x.png") // Utilisation de require pour charger l'image correctement
    //       : require("@/assets/images/icon/y.png");
    //   } catch (error) {
    //     console.error(error);
    //     // Afficher l'erreur pour le débogage
    //   }
    // },

    async getUsersWhoReacted(pubId) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/publication/${pubId}/userReacted`
        );
        const usersWhoReacted = response.data;

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    loadApprovedPublications() {
      axios
        .get("http://127.0.0.1:8000/api/publicationApprouvée")
        .then(async (response) => {
          this.approvedPublications = response.data;
          console.log(response.data);

          // bch nrecuperi beha el user logged in
          await this.loadUserDetails();
          // if (this.user !== null) {
          //   const userLoggedInID = this.user.id;

          for (const post of this.approvedPublications) {
            if (post.isApproved === 1) {
              await this.loadCommentaires(post.id);
              // const usersWhoReacted = await this.getUsersWhoReacted(post.id);
              // console.log("Utilisateurs qui ont réagi :", usersWhoReacted);

              // juste ntesti bch nchouf est ce que ya9ra el user logged in fel liste wela le
              // if (usersWhoReacted.includes(userLoggedInID)) {
              //   console.log("Je suis présent dans la liste des réactions.");
              // }
            }
          }
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des publications approuvées. Veuillez réessayer plus tard."
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
          }
        );
        console.log(response.data);
        this.loadApprovedPublications();

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
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchComment(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comment/${id}`
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
          }
        );
        console.log(response.data);
        this.editedComment = "";
        this.commentToEditId = null;
      } catch (error) {
        console.error(error);
      }
    },

    ajouterCommentaire(publicationId) {
      const contenuComm = this.nouveauCommentaire.trim();

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
            }
          )
          .then((response) => {
            console.log(response.data);
            this.nouveauCommentaire = "";
            this.loadApprovedPublications();
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
          this.loadApprovedPublications();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression du commentaire :",
            error
          );
        });
    },

    loadCommentaires(publicationId) {
      axios
        .get(`http://127.0.0.1:8000/api/commentaires/${publicationId}`)
        .then((response) => {
          console.log("fgg", response.data);
          this.commentaires = response.data;
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des commentaires. Veuillez réessayer plus tard."
          );
        });
    },

    modifierPublication(publicationId) {
      const token = localStorage.getItem("token");

      const headers = { Authorization: `Bearer ${token}` };

      axios
        .put(
          `http://127.0.0.1:8000/api/modifierPublication/${this.publication.id}`,
          this.contenu,
          { headers }
        )
        .catch((error) => {
          console.error(
            "Erreur lors de la modification de la publication:",
            error.response.data.error
          );
        });
      window.location.reload();
    },
    UpdatePost(item) {
      this.publication = item;
      this.contenu = item.contenu;
      this.showLinkInput = true;
    },
    accepterPublication(publicationId) {
      axios
        .post(`http://127.0.0.1:8000/api/publication/accepter/${publicationId}`)
        .then((response) => {
          alert("La publication a été acceptée avec succès");
          this.loadUnapprovedPublications();
          this.loadWaitingForModificationPublications();
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors de l'acceptation de la publication. Veuillez réessayer plus tard."
          );
        });
    },

    refuserPublication(publicationId) {
      axios
        .delete(
          `http://127.0.0.1:8000/api/publication/refuser/${publicationId}`
        )
        .then((response) => {
          alert("La publication a été refusée avec succès");
          // Rechargez les publications non approuvées après le refus
          this.loadUnapprovedPublications();
          this.loadWaitingForModificationPublications();
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du refus de la publication. Veuillez réessayer plus tard."
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
        })
        .catch((error) => {
          console.error(error);
        });
    },

    loadUnapprovedPublications() {
      axios
        .get("http://127.0.0.1:8000/api/publicationNonApprouvée")
        .then((response) => {
          this.unapprovedPublications = response.data;
          if (this.unapprovedPublications.length > 0) {
            this.publicationId = this.unapprovedPublications[0].id;
          }
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des publications non approuvées. Veuillez réessayer plus tard."
          );
        });
    },

    loadWaitingForModificationPublications() {
      axios
        .get("http://127.0.0.1:8000/api/publicationModification")
        .then((response) => {
          // Filtrer les publications en attente d'acceptation de modification
          this.waitingForModificationPublications = response.data.filter(
            (publication) => publication.isApproved === -1
          );
          if (this.waitingForModificationPublications.length > 0) {
            this.publicationId = this.waitingForModificationPublications[0].id;
          }
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des publications en attente d'acceptation de modification. Veuillez réessayer plus tard."
          );
        });
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
          { headers }
        )
        .then((response) => {
          console.log(response.data.message);
          this.loadApprovedPublications();
          window.location.reload();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de la publication:",
            error.response.data.error
          );
        });
    },
  },
};
</script>

<style>
.approved {
  border: 2px solid green; /* Exemple de style pour les posts approuvés */
}

.not-approved {
  border: 2px solid red; /* Exemple de style pour les posts non approuvés */
}
.modal-margin {
  margin: 100px !important; /* Exemple de style pour les posts non approuvés */
}
</style>
