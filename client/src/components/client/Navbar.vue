<template>
  <b-navbar toggleable="md" type="light" variant="light" class="py-2">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand class="ml-xl-5">
      <router-link to="/">
        <span class="text-success px-5 nav-title">TOSS</span>
      </router-link>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item class="mr-md-2 pr-xl-4 ml-xl-5">
          <router-link to="/test-artifacts">
            <i class="fa fa-briefcase d-none d-lg-inline"/>
            Test Artifacts
          </router-link>
        </b-nav-item>
        <b-nav-item class="mr-md-2 pr-xl-4">
          <router-link to="/metrics">
            <i class="fa fa-chart-bar d-none d-lg-inline"/>
            Metrics
          </router-link>
        </b-nav-item>
        <b-nav-item class="mr-md-2 pr-xl-4">
          <router-link to="/automation">
            <i class="fa fa-cogs d-none d-lg-inline"/>
            Automation
          </router-link>
        </b-nav-item>
        <b-nav-item class="mr-md-2 pr-xl-4">
          <router-link to="/reference-materials">
            <i class="fa fa-book d-none d-lg-inline"/>
            Reference Materials
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/contact-us">
            <i class="fa fa-comment d-none d-lg-inline"/>
            Contact Us
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
</script>

<style scoped>
.navbar {
  box-shadow: 0px 2px 10px rgba(34, 34, 34, 0.1);
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 3.5rem;
}

.nav-title {
  letter-spacing: 0.1rem;
  font-weight: 450;
  font-size: 1.4rem;
}

i {
  margin-right: 0.1em;
  margin-left: 0.7em;
  font-size: 20px;
}

a {
  color: rgba(34, 34, 34, 0.6);
}

a:hover {
  color: rgba(34, 34, 34, 0.9);
}

.router-link-active {
  color: rgba(34, 34, 34, 1);
  transition: 0.2s all;
  /* background-color: #ffffff; */
}

.router-link-active i {
  color: #28a745;
  transition: 0.2s all;
}

.sticky {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
