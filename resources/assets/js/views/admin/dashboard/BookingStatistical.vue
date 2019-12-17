<template>
  <div id="dashboardPage" class="main-content">
    <div class="mailbox">
      <div class="card">
        <div class="card-header">
          <h6>Bộ lọc</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <label class="typo__label">Xem theo</label>
              <multiselect
                v-model="current_view"
                label="value"
                :options="view_list"
                :searchable="true"
                :show-labels="false"
              />
            </div>
            <div class="col-sm-3">
              <label class="typo__label">Trạng thái</label>
              <multiselect
                v-model="current_status"
                label="value"
                :options="status_list"
                :searchable="true"
                :show-labels="false"
              />
            </div>
            <div class="col-sm-3">
              <label class="typo__label">Từ</label>
              <datepicker v-model="start" :format="format" input-class="form-control" />
            </div>
            <div class="col-sm-3">
              <label class="typo__label">Tới</label>
              <datepicker
                :disabled-dates="disabledDateEnd"
                v-model="end"
                :format="format"
                input-class="form-control"
              />
            </div>
          </div>
          <!-- <button @click="applyFilter()" class="btn btn-success btn-sm">Áp dụng</button> -->
          <button @click="resetFilter()" class="btn btn-info btn-sm">Làm mới</button>
        </div>
      </div>
      <div class="mailbox-content">
        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo trạng thái
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-status
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking Theo Ngày / Theo giờ
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-type
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo Instant book
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-instant-book
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />So sánh Instant Booking và Request Booking
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-request-and-instant-book
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo khoảng giá
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-price-range
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo loại phòng
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-room-type
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo thành phố
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-city
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo kênh
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-source
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lý do hủy phòng
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-cancel-reason
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ thống kê khách cũ
                </h6>
              </div>
              <div class="card-body">
                <old-customer
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo Giới tính
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-gender
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import Auth from '../../../services/auth';
import Datepicker from 'vuejs-datepicker';
import { format, constant, location } from '../../../helpers/mixins';
import ChartBookingByStatus from './ChartBookingByStatus.vue';
import ChartBookingByType from './ChartBookingByType.vue';
import ChartBookingByInstantBook from './ChartBookingByInstantBook.vue';
import ChartBookingRequestAndInstantBook from './ChartBookingRequestInstant.vue';
import ChartBookingByGender from './ChartBookingByGender.vue';
import ChartBookingByPriceRange from './ChartBookingByPriceRange.vue';
import ChartBookingByAgeRange from './ChartBookingByAgeRange.vue';
import ChartBookingBySource from './ChartBookingBySource.vue';
import ChartBookingByCancelReason from './ChartBookingByCancelReason.vue';
import ChartBookingByRoomType from './ChartBookingByRoomType.vue';
import ChartBookingByCity from './ChartBookingByCity.vue';
import OldCustomer from './OldCustomer.vue';

import Multiselect from 'vue-multiselect';

export default {
  components: {
    Datepicker,
    ChartBookingByStatus,
    ChartBookingByType,
    ChartBookingByInstantBook,
    ChartBookingRequestAndInstantBook,
    ChartBookingByGender,
    ChartBookingByPriceRange,
    ChartBookingByAgeRange,
    ChartBookingBySource,
    ChartBookingByCancelReason,
    ChartBookingByRoomType,
    ChartBookingByCity,
    OldCustomer,
    Multiselect,
  },
  data() {
    return {
      header: 'header',
      start: null,
      end: null,
      current_view: {
        id: 'day',
        value: 'Ngày',
      },
      view_list: [
        {
          id: 'day',
          value: 'Ngày',
        },
        {
          id: 'week',
          value: 'Tuần',
        },
        {
          id: 'month',
          value: 'Tháng',
        },
        {
          id: 'year',
          value: 'Năm',
        },
      ],
      current_status: {
        id: '',
        value: 'Tất cả',
      },
      status_list: [
        {
          id: 4,
          value: 'Thành công',
        },
        {
          id: 5,
          value: 'Hủy',
        },
        {
          id: '',
          value: 'Tất cả',
        },
      ],
      permissions: 'statistics.view',
      format: 'yyyy-MM-dd',
      disabledDateEnd: {
        to: '',
      },
    };
  },
  computed: {
    date_start() {
      var today = new Date();
      var lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7,
      );
      return this.start !== null ? this.start : lastWeek;
    },
    date_end() {
      return this.end !== null ? this.end : new Date();
    },
    view() {
      return this.current_view.id;
    },
    status() {
      return this.current_status.id;
    },
  },
  methods: {
    resetFilter() {
      this.start = null;
      this.end = null;
      this.current_view = {
        id: 'day',
        value: 'Ngày',
      };
      this.current_status = {
        id: '',
        value: 'Tất cả',
      };
    },
  },
  created() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403');
          }
        });
      }
    });
  },
};
</script>
<style scoped>
/* The container */
.container {
  display: inline;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>