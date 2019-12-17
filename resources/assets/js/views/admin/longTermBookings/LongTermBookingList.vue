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
          >Danh sách đặt phòng dài hạn</h3>
        </div>
      </div>
    </div>
    <div class="kt-container kt-grid__item kt-grid__item--fluid" style="margin-top: 25px">
      <!-- Begin Header Page -->

      <!-- End Header Page -->
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
                  <label>Mã phòng dài hạn</label>
                  <input
                    v-model="long_term_room_id"
                    type="text"
                    class="form-control"
                    placeholder="Mã phòng"
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
                    v-model="booking_status"
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
                  <a href="#" class="kt-widget__username">
                    #{{booking.uuid}} - {{booking.id}}
                    <i class="flaticon2-correct kt-font-success"></i>
                  </a>
                  <div class="kt-widget__action">
                    <!-- <button
                    type="button"
                    class="btn btn-label-success btn-sm btn-upper"
                    @click="showModalSurcharge(booking)"
                  >Phụ thu</button>&nbsp;
                  <button
                    type="button"
                    class="btn btn-brand btn-sm btn-upper"
                    @click="showModalDiscount(booking)"
                    >Giảm giá</button>-->
                  </div>
                </div>
                <div class="kt-widget__subhead">
                  <a href="#">
                    <i class="flaticon2-user-1"></i>
                    {{booking.name}}
                  </a>
                  <a href="#">
                    <i class="flaticon2-phone"></i>
                    {{booking.phone}}
                  </a>
                  <a href="#">
                    <i class="flaticon2-new-email"></i>
                    {{booking.email}}
                  </a>
                </div>
                <div class="kt-widget__info">
                  <div class="kt-widget__desc" style="font-size: 1.15rem">
                    <p>Số khách: {{booking.guests}}</p>
                    <p>
                      Số lượng hợp đồng: {{booking.contracts.data.length ? booking.contracts.data.length : 1}}
                      <i
                        class="flaticon-questions-circular-button"
                        v-tooltip.top-center="'Bao gồm hợp đồng ban đầu và số lượng hợp đồng tái ký'"
                      ></i>
                    </p>
                    <p>Ngày tới ở: {{booking.latest_move_in}}</p>
                    <p>Ngày chuyển đi: {{booking.latest_move_out}}</p>
                    <hr />
                    <a
                      :href="`https://westay.vn/long-term-room/${booking.long_term_room_id}`"
                      target="_blank"
                    >Căn hộ: {{booking.longTermRoom.data.about_room.name}}</a>
                  </div>

                  <div class="kt-widget__text" style="font-size:1.2rem;">
                    <p>Kỳ thanh toán tiếp theo: {{booking.contracts.data[0].next_payment_due.payment_due_date}}</p>
                    <p>Giá trị: {{booking.contracts.data[0].next_payment_due.payment_amount | formatNumber}}</p>
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
                  class="kt-widget__details"
                  @click="openAllContract(booking.contracts.data)"
                  v-tooltip.top-center="'Click để xem chỉ tiết'"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">Hợp đồng</span>
                  <span class="kt-widget__value">Xem chi tiết</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-confetti"></i>
                </div>
                <div
                  @click="openCurrentContract(booking.contracts.data[booking.contracts.data.length - 1])"
                  class="kt-widget__details"
                  v-tooltip.top-center="'Click để xem chỉ tiết'"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">Hợp đồng hiện tại</span>
                  <span
                    v-if="booking.contracts.data.length"
                    class="kt-widget__value"
                  >{{booking.contracts.data[booking.contracts.data.length - 1].uuid }}</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-file-2"></i>
                </div>
                <div
                  class="kt-widget__details"
                  style="cursor:pointer;"
                  @click="showModalUpdateStatusContract(booking.contracts.data[booking.contracts.data.length - 1])"
                >
                  <span class="kt-widget__title">Trạng thái HĐ</span>
                  <a
                    v-if="booking.contracts.data.length"
                    class="kt-widget__value kt-font-brand"
                  >{{booking.contracts.data[booking.contracts.data.length - 1].status_txt}}</a>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-chat-1"></i>
                </div>
                <div
                  class="kt-widget__details"
                  style="cursor:pointer;"
                  @click="showModalPaymentPeriod(booking.contracts.data[booking.contracts.data.length - 1])"
                >
                  <span class="kt-widget__title">Kỳ thanh toán</span>
                  <a class="kt-widget__value kt-font-brand">Chi tiết</a>
                </div>
              </div>
              <!-- <div class="kt-widget__item">
              <div class="kt-widget__icon">
                <i class="flaticon-chat-1"></i>
              </div>
              <div class="kt-widget__details">
                <span class="kt-widget__title">Xử lý</span>
                <span
                  class="kt-widget__value kt-font-brand"
                >{{booking.booking_status.data.staff_id !== null ? booking.booking_status.data.user.data.name : ''}}</span>
              </div>
              </div>-->

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
        <sweet-modal ref="payment_period" overlay-theme="dark">
          <div v-if="allPaymentPeriod" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3
                  class="kt-portlet__head-title"
                >Tất cả kỳ thanh toán của hợp đồng: {{allPaymentPeriod.uuid}}</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Kỳ hạn</th>
                        <th>Giá trị</th>
                        <th>Trạng thái</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(p_period) in allPaymentPeriod.payment.payment_period"
                        :key="p_period.payment_due_date"
                        :class="p_period.payment_status == 1 ? 'table-danger' : p_period.payment_status == 3 ? 'table-success' : ''"
                      >
                        <td>{{p_period.id}}</td>
                        <td>{{p_period.payment_due_date}}</td>
                        <td>{{ p_period.payment_amount | formatNumber }}</td>
                        <td
                          :style="p_period.payment_status == 1 ? 'color:red;font-weight:600' : p_period.payment_status == 3 ? 'color: green;font-weight:600' : ''"
                        >{{ p_period.payment_status_txt }}</td>
                        <td v-if="p_period.payment_status == 0">
                          <button
                            @click="updatePaymentContract(p_period.id,'paid')"
                            type="button"
                            v-tooltip.top-center="'Xác nhận đã thanh toán'"
                            class="btn btn-success btn-sm btn-upper"
                          >Paid</button>&nbsp;
                          <button
                            @click="updatePaymentContract(p_period.id,'cancel')"
                            v-tooltip.top-center="'Cập nhật thanh toán thất bại'"
                            type="button"
                            class="btn btn-danger btn-sm btn-upper"
                          >Cancel</button>
                        </td>
                        <td v-if="p_period.payment_status == 1">
                          <button
                            @click="updatePaymentContract(p_period.id,'paid')"
                            type="button"
                            v-tooltip.top-center="'Xác nhận đã thanh toán'"
                            class="btn btn-success btn-sm btn-upper"
                          >Paid</button>&nbsp;
                          <button
                            @click="updatePaymentContract(p_period.id,'pending')"
                            v-tooltip.top-center="'Chờ thanh toán'"
                            type="button"
                            class="btn btn-warning btn-sm btn-upper"
                          >Pending</button>
                        </td>
                        <td v-if="p_period.payment_status == 3">
                          <button
                            @click="updatePaymentContract(p_period.id,'pending')"
                            type="button"
                            v-tooltip.top-center="'Chờ thanh toán'"
                            class="btn btn-warning btn-sm btn-upper"
                          >Pending</button>&nbsp;
                          <button
                            @click="updatePaymentContract(p_period.id,'cancel')"
                            v-tooltip.top-center="'Huỷ thanh toán'"
                            type="button"
                            class="btn btn-danger btn-sm btn-upper"
                          >Cancel</button>
                        </td>
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

        <sweet-modal ref="all_contracts" overlay-theme="dark">
          <div v-if="allContracts" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Tất cả hợp đồng của đơn đặt phòng</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Mã HĐ</th>
                        <th>Trạng thái</th>
                        <th>Kỳ hạn</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(contract,index) in allContracts"
                        :key="contract.uuid"
                        :class="contract.status == 5 ? 'table-danger' : contract.status == 4 ? 'table-success' : ''"
                      >
                        <td>{{index + 1}}</td>
                        <td>{{contract.uuid}}</td>
                        <td>{{ contract.status_txt }}</td>
                        <td>{{ `${contract.move_in} -> ${contract.move_out}` }}</td>
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

        <sweet-modal ref="current_contract" overlay-theme="dark">
          <div v-if="currentContract" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Thông tin hợp đồng: {{currentContract.uuid}}</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Giá trị</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mã HĐ</td>
                        <td>{{ currentContract.uuid}}</td>
                      </tr>
                      <tr>
                        <td>Giá trị</td>
                        <td>{{ currentContract.price_original | formatNumber }}</td>
                      </tr>
                      <tr>
                        <td>Đặt cọc</td>
                        <td>{{currentContract.price_with_fee - currentContract.price_original | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Tổng</td>
                        <td>{{currentContract.price_with_fee | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Thời gian ở</td>
                        <td>{{currentContract.range_stay}} ngày</td>
                      </tr>
                      <tr>
                        <td>Hiệu lực từ</td>
                        <td>{{currentContract.move_in}}</td>
                      </tr>
                      <tr>
                        <td>Hiệu lực tới</td>
                        <td>{{currentContract.move_out}}</td>
                      </tr>
                      <tr>
                        <td>Ngày tạo</td>
                        <td>{{currentContract.created_at}}</td>
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

        <sweet-modal ref="update_contract_status" overlay-theme="dark">
          <div class="card" v-if="contractToUpdate">
            <div class="card-header">
              <h5>#{{ contractToUpdate.uuid }}</h5>
            </div>
            <div class="card-body" style="min-height: 200px;">
              <multiselect
                v-model="update_booking_status"
                label="title"
                :options="statusList"
                :searchable="true"
                :show-labels="true"
              />
            </div>
          </div>
          <button
            slot="button"
            type="button"
            class="btn btn-success"
            @click="submitUpdateContractStatus()"
          >Cập nhập</button>
          <button
            slot="button"
            type="button"
            class="btn btn-success"
            @click="closeUpdateModal()"
          >Đóng</button>
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
      currentContract: null,
      contractToUpdate: null,
      allContracts: [],
      allPaymentPeriod: null,
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
      long_term_room_id: null,
      booking_code: null,
      q: null,
      loading: true,
      update_booking_status: null,
      update_payment_status: null,
      update_booking: null,
      date_start: null,
      date_end: null,
      format: 'yyyy-MM-dd',
      booking_status: {
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
      // this.loading = true;

      let date_start =
        this.date_start !== null
          ? this.date_start.toISOString().substr(0, 10)
          : '';
      let date_end =
        this.date_end !== null ? this.date_end.toISOString().substr(0, 10) : '';
      try {
        const response = await axios.get(`long-term-bookings`, {
          params: {
            include: 'longTermRoom,merchant,contracts',
            merchant_id:
              this.merchant_id != null ? this.merchant_id.id : this.merchant_id,
            long_term_room_id: this.long_term_room_id,
            booking_code: this.booking_code,
            date_start: date_start,
            date_end: date_end,
            status: this.booking_status.id == 0 ? '' : this.booking_status.id,
            q: this.q,
            page: page,
            limit: 10,
          },
        });
        // console.log(response.data.data);
        let paginate = response.data.meta.pagination;
        this.currentPage = paginate.current_page;
        this.totalPages = paginate.total_pages;
        this.count = paginate.count;
        this.bookings = response.data.data;
        // console.log(this.bookings);
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
    showModalPaymentPeriod(paymentPeriod) {
      this.allPaymentPeriod = paymentPeriod;
      this.$refs.payment_period[0].open();
    },
    openCurrentContract(contract) {
      this.currentContract = contract;
      this.$refs.current_contract[0].open();
    },
    openAllContract(allContracts) {
      this.allContracts = allContracts;
      this.$refs.all_contracts[0].open();
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
    showModalUpdateStatusContract(contractToUpdate) {
      this.option = 'status';
      this.contractToUpdate = contractToUpdate;
      this.$refs.update_contract_status[0].open();
    },
    showModalUpdatePayment(booking) {
      this.option = 'payment';
      this.update_booking = booking;
      this.$refs.update_minor_modal[0].open();
    },
    async submitUpdateContractStatus() {
      try {
        let status = this.update_booking_status.value;
        // if (status !== 5) {
        const response = await axios.put(
          `long-term-contracts/minor-update/${
            this.contractToUpdate.id
          }?option=status`,
          {
            status: status,
          },
        );
        this.update_booking_status = null;
        this.$refs.update_contract_status[0].close();
        this.reloadData(this.currentPage);
        // } else {
        // this.$refs.update_contract_status[0].close();
        // this.showModalReasonCancel();
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

    async updatePaymentContract(period_id, option) {
      try {
        const response = await axios.put(
          `long-term-contracts/minor-update/${
            this.allPaymentPeriod.id
          }?option=payment`,
          {
            payment: {
              payment_id: period_id,
              contract_uuid: this.allPaymentPeriod.uuid,
              payment_method: 1,
              payment_status:
                option === 'paid' ? 3 : option === 'cancel' ? 1 : 0,
            },
          },
        );
        this.$refs.payment_period[0].close();
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

    async applyFilter(page) {
      await this.getBookings({
        page,
      });
    },

    async resetFilter(page) {
      this.q = '';
      this.date_start = null;
      this.date_end = null;
      this.booking_status = {
        id: 0,
      };
      this.merchant = {
        id: '',
      };
      await this.getBookings({
        page,
      });
    },
    closeUpdateModal() {
      this.$refs.update_contract_status[0].close();
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
