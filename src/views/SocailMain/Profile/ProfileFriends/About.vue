<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-9">
      <div class="tab-content">
        <tab-content-item
          :active="true"
          id="contact-info"
          aria-labelled-by="pills-contact-info"
        >
          <h4>Contact Information</h4>
          <hr />
          <div class="row">
            <div class="col-3">
              <h6>Role:</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ userData.role }}</p>
            </div>
            <div class="col-3">
              <h6>Name:</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ userData.nom }}</p>
            </div>
            <div class="col-3">
              <h6>Last name:</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ userData.prenom }}</p>
            </div>
            <div class="col-3">
              <h6>Email:</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ userData.email }}</p>
            </div>
            <div class="col-3">
              <h6>Mobile:</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ userData.tel }}</p>
            </div>
          </div>
        </tab-content-item>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData") || "null");
    console.log(this.userData);
  },
  components: {},
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
    };
  },
};
</script>
