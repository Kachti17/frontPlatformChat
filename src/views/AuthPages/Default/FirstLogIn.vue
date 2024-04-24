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
                src="@/assets/images/digitrendsBlue.jpg"
                class="img-fluid enlarged-image"
                alt="logo"
              />
            </a>
          </div>
        </div>
        <div class="col-md-6 bg-white pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from">
            <h1 class="mb-0">Create new Password</h1>

            <form class="mt-4" @submit.prevent="onSubmit">
              <div class="form-group">
                <label class="form-label" for="exampleInputEmail1"
                  >new Password</label
                >
                <input
                  type="email"
                  class="form-control mb-0"
                  id="exampleInputEmail1"
                  placeholder="Enter your new password"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputEmail1"
                  >Verify Password</label
                >
                <input
                  type="email"
                  class="form-control mb-0"
                  id="exampleInputEmail1"
                  placeholder="Enter your new password"
                  v-model="email"
                />
              </div>

              <div class="d-inline-block w-100">
                <button type="submit" class="btn btn-primary float-right">
                  Confirm new Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
