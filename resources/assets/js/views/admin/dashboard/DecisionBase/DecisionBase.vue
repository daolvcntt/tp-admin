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
          <hr />
          <div class="row">
            <div class="col-sm-5">
              <label class="typo__label">Thành phố</label>

              <multiselect
                id="inputUserName"
                v-model="city"
                label="name"
                :options="cities"
                :searchable="true"
                :show-labels="true"
                placeholder="Chọn Thành Phố"
              />
            </div>
            <div class="col-sm-5">
              <label class="typo__label">Quận/Huyện</label>

              <multiselect
                :disabled="city == null"
                id="inputUserName"
                v-model="district"
                label="name"
                :options="filteredDistrict"
                :searchable="true"
                :show-labels="true"
                placeholder="Chọn Quận / Huyện"
              />
            </div>
            <div class="col-sm-2">
              <button
                @click="resetFilter()"
                class="btn btn-info btn-md"
                style="margin-top:32px; width: 100%"
              >Làm mới</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mailbox-content">
        <!-- <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo tỉnh thành từ
                  <b>{{date_start !== null ? date_start.toISOString().substr(0, 10) : ''}}</b> đến
                  <b>{{date_end !== null ? date_end.toISOString().substr(0, 10) : ''}}</b>
                  <b v-if="city.id > 0">Tại thành phố {{city.name}}</b>
                  <b v-if="district.id > 0">{{district.name}}</b>
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-city
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                  :city_id="city.id"
                  :district_id="district.id"
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
                  <i class="icon-fa icon-fa-line-chart text-warning" />Biểu đồ số lượng booking theo Quận Huyện từ
                  <b>{{date_start !== null ? date_start.toISOString().substr(0, 10) : ''}}</b> đến
                  <b>{{date_end !== null ? date_end.toISOString().substr(0, 10) : ''}}</b>
                  <b v-if="city.id > 0">Tại thành phố {{city.name}}</b>
                  <b v-if="district.id > 0">{{district.name}}</b>
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-district
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                  :city_id="city.id"
                  :district_id="district.id"
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
                  <i class="icon-fa icon-fa-line-chart text-warning" />
                  Thông kê số lượng đặt phòng theo loại phòng từ
                  <b>{{date_start !== null ? date_start.toISOString().substr(0, 10) : ''}}</b> đến
                  <b>{{date_end !== null ? date_end.toISOString().substr(0, 10) : ''}}</b>
                  <b v-if="city.id > 0">Tại thành phố {{city.name}}</b>
                  <b v-if="district.id > 0">{{district.name}}</b>
                </h6>
              </div>
              <div class="card-body">
                <chart-booking-by-room-type
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :status="status"
                  :city_id="city.id"
                  :district_id="district.id"
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
                  <i class="icon-fa icon-fa-line-chart text-warning" />
                  Top 10 phòng đặt nhiều nhất nhất từ
                  <b>{{date_start !== null ? date_start.toISOString().substr(0, 10) : ''}}</b> đến
                  <b>{{date_end !== null ? date_end.toISOString().substr(0, 10) : ''}}</b>
                  <b v-if="city.id > 0">Tại thành phố {{city.name}}</b>
                  <b v-if="district.id > 0">{{district.name}}</b>
                </h6>
              </div>
              <div class="card-body">
                <chart-top-room
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :city_id="city.id"
                  :district_id="district.id"
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
                  <i class="icon-fa icon-fa-line-chart text-warning" />
                  Top 10 phòng bị hủy nhiều nhất từ
                  <b>{{date_start !== null ? date_start.toISOString().substr(0, 10) : ''}}</b> đến
                  <b>{{date_end !== null ? date_end.toISOString().substr(0, 10) : ''}}</b>
                  <b v-if="city.id > 0">Tại thành phố {{city.name}}</b>
                  <b v-if="district.id > 0">{{district.name}}</b>
                </h6>
              </div>
              <div class="card-body">
                <chart-top-room-cancel
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :city_id="city.id"
                  :district_id="district.id"
                />
              </div>
            </div>
          </div>
        </div>-->

        <div class="row">
          <div class="col-lg-12 col-xl-12 mt-2">
            <div class="card">
              <div class="card-header">
                <h6>
                  <i class="icon-fa icon-fa-line-chart text-warning" />
                  Top 10 phòng bị hủy nhiều nhất từ
                  <b>{{date_start !== null ? date_start.toISOString().substr(0, 10) : ''}}</b> đến
                  <b>{{date_end !== null ? date_end.toISOString().substr(0, 10) : ''}}</b>
                  <b v-if="city.id > 0">Tại thành phố {{city.name}}</b>
                  <b v-if="district.id > 0">{{district.name}}</b>
                </h6>
              </div>
              <div class="card-body">
                <table-top-room-cancel-view-booking
                  :date_end="date_end.toISOString().substr(0, 10)"
                  :date_start="date_start.toISOString().substr(0, 10)"
                  :view="view"
                  :city_id="city.id"
                  :district_id="district.id"
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
import Auth from '../../../../services/auth';
import Datepicker from 'vuejs-datepicker';
import { format, constant, location } from '../../../../helpers/mixins';
// import ChartBookingByCity from './ChartBookingByCity.vue';
// import ChartBookingByDistrict from './ChartBookingByDistrict.vue';
// import ChartTopRoom from './ChartTopRoom.vue';
// import ChartTopRoomCancel from './ChartTopRoomCancel.vue';
// import ChartBookingByRoomType from './ChartBookingByRoomType.vue';
import TableTopRoomCancelViewBooking from './TableTopRoomCancelViewBooking.vue';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Datepicker,
    // ChartBookingByCity,
    // ChartBookingByDistrict,
    // ChartBookingByRoomType,
    // ChartTopRoom,
    // ChartTopRoomCancel,
    Multiselect,
    TableTopRoomCancelViewBooking,
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
          id: 0,
          value: 'Đang khóa',
        },
        {
          id: 1,
          value: 'Đang hoạt động',
        },
        {
          id: '',
          value: 'Tất cả',
        },
      ],
      cities: [],
      districts: [],
      city: {
        id: '',
      },
      district: {
        id: '',
      },
      permissions: 'statistics.view',
      format: 'yyyy-MM-dd',
      disabledDateEnd: {
        to: '',
      },
    };
  },
  methods: {
    resetFilter() {
      this.start = null;
      this.end = null;
      this.current_view = {
        id: 'day',
        value: 'Ngày',
      };
      this.city = {
        id: '',
      };
      this.district = {
        id: '',
      };
      this.current_status = {
        id: '',
        value: 'Tất cả',
      };
    },
    async getCities() {
      try {
        const response = await axios.get(`cities`, {
          params: {
            limit: -1,
          },
        });
        this.cities = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Dữ liệu danh sách tỉnh/thành phố hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async getDistricts() {
      try {
        const response = await axios.get(`districts`, {
          params: {
            limit: -1,
          },
        });
        this.districts = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Dữ liệu danh sách quận/huyện hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
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
    filteredDistrict() {
      let self = this;
      return this.districts.filter(function(item) {
        return item.city_id == self.city.id;
      });
    },
  },
  created() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403');
          } else {
            this.getCities();
            this.getDistricts();
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