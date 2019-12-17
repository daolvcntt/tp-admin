<template>
  <div>
    <!-- begin:: Header Mobile -->
    <div id="kt_header_mobile" class="kt-header-mobile kt-header-mobile--fixed">
      <div class="kt-header-mobile__logo">
        <a href="#">
          <img alt="Logo" style="height: 50px;" src="/assets/img/logo3.png" />
        </a>
      </div>
      <div class="kt-header-mobile__toolbar">
        <button
          class="kt-header-mobile__toolbar-toggler"
          id="kt_header_mobile_toggler"
          @click="openSideDrawer"
        >
          <span></span>
        </button>
      </div>
    </div>
    <!-- end:: Header Mobile -->
    <div class="kt-grid kt-grid--hor kt-grid--root">
      <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
        <div
          class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
          id="kt_wrapper"
        >
          <div
            style="background: #0F2027;background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);background: linear-gradient(to right, #2C5364, #203A43, #0F2027);"
            id="kt_header"
            class="kt-header kt-header--fixed"
            data-ktheader-minimize="on"
          >
            <div class="kt-container">
              <!-- begin:: Brand -->
              <div class="kt-header__brand kt-grid__item" id="kt_header_brand">
                <a class="kt-header__brand-logo" href="?page=index&demo=demo4">
                  <img
                    alt="Logo"
                    src="/assets/img/logo3.png"
                    style="height: 50px;"
                    class="kt-header__brand-logo-default"
                  />
                  <img
                    alt="Logo"
                    style="height: 50px;"
                    src="/assets/img/logo3.png"
                    class="kt-header__brand-logo-sticky"
                  />
                </a>
              </div>
              <!-- end:: Brand -->
              <!-- begin: Header Menu -->
              <button
                v-show="sideDrawer"
                style="left: 243px;width: 32px;height: 32px;top: 2px;"
                class="kt-header-menu-wrapper-close"
                id="kt_header_menu_mobile_close_btn"
                @click="openSideDrawer"
              >
                <i class="flaticon-close"></i>
              </button>
              <div
                :class="sideDrawer ? 'kt-header-menu-wrapper kt-grid__item kt-grid__item--fluid kt-header-menu-wrapper--on' : 'kt-header-menu-wrapper kt-grid__item kt-grid__item--fluid'"
                id="kt_header_menu_wrapper"
              >
                <div
                  id="kt_header_menu"
                  class="kt-header-menu kt-header-menu-mobile"
                  v-click-outside="collapseMenu"
                >
                  <ul class="kt-menu__nav" @click="sideDrawer = false">
                    <li
                      @click="openMenu('dashboard')"
                      :class="currentOpenMenu === 'dashboard' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Thống kê</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div
                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        :style="sideDrawer ? 'display: block !important;' : ''"
                      >
                        <ul class="kt-menu__subnav">
                          <li class="kt-menu__item" aria-haspopup="true">
                            <router-link to="/admin/dashboard/booking" class="kt-menu__link">
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Thống kê đặt phòng</span>
                            </router-link>
                          </li>
                          <li class="kt-menu__item" aria-haspopup="true">
                            <router-link to="/admin/dashboard/finance" class="kt-menu__link">
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Thống kê doanh thu</span>
                            </router-link>
                          </li>
                          <li class="kt-menu__item" aria-haspopup="true">
                            <router-link to="/admin/dashboard/room" class="kt-menu__link">
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Thống kê phòng</span>
                            </router-link>
                          </li>
                          <li class="kt-menu__item" aria-haspopup="true">
                            <router-link to="/admin/dashboard/decision" class="kt-menu__link">
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Trợ giúp quyết định</span>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      @click="openMenu('user')"
                      :class="currentOpenMenu === 'user' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Nguời dùng</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div
                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        :style="sideDrawer ? 'display: block !important;' : ''"
                      >
                        <ul class="kt-menu__subnav">
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/users/customers"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Khách hàng</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/users/merchants"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Chủ nhà</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/users/admins"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Quản trị viên</span>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      @click="openMenu('room')"
                      :class="currentOpenMenu === 'room' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <router-link to="/admin/rooms/list" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Phòng</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </router-link>
                    </li>
                    <li
                      @click="openMenu('booking')"
                      :class="currentOpenMenu === 'booking' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Đặt phòng</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div
                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        :style="sideDrawer ? 'display: block !important;' : ''"
                      >
                        <ul class="kt-menu__subnav">
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/bookings/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Đặt phòng ngắn hạn</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/long-term-booking/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Đặt phòng dài hạn</span>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      @click="openMenu('promotion')"
                      :class="currentOpenMenu === 'promotion' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Khuyến mãi</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div
                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        :style="sideDrawer ? 'display: block !important;' : ''"
                      >
                        <ul class="kt-menu__subnav">
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/promotions/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Danh sách khuyến mãi</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/promotions/create"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Tạo khuyến mãi</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/promotions/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Mã giảm giá</span>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      @click="openMenu('blog')"
                      :class="currentOpenMenu === 'blog' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Bài viết</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div
                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        :style="sideDrawer ? 'display: block !important;' : ''"
                      >
                        <ul class="kt-menu__subnav">
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/blogs/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Danh sách bài viết</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/blogs/create"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Bài viết mới</span>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      @click="openMenu('system')"
                      :class="currentOpenMenu === 'system' ? 'kt-menu__item kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open-dropdown kt-menu__item--hover':'kt-menu__item kt-menu__item--submenu kt-menu__item--rel'"
                      data-ktmenu-submenu-toggle="click"
                      aria-haspopup="true"
                    >
                      <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                        <span class="kt-menu__link-text">Hệ thống</span>
                        <i class="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div
                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        :style="sideDrawer ? 'display: block !important;' : ''"
                      >
                        <ul class="kt-menu__subnav">
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/cities/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Tỉnh/Thành phố</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/districts/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Quận/Huyện</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/comforts/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Tiện ích</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/roles/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Phân quyền</span>
                            </router-link>
                          </li>
                          <li
                            class="kt-menu__item kt-menu__item--submenu"
                            data-ktmenu-submenu-toggle="hover"
                            aria-haspopup="true"
                          >
                            <router-link
                              to="/admin/collections/list"
                              class="kt-menu__link kt-menu__toggle"
                            >
                              <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span class="kt-menu__link-text">Bộ sưu tập</span>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- end: Header Menu -->

              <!-- begin:: Header Topbar -->
              <div class="kt-header__topbar kt-grid__item">
                <!--begin: User bar -->
                <div
                  :class="openUserMenu ? 'kt-header__topbar-item kt-header__topbar-item--user show' : 'kt-header__topbar-item kt-header__topbar-item--user'"
                  @click="openUserMenu =! openUserMenu"
                  v-click-outside="collapseUser"
                >
                  <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                  >
                    <span class="kt-header__topbar-welcome">Hi,</span>
                    <span class="kt-header__topbar-username">{{user.name}}</span>
                    <span class="kt-header__topbar-icon">
                      <b>S</b>
                    </span>
                    <img alt="Pic" src="/metronic/assets/media/users/300_21.jpg" class="kt-hidden" />
                  </div>
                  <div
                    :class="openUserMenu ? 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl show' : 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl'"
                    :style="openUserMenu ? 'position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(966px, 79px, 0px);' : ''"
                  >
                    <!--begin: Head -->
                    <div
                      class="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
                      style="background-image: url(/metronic/assets/media/misc/bg-1.jpg)"
                    >
                      <div class="kt-user-card__avatar">
                        <img
                          class="kt-hidden"
                          alt="Pic"
                          src="/metronic/assets/media/users/300_25.jpg"
                        />

                        <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
                        <span
                          class="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success"
                        >S</span>
                      </div>
                      <div class="kt-user-card__name">{{user.name}}</div>
                      <div class="kt-user-card__badge">
                        <span class="btn btn-success btn-sm btn-bold btn-font-md">{{your_role}}</span>
                      </div>
                    </div>

                    <!--end: Head -->

                    <!--begin: Navigation -->
                    <div class="kt-notification">
                      <a href="#" class="kt-notification__item">
                        <div class="kt-notification__item-icon">
                          <i class="flaticon2-calendar-3 kt-font-success"></i>
                        </div>
                        <div class="kt-notification__item-details">
                          <div class="kt-notification__item-title kt-font-bold">Trang cá nhân</div>
                          <div class="kt-notification__item-time">Tài khoản và thông tin cá nhân</div>
                        </div>
                      </a>
                      <div class="kt-notification__custom kt-space-between">
                        <a
                          @click="logout"
                          class="btn btn-label btn-label-brand btn-sm btn-bold"
                        >Đăng xuất</a>
                      </div>
                    </div>

                    <!--end: Navigation -->
                  </div>
                </div>

                <!--end: User bar -->
              </div>
              <!-- end:: Header Topbar -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Ls from '../../../services/ls';
import Auth from '../../../services/auth';
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      ctv_role: false,
      ksnb: false,
      currentOpenMenu: null,
      your_role: '',
      openUserMenu: false,
      user: {
        name: 'Westay',
      },
      sideDrawer: false,
    };
  },
  methods: {
    openMenu(currentMenu) {
      if (this.currentOpenMenu === currentMenu) {
        this.currentOpenMenu = null;
      } else {
        this.currentOpenMenu = currentMenu;
      }
    },
    collapseMenu() {
      this.currentOpenMenu = null;
    },
    openSideDrawer() {
      this.sideDrawer = !this.sideDrawer;
    },
    collapseUser() {
      this.openUserMenu = false;
    },
    ...mapActions(['changeProId']),
    onNavToggle() {
      this.$utils.toggleSidebar();
    },
    openCreateCoupon() {
      this.changeProId(0);
    },
    logout() {
      Auth.logout().then(() => {
        this.$router.replace('/login');
      });
    },
  },
  mounted() {
    // console.log(Ls.get('auth.currentRole'));
    Auth.getProfile().then(result => {
      this.your_role = result.currentRole.name;
    });
    Auth.getCurrentUser().then(response => {
      this.user = response;
      // console.log(response);
    });
    if (Ls.get('auth.currentRole') === 'ctv') {
      this.ctv_role = true;
    } else {
      this.ctv_role = false;
    }
    if (Ls.get('auth.currentRole') === 'ksnb') {
      this.ksnb = true;
    } else {
      this.ksnb = false;
    }
  },
};
</script>
<style>
@import '/metronic/assets/plugins/general/plugins/flaticon/flaticon.css';
@import '/metronic/assets/plugins/general/plugins/flaticon2/flaticon.css';
@import '/metronic/assets/css/style.bundle.min.css';
</style>
