<template>
  <div class="kt-container kt-grid__item kt-grid__item--fluid">
    <div class="row" v-if="room">
      <div class="col-lg-12">
        <div class="kt-portlet">
          <div class="kt-portlet__head">
            <div class="kt-portlet__head-label">
              <h3 class="kt-portlet__head-title">
                Đặt phòng:
                <b>{{room ? room.details.data[0].name : ''}}</b>
              </h3>
            </div>
          </div>
          <!--begin::Form-->
          <form class="kt-form kt-form--label-right">
            <div class="kt-portlet__body">
              <div class="form-group row">
                <div class="col-lg-4">
                  <label class>Loại đặt phòng:</label>
                  <div class="kt-radio-inline">
                    <label class="kt-radio kt-radio--solid">
                      <input
                        v-if="room.rent_type == 1 | room.rent_type == 3"
                        type="radio"
                        name="example_2"
                        value="1"
                        v-model.number="booking.booking_type"
                      /> Theo giờ
                      <span></span>
                    </label>
                    <label class="kt-radio kt-radio--solid">
                      <input
                        type="radio"
                        name="example_2"
                        checked
                        value="2"
                        v-model.number="booking.booking_type"
                      /> Theo ngày
                      <span></span>
                    </label>
                  </div>
                </div>
                <div class="col-lg-4">
                  <label>Ngày đặt phòng:</label>

                  <homestay-date-picker
                    required
                    v-if="booking.booking_type == 2 && blocked_dates !== null"
                    format="DD/MM/YYYY"
                    :disabledDates="blocked_dates"
                    :minNights="1"
                    @check-in-changed="setStartDate"
                    @check-out-changed="setEndDate"
                    :enableCheckout="true"
                    :showYear="true"
                    name="Ngày đặt phòng"
                  ></homestay-date-picker>

                  <datepicker
                    v-if="booking.booking_type == 1"
                    :disabled-dates="disabledDatesCheckin"
                    name="checkin_date"
                    input-class="form-control"
                    data-vv-as="Ngày nhận phòng"
                    v-validate="'required'"
                    v-model="checkin"
                    :format="format"
                  />
                </div>
                <div class="col-lg-4">
                  <label class>Email:</label>
                  <input
                    name="email"
                    class="form-control"
                    placeholder="Enter email"
                    data-vv-as="Email"
                    v-validate="'required|email'"
                    v-model="booking.email"
                  />
                  <span class="form-text text-danger">{{errors.first('email')}}</span>
                </div>
                <div class="col-lg-4" v-if="booking.booking_type == 1"></div>
                <div class="col-lg-4" v-if="booking.booking_type == 1">
                  <label>Giờ nhận phòng</label>
                  <multiselect
                    :allow-empty="false"
                    name="checkin_hour"
                    v-model="checkin_hour"
                    v-validate="booking.booking_type == 1 ? 'required' : ''"
                    data-vv-as="Giờ nhận phòng"
                    :options="hoursData"
                    :searchable="true"
                    :show-labels="true"
                  />
                </div>
                <div class="col-lg-4" v-if="booking.booking_type == 1">
                  <label>Giờ trả phòng</label>

                  <multiselect
                    :allow-empty="false"
                    name="checkout_hour"
                    v-validate="booking.booking_type == 1 ? 'required' : ''"
                    v-model="checkout_hour"
                    data-vv-as="Giờ trả phòng"
                    :options="hoursData"
                    :searchable="true"
                    :show-labels="true"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-4">
                  <label class>Số điện thoại:</label>
                  <input
                    name="phone"
                    class="form-control"
                    data-vv-as="Số điện thoại"
                    v-validate="'required|min:7|max:15'"
                    v-model="booking.phone"
                    placeholder="Enter contact number"
                  />
                  <span class="form-text text-danger">{{errors.first('phone')}}</span>
                </div>
                <div class="col-lg-4">
                  <label class>Họ và tên:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <input
                      name="full_name"
                      data-vv-as="Họ và tên"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      v-model="booking.name"
                    />
                    <span class="form-text text-danger">{{errors.first('full_name')}}</span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <label>Giới tính:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <select v-model="booking.sex" class="form-control ls-select2">
                      <option selected="selected" value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Khác</option>
                      <option value="0">Không xác định</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-4">
                  <label class>Số khách:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <input
                      type="text"
                      name="number_guest"
                      class="form-control"
                      v-validate="'required|numeric|min_value:1|max_value:'+ max_number_guest"
                      data-vv-as="Số khách"
                      v-model.number="booking.number_of_guests"
                    />
                    <span class="form-text text-danger">{{errors.first('number_guest')}}</span>
                  </div>
                </div>

                <div class="col-lg-4">
                  <label>Nguồn đặt phòng:</label>
                  <div class="input-group">
                    <multiselect
                      :allow-empty="false"
                      name="booking_source"
                      v-model="source"
                      v-validate="'required'"
                      data-vv-as="Nguồn đặt phòng"
                      label="title"
                      :options="sourceList"
                      :searchable="true"
                      :show-labels="true"
                    />
                    <span class="form-text text-danger">{{errors.first('booking_source')}}</span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <label>Sinh nhật:</label>
                  <div class="input-group">
                    <input
                      type="date"
                      v-model="booking.birthday"
                      :format="format"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!--end::Form-->
        </div>
        <div class="kt-portlet">
          <!--begin::Form-->
          <form class="kt-form kt-form--label-right">
            <div class="kt-portlet__body">
              <div class="form-group row">
                <div class="col-lg-4">
                  <label>Hình thức thanh toán:</label>
                  <multiselect
                    :allow-empty="false"
                    v-model="payment_method"
                    value="value"
                    label="title"
                    :options="paymentMethodList"
                    v-validate="'required'"
                    data-vv-as="Hình thức thanh toán"
                    name="payment_method"
                    :searchable="true"
                    :show-labels="true"
                  />
                  <span class="form-text text-danger">{{errors.first('payment_method')}}</span>
                </div>
                <div class="col-lg-4">
                  <label class>Trạng thái thanh toán:</label>
                  <multiselect
                    :allow-empty="false"
                    v-model="payment_status"
                    value="value"
                    label="title"
                    :options="paymentList"
                    v-validate="'required'"
                    data-vv-as="Trạng thái thanh toán"
                    name="payment_status"
                    :searchable="true"
                    :show-labels="true"
                  />
                  <span class="form-text text-muted">{{errors.first('payment_status')}}</span>
                </div>
                <div class="col-lg-4">
                  <label class>Trạng thái đặt phòng:</label>
                  <multiselect
                    :allow-empty="false"
                    v-model="status"
                    value="value"
                    label="title"
                    :options="statusList"
                    name="status"
                    v-validate="'required'"
                    data-vv-as="Trạng thái booking"
                    :searchable="true"
                    :show-labels="false"
                  />
                  <span class="form-text text-muted">{{errors.first('status')}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-3">
                  <label class>Chủ nhà giảm giá:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <vue-numeric
                      separator="."
                      v-model="booking.price_discount"
                      class="form-control"
                      data-vv-as="Giảm giá"
                      v-validate="'numeric'"
                      name="price_discount"
                    ></vue-numeric>
                  </div>
                  <span class="form-text text-danger">{{errors.first('price_discount')}}</span>
                </div>
                <div class="col-lg-3">
                  <label class>Chủ nhà phụ thu:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <vue-numeric
                      separator="."
                      v-model="booking.additional_fee"
                      class="form-control"
                      data-vv-as="Phụ thu chủ nhà"
                      v-validate="'numeric'"
                      name="additional_fee"
                    ></vue-numeric>
                  </div>
                  <span class="form-text text-danger">{{errors.first('additional_fee')}}</span>
                </div>
                <div class="col-lg-3">
                  <label>Admin giảm giá:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <vue-numeric
                      separator="."
                      v-model="booking.admin_discount"
                      class="form-control"
                      data-vv-as="Giảm giá Westay"
                      v-validate="'numeric'"
                      name="admin_discount"
                    ></vue-numeric>
                  </div>
                  <span class="form-text text-danger">{{errors.first('admin_discount')}}</span>
                </div>
                <div class="col-lg-3">
                  <label>Admin phụ thu:</label>
                  <div class="kt-input-icon kt-input-icon--right">
                    <vue-numeric
                      separator="."
                      v-model="booking.admin_surcharge"
                      class="form-control"
                      data-vv-as="Phụ thu Westay"
                      v-validate="'numeric'"
                      name="admin_surcharge"
                    ></vue-numeric>
                  </div>
                  <span class="form-text text-danger">{{errors.first('admin_surcharge')}}</span>
                </div>
              </div>
            </div>
            <div class="kt-portlet__foot">
              <div class="kt-form__actions">
                <div class="row">
                  <div class="col-lg-4"></div>
                  <div class="col-lg-8">
                    <button
                      type="reset"
                      @click="previewBooking"
                      class="btn btn-primary"
                    >Tạo đặt phòng</button>
                    <button type="reset" class="btn btn-secondary">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <!--end::Form-->
          <sweet-modal ref="booking_preview_modal" overlay-theme="dark" modal-theme="light">
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header bg-warning">
                    <h6>
                      <i class="icon-fa icon-fa-warning"></i> Xác nhận lại giá trị đặt phòng
                    </h6>
                  </div>
                  <div class="card-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Thời gian</td>
                          <td>
                            <span
                              v-if="('days' in booking)"
                              class="label label-success"
                            >{{ booking.days + ' Ngày'}}</span>
                            <span
                              v-if="('hours' in booking)"
                              class="label label-success"
                            >{{ booking.hours + ' Giờ'}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Check-in</td>
                          <td>{{booking.checkin}}</td>
                        </tr>
                        <tr>
                          <td>Check-in</td>
                          <td>{{booking.checkout}}</td>
                        </tr>
                        <tr>
                          <td>Giá gốc</td>
                          <td>
                            <span
                              class="label label-danger"
                            >{{booking.price_original | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr v-if="booking.price_discount > 0">
                          <td>Giảm giá Chủ nhà</td>
                          <td>
                            <span
                              class="label label-success"
                            >{{booking.price_discount | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr v-if="booking.additional_fee > 0">
                          <td>Phụ thu Chủ nhà</td>
                          <td>
                            <span
                              class="label label-danger"
                            >{{booking.additional_fee | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr v-if="booking.admin_discount > 0">
                          <td>Giảm giá Westay</td>
                          <td>
                            <span
                              class="label label-success"
                            >{{booking.admin_discount | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr v-if="booking.admin_surcharge > 0">
                          <td>Phụ thu Westay</td>
                          <td>
                            <span
                              class="label label-danger"
                            >{{booking.admin_surcharge | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Phí dịch vụ</td>
                          <td>
                            <span class="label label-success">{{booking.service_fee | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Phụ thu thêm khách</td>
                          <td>
                            <span
                              class="label label-success"
                            >{{booking.charge_additional_guest | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Phụ thu thêm giờ</td>
                          <td>
                            <span
                              class="label label-success"
                            >{{booking.charge_additional_hour | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Tổng tiền Westay</td>
                          <td>
                            <span class="label label-danger">
                              <b>{{booking.admin_total_fee | formatNumber}}</b>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Tổng tiền chủ nhà</td>
                          <td>
                            <span class="label label-danger">
                              <b>{{booking.total_fee | formatNumber}}</b>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer">
                    <button
                      :disabled="isLoading"
                      slot="button"
                      @click="onSubmit"
                      type="button"
                      class="btn btn-primary"
                    >Xác nhận</button>
                    <!-- <button
                      slot="button"
                      @click="closePreviewBookingModal"
                      type="button"
                      class="btn btn-info"
                    >Đóng</button>-->
                  </div>
                </div>
              </div>
            </div>
          </sweet-modal>
        </div>
      </div>
    </div>
    <lottie v-else :options="defaultOptions" :height="150" :width="150"></lottie>
  </div>
</template>

<script>
import HomestayDatePicker from 'vue-hotel-datepicker';
import Auth from '../../../services/auth';
import moment from 'moment';
import { hoursList, format, constant } from '../../../helpers/mixins';
import Multiselect from 'vue-multiselect';
import { SweetModal } from 'sweet-modal-vue';
import Datepicker from 'vuejs-datepicker';
import Lottie from 'vue-lottie';
import * as animationData from '../../loading/gift.json';

export default {
  mixins: [hoursList, format, constant],

  components: {
    HomestayDatePicker,
    Multiselect,
    SweetModal,
    Datepicker,
    Lottie,
  },
  data() {
    return {
      format: 'yyyy-MM-dd',
      blocked_dates: null,
      defaultOptions: {
        animationData: animationData,
      },
      permissions: 'booking.create',
      room: null,
      isLoading: false,
      booking: {
        birthday: null,
        payment_status: 3,
        price_discount: 0,
        admin_discount: 0,
        admin_surcharge: 0,
        coupon: '',
        additional_fee: 0,
        service_fee: 0,
        price_original: 0,
        coupon_discount: 0,
        charge_additional_hour: 0,
        charge_additional_guest: 0,
        total_fee: 0,
        status: 2,
        booking_type: 2,
        checkin: '',
        checkout: '',
      },
      max_number_guest: null,
      checkout_hour: null,
      checkin_hour: null,
      checkin: null,
      checkout: null,
      source: {
        value: 1,
        title: 'Trang fanpage',
      },
      payment_method: {
        value: 2,
        title: 'Chuyển khoản',
      },
      payment_status: {
        value: 3,
        title: 'Đã thanh toán',
      },
      status: {
        value: 2,
        title: 'Đã xác nhận',
      },

      disabledDatesCheckin: {
        to: new Date(new Date().setDate(new Date().getDate() - 1)),
        dates: [],
      },
    };
  },
  watch: {
    blocked_dates: {
      handler(val) {
        this.disabledDatesCheckin.dates = [];
        val.forEach(element => {
          this.disabledDatesCheckin.dates.push(new Date(element));
        });
      },
    },
    source: {
      handler(val) {
        this.booking.source = val.value;
      },
      deep: true,
    },
    payment_method: {
      handler(val) {
        this.booking.payment_method = val.value;
      },
      deep: true,
    },
    payment_status: {
      handler(val) {
        this.booking.payment_status = val.value;
      },
      deep: true,
    },
    status: {
      handler(val) {
        this.booking.status = val.value;
      },
      deep: true,
    },
  },
  methods: {
    async getRoom() {
      try {
        const response = await axios.get(`rooms/${this.$route.params.roomId}`, {
          params: {
            include: 'details,blocks',
          },
        });
        this.max_number_guest =
          response.data.data.max_guest +
          response.data.data.max_additional_guest;
        return (this.room = response.data.data);
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Dữ liệu phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async getRoomSchedules() {
      try {
        const response = await axios.get(
          `rooms/schedule/${this.$route.params.roomId}`,
        );
        this.blocked_dates = response.data.data.blocks;
        console.log(this.blocked_dates);
      } catch (error) {
        window.toastr['error'](
          'Dữ liệu ngày khóa phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
          'Error',
        );
      }
    },
    setStartDate(newCheckin) {
      if (newCheckin) {
        this.booking.checkin = moment(newCheckin).format('DD-MM-YYYY');
      }
    },
    setEndDate(newCheckout) {
      if (newCheckout) {
        this.booking.checkout = moment(newCheckout).format('DD-MM-YYYY');
      }
    },
    previewBooking() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post(`bookings/price-calculator`, {
              additional_fee: this.booking.additional_fee,
              price_discount: this.booking.price_discount,
              admin_discount: this.booking.admin_discount,
              admin_surcharge: this.booking.admin_surcharge,
              room_id: this.room.id,
              checkin:
                this.booking.booking_type == 2
                  ? this.booking.checkin + ' ' + this.room.checkin
                  : this.checkin.toISOString().substr(0, 10) +
                    ' ' +
                    this.checkin_hour,
              checkout:
                this.booking.booking_type == 2
                  ? this.booking.checkout + ' ' + this.room.checkout
                  : this.checkin.toISOString().substr(0, 10) +
                    ' ' +
                    this.checkout_hour,
              coupon: this.booking.coupon,
              number_of_guests: this.booking.number_of_guests,
              booking_type: this.booking.booking_type,
            })
            .then(response => {
              console.log(response.data.data);
              if (response.data.data) {
                if ('days' in response.data.data) {
                  this.booking.days = response.data.data.days;
                } else {
                  this.booking.days = 0;
                  this.booking.hours = response.data.data.hours;
                }
                this.booking.additional_fee = response.data.data.additional_fee;
                this.booking.price_discount = response.data.data.price_discount;
                this.booking.price_original = response.data.data.price_original;
                this.booking.total_fee = response.data.data.total_fee;
                this.booking.charge_additional_guest =
                  response.data.data.charge_additional_guest;
                this.booking.charge_additional_hour =
                  response.data.data.charge_additional_hour;
                this.booking.service_fee = response.data.data.service_fee;
                this.booking.admin_total_fee =
                  response.data.data.admin_total_fee;
                this.$refs.booking_preview_modal.open();
              }
            })
            .catch(error => {
              console.log(error.response.data.data);
              this.$swal(
                'Có lỗi xảy ra',
                error.response.data.data.exception,
                'error',
              );
            });
        } else {
          return window.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
    },

    onSubmit() {
      this.isLoading = true;
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post(`bookings`, {
              name: this.booking.name,
              phone: this.booking.phone,
              sex: this.booking.sex,
              birthday:
                this.booking.birthday !== null
                  ? this.booking.birthday.toISOString().substr(0, 10)
                  : null,
              email: this.booking.email,
              email_received: this.booking_for_other
                ? this.booking.email_received
                : this.booking.email,
              name_received: this.booking_for_other
                ? this.booking.name_received
                : this.booking.name,
              phone_received: this.booking_for_other
                ? this.booking.phone_received
                : this.booking.phone,
              room_id: this.room.id,
              checkin:
                this.booking.booking_type == 2
                  ? this.booking.checkin + ' ' + this.room.checkin
                  : this.checkin.toISOString().substr(0, 10) +
                    ' ' +
                    this.checkin_hour,
              checkout:
                this.booking.booking_type == 2
                  ? this.booking.checkout + ' ' + this.room.checkout
                  : this.checkin.toISOString().substr(0, 10) +
                    ' ' +
                    this.checkout_hour,
              additional_fee: this.booking.additional_fee,
              price_discount: this.booking.price_discount,
              money_received: this.booking.money_received,
              admin_surcharge: this.booking.admin_surcharge,
              admin_discount: this.booking.admin_discount,
              coupon_discount: this.booking.coupon_discount,
              coupon:
                this.booking.coupon_discount > 0 ? this.booking.coupon : null,
              note: this.booking.note,
              status:
                this.booking.status == null
                  ? this.status.value
                  : this.booking.status,
              number_of_guests: this.booking.number_of_guests,
              booking_type: this.booking.booking_type,
              payment_method:
                this.booking.payment_method == null
                  ? this.payment_method.value
                  : this.booking.payment_method,
              payment_status:
                this.booking.payment_status == null
                  ? this.payment_status.value
                  : this.booking.payment_status,
              source:
                this.booking.source == null
                  ? this.source.value
                  : this.booking.source,
              confirm: this.booking.confirm,
              staff_id: this.current_user.id,
            })
            .then(response => {
              this.isLoading = false;
              this.$refs.booking_preview_modal.close();
              this.$swal({
                title: 'Thành công',
                text: 'Đã tạo đặt phòng ngắn hạn',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
                cancelButtonText: 'Quay lại',
                showCloseButton: false,
                showLoaderOnConfirm: true,
              }).then(result => {
                this.$router.push('/admin/bookings/list');
              });
            })
            .catch(error => {
              this.isLoading = false;
              let err = error.response.data.data.errors;
              window.toastr['error'](err, 'Error');
            });
        } else {
          this.isLoading = false;
          return window.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
    },
  },
  mounted() {
    Auth.getCurrentUser().then(result => {
      this.current_user = result;
    });
    Auth.getProfile().then(res => {
      console.log(res);

      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403'); // push về page 403
          } else {
            this.getRoom();
            this.getRoomSchedules();
          }
        });
      }
    });
  },
};
</script>

<style>
</style>