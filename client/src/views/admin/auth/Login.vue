<template>
  <b-row class="row pt-5">
    <div class="col-md-3 m-auto">
      <b-card class="card-body mt-3">
        <h2 class="text-center mb-3 text-success mb-4">TOSS</h2>

        <b-form aria-autocomplete="off" autocomplete="off">
          <b-form-group>
            <label for="username">Username</label>
            <b-input type="text" autocomplete="off"></b-input>
          </b-form-group>
          <b-form-group class="mb-5">
            <label for="password">Password</label>
            <b-input type="password" autocomplete="off"></b-input>
          </b-form-group>
          <button class="btn btn-primary mt-4 btn-block">Login</button>
        </b-form>
      </b-card>
    </div>
  </b-row>
</template>

<script>
export default {
  
}
</script>



