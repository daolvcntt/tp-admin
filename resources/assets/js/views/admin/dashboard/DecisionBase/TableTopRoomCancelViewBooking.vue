<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Thời gian</th>
          <th>Top 10 phòng đặt nhiều</th>
          <th>Top 10 phòng hủy nhiều</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="date in listView" :key="date.value">
          <td>{{date.value}}</td>
          <td>
            <button @click="getListRoom('total',date.value)" class="btn btn-info btn-sm">Chi Tiết</button>
          </td>
          <td>
            <button @click="getListRoom('cancel',date.value)" class="btn btn-info btn-sm">Chi Tiết</button>
          </td>
        </tr>
      </tbody>
    </table>
    <sweet-modal width="70%" ref="room_list" overlay-theme="dark">
      <table class="table">
        <thead>
          <tr>
            <th>Mã phòng</th>
            <th>Tên phòng</th>
            <th>Tổng số book</th>
            <th>Hủy</th>
            <th>Chi tiêt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room) in listRoom" :key="room.room_id">
            <td>{{ room.room_id }}</td>
            <td>{{ room.room_name }}</td>
            <td>{{ room.total_booking}}</td>
            <td>{{ room.cancel}}</td>
            <td>
              <button @click="getDataBooking(room.room_id)" class="btn btn-info btn-sm">Chi Tiết</button>
            </td>
          </tr>
        </tbody>
      </table>
    </sweet-modal>

    <sweet-modal width="100%" ref="booking_list" overlay-theme="dark">
      <table class="table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Ngày tạo</th>
            <th>Ngày checkin</th>
            <th>Ngày checkout</th>
            <!-- <th>Số khách</th> -->
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking) in listBookingOfRoom" :key="booking.code">
            <td>{{ booking.code }}</td>
            <td>{{ booking.booking_create }}</td>
            <td>{{ booking.day_of_week_checkin !== 7 ? `Thứ ${booking.day_of_week_checkin + 1}` :'Chủ nhật' }}, {{ booking.date_checkin }}/{{ booking.month_checkin }}/ {{ booking.year_checkin }}</td>
            <td>{{booking.day_of_week_checkout !== 7 ? `Thứ ${booking.day_of_week_checkout + 1}` :'Chủ nhật' }}, {{ booking.date_checkout }}/{{ booking.month_checkout }}/ {{ booking.year_checkout }}</td>
            <!-- <td>{{ booking.total_guest}}</td> -->
            <td>
              <i
                v-if="booking.booking_status === 5"
                class="icon-fa icon-fa-times-circle"
                style="color: red"
              ></i>
              <i v-else class="icon-fa icon-fa-check-circle" style="color: green"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </sweet-modal>
  </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';
import moment from 'moment';
export default {
  components: {
    SweetModal,
  },
  props: ['view', 'date_start', 'date_end', 'status', 'city_id', 'district_id'],
  data() {
    return {
      listRoom: [],
      listView: [],
      d_start: null,
      d_end: null,
      listBookingOfRoom: [],
    };
  },
  watch: {
    date_start() {
      this.switchView();
    },
    date_end() {
      this.switchView();
    },
    view() {
      this.switchView();
    },
    status() {
      this.switchView();
    },
    city_id() {
      this.switchView();
    },
    district_id() {
      this.switchView();
    },
  },
  methods: {
    async getListRoom(type, date) {
      if (this.view === 'week') {
        this.d_start = date.substr(0, 10);
        this.d_end = date.substr(13, 24);
      } else if (this.view === 'day') {
        this.d_start = date;
        this.d_end = date;
      } else if (this.view === 'month') {
        this.d_start = date + '-01';
        let month = date.substr(5, 2);
        let end_month = new Date(
          parseInt(date.substr(0, 4)),
          parseInt(month),
          1,
        );
        this.d_end = end_month.toISOString().substr(0, 10);
      } else {
        this.d_start = date + '-01-01';
        this.d_end = date + '-12-31';
      }
      if (type === 'total') {
        const response = await axios.get('statisticals/top-room-has-booking', {
          params: {
            view: this.view,
            date_start: this.d_start,
            date_end: this.d_end,
            city_id: this.city_id,
            district_id: this.district_id,
          },
        });
        this.listRoom = response.data.data;
      } else {
        const response = await axios.get(
          'statisticals/top-room-has-cancel-booking',
          {
            params: {
              view: this.view,
              date_start: this.d_start,
              date_end: this.d_end,
              city_id: this.city_id,
              district_id: this.district_id,
            },
          },
        );
        this.listRoom = response.data.data;
      }
      this.$refs.room_list.open();
    },
    async switchView() {
      const response = await axios.get('statisticals/test-switch-view', {
        params: {
          view: this.view,
          date_start: this.date_start,
          date_end: this.date_end,
        },
      });
      this.listView = response.data.data;
    },
    async getDataBooking(room_id) {
      console.log(room_id);
      const response = await axios.get('statisticals/get-booking-of-room', {
        params: {
          date_start: this.d_start,
          date_end: this.d_end,
          room_id: room_id,
        },
      });
      this.listBookingOfRoom = response.data.data;
      // console.log(this.listBookingOfRoom);
      this.$refs.booking_list.open();
    },
  },
  mounted() {
    this.switchView();
  },
};
</script>

<style>
</style>
