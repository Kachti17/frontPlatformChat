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
                "  alt="image de profil"
  class="avatar-135 img-fluid"
  style="
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
  "
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
                style="max-width: 290px; max-height: 290px; margin-top: 10px"
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
        class="btn btn-primary"
        @click="showApproved = true"
        v-if="userData?.role !== 'user'"
      >
        Approved Publications
      </button>
      <button
        class="btn btn-primary"
        @click="showApproved = false"
        v-if="userData?.role !== 'user'"
      >
        Unapproved publications
      </button>
      <button
        class="btn btn-primary"
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
                  class="avatar-135 img-fluid"
                  style="
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    object-fit: cover;
                  "
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
                    <button
                      class="btn btn-success"
                      @click="accepterPublication(post.id)"
                    >
                      Approve</button
                    >&nbsp;
                    <button
                      class="btn btn-danger"
                      @click="refuserPublication(post.id)"
                    >
                      Refuse
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
                  class="img-fluid rounded w-35"
                  style="width: 50%"
                />
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
            <div class="total-comment-block commentaire-scrollable">
              <div
                v-for="(commentaire, cIndex) in post.commentaires"
                :key="commentaire.id"
                ::key="cIndex"
              >
                <template v-if="commentaire.pub_id === post.id">
                  <div class="d-flex flex-wrap mt-3">
                    <div class="user-img">
                      <img
                      :src="
                          commentaire.user.img_profile
                            ? commentaire.user.img_profile
                            : defaultpic
                        "  alt="image de profil"
  class="avatar-135 img-fluid"
  style="
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
  "
/>

                    </div>
                    <div class="d-flex align-items-center justify-content-end">
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
                              class="avatar-20 img-fluid"
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
                              class="avatar-20 img-fluid"
                              src="@/assets/images/icon/pb.png"
                              alt="Supprimer"
                              @click="deleteComment(commentaire.id)"
                            />
                          </span>
                        </div>
                      </div>
                      <!-- <div class="d-flex flex-wrap mt-3 t2">
                        <button
                          class="edit-button"
                          v-if="commentaire.user_id === userData.id"
                          @click="openEditModal(commentaire)"
                        >
                          <svg class="edit-svgIcon" viewBox="0 0 512 512">
                            <path
                              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          class="delete-button"
                          v-if="
                            commentaire.user_id === userData.id ||
                            userData.role === 'admin'
                          "
                          @click="deleteComment(commentaire.id)"
                        >
                          <svg class="delete-svgIcon" viewBox="0 0 448 512">
                            <path
                              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                            ></path>
                          </svg>
                        </button>
                      </div> -->
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
                              Confirm
                            </button>
                            <button
                              class="btn btn-secondary"
                              @click="closeEditModal"
                            >
                              Cancel
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
    loadMoreComments(postId) {
      const post = this.filteredPublications.find((p) => p.id === postId);
      console.log("wseltch", post);

      console.log("wselt");
      post.commentLimit += 2;
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
        console.log("nourrr ", fileType);
        const base64String =
          `data:application/${fileType};base64,` + reader.result.split(",")[1]; // Prepend data URL
        this.fileToUpload = base64String;
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
      console.log("aaa", this.contenu.image_path);
      // if (this.contenu.image_path && this.fileToUpload) {
      //   this.contenu.image_path = this.fileToUpload;
      // }
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
      this.fileToUpload = null;
    },

    accepterPublication(publicationId) {
      axios
        .post(`http://127.0.0.1:8000/api/publication/accepter/${publicationId}`)
        .then((response) => {
          alert("The publication has been successfully accepted");
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
          alert("The publication was successfully rejected");
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
.t1 {
  margin-left: 0px;
}
.t2 {
  margin-left: 200px;
  margin-top: 50px;
}
.commentaire-scrollable {
  max-height: 278px; /* Définissez la hauteur maximale selon vos besoins */
  overflow-y: auto; /* Active le défilement vertical si nécessaire */
}
.edit-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(148, 148, 148);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  text-decoration: none !important;
}

.edit-svgIcon {
  width: 17px;
  transition-duration: 0.3s;
}

.edit-svgIcon path {
  fill: rgb(255, 255, 255);
}

.edit-button:hover {
  width: 120px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
}

.edit-button:hover .edit-svgIcon {
  width: 20px;
  transition-duration: 0.3s;
  transform: translateY(60%);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}

.edit-button::before {
  display: none;
  content: "Edit";
  color: white;
  transition-duration: 0.3s;
  font-size: 2px;
}

.edit-button:hover::before {
  display: block;
  padding-right: 10px;
  font-size: 13px;
  opacity: 1;
  transform: translateY(0px);
  transition-duration: 0.3s;
}

.delete-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(148, 148, 148);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
}

.delete-svgIcon {
  width: 15px;
  transition-duration: 0.3s;
}

.delete-svgIcon path {
  fill: rgb(255, 255, 255);
}

.delete-button:hover {
  width: 90px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
}

.delete-button:hover .delete-svgIcon {
  width: 20px;
  transition-duration: 0.3s;
  transform: translateY(60%);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}

.delete-button::before {
  display: none;
  content: "Delete";
  color: white;
  transition-duration: 0.3s;
  font-size: 2px;
}

.delete-button:hover::before {
  display: block;
  padding-right: 10px;
  font-size: 13px;
  opacity: 1;
  transform: translateY(0px);
  transition-duration: 0.3s;
}

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
.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center; /* Pour centrer verticalement les boutons */
}
</style>
