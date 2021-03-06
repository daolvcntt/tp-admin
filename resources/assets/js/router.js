import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthService from './services/auth';

/*
 |--------------------------------------------------------------------------
 | Admin Views
 |--------------------------------------------------------------------------|
 */

//  Dashboard
import BookingStatistical from './views/admin/dashboard/BookingStatistical.vue';
import FinanceStatistical from './views/admin/dashboard/FinanceStatistical.vue';
import RoomStatistical from './views/admin/dashboard/RoomStatistical.vue';
import DecisionBase from './views/admin/dashboard/DecisionBase/DecisionBase.vue';

//  Layouts
// import LayoutBasic from './views/layouts/LayoutBasic.vue'
import LayoutHorizontal from './views/layouts/LayoutHorizontal.vue';
import LayoutLogin from './views/layouts/LayoutLogin.vue';

//  Users
import Admin from './views/admin/users/Admin.vue';
import Merchant from './views/admin/users/Merchant.vue';
import Customer from './views/admin/users/Customer.vue';
import Profile from './views/admin/users/Profile.vue';
import EditUser from './views/admin/users/EditUser.vue';
//  Settings
import Settings from './views/admin/Settings.vue';
//  Bookings
import BookingList from './views/admin/bookings/BookingList.vue';
import BookingCreate from './views/admin/bookings/BookingCreate.vue';
import BookingUpdate from './views/admin/bookings/BookingUpdate.vue';
//  Roles
import RoleList from './views/admin/roles/RoleList.vue';
import RoleCreate from './views/admin/roles/RoleCreate.vue';
import RoleUpdate from './views/admin/roles/RoleUpdate.vue';
// Rooms
import RoomList from './views/admin/rooms/RoomList.vue';
import RoomDetail from './views/admin/rooms/RoomDetail.vue';
import RoomUpdate from './views/admin/rooms/RoomUpdate.vue';
import RoomCreate from './views/admin/rooms/RoomCreate.vue';
import RoomCalendar from './views/admin/rooms/RoomCalendar.vue';
import RoomGoogleMap from './views/admin/rooms/RoomGoogleMap.vue';
import RoomGuideBook from './views/admin/rooms/RoomGuideBook.vue';

// Promotions
import PromotionList from './views/admin/promotions/PromotionList.vue';
import PromotionUpdate from './views/admin/promotions/PromotionUpdate.vue';
import PromotionCreate from './views/admin/promotions/PromotionCreate.vue';
import PromotionDetail from './views/admin/promotions/PromotionDetail.vue';

// Coupons
import CouponUpdate from './views/admin/coupons/CouponUpdate.vue';
import CouponCreate from './views/admin/coupons/CouponCreate.vue';
import CouponList from './views/admin/coupons/CouponList.vue';

// Blogs
import BlogList from './views/admin/blogs/BlogList.vue';
import BlogDetail from './views/admin/blogs/BlogDetail.vue';
import BlogCreate from './views/admin/blogs/BlogCreate.vue';
import BlogUpdate from './views/admin/blogs/BlogUpdate.vue';

// Comforts
import ComfortList from './views/admin/comforts/ComfortList.vue';
import ComfortCreate from './views/admin/comforts/ComfortCreate.vue';
import ComfortUpdate from './views/admin/comforts/ComfortUpdate.vue';

// Cities
import CityList from './views/admin/cities/CityList.vue';
import CityUpdate from './views/admin/cities/CityUpdate.vue';

// Districts
import DistrictList from './views/admin/districts/DistrictList.vue';
import DistrictUpdate from './views/admin/districts/DistrictUpdate.vue';

// Collection
import CollectionList from './views/admin/collections/CollectionList.vue';
import CollectionCreate from './views/admin/collections/CollectionCreate.vue';
import CollectionUpdate from './views/admin/collections/CollectionUpdate.vue';
import CollectionDetail from './views/admin/collections/CollectionDetail.vue';

// Transactions
import TransactionList from './views/admin/transactions/ListTransaction.vue';
import TransactionCreate from './views/admin/transactions/CreateTransaction.vue';
import CompareChecking from './views/admin/transactions/CompareChecking.vue';

//Long Term Booking
import LongTermBookingCreate from './views/admin/longTermBookings/BookingCreate.vue';
// import LongTermRoomListing from './views/admin/longTermRooms/LongTermRoomListing.vue';
import LongTermBookingList from './views/admin/longTermBookings/LongTermBookingList.vue';

// import NotificationDemo from './views/notifications/NotificationsDemo.vue'

/*
 |--------------------------------------------------------------------------
 | Other
 |--------------------------------------------------------------------------|
 */

//  Auth
import Login from './views/auth/Login.vue';

import NotFoundPage from './views/errors/404.vue';
import PermissionForbidden from './views/errors/403.vue';

/*
 |--------------------------------------------------------------------------
 | Frontend Views
 |--------------------------------------------------------------------------|
 */

// import Home from './views/front/Home.vue'

Vue.use(VueRouter);

const routes = [
  /*
   |--------------------------------------------------------------------------
   | Layout Routes for DEMO
   |--------------------------------------------------------------------------|
   */

  {
    path: '/admin/layouts',
    component: LayoutHorizontal,
    children: [
      {
        path: 'sidebar',
        component: BookingStatistical,
      },
    ],
  },

  /*
   |--------------------------------------------------------------------------
   | Frontend Routes
   |--------------------------------------------------------------------------|
   */

  {
    path: '/',
    component: LayoutLogin,
    children: [
      {
        path: 'login',
        component: Login,
        name: 'login',
      },
      {
        path: '/',
        component: Login,
        name: 'home',
      },
    ],
  },

  /*
   |--------------------------------------------------------------------------
   | Admin Backend Routes
   |--------------------------------------------------------------------------|
   */
  {
    path: '/admin',
    component: LayoutHorizontal, //  Change the desired Layout here
    meta: {
      requiresAuth: true,
    },
    children: [
      //  Dashboard
      {
        path: 'dashboard/booking',
        component: BookingStatistical,
        name: 'dashboard.booking',
      },
      {
        path: 'dashboard/finance',
        component: FinanceStatistical,
        name: 'dashboard.finance',
      },
      {
        path: 'dashboard/room',
        component: RoomStatistical,
        name: 'dashboard.room',
      },
      {
        path: 'dashboard/decision',
        component: DecisionBase,
        name: 'dashboard.decision',
      },

      //  Users
      {
        path: 'users/profile/:userId',
        name: 'user.profile',
        component: Profile,
      },
      {
        path: 'users/edit/:userId',
        name: 'user.edit',
        component: EditUser,
      },
      {
        path: 'users/customers',
        name: 'user.customer',
        component: Customer,
      },
      {
        path: 'users/merchants',
        name: 'user.merchant',
        component: Merchant,
      },
      {
        path: 'users/admins',
        name: 'user.admin',
        component: Admin,
      },

      // Bookings
      {
        path: 'bookings/list',
        name: 'booking.list',
        component: BookingList,
      },
      {
        path: 'bookings/create/room/:roomId',
        name: 'booking.create',
        component: BookingCreate,
      },
      {
        path: 'bookings/update/:bookingId',
        name: 'booking.update',
        component: BookingUpdate,
      },

      // Roles
      {
        path: 'roles/list',
        name: 'role.list',
        component: RoleList,
      },
      {
        path: 'roles/create',
        name: 'role.create',
        component: RoleCreate,
      },
      {
        path: 'roles/update/:roleId',
        name: 'role.update',
        component: RoleUpdate,
      },
      // Collection
      {
        path: 'collections/list',
        name: 'collections.list',
        component: CollectionList,
      },
      {
        path: 'collections/detail/:collectionId',
        name: 'collection.detail',
        component: CollectionDetail,
      },
      {
        path: 'collections/create',
        name: 'collection.create',
        component: CollectionCreate,
      },
      {
        path: 'collections/update/:collectionId',
        name: 'collection.update',
        component: CollectionUpdate,
      },

      // Rooms
      {
        path: 'rooms/list',
        name: 'room.list',
        component: RoomList,
      },
      {
        path: 'rooms/detail/:roomId',
        name: 'room.detail',
        component: RoomDetail,
      },
      {
        path: 'rooms/update/:roomId',
        name: 'room.update',
        component: RoomUpdate,
      },
      {
        path: 'rooms/create',
        name: 'room.create',
        component: RoomCreate,
      },
      {
        path: 'rooms/calendar/:roomId',
        name: 'room.calendar',
        component: RoomCalendar,
      },
      {
        path: 'rooms/googlemap',
        name: 'room.googlemap',
        component: RoomGoogleMap,
      },
      {
        path: 'rooms/guidebook/:roomId',
        name: 'room.guidebook',
        component: RoomGuideBook,
      },

      // Promotions
      {
        path: 'promotions/list',
        name: 'promotion.list',
        component: PromotionList,
      },
      {
        path: 'promotions/update/:promotionId',
        name: 'promotion.update',
        component: PromotionUpdate,
      },
      {
        path: 'promotions/create',
        name: 'promotion.create',
        component: PromotionCreate,
      },
      {
        path: 'promotions/detail/:promotionId',
        name: 'promotion.detail',
        component: PromotionDetail,
      },

      // Coupons
      {
        path: 'coupons/update/:couponId',
        name: 'coupon.update',
        component: CouponUpdate,
      },
      {
        path: 'coupons/create',
        name: 'coupon.create',
        component: CouponCreate,
      },
      {
        path: 'coupons/list',
        name: 'coupon.list',
        component: CouponList,
      },

      // Blogs
      {
        path: 'blogs/list',
        name: 'blog.list',
        component: BlogList,
      },
      {
        path: 'blogs/detail/:blogId',
        name: 'blog.detail',
        component: BlogDetail,
      },
      {
        path: 'blogs/create',
        name: 'blog.create',
        component: BlogCreate,
      },
      {
        path: 'blogs/update/:blogId',
        name: 'blog.update',
        component: BlogUpdate,
      },

      // Comforts
      {
        path: 'comforts/list',
        name: 'comfort.list',
        component: ComfortList,
      },
      {
        path: 'comforts/create',
        name: 'comfort.create',
        component: ComfortCreate,
      },
      {
        path: 'comforts/update/:comfortId',
        name: 'comfort.update',
        component: ComfortUpdate,
      },

      // Cities
      {
        path: 'cities/list',
        name: 'city.list',
        component: CityList,
      },
      {
        path: 'cities/update/:cityId',
        name: 'city.update',
        component: CityUpdate,
      },

      // Districts
      {
        path: 'districts/list',
        name: 'district.list',
        component: DistrictList,
      },
      {
        path: 'districts/update/:districtId',
        name: 'district.update',
        component: DistrictUpdate,
      },

      //  Settings
      {
        path: 'settings',
        component: Settings,
      },

      // Transactions
      {
        path: 'transactions/list',
        name: 'transaction.list',
        component: TransactionList,
      },
      {
        path: 'transactions/create',
        name: 'transaction.create',
        component: TransactionCreate,
      },
      {
        path: 'transactions/compare-checking',
        name: 'transaction.compare_checking',
        component: CompareChecking,
      },
      ,
      // {
      //   path: 'notification/demo',
      //   component: NotificationDemo
      // }
      //Long Term Booking
      {
        path: 'long-term-booking/create/room/:roomId',
        name: 'long-term-booking.create',
        component: LongTermBookingCreate,
      },
      //Long Term Room
      // {
      //   path: 'rooms/list',
      //   name: 'rooms.list',
      //   component: LongTermRoomListing,
      // },
      {
        path: 'long-term-booking/list',
        name: 'long-term-booking.list',
        component: LongTermBookingList,
      },
    ],
  },

  /*
   |--------------------------------------------------------------------------
   | Auth & Registration Routes
   |--------------------------------------------------------------------------|
   */

  //   DEFAULT ROUTE
  {
    path: '*',
    component: NotFoundPage,
  },
  {
    path: '/permission-denied-403',
    component: PermissionForbidden,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  //   If the next route is requires user to be Logged IN
  if (to.matched.some(m => m.meta.requiresAuth)) {
    return AuthService.check().then(authenticated => {
      if (!authenticated) {
        return next({
          path: '/login',
        });
      }

      return next();
    });
  }

  return next();
});

export default router;
