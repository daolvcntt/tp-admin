<template>
  <div
    class="kt-content kt-content--fit-top kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
    id="kt_content"
  >
    <div
      class="kt-subheader kt-grid__item"
      id="kt_subheader"
      style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url('https://lh5.googleusercontent.com/proxy/Dm41Zdz8s5TnQcIRSCnAXUvHItsB67S7U3DytjCwsIpG9SmJKsVkkBRCK0ODmevy_M47-2CSAxGzFaiJM3bHaPfVT90Fm6lBbNd2yueqMg=w3840-h2160-p-k-no-nd-mv'); opacity: 1;"
    >
      <div class="kt-container">
        <div class="kt-subheader__main">
          <h3
            class="kt-subheader__title"
            style="font-size: 1.8rem;margin-bottom: .5rem;color:white"
          >Danh sách đặt phòng ngắn hạn</h3>
        </div>
      </div>
    </div>
    <div class="kt-container kt-grid__item kt-grid__item--fluid" style="margin-top: 25px">
      <!-- Begin Filter -->
      <div class="kt-portlet">
        <div class="kt-form">
          <div class="kt-portlet__body">
            <div class="row">
              <div class="col-sm-6 col-md-3">
                <div class="form-group">
                  <label>Tìm kiếm</label>
                  <input
                    type="text"
                    v-model="q"
                    class="form-control"
                    placeholder="Tên khách, SĐT khách, email,..."
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3">
                <div class="form-group">
                  <label>Mã phòng</label>
                  <input
                    v-model="room_id"
                    type="text"
                    class="form-control"
                    placeholder="Mã phòng ngắn hạn"
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Mã đặt phòng</label>
                  <input
                    v-model="booking_code"
                    type="text"
                    class="form-control"
                    placeholder="Mã đặt phòng"
                    id="exampleInputPassword1"
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3">
                <div class="form-group">
                  <label for="inputBookingStatus">Trạng thái đặt phòng</label>
                  <multiselect
                    id="inputBookingStatus"
                    v-model="filter_status"
                    label="name"
                    :options="status_list"
                    :searchable="true"
                    :show-labels="true"
                    placeholder="Trạng thái đặt phòng"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="form-group">
                  <label for="exampleInputPassword1">Chủ nhà</label>
                  <multiselect
                    style="font-size: 1.2rem;"
                    v-model="merchant_id"
                    :custom-label="nameWithPhone"
                    :options="merchants"
                    :searchable="true"
                    :show-labels="true"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="form-group">
                  <label>Ngày tạo</label>
                  <datepicker
                    v-model="date_start"
                    :format="format"
                    input-class="form-control"
                    placeholder="Ngày tạo booking"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="form-group">
                  <label>Tới</label>

                  <datepicker
                    :disabled-dates="disabledDateEnd"
                    v-model="date_end"
                    :format="format"
                    input-class="form-control"
                    placeholder="Ngày tạo booking"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="kt-portlet__foot">
            <div class="kt-form__actions">
              <button class="btn btn-primary" @click="applyFilter(1)">Áp dụng</button>
              <button class="btn btn-secondary" @click="resetFilter(1)">Làm mới</button>
              <button class="btn btn-warning" @click="exportExcel">Xuất Excel</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End Filter -->

      <lottie v-if="loading" :options="defaultOptions" :height="150" :width="150"></lottie>

      <!--begin:: Portlet-->
      <div v-else v-for="booking in bookings" :key="booking.uuid" class="kt-portlet">
        <div class="kt-portlet__body">
          <div class="kt-widget kt-widget--user-profile-3">
            <div class="kt-widget__top">
              <div class="kt-widget__media kt-hidden-">
                <img src="/assets/img/logo3.png" alt="image" />
              </div>
              <div
                class="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest kt-font-light kt-hidden"
              >JM</div>
              <div class="kt-widget__content">
                <div class="kt-widget__head">
                  <a style="cursor: text" class="kt-widget__username">
                    #{{booking.uuid}} - {{booking.id}}
                    <i class="flaticon2-correct kt-font-success"></i>
                  </a>
                  <div class="kt-widget__action">
                    <button
                      type="button"
                      class="btn btn-label-success btn-sm btn-upper"
                      @click="showModalSurcharge(booking)"
                    >Phụ thu</button>&nbsp;
                    <button
                      type="button"
                      class="btn btn-brand btn-sm btn-upper"
                      @click="showModalDiscount(booking)"
                    >Giảm giá</button>
                  </div>
                </div>
                <div class="kt-widget__subhead">
                  <a style="cursor: text;">
                    <i class="flaticon2-user-1"></i>
                    {{booking.name}}
                  </a>
                  <a style="cursor: text;">
                    <i class="flaticon2-phone"></i>
                    {{booking.phone}}
                  </a>
                  <a style="cursor: text;">
                    <i class="flaticon2-new-email"></i>
                    {{booking.email}}
                  </a>
                </div>
                <div class="kt-widget__info">
                  <div class="kt-widget__desc" style="font-size: 1.15rem">
                    <p>Số khách: {{booking.number_of_guests}}</p>
                    <p>Ngày tạo: {{booking.created_at}}</p>
                    <p>Checkin: {{booking.checkin}}</p>
                    <p>Checkout: {{booking.checkout}}</p>
                    <hr />
                    <a :href="`https://westay.vn/room/${booking.room_id}`" target="_blank">
                      Căn hộ: {{
                      booking.room && booking.room.data && booking.room.data.details && booking.room.data.details.data && booking.room.data.details.data.length > 0
                      ? booking.room.data.details.data[0].name !== null
                      ? booking.room.data.details.data[0].lang === 'vi'
                      ? booking.room.data.details.data[0].name
                      : booking.room.data.details.data[1].name
                      : 'Tên phòng: Chưa cập nhật'
                      : 'Tên phòng: Chưa cập nhật'
                      }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="kt-widget__bottom">
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-piggy-bank"></i>
                </div>
                <div
                  @click="openAdminPrice(booking)"
                  class="kt-widget__details"
                  v-tooltip.top-center="'Click để xem chỉ tiết'"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">Giá Admin</span>
                  <span class="kt-widget__value">{{booking.admin_total_fee | formatNumber }}</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-confetti"></i>
                </div>
                <div
                  @click="openMerchantPrice(booking)"
                  class="kt-widget__details"
                  v-tooltip.top-center="'Click để xem chỉ tiết'"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">Giá chủ nhà</span>
                  <span class="kt-widget__value">{{booking.total_fee | formatNumber }}</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-file-2"></i>
                </div>
                <div
                  class="kt-widget__details"
                  style="cursor:pointer;"
                  @click="showModalUpdateStatus(booking)"
                >
                  <span class="kt-widget__title">Trạng thái</span>
                  <a class="kt-widget__value kt-font-brand">{{booking.status_txt}}</a>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-chat-1"></i>
                </div>
                <div
                  class="kt-widget__details"
                  style="cursor:pointer;"
                  @click="showModalUpdatePayment(booking)"
                >
                  <span class="kt-widget__title">Thanh toán</span>
                  <a class="kt-widget__value kt-font-brand">{{booking.payment_status_txt}}</a>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-chat-1"></i>
                </div>
                <div class="kt-widget__details">
                  <span class="kt-widget__title">Xử lý</span>
                  <span
                    class="kt-widget__value kt-font-brand"
                  >{{booking.booking_status.data.staff_id !== null ? booking.booking_status.data.user.data.name : ''}}</span>
                </div>
              </div>

              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-pie-chart"></i>
                </div>
                <div
                  class="kt-widget__details"
                  v-tooltip.top-center="'Xem thông tin chủ nhà'"
                  @click="openMerchantInfo(booking)"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">Chủ nhà</span>
                  <span class="kt-widget__value">{{booking.merchant.data.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <sweet-modal ref="admin_price" overlay-theme="dark">
          <div v-if="currentBooking" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Chi tiết giá Admin</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Thông tin</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tiền phòng</td>
                        <td>{{ currentBooking.price_original | formatNumber }}</td>
                      </tr>
                      <tr>
                        <td>Phụ thu khách</td>
                        <td>{{ currentBooking.total_fee - currentBooking.price_original - currentBooking.additional_fee - currentBooking.service_fee + currentBooking.price_discount | formatNumber }}</td>
                      </tr>
                      <tr>
                        <td>Admin giảm giá</td>
                        <td>{{currentBooking.admin_discount | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Admin phụ thu</td>
                        <td>{{currentBooking.admin_surcharge | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Tổng cộng</td>
                        <td>{{currentBooking.admin_total_fee | formatNumber}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--end::Section-->
            </div>

            <!--end::Form-->
          </div>
        </sweet-modal>

        <sweet-modal ref="merchant_price" overlay-theme="dark">
          <div v-if="currentBooking" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Chi tiết giá chủ nhà</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Thông tin</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tiền phòng</td>
                        <td>{{ currentBooking.price_original | formatNumber }}</td>
                      </tr>
                      <tr>
                        <td>Phụ thu khách</td>
                        <td>{{ currentBooking.total_fee - currentBooking.price_original - currentBooking.additional_fee - currentBooking.service_fee + currentBooking.price_discount | formatNumber }}</td>
                      </tr>
                      <tr>
                        <td>Chủ nhà giảm giá</td>
                        <td>{{currentBooking.price_discount | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Chủ nhà phụ thu</td>
                        <td>{{currentBooking.additional_fee | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Dọn dẹp</td>
                        <td>{{currentBooking.service_fee | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Tổng cộng</td>
                        <td>{{currentBooking.total_fee | formatNumber}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--end::Section-->
            </div>

            <!--end::Form-->
          </div>
        </sweet-modal>

        <sweet-modal ref="merchant_info" overlay-theme="dark">
          <div v-if="currentBooking" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Thông tin chủ nhà</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Nội dung</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tên chủ nhà</td>
                        <td>{{ currentBooking.merchant.data.name }}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{{ currentBooking.merchant.data.email }}</td>
                      </tr>
                      <tr>
                        <td>Số điện thoại</td>
                        <td>{{ currentBooking.merchant.data.phone }}</td>
                      </tr>
                      <tr>
                        <td>Tên chủ TK</td>
                        <td>{{ currentBooking.merchant.data.account_holder }}</td>
                      </tr>
                      <tr>
                        <td>Số TK</td>
                        <td>{{ currentBooking.merchant.data.account_number }}</td>
                      </tr>
                      <tr>
                        <td>Ngân hàng</td>
                        <td>{{ currentBooking.merchant.data.account_branch }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--end::Section-->
            </div>

            <!--end::Form-->
          </div>
        </sweet-modal>

        <sweet-modal ref="update_minor_modal" overlay-theme="dark">
          <div class="card" v-if="update_booking">
            <div class="card-header">
              <h5>#{{ update_booking.uuid }}</h5>
            </div>
            <div class="card-body" style="min-height: 200px;">
              <multiselect
                v-if="option === 'payment'"
                v-model="update_payment_status"
                label="title"
                :options="paymentList"
                :searchable="true"
                :show-labels="true"
              />
              <multiselect
                v-if="option === 'status'"
                v-model="update_booking_status"
                label="title"
                :options="statusList"
                :searchable="true"
                :show-labels="true"
              />
            </div>
          </div>
          <button
            v-if="option === 'status'"
            slot="button"
            type="button"
            class="btn btn-success"
            @click="submitUpdateBookingStatus()"
          >Cập nhập</button>
          <button
            v-if="option === 'payment'"
            slot="button"
            type="button"
            class="btn btn-success"
            @click="submitUpdatePaymentStatus()"
          >Cập nhập</button>
          <button
            slot="button"
            type="button"
            class="btn btn-success"
            @click="closeUpdateModal()"
          >Đóng</button>
        </sweet-modal>

        <sweet-modal ref="money_update" overlay-theme="dark">
          <div class="card" v-if="update_booking">
            <div class="card-header">
              <h5>#{{ update_booking.uuid }}</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group" v-if="option === 'discount'">
                  <label>Chủ nhà giảm giá</label>
                  <input
                    @keydown.enter.prevent="submitUpdatePrice"
                    v-model="update_booking.price_discount"
                    type="number"
                    class="form-control"
                    placeholder="Nhập giá"
                  />
                  <label>Admin giảm giá</label>
                  <input
                    @keydown.enter.prevent="submitUpdatePrice"
                    v-model="update_booking.admin_discount"
                    type="number"
                    class="form-control"
                    placeholder="Nhập giá"
                  />
                </div>

                <div class="form-group" v-if="option === 'surcharge'">
                  <label>Chủ nhà phụ thu</label>
                  <input
                    @keydown.enter.prevent="submitUpdateSurcharge"
                    v-model="update_booking.additional_fee"
                    type="number"
                    class="form-control"
                    placeholder="Nhập giá"
                  />
                  <label>Admin phụ thu</label>
                  <input
                    @keydown.enter.prevent="submitUpdateSurcharge"
                    v-model="update_booking.admin_surcharge"
                    type="number"
                    class="form-control"
                    placeholder="Nhập giá"
                  />
                </div>
              </form>
            </div>
          </div>
          <button
            v-if="option === 'discount'"
            slot="button"
            type="button"
            class="btn btn-success"
            @click="submitUpdateDiscount"
          >Cập nhật</button>
          <button
            v-if="option === 'surcharge'"
            slot="button"
            type="button"
            class="btn btn-success"
            @click="submitUpdateSurcharge"
          >Cập nhật</button>
        </sweet-modal>
      </div>

      <!--end:: Booking List-->
      <pagination @clicked="reloadData" :total-pages="totalPages" :current-page="currentPage" />
      <div
        v-tooltip="'Back to top'"
        @click="scrollToTop"
        id="kt_scrolltop"
        class="kt-scrolltop"
        style="display:flex !important;opacity: 1 !important; background-color: #366cf37a !important"
      >
        <i class="flaticon2-up"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../../../services/auth';
import * as animationData from '../../loading/yay_yay_yay.json';
import Lottie from 'vue-lottie';
import { format, constant, filters } from '../../../helpers/mixins';
import { SweetModal } from 'sweet-modal-vue';
import Multiselect from 'vue-multiselect';
import Pagination from '../../../components/paginate/ServerPagination';
import Datepicker from 'vuejs-datepicker';

export default {
  components: { Lottie, SweetModal, Multiselect, Pagination, Datepicker },
  install(Vue, options) {
    Vue.component('SweetModal', SweetModal);
  },
  data() {
    return {
      bookings: [],
      currentBooking: null,
      option: '',
      defaultOptions: {
        animationData: animationData,
      },
      permissions: 'booking.view',
      totalPages: null,
      currentPage: null,
      count: null,
      merchants: [],
      merchant_id: null,
      room_id: null,
      booking_code: null,
      q: null,
      loading: true,
      update_booking_status: null,
      update_payment_status: null,
      update_booking: null,
      date_start: null,
      date_end: null,
      format: 'yyyy-MM-dd',
      filter_status: {
        id: 0,
      },
      status_list: [
        {
          id: 0,
          name: 'Tất cả',
        },
        {
          id: 2,
          name: 'Xác nhận',
        },
        {
          id: 4,
          name: 'Checkout',
        },
        {
          id: 1,
          name: 'Đơn mới',
        },
        {
          id: 5,
          name: 'Đã hủy',
        },
      ],
      disabledDateEnd: {
        to: '',
      },
    };
  },
  mixins: [format, constant],
  methods: {
    async getBookings({ page, filter, sort }) {
      this.loading = true;
console.log(this.filter_status.id);
      let date_start =
        this.date_start !== null
          ? this.date_start.toISOString().substr(0, 10)
          : '';
      let date_end =
        this.date_end !== null ? this.date_end.toISOString().substr(0, 10) : '';
      try {
        const response = await axios.get(`bookings`, {
          params: {
            include: 'room.details,merchant,booking_status.user',
            merchant_id:
              this.merchant_id != null ? this.merchant_id.id : this.merchant_id,
            room_id: this.room_id,
            booking_code: this.booking_code,
            date_start: date_start,
            date_end: date_end,
            status: this.filter_status.id == 0 ? '' : this.filter_status.id,
            q: this.q,
            page: page,
            limit: 10,
          },
        });
        console.log(response.data.data);
        let paginate = response.data.meta.pagination;
        this.currentPage = paginate.current_page;
        this.totalPages = paginate.total_pages;
        this.count = paginate.count;
        this.bookings = response.data.data;
        this.loading = false;
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Dữ liệu danh sách booking hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },

    async getMerchants() {
      try {
        const response = await axios.get(`get-all-merchant`, {
          params: {
            limit: -1,
            is_owner: 1,
          },
        });
        this.merchants = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr['error']('There was an error', 'Error');
        }
      }
    },
    reloadData(page) {
      this.getBookings({ page });
    },
    openAdminPrice(booking) {
      this.currentBooking = booking;
      this.$refs.admin_price[0].open();
    },
    openMerchantPrice(booking) {
      this.currentBooking = booking;
      this.$refs.merchant_price[0].open();
    },
    openMerchantInfo(booking) {
      this.currentBooking = booking;
      this.$refs.merchant_info[0].open();
    },
    scrollToTop() {
      return window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    },
    showModalUpdateStatus(booking) {
      this.option = 'status';
      this.update_booking = booking;
      this.$refs.update_minor_modal[0].open();
    },
    showModalUpdatePayment(booking) {
      this.option = 'payment';
      this.update_booking = booking;
      this.$refs.update_minor_modal[0].open();
    },
    async submitUpdateBookingStatus() {
      try {
        let status = this.update_booking_status.value;
        // if (status !== 5) {
        const response = await axios.put(
          `bookings/status-update/${this.update_booking.id}?option=status`,
          {
            status: status,
          },
        );
        this.update_booking_status = null;
        this.$refs.update_minor_modal[0].close();
        this.reloadData(this.currentPage);
        // } else {
        //   this.$refs.update_minor_modal[0].close();
        //   this.showModalReasonCancel();
        // }
        window.toastr['success'](
          'Cập nhật trạng thái đặt phòng thành công',
          'Success',
        );
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Cập nhật thất bại, làm ơn kiểm tra lại thông tin',
            'Error',
          );
        }
      }
    },
    async submitUpdatePaymentStatus() {
      try {
        let payment_status = this.update_payment_status.value;
        const response = await axios.put(
          `bookings/status-update/${
            this.update_booking.id
          }?option=payment_status`,
          {
            payment_status: payment_status,
          },
        );
        this.update_payment_status = null;
        this.$refs.update_minor_modal[0].close();
        this.reloadData(this.currentPage);
        window.toastr['success']('Cập nhật thanh toán thành công', 'Success');
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Cập nhật thất bại, làm ơn kiểm tra lại thông tin',
            'Error',
          );
        }
      }
    },
    showModalDiscount(booking) {
      this.option = 'discount';
      this.update_booking = booking;
      this.$refs.money_update[0].open();
    },
    showModalSurcharge(booking) {
      this.option = 'surcharge';
      this.update_booking = booking;
      this.$refs.money_update[0].open();
    },
    async submitUpdateDiscount() {
      try {
        let price_discount = this.update_booking.price_discount;
        let admin_discount = this.update_booking.admin_discount;
        const response = await axios.put(
          `bookings/money-update/${this.update_booking.id}`,
          {
            discount: {
              admin_discount: admin_discount,
              price_discount: price_discount,
            },
          },
        );
        this.update_booking = {};
        this.$refs.money_update[0].close();
        this.reloadData(this.currentPage);
        window.toastr['success']('Cập nhật thành công', 'Success');
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Cập nhật thất bại, làm ơn kiểm tra lại thông tin',
            'Error',
          );
        }
      }
    },
    async submitUpdateSurcharge() {
      try {
        let additional_fee = this.update_booking.additional_fee;
        let admin_surcharge = this.update_booking.admin_surcharge;
        const response = await axios.put(
          `bookings/money-update/${this.update_booking.id}`,
          {
            surcharge: {
              admin_surcharge: admin_surcharge,
              additional_fee: additional_fee,
            },
          },
        );
        this.update_booking = {};
        this.$refs.money_update[0].close();
        this.reloadData(this.currentPage);
        window.toastr['success']('Cập nhật thành công', 'Success');
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Cập nhật thất bại, làm ơn kiểm tra lại thông tin',
            'Error',
          );
        }
      }
    },

    async applyFilter(page) {
      await this.getBookings({
        page,
      });
    },

    async resetFilter(page) {
      this.q = '';
      this.date_start = null;
      this.date_end = null;
      this.filter_status = {
        id: 0,
      };
      this.merchant = {
        id: '',
      };
      await this.getBookings({
        page,
      });
    },
    exportExcel() {
      let date_start =
        this.date_start !== null
          ? this.date_start.toISOString().substr(0, 10)
          : '';
      let date_end =
        this.date_end !== null ? this.date_end.toISOString().substr(0, 10) : '';
      location.assign(
        `https://dev.westay.vn/api/export-data/bookings?q=${
          this.q != null ? this.q : ''
        }&merchant_id=${
          this.merchant_id != null ? this.merchant_id.id : this.merchant_id
        }&room_id=${
          this.room_id != null ? this.room_id : ''
        }&date_start=${date_start}&date_end=${date_end}&status=${
          this.filter_status.id == 0 ? '' : this.filter_status.id
        }&booking_code=${this.booking_code != null ? this.booking_code : ''}`,
      );
      // console.log(test);
    },
    closeUpdateModal() {
      this.$refs.update_minor_modal[0].close();
    },
    nameWithPhone({ name, phone }) {
      return `${name} — [${phone}]`;
    },
  },
  watch: {
    date_start: {
      handler(val) {
        this.disabledDateEnd.to = val;
      },
      deep: true,
    },
  },
  mounted() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403');
          } else {
            this.getBookings({});
            this.getMerchants();
          }
        });
      }
    });
  },
};
</script>

<style scoped>
/* @import '/metronic/assets/plugins/custom/jstree/dist/themes/default/style.css'; */
</style>>
