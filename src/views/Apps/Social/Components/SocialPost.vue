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

  <div class="col-lg-12">
    <div class="d-flex justify-content-between mb-3">
      <button
        class="btn btn-dark"
        @click="showApproved = true"
        v-if="userData?.role !== 'user'"
      >
        Approved Publications
      </button>
      <button
        class="btn btn-dark"
        @click="showApproved = false"
        v-if="userData?.role !== 'user'"
      >
        Unapproved publications
      </button>
      <button
        class="btn btn-dark"
        @click="showApproved = null"
        v-if="userData?.role !== 'user'"
      >
        Publications Awaiting Update
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
                      {{ formatDateTime(post.contenu.updated_at) }}
                    </p>
                  </div>

                  <div
                    v-if="!showApproved && userData?.role !== 'user'"
                    class="d-flex justify-content-between mt-3"
                  >
                    <button @click="accepterPublication(post.id)">
                      Accepter</button
                    >&nbsp;
                    <button @click="refuserPublication(post.id)">
                      Refuser
                    </button>
                  </div>

                  <div
                    class="card-post-toolbar"
                    v-if="
                      post.user_id === userData.id || userData.role === 'admin'
                    "
                  >
                    <div class="dropdown">
                      <span
                        v-if="showApproved === true && post.isApproved === 1"
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
                          v-if="
                            post.user.id == userData.id ||
                            userData.id == post.user_id
                          "
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
                                      :src="
                                        userData.img_profile
                                          ? userData.img_profile
                                          : defaultImageUrl2
                                      "
                                      alt="image de profil"
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
                                      style="max-width: 100%; margin-top: 10px"
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
                                <button
                                  class="btn btn-primary d-block w-100 mt-3"
                                  type="button"
                                  @click="modifierPublication(post.id)"
                                >
                                  Update
                                </button>
                              </model-body>
                            </modal> -->
                          </iq-card>
                        </div>
                        <a
                          v-if="
                            post.user_id === userData.id ||
                            userData.role === 'admin'
                          "
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
              <div class="user-post">
                <img
                  :src="post.contenu.image_path"
                  alt="Image du post"
                  class="img-fluid rounded w-25"
                />
              </div>
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

                <div class="total-comment-block">
                  <div class="dropdown">
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
              <div
                v-for="(commentaire, cIndex) in post.commentaires"
                :key="commentaire.id"
                ::key="cIndex"
              >
                <template
                  v-if="
                    commentaire.pub_id === post.id &&
                    (cIndex < commentLimit || showAllComments)
                  "
                >
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
                        <span class="small-text">{{
                          formatDateTime(commentaire.created_at)
                        }}</span>
                      </div>
                      <div class="d-flex flex-wrap mt-3">
                        <button
                          v-if="commentaire.user_id === userData.id"
                          @click="openEditModal(commentaire)"
                          class="btn btn-primary me-2"
                        >
                          Update
                        </button>
                        <button
                          v-if="
                            commentaire.user_id === userData.id ||
                            userData.role === 'admin'
                          "
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
              <div>
                <br />
                <br />
                <button
                  class="btn btn-secondary mx-2"
                  @click="loadMoreComments"
                >
                  More Comments
                </button>
                <button class="btn btn-secondary" @click="loadlessComments">
                  Less Comments
                </button>
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
                Add comment
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
  props: ["post"],
  data() {
    return {
      showAllComments: false,
      commentLimit: 2,
      currentPage: 1, // Page actuelle
      indexAffichage: 2,
      displayedComments: [],
      //defaultImageUrl: require("../../../assets/images/user/user3.png"),
      defaultpic: require("@/assets/images/user/user3.png"),
      defaultImageUrl2: require("../../../../assets/images/icon/unlike.png"),
      defaultImageUrl3: require("../../../../assets/images/icon/02.png"),

      userReactionData: {}, // Initialize as an empty object
      userLoggedInID: "",
      user: null,
      commentToEditId: null,
      showUpdateButton: false,
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
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
      contenu2: {
        id: "",
        texte: "",
        image_path: "",
        video_path: "",
        lien: "",
      },
      aReagi: false,
      editedComment: "",
      commentToEdit: null,
      isEditModalOpen: false,
      commentId: null,
      nouveauxCommentaires: {},
      reactionsList: [],
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

    this.loadUnapprovedPublications();
    this.loadApprovedPublications();
    this.loadWaitingForModificationPublications();
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
          },
        );

        console.log(response.data);
        this.loadApprovedPublications();
        this.closeEditModal();
      } catch (error) {
        console.error(error);
      }
    },

    loadApprovedPublications() {
      axios
        .get("http://127.0.0.1:8000/api/publicationApprouvée")
        .then(async (response) => {
          this.approvedPublications = response.data;
          console.log(response.data);

          for (const publication of this.approvedPublications) {
            console.log("fefe", this.approvedPublications);

            if (publication.isApproved === 1) {
              await this.loadCommentaires(publication.id, 2);
              // console.log("gege", this.loadCommentaires);
              this.checkUserReaction(publication.id);
            }
          }
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des publications approuvées. Veuillez réessayer plus tard.",
          );
        });
    },

    async getImageUrl(post) {
      const userReacted = await this.checkUserReaction(post.id);
      console.log("Résultat de checkUserReaction :", userReacted);

      // Vérifier si l'utilisateur a réagi au post
      if (userReacted) {
        return require("@/assets/images/icon/02.png"); // Utilisateur a réagi, afficher image 02.png
      } else {
        return require("@/assets/images/icon/01.png"); // Utilisateur n'a pas réagi, afficher image 01.png
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

        // console.log(
        //   "Réaction de l'utilisateur pour la publication",
        //   pubId,
        //   ":",
        //   response.data
        // );
        this.userReactionData[pubId] = response.data;
        // console.log("ekhdem", pubId, ":", this.userReactionData);
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

        this.loadApprovedPublications();
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
            error,
          );
        });
    },
    loadMoreComments() {
      this.commentLimit += 2;
      this.loadApprovedPublications();
    },
    loadlessComments() {
      this.commentLimit -= 2;
      this.loadApprovedPublications();
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

    // loadCommentaires(publicationId, page = 1) {
    //   axios
    //     .get(
    //       `http://127.0.0.1:8000/api/commentaires/${publicationId}?page=${page}`
    //     )
    //     .then((response) => {
    //       // console.log("fgg", response.data);
    //       this.commentaires = response.data.commentaires.data;
    //       this.currentPage = response.data.commentaires.current_page;
    //       this.lastPage = response.data.commentaires.last_page;
    //       console.log(
    //         "hehehehe",
    //         response.data.commentaires.last_page,
    //         response.data.commentaires.current_page
    //       );
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert(
    //         "Erreur lors du chargement des commentaires. Veuillez réessayer plus tard."
    //       );
    //     });
    // },

    validateUpload() {
      const token = localStorage.getItem("token");
      this.contenu.image_path = this.fileToUpload;
      console.log("base64: ", this.fileToUpload);
      if (!this.fileToUpload) {
        console.error("Aucun fichier sélectionné.");
        return;
      }
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
      if (this.contenu.image_path && this.fileToUpload) {
        this.contenu.image_path = this.fileToUpload;
      } else if (!this.contenu.image_path) {
        this.effacerImage();
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
          this.loadApprovedPublications();
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

    accepterPublication(publicationId) {
      axios
        .post(`http://127.0.0.1:8000/api/publication/accepter/${publicationId}`)
        .then((response) => {
          alert("La publication a été acceptée avec succès");
          this.loadUnapprovedPublications();
          this.loadWaitingForModificationPublications();
          this.loadApprovedPublications();
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors de l'acceptation de la publication. Veuillez réessayer plus tard.",
          );
        });
    },

    refuserPublication(publicationId) {
      axios
        .delete(
          `http://127.0.0.1:8000/api/publication/refuser/${publicationId}`,
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
            "Erreur lors du refus de la publication. Veuillez réessayer plus tard.",
          );
        });
    },

    loadUserDetails() {
      const token = localStorage.getItem("token");

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
            "Erreur lors du chargement des publications non approuvées. Veuillez réessayer plus tard.",
          );
        });
    },

    loadWaitingForModificationPublications() {
      axios
        .get("http://127.0.0.1:8000/api/publicationModification")
        .then((response) => {
          // Filtrer les publications en attente d'acceptation de modification
          this.waitingForModificationPublications = response.data.filter(
            (publication) => publication.isApproved === -1,
          );
          if (this.waitingForModificationPublications.length > 0) {
            this.publicationId = this.waitingForModificationPublications[0].id;
          }
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Erreur lors du chargement des publications en attente d'acceptation de modification. Veuillez réessayer plus tard.",
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
          { headers },
        )
        .then((response) => {
          console.log(response.data.message);
          this.loadApprovedPublications();
          window.location.reload();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de la publication:",
            error.response.data.error,
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
.small-text {
  font-size: 0.85em; /* Exemple de taille de police plus petite */
}
</style>
