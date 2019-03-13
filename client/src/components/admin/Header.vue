<template>
  <div class="w-100 bg-dark p-3">
    <h2>TOSS</h2>

    <b-dropdown id="ddown" variant="link" size="lg" no-caret right>
      <template slot="button-content">
        <i class="fas fa-user-circle"></i>
      </template>

      <b-dropdown-item href="#">Logout</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<style scoped>
h2 {
  color: var(--vuestic-green);
  margin: 0.8rem 0rem 0.8rem 3rem;
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  display: inline;
}

i {
  color: var(--vuestic-green);
  font-size: 1.6rem;
}

i:hover {
  color: var(--vuestic-green-hover);
}

#ddown {
  margin-top: -0.6rem;
  float: right;
}

.dropdown-menu {
  box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
  transform: translate3d(-77px, 57px, 0px) !important;
}

/* #ddown .dropdown-item {
  color: #4ae387;
} */
</style>
