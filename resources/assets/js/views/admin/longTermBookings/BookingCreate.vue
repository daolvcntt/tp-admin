<template>
  <div class="kt-container kt-grid__item kt-grid__item--fluid">
    <div class="row" v-if="room">
      <div class="col-lg-12">
        <div class="kt-portlet">
          <div class="kt-portlet__head">
            <div class="kt-portlet__head-label">
              <h3 class="kt-portlet__head-title">
                Đặt phòng dài hạn:
                <b>{{room ? room.about_room.name : ''}}</b>
              </h3>
            </div>
          </div>
          <!--begin::Form-->
          <form class="kt-form kt-form--label-right">
            <div class="kt-portlet__body">
              <div class="form-group row">
                <div class="col-lg-4">
                  <label>Ngày đặt phòng:</label>

                  <homestay-date-picker
                    required
                    v-if="blocked_dates"
                    format="DD/MM/YYYY"
                    :disabledDates="blocked_dates"
                    :minNights="30"
                    @check-in-changed="setStartDate"
                    @check-out-changed="setEndDate"
                    :enableCheckout="true"
                    :showYear="true"
                    name="Ngày đặt phòng"
                  ></homestay-date-picker>
                </div>
                <div class="col-lg-4">
                  <label class>Email:</label>
                  <input
                    name="email"
                    class="form-control"
                    placeholder="Enter email"
                    data-vv-as="Email"
                    v-validate="'email'"
                    v-model="booking.email"
                  />
                  <span class="form-text text-danger">{{errors.first('email')}}</span>
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
              <div class="form-group row">
                <div class="col-lg-4">
                  <label class>Số điện thoại:</label>
                  <input
                    name="phone"
                    class="form-control"
                    data-vv-as="Số điện thoại"
                    v-validate="'min:7|max:15'"
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
                  <div class="form-group">
                    <label>Ghi chú</label>
                    <input name="note" v-model="booking.note" class="form-control" />
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!--end::Form-->
        </div>
        <!--end::Form-->
        <sweet-modal ref="booking_preview_modal" overlay-theme="dark" modal-theme="light">
          <div class="row" v-if="preview_booking_price">
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
                            class="label label-success"
                          >{{ preview_booking_price.range_stay + ' Ngày'}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Giá trị đặt phòng</td>
                        <td>
                          <span
                            class="label label-danger"
                          >{{preview_booking_price.price_original | formatNumber}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Đặt cọc</td>
                        <td>
                          <span
                            class="label label-danger"
                          >{{preview_booking_price.deposit | formatNumber}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Phí dịch vụ</td>
                        <td>
                          <span
                            class="label label-success"
                          >{{preview_booking_price.service_fee | formatNumber}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Tổng tiền</td>
                        <td>
                          <span class="label label-danger">
                            <b>{{preview_booking_price.price_with_fee | formatNumber}}</b>
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
                </div>
              </div>
            </div>
          </div>
        </sweet-modal>
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
      room: null,
      permissions: 'booking.create',
      booking: {
        birthday: null,
        service_fee: 0,
        price_original: 0,
        status: 2,
        checkin: '',
        checkout: '',
        note: '',
      },
      preview_booking_price: null,
      max_number_guest: null,
      isLoading: false,
      source: {
        value: 1,
        title: 'Trang fanpage',
      },
    };
  },
  watch: {
    source: {
      handler(val) {
        this.booking.source = val.value;
      },
      deep: true,
    },
  },
  methods: {
    async getRoom() {
      try {
        const response = await axios.get(
          `long-term-rooms/${this.$route.params.roomId}`,
        );
        this.max_number_guest =
          response.data.data.guests.recommendation +
          response.data.data.guests.max_additional_guest;
        console.log(response.data.data);
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
    async getLongTermRoomSchedule() {
      try {
        const response = await axios.get(
          `long-term-rooms/schedule/${this.$route.params.roomId}`,
        );
        this.blocked_dates = response.data.data.blocks;
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
            .post(`long-term-bookings/price-calculator`, {
              long_term_room_id: this.room.id,
              move_in: this.booking.checkin,
              move_out: this.booking.checkout,
            })
            .then(response => {
              this.preview_booking_price = response.data.data;
              console.log(this.preview_booking_price);
              this.$refs.booking_preview_modal.open();
            })
            .catch(error => {
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
            .post(`long-term-bookings`, {
              name: this.booking.name,
              phone: this.booking.phone,
              email: this.booking.email,
              gender: this.booking.sex,
              long_term_room_id: this.room.id,
              move_in: this.booking.checkin,
              move_out: this.booking.checkout,
              note: this.booking.note,
              guests: this.booking.number_of_guests,
              source:
                this.booking.source == null
                  ? this.source.value
                  : this.booking.source,
              staff_id: this.current_user.id,
            })
            .then(response => {
              this.isLoading = false;
              this.$refs.booking_preview_modal.close();
              this.$swal({
                title: 'Thành công',
                text: 'Đã tạo đặt phòng dài hạn',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
                cancelButtonText: 'Quay lại',
                showCloseButton: false,
                showLoaderOnConfirm: true,
              }).then(result => {
                this.$router.push('/admin/long-term-booking/list');
              });
            })
            .catch(error => {
              this.isLoading = false;
              let err = error.response.data.data.errors;
              console.log(error);
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
    Auth.getCurrentUser().then(res => {
      this.current_user = res;
    });
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403'); // push về page 403
          } else {
            this.getRoom();
            this.getLongTermRoomSchedule();
          }
        });
      }
    });
  },
};
</script>

<style>
</style>