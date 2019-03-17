<template>
  <div>
    <app-header/>
    <app-body/>
    <app-footer/>
    <notifications
      group="success"
      classes="vue-notification success"
      position="bottom left"
    />
    <notifications group="error" classes="vue-notification error" position="bottom left"/>
  </div>
</template>

<script>
import Header from '@/components/client/Header.vue'
import Footer from '@/components/client/Footer.vue'
import Body from '@/components/client/Body.vue'

export default {
  name: 'MainComponent',
  data() {
    return {
      isAdmin: false
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    appBody: Body
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

a:hover {
  text-decoration: none;
}

.admin-bg {
  background-color: #eeeeee;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

:root {
  --success-color: #28a745;
  --vuestic-green: #4ae387;
  --vuestic-green-hover: #76eaa4;
  --vuestic-box-shadow: 0px 4px 70px -18px #707070;
  --special-color: #37474f;
  --elegant-color: #2e2e2e;
  --light-bg: #eeeeee;
}

.hov {
  cursor: pointer;
}

/* .success {
  color: #28a745;
}

.success:hover {
  color: #218838;
} */

/* Bootstrap */
.modal-content {
  border: 0px;
  box-shadow: 0px 0px 20px rgba(43, 43, 43, 1);
  border-radius: 0.1rem;
}
.modal-body {
  padding-bottom: 1.5rem;
}

.navbar-light .navbar-toggler {
  border: none;
}

.card {
  box-shadow: var(--vuestic-box-shadow);
  border: 0px;
  border-radius: 0px;
  padding: 1.5625rem;
}

.badge {
  box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.3);
  padding: 0.4rem 0.4rem 0.4rem 0.8rem;
  border-radius: 50px;
  margin: 0 0.3rem;
  font-weight: 500;
}

.badge:first-of-type {
  margin-left: 1rem;
}

.badge i {
  margin: 0 0rem 0 0.3rem;
}

.btn {
  padding: 0.75rem 1.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: none;
  border-radius: 1.875rem;
  font-size: 1rem;
  line-height: 1.25;
}

.form-control[data-v-42a82efe]:focus,
.form-control:focus {
  box-shadow: 0 0 0 0rem #fff;
  border-color: #bdbdbd;
  box-shadow: 0px 0px 20px rgba(34, 34, 34, 0.15);
}

.input-group-text,
.form-control,
.custom-file-label {
  border-radius: 0px;
}

.input-group-append > .btn {
  border-radius: 0px;
  padding: 0.25rem 1rem;
}

.btn-primary {
  background-color: var(--vuestic-green);
  color: #fff;
  box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
  border: none;
}

.btn.btn-primary.active,
.btn.btn-primary:active,
.btn.btn-primary:not([disabled]):not(.disabled).active,
.btn.btn-primary:not([disabled]):not(.disabled):active,
.medium-editor-toolbar .active.medium-editor-action,
.medium-editor-toolbar .medium-editor-action:active,
.medium-editor-toolbar
  .medium-editor-action:not([disabled]):not(.disabled).active,
.medium-editor-toolbar
  .medium-editor-action:not([disabled]):not(.disabled):active {
  background-color: #1ec260;
  -webkit-box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
  box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
  color: #fff;
}

.btn.btn-primary:hover {
  background-color: #76eaa4;
}

.btn-primary:focus,
.btn-primary.focus {
  box-shadow: 0 0 0 0rem rgba(0, 123, 255, 0.5);
}

.btn.btn-primary[disabled],
.btn.btn-primary[disabled]:hover,
.medium-editor-toolbar .medium-editor-action[disabled],
.medium-editor-toolbar .medium-editor-action[disabled]:hover {
  background-color: #1ec260;
  color: #14803f;
  opacity: 0.5;
}

.btn-primary.disabled,
.btn-primary:disabled {
  color: #212529;
  background-color: #4ae387;
  border-color: #4ae387;
}

.btn.btn-pale {
  background-color: #d9d9d9;
  color: #fff;
  -webkit-box-shadow: 0 4px 70px -16px #d9d9d9;
  box-shadow: 0 4px 70px -16px #d9d9d9;
  border: none;
}

.btn.btn-pale.active,
.btn.btn-pale:active,
.btn.btn-pale:not([disabled]):not(.disabled).active,
.btn.btn-pale:not([disabled]):not(.disabled):active {
  background-color: #b3b3b3;
  -webkit-box-shadow: 0 4px 70px -16px #d9d9d9;
  box-shadow: 0 4px 70px -16px #d9d9d9;
  color: #fff;
}

.btn-pale:not(:disabled):not(.disabled).active,
.btn-pale:not(:disabled):not(.disabled):active,
.show > .btn-pale.dropdown-toggle {
  color: #212529;
  background-color: silver;
  border-color: #b9b9b9;
}

.btn.btn-pale:hover {
  background-color: #e6e6e6;
}

.btn.btn-danger {
  background-color: #e34a4a;
  color: #fff;
  -webkit-box-shadow: 0 4px 70px -16px #e34a4a;
  box-shadow: 0 4px 70px -16px #e34a4a;
  border: none;
}

.btn-danger.focus,
.btn-danger:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(227, 74, 74, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(227, 74, 74, 0.5);
}

.btn.btn-danger:hover {
  background-color: #ea7676;
}

.btn.btn-micro {
  padding: 0.625rem 1.8rem;
  font-size: 85%;
  line-height: 1.25;
  border-radius: 1.875rem;
}

.fa,
.fas {
  cursor: pointer;
}

.text-primary {
  color: var(--vuestic-green) !important;
}
</style>
