<template>
  <div class="error-box">
    <div class="row">
      <div class="col-sm-12 text-sm-center">
        <h1>403</h1>
        <h5>Bạn không có quyền thực hiện thao tác này</h5>
        <router-link class="btn btn-lg bg-yellow" :to="redirectUrl">
          <i class="icon-fa icon-fa-arrow-left"/> Quay lại
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../services/auth";
export default {
  data() {
    return {
      redirectUrl : ''
    }
  },
  mounted () {
    this.setLayoutClasses()
    Auth.getProfile().then(res => {
      if (res) {
        if (res.currentRole.slug === 'content') {
          console.log(res.currentRole.slug)
          this.redirectUrl = '/admin/blogs/list'
        } else {
          this.redirectUrl = '/admin/bookings/list'
        }
      }
    });
  },
  destroyed () {
    document.body.classList.remove('page-error-404')
  },
  methods: {
    setLayoutClasses () {
      let body = document.body
      body.classList.add('page-error-404')
    }
  }
}
</script>
