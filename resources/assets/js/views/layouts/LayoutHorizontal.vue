<template>
  <div class="template-container">
    <!-- <site-header /> -->
    <site-header-bottom />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <site-footer />
  </div>
</template>

<script type="text/babel">
// import SiteHeader from './partials/TheSiteHeader.vue';
import SiteFooter from './partials/TheSiteFooter.vue';
import SiteHeaderBottom from './partials/TheSiteHeaderBottom.vue';

export default {
  components: {
    // SiteHeader,
    SiteHeaderBottom,
    SiteFooter,
  },
  mounted() {
    this.$utils.setLayout('horizontal');
    this.$utils.setSkin('default');
  },
};
</script>
