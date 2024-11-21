<template>
  <section class="sign-in-page">
    <div id="container-inside">
      <div id="circle-small"></div>
      <div id="circle-medium"></div>
      <div id="circle-large"></div>
      <div id="circle-xlarge"></div>
      <div id="circle-xxlarge"></div>
    </div>
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-md-6 text-center pt-5">
          <div class="sign-in-detail text-white">
            <br />
            <br />
            <br />

            <img
              src="@/assets/images/digLogo.png"
              class="img-fluid mb-4"
              alt="logo"
              width="200px"
              height="200px"
            />

            <!-- Slider et autres contenus -->
          </div>
        </div>
        <div class="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from pb-5">
            <h1 class="mb-0">Create Account</h1>
            <p>Enter the necessary details to create an account.</p>
            <form class="mt-4" @submit.prevent="onSubmit()">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label" for="validationTooltip01"
                    >Name *</label
                  >
                  <input
                    v-model="nom"
                    class="form-control"
                    id="validationTooltip01"
                    placeholder="Enter name"
                    required
                  />
                  <div class="invalid-feedback">Please enter your name.</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label" for="validationTooltip02"
                    >Last Name *</label
                  >
                  <input
                    v-model="prenom"
                    class="form-control"
                    id="validationTooltip02"
                    placeholder="Enter last name"
                    required
                  />
                  <div class="invalid-feedback">
                    Please enter your last name.
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputEmail2"
                  >Email *</label
                >
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="exampleInputEmail2"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputPassword1"
                  >Password *</label
                >
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password"
                  required
                />
                <small v-if="password.length < 6" class="text-danger">
                  The password must be at least 6 characters long.
                </small>
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputPassword1"
                  >Phone Number</label
                >
                <input
                  type="text"
                  v-model="tel"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter phone number"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleRole">Role *</label>
                <select
                  v-model="role"
                  class="form-select"
                  id="exampleRole"
                  required
                >
                  <option value="" disabled selected hidden>
                    Select a role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="back office">Back Office</option>
                  <option value="user">User</option>
                </select>
              </div>
              <!-- <div class="form-group" v-if="role === 'user'">
                <label class="form-label" for="exampleDepartement"
                  >Departement *</label
                >
                <select
                  v-model="departement"
                  class="form-select"
                  id="exampleDepartement"
                  required
                >
                  <option value="" disabled selected hidden>
                    Select a department
                  </option>
                  <option value="It department">It department</option>
                  <option value="Call center">Call center</option>
                </select>
              </div> -->
              <div class="d-inline-block w-100">
                <div class="form-check d-inline-block mt-2 pt-1">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheck1"
                    required
                  />
                  <label class="form-check-label" for="customCheck1"
                    >I accept <a href="#">the terms and conditions</a></label
                  >
                </div>
                <button type="submit" class="btn btn-primary float-end">
                  Create
                </button>
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div
                v-if="successMessage"
                class="alert alert-success"
                role="alert"
              >
                {{ successMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp1",
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      tel: "",
      role: "",
      department: "",
      errorMessage: "",
      successMessage: "",
    };
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
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    async onSubmit() {
      this.errorMessage = "";

      if (!this.validateName(this.nom)) {
        this.errorMessage = "The name must contain letters only.";
        return;
      }

      if (!this.validateLastName(this.prenom)) {
        this.errorMessage = "Last name must contain letters only.";
        return;
      }

      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Please enter a valid email address.";
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            password: this.password,
            tel: this.tel.trim() !== "" ? this.tel : null,
            role: this.role,
          },
        );

        if (response.status === 201) {
          this.successMessage = response.data.message;
          this.$router.push("/table/datatable");
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 423) {
            // Gestion des erreurs de validation
            const errors = error.response.data.errors;
            if (errors.email) {
              this.errorMessage = errors.email[0];
              alert(errors.email[0]);
            } else if (errors.tel) {
              this.errorMessage = errors.tel[0];
              alert(errors.tel[0]);
            } else {
              this.errorMessage = "Validation error. Please check your input.";
              alert("Validation error. Please check your input.");
            }
          } else if (status === 400) {
            // Gestion des erreurs spécifiques à l'administrateur
            this.errorMessage = error.response.data.error;
            alert(error.response.data.error);
          } else {
            // Autres erreurs
            this.errorMessage = "Please choose another one.";
            alert("Please choose another one.");
          }
          console.log("API Response:", error.response);
        } else {
          this.errorMessage = "Network error. Please try again.";
          alert("Network error. Please try again.");
          console.log("Error:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.enlarged-image {
  width: 200px;
  height: auto;
  margin-right: 150px;
  margin-top: 80px;
}
</style>
