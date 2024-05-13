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

            <Swiper :options="options">
              <SwiperSlide class="item text-start">
                <img
                  src="@/assets/images/digLogo.png"
                  class="img-fluid mb-4"
                  alt="logo"
                  width="200px"
                  height="200px"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div class="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from pb-5">
            <h1 class="mb-0">Connection</h1>
            <p>
              Enter your e-mail address and password to access the platform.
            </p>
            <p v-if="error" class="text-danger">{{ error }}</p>
            <form class="mt-4" @submit.prevent="onSubmit">
              <div class="form-group">
                <label class="form-label" for="exampleInputEmail1"
                  >E-mail address *</label
                >
                <input
                  type="email"
                  class="form-control mb-0"
                  id="exampleInputEmail1"
                  placeholder="Enter your e-mail address
"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputPassword1"
                  >Password *</label
                >
                <router-link
                  :to="{ name: 'auth1.recoverpassword1' }"
                  class="float-end"
                >
                  Forgot Password ?</router-link
                >
                <input
                  type="password"
                  class="form-control mb-0"
                  id="exampleInputPassword1"
                  placeholder="Password "
                  v-model="password"
                />
              </div>
              <div class="d-inline-block w-100">
                <button type="submit" class="btn btn-primary float-end">
                  Connection
                </button>
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
  data() {
    return {
      email: "",
      password: "",
      user: {},
      error: "",
    };
  },
  methods: {
    login() {
      return axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.user));

          return this.loadUserDetails();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.error =
              "Invalid credentials. Please check your email and password.";
          } else {
            this.error =
              "An error occurred while logging in. Please try again later.";
          }
        });
    },

    loadUserDetails() {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");

      if (userData) {
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
      } else {
        console.error(
          "Les données de l'utilisateur n'ont pas été trouvées dans le localStorage.",
        );
      }
    },

    async onSubmit() {
      await this.login();

      this.$router.push({ name: "social.list" });
    },
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.loadUserDetails();
    }
  },
};
</script>
<style>
.text-start {
  text-align: left !important;
}
</style>
