<template>
  <div class="error-box">
    <div class="row">
      <div class="col-sm-12 text-sm-center">
        <h1>404</h1>
        <h5>Whoops! Trang không tồn tại!</h5>
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
        // console.log(res)
        if (res.currentRole.slug === 'content') {
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
