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
            <a class="sign-in-logo mb-5" href="#">
              <img
                src="@/assets/images/digLogo.png"
                class="img-fluid enlarged-image"
                alt="logo"
              />
            </a>
          </div>
        </div>
        <div class="col-md-6 bg-white pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from">
            <h1 class="mb-0">Reset password</h1>
            <p>
              Enter your e-mail address and we'll send you an e-mail with new
              password.
            </p>
            <form class="mt-4" @submit.prevent="onSubmit">
              <div class="form-group">
                <label class="form-label" for="exampleInputEmail1"
                  >E-mail address
                </label>
                <input
                  type="email"
                  class="form-control mb-0"
                  id="exampleInputEmail1"
                  placeholder="Enter your e-mail"
                  v-model="email"
                />
              </div>
              <div class="d-inline-block w-100">
                <button type="submit" class="btn btn-primary float-right">
                  Reset password
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
  name: "RecoverPassword1",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onSubmit() {
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://127.0.0.1:8000/api/forgotPassword",
          { email: this.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          console.log(response.data.message);
          this.$router.push({ name: "auth1.sign-in1" });
        })
        .catch((error) => {
          console.error(error);
        });
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
