<template>
  <div class="main-content" style="background-color: white;">
    <div class="page-header">
      <h3 class="page-title">Room</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'room.list'}">
            <a>Room</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active">Calendar</li>
      </ol>
      <lottie v-if="loading" :options="defaultOptions" :height="150" :width="150"></lottie>
      <div class="row" v-if="room != null && blockSchedule !=null">
        <div class="col-sm-9">
          <div style="position: absolute;">
            <button class="button-prev" @click="prev">&#60;</button>
            <button class="button-next" @click="next">&#62;</button>
            <button class="button-today" @click="today">Hôm nay</button>
          </div>
          <full-calendar
            :selectable="true"
            :key="1"
            :events="bookingCalendar"
            :config="config"
            id="calendar"
            :default-view="defaultView"
            :header="header"
            ref="calendar"
            :event-limit="true"
            :editable="false"
            :selectHelper="true"
            @event-selected="eventClicked"
          ></full-calendar>

          <sweet-modal ref="booking_modal" overlay-theme="dark" modal-theme="light">
            <div class="row" v-if="booking_current">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <div class="caption">
                      <h5>
                        <b>{{booking_current.room.data.details.data[0].name}}</b>
                      </h5>
                      <p>{{booking_current.room.data.details.data[0].address}}</p>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table table-hover">
                      <tbody>
                        <tr>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Mã đặt phòng</p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <button
                                  disabled
                                  type="button"
                                  class="btn btn-sm btn-outline-secondary"
                                >#{{booking_current.code}}</button>
                              </div>
                              <hr>
                              <div class="content-subject">
                                <p>{{booking_current.status_txt}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Thông tin người nhận</p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>{{booking_current.name_received}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.email_received}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.phone_received}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Thông tin người đặt</p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>{{booking_current.name}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.email}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.phone}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Nhận phòng</p>
                              </div>
                            </div>
                            <div class="content">
                              <div class="content-subject">
                                <p>Trả phòng</p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>{{booking_current.checkin}}</p>
                              </div>
                            </div>
                            <div class="content">
                              <div class="content-subject">
                                <p>{{booking_current.checkout}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <div class="caption">
                      <h5>
                        <b>Thông tin thanh toán</b>
                      </h5>
                      <p>#{{booking_current.code}}</p>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table table-hover">
                      <tbody>
                        <tr>
                          <td width="20%" class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Trạng thái thanh toán</p>
                                <p></p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content"></td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p style="color: green" v-if="booking_current.payment_status == 3">
                                  <i class="icon-fa icon-fa-check-circle" style="color: green"></i>
                                  {{booking_current.payment_status_txt}}
                                </p>
                                <p style="color: red" v-if="booking_current.payment_status == 1">
                                  <i class="icon-fa icon-fa-times-circle" style="color: red"></i>
                                  {{booking_current.payment_status_txt}}
                                </p>
                              </div>
                              <hr>
                              <div class="content-subject">
                                <p>{{booking_current.payment_method_txt}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="20%" class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Thông tin thanh toán</p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>Giá phòng</p>
                              </div>
                              <div class="content-subject">
                                <p>Giảm giá</p>
                              </div>
                              <div class="content-subject">
                                <p>Khuyến mãi</p>
                              </div>
                              <div class="content-subject">
                                <p>Phụ thu</p>
                              </div>
                              <div class="content-subject">
                                <p>Tổng tiền</p>
                              </div>
                            </div>
                          </td>
                          <td class="cell-content">
                            <div class="content">
                              <div class="content-subject">
                                <p>{{booking_current.price_original | formatNumber}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.price_discount | formatNumber}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.coupon_discount | formatNumber}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.additional_fee | formatNumber}}</p>
                              </div>
                              <div class="content-subject">
                                <p>{{booking_current.total_fee | formatNumber}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </sweet-modal>
        </div>
        <div class="col-sm-3">
          <div class="card" style="margin-top: 59px;">
            <div class="card-header">
              <h5>Thay đổi trạng thái phòng</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label>Từ ngày *</label>
                  <input
                    type="text"
                    name="dateSelected.startDate"
                    v-model="dateSelected.startDate"
                    class="form-control"
                    disabled
                  >
                </div>
                <div class="form-group">
                  <label>Đến ngày *</label>
                  <input
                    type="text"
                    name="dateSelected.endDate"
                    v-model="dateSelected.endDate"
                    class="form-control"
                    disabled
                  >
                </div>
                <button
                  class="btn btn-outline-success"
                  style="margin-right: 5px;"
                  @click="unblockSubmit()"
                  :disabled="dateSelected.startDate == null ? true: false"
                >Mở phòng</button>
                <button
                  class="btn btn-outline-danger"
                  style="margin-right: 5px;"
                  @click="blockSubmit()"
                  :disabled="dateSelected.startDate == null ? true: false"
                >Khóa phòng</button>
                <button
                  class="btn btn-outline-primary"
                  style="margin-right: 5px;"
                  @click.prevent="clearDate()"
                >Reset</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/locale/vi.js';
import Auth from '../../../services/auth';
import Datepicker from 'vuejs-datepicker';
import * as animationData from '../../loading/material_wave_loading.json';
import Lottie from 'vue-lottie';
import { SweetModal } from 'sweet-modal-vue';
import { format } from '../../../helpers/mixins';
import moment from 'moment';
export default {
  mixins: [format],
  name: 'RoomCalendar',
  components: {
    FullCalendar,
    Datepicker,
    Lottie,
    SweetModal,
  },
  data() {
    return {
      permissions: 'room.view',
      defaultOptions: {
        animationData: animationData,
      },
      date_in: new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1),
      date_out: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 2,
        1,
      ),
      actionDateCalendar: new Date(),
      loading: true,
      room: null,
      prices: null,
      dateSelected: {
        startDate: null,
        endDate: null,
      },
      blockSchedule: null,
      blockRoom: [],
      room_time_blocks: [],
      bookingCalendar: [],
      bookingRoom: [],
      disabledEndDate: {
        to: '',
      },
      defaultView: 'month',
      header: {
        left: '',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
      },
      booking_current: null,
    };
  },
  computed: {
    ...mapGetters([
      'getRoomBookingDate',
      'getActionDateCalendar',
      'getRoomCalendarId',
      'getStatusRoomCalendar',
    ]),

    config() {
      let self = this;
      let dateObj = new Date(self.actionDateCalendar);
      let momentObj = moment(dateObj);
      return {
        locale: 'vi',
        eventLimit: true,
        defaultDate: momentObj,
        dayRender: function(date, cell) {
          let d = date.format('YYYY-MM-DD');
          let realDate = new Date(d);
          //normal realDate in [0...6] -> dayInWeek in [1...7]
          let dayInWeek = realDate.getDay() + 1;

          let current = new Date();
          let currentDate = current.toISOString().substring(0, 10);

          let price_day = self.formatNumber(self.room.price_day);
          let price_hour = self.formatNumber(self.room.price_hour);
          if (self.prices.length) {
            self.prices.forEach(specialDay => {
              // check day must be weekdays?
              if (specialDay.weekday == dayInWeek) {
                price_day = self.formatNumber(specialDay.price_day);
                price_hour = self.formatNumber(specialDay.price_hour);
              }
              // check day must be special day?
              if (specialDay.day === date.format('YYYY-MM-DD')) {
                price_day = self.formatNumber(specialDay.price_day);
                price_hour = self.formatNumber(specialDay.price_hour);
              }
            });
          }
          // else if(self.bookingCalendar.length) {

          let rent_type = self.room.rent_type;
          if (date.format('YYYY-MM-DD') < currentDate) {
            cell.addClass('bg-past-day');
          } else if (self.blockSchedule.includes(date.format('YYYY-MM-DD'))) {
            cell.addClass('bg-blocked-day');
          } else {
            if (rent_type == 3) {
              cell.append(
                "<div class='available'><div>" +
                  price_day +
                  " đ/1 ngày</div><div class='center'></div><div> " +
                  price_hour +
                  ' đ/1 giờ</div></div>',
              );
            } else if (rent_type == 2) {
              cell.append(
                "<div class='available' id='price'>" +
                  price_day +
                  ' đ/1 ngày</div>',
              );
            } else {
              cell.append(
                "<div class='available' id='price'>" +
                  price_hour +
                  ' đ/1 giờ</div>',
              );
            }
          }
          self.bookingCalendar.forEach(d => {
            let date_start_event = new Date(d.start);
            let minus_end_event = self.minusDay(d.end);
            let date_end_event = new Date(minus_end_event);
            let currentDay = new Date(date.format('YYYY-MM-DD'));
            if (currentDay >= date_start_event && currentDay < date_end_event) {
              cell.addClass('bg-past-day');
              cell.children('.available').remove();
              return true;
            }
          });
        },
        selectAllow: function(info) {
          let current = new Date();
          let temp = 0;
          let currentDate = current.toISOString().substring(0, 10);
          if (info.start.format('YYYY-MM-DD') <= currentDate) {
            temp++;
          }
          self.bookingCalendar.forEach(d => {
            let date_start_event = new Date(d.start);
            let minus_end_event = self.minusDay(d.end);
            let date_end_event = new Date(minus_end_event);
            let currentDay = new Date(info.start.format('YYYY-MM-DD'));
            if (currentDay >= date_start_event && currentDay < date_end_event) {
              temp++;
            }
          });
          if (temp > 0) {
            return false;
          }
          return true;
        },
        eventRender(event, element) {
          element.css({
            'font-size': '15px',
            'padding-top': '3px',
            'text-align': 'center',
          });
        },
        select(start, end, jsEvent, view) {
          self.dateSelected.startDate = start.format('YYYY-MM-DD');
          end = end.subtract(1, 'days');
          self.dateSelected.endDate = end.format('YYYY-MM-DD');
        },
      };
    },
  },
  watch: {
    bookingRoom: {
      handler(val) {
        let self = this;
        this.bookings = [];
        this.bookingCalendar = [];
        if (val != null) {
          val.forEach(item => {
            let booking = {
              title: null,
              start: null,
              end: null,
              allDay: true,
              textColor: 'white',
              color: '#257e4a',
              booking_detail: item,
            };
            booking.title =
              item.name +
              `(${item.code})` +
              ': ' +
              self.formatNumber(item.total_fee) +
              'đ';
            if (item.booking_type == 1) {
              booking.start = item.checkin;
              booking.end = item.checkout;
              booking.allDay = false;
            } else {
              booking.start = item.checkin.substring(0, 10);
              booking.end = self.correctDay(item.checkout);
            }
            self.bookingCalendar.push(booking);
          });
        }
      },
    },
    blockRoom: {
      handler(val) {
        let self = this;
        if (val != null) {
          let length = val.length;
          let dayBlock = val[length - 1];
          let block = {
            title: '',
            start: null,
            end: null,
            allDay: true,
            textColor: 'white',
            overlap: true,
            rendering: 'background',
            color: 'rgb(118, 118, 118)',
            className: 'event-block',
          };
          if (dayBlock.length == 1) {
            block.start = dayBlock[0];
            block.end = self.correctDay(dayBlock[0]);
          } else {
            block.start = dayBlock[0];
            block.end = self.correctDay(dayBlock[1]);
          }
          self.bookingCalendar.push(block);
        }
      },
      deep: true,
    },
    date_in: {
      handler(val) {
        let objDate = { date_in: val, date_out: this.date_out };
        this.changeRoomBookingDate(objDate);
      },
    },
  },
  methods: {
    ...mapActions([
      'changeRoomBookingDate',
      'changeActionDateCalendar',
      'changeStatusRoomCalendar',
    ]),

    eventClicked(calEvent, jsEvent, view) {
      this.booking_current = calEvent.booking_detail;
      this.$refs.booking_modal.open();
    },
    correctDay(date) {
      let beforeAddDay = new Date(date);
      let timeDay = 86400000;
      let afterAddDay = new Date(beforeAddDay.getTime() + timeDay);
      let day = afterAddDay.toISOString().substring(0, 10);
      return day;
    },
    minusDay(date) {
      let beforeAddDay = new Date(date);
      let timeDay = 86400000;
      let afterAddDay = new Date(beforeAddDay.getTime() - timeDay);
      let day = afterAddDay.toISOString().substring(0, 10);
      return day;
    },
    changeToArangeDate(startDate, endDate) {
      let dates = [];
      let currentDate = startDate;
      let addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    },
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    clearDate() {
      this.dateSelected.startDate = null;
      this.dateSelected.endDate = null;
    },
    next() {
      if (this.$refs.calendar.fireMethod('getView').name === 'month') {
        this.date_in = new Date(
          new Date(this.date_in).setMonth(this.date_in.getMonth() + 1),
        );
        this.date_out = new Date(
          new Date(this.date_out).setMonth(this.date_out.getMonth() + 1),
        );
        let actionDate = this.actionDateCalendar;
        this.actionDateCalendar = new Date(
          new Date(actionDate).setMonth(actionDate.getMonth() + 1),
        );
        // console.log(this.actionDateCalendar);
        this.changeActionDateCalendar(
          new Date(new Date(actionDate).setMonth(actionDate.getMonth() + 1)),
        );
        this.reloadData();
        this.$refs.calendar.fireMethod('next');
      } else if (
        this.$refs.calendar.fireMethod('getView').name === 'agendaWeek'
      ) {
        this.date_in = new Date(
          new Date(this.date_in).setDate(this.date_in.getDate() + 7),
        );
        this.date_out = new Date(
          new Date(this.date_out).setDate(this.date_out.getDate() + 7),
        );
        let actionDate = this.actionDateCalendar;
        // console.log(actionDate);
        this.actionDateCalendar = new Date(
          new Date(actionDate).setDate(actionDate.getDate() + 7),
        );
        this.changeActionDateCalendar(
          new Date(new Date(actionDate).setDate(actionDate.getDate() + 7)),
        );
        this.reloadData();
        this.$refs.calendar.fireMethod('next');
      } else {
        this.date_in = new Date(
          new Date(this.date_in).setDate(this.date_in.getDate() + 1),
        );
        this.date_out = new Date(
          new Date(this.date_out).setDate(this.date_out.getDate() + 1),
        );
        let actionDate = this.actionDateCalendar;
        this.actionDateCalendar = new Date(
          new Date(actionDate).setDate(actionDate.getDate() + 1),
        );
        this.changeActionDateCalendar(
          new Date(new Date(actionDate).setDate(actionDate.getDate() + 1)),
        );
        this.reloadData();
        this.$refs.calendar.fireMethod('next');
      }
    },
    prev() {
      if (this.$refs.calendar.fireMethod('getView').name === 'month') {
        this.date_in = new Date(
          new Date(this.date_in).setMonth(this.date_in.getMonth() - 1),
        );
        this.date_out = new Date(
          new Date(this.date_out).setMonth(this.date_out.getMonth() - 1),
        );
        let actionDate = this.actionDateCalendar;
        this.actionDateCalendar = new Date(
          new Date(actionDate).setMonth(actionDate.getMonth() - 1),
        );
        this.changeActionDateCalendar(
          new Date(new Date(actionDate).setMonth(actionDate.getMonth() - 1)),
        );
        this.reloadData();
        this.$refs.calendar.fireMethod('prev');
      } else if (
        this.$refs.calendar.fireMethod('getView').name === 'agendaWeek'
      ) {
        this.date_in = new Date(
          new Date(this.date_in).setDate(this.date_in.getDate() - 7),
        );
        this.date_out = new Date(
          new Date(this.date_out).setDate(this.date_out.getDate() - 7),
        );
        let actionDate = this.actionDateCalendar;
        this.actionDateCalendar = new Date(
          new Date(actionDate).setDate(actionDate.getDate() - 7),
        );
        this.changeActionDateCalendar(
          new Date(new Date(actionDate).setDate(actionDate.getDate() - 7)),
        );
        this.reloadData();
        this.$refs.calendar.fireMethod('prev');
      } else {
        this.date_in = new Date(
          new Date(this.date_in).setDate(this.date_in.getDate() - 1),
        );
        this.date_out = new Date(
          new Date(this.date_out).setDate(this.date_out.getDate() - 1),
        );
        let actionDate = this.actionDateCalendar;
        this.actionDateCalendar = new Date(
          new Date(actionDate).setDate(actionDate.getDate() - 1),
        );
        this.changeActionDateCalendar(
          new Date(new Date(actionDate).setDate(actionDate.getDate() - 1)),
        );
        this.reloadData();
        this.$refs.calendar.fireMethod('prev');
      }
    },
    today() {
      (this.date_in = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 2,
        1,
      )),
        (this.date_out = new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 2,
          1,
        )),
        (this.actionDateCalendar = new Date());
      this.changeActionDateCalendar(new Date());
      this.reloadData();
      this.$refs.calendar.fireMethod('today');
    },
    getCalendarDateRange() {
      let calendar = this.$refs.calendar('getCalendar');
      let view = calendar.view;
      let start = view.start._d;
      let end = view.end._d;
      let dates = { start: start, end: end };
      return dates;
    },
    async getRoomById() {
      try {
        const response = await axios.get(`rooms/${this.$route.params.roomId}`, {
          params: {
            include: 'prices',
          },
        });
        this.room = response.data.data;
        this.prices = response.data.data.prices.data;
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Dữ liệu phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async getBookingOfRoom() {
      try {
        let dateIn;
        let dateOut;
        if (typeof this.getRoomBookingDate.date_in === 'object') {
          dateIn = this.getRoomBookingDate.date_in.toISOString().substr(0, 10);
          dateOut = this.getRoomBookingDate.date_out
            .toISOString()
            .substr(0, 10);
        } else {
          dateIn = this.getRoomBookingDate.date_in.substr(0, 10);
          dateOut = this.getRoomBookingDate.date_out.substr(0, 10);
        }
        const response = await axios.get(`bookings`, {
          params: {
            include: 'room.details',
            rooms: this.$route.params.roomId,
            date_in: dateIn,
            date_out: dateOut,
          },
        });
        this.bookingRoom = [];
        response.data.data.forEach(booking => {
          if (booking.status != 5) {
            this.bookingRoom.push(booking);
          }
        });
        this.loading = false;
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Danh sách booking hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async getBlockOfRoom() {
      try {
        const response = await axios.get(`rooms/${this.$route.params.roomId}`, {
          params: {
            include: 'blocks',
          },
        });
        this.room_time_blocks = response.data.data.blocks.data;
        this.room_time_blocks.forEach(item => {
          let arr = Object.values(item);
          this.blockRoom.push(arr);
        });
        this.initBlockDay(this.blockRoom);
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Danh sách ngày khóa phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async getBlockSchedule() {
      try {
        const response = await axios.get(
          `rooms/schedule/${this.$route.params.roomId}`,
        );
        let data = response.data.data.blocks;
        this.blockSchedule = [];
        data.forEach(item => {
          this.blockSchedule.push(item);
        });
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Danh sách ngày khóa phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async unblockSubmit() {
      const result = this.$validator.validateAll();
      if (result) {
        let unblock = Object.values(this.dateSelected);
        // if (this.dateSelected.startDate === this.dateSelected.endDate) {
        //   unblock.pop();
        // }
        let unblockDates = [];
        unblockDates.push(unblock);
        let blockDates = this.blockRoom;
        // blockDates.forEach(item => {
        //   if (item[0] === item[1]) {
        //     item.pop();
        //   }
        // });
        let response = await axios
          .put('rooms/update-block', {
            room_id: this.$route.params.roomId,
            room_time_blocks: blockDates,
            unlock_days: unblockDates,
          })
          .then(response => {
            this.dateSelected.startDate = null;
            this.dateSelected.endDate = null;
          });
      } else {
        return window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
    async blockSubmit() {
      const result = this.$validator.validateAll();
      if (result) {
        let blockDate = Object.values(this.dateSelected);
        // this.blockRoom.forEach(item => {
        //   if (item[0] === item[1]) {
        //     item.pop();
        //   }
        // });
        // if (this.dateSelected.startDate === this.dateSelected.endDate) {
        //   blockDate.pop();
        // }
        this.blockRoom.push(blockDate);
        let response = await axios
          .put('rooms/update-block', {
            room_id: this.$route.params.roomId,
            room_time_blocks: this.blockRoom,
          })
          .then(response => {
            this.dateSelected.startDate = null;
            this.dateSelected.endDate = null;
          });
      } else {
        return window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
    reloadData() {
      this.getBookingOfRoom();
    },
    initBlockDay(arrBlockDate) {
      if (arrBlockDate.length) {
        arrBlockDate.forEach(item => {
          let block = {
            title: '',
            start: null,
            end: null,
            allDay: true,
            textColor: 'white',
            overlap: true,
            rendering: 'background',
            color: 'rgb(118, 118, 118)',
            className: 'event-block',
          };
          let currentDate = new Date();
          let today = currentDate.getTime();

          let start_Date = new Date(item[0]);
          let start = start_Date.getTime();

          if (today > start) {
            block.start = currentDate.toISOString().substring(0, 10);
          } else {
            block.start = item[0];
          }

          if (item.length == 2) {
            let day = this.correctDay(item[1]);
            block.end = day;
          } else {
            block.end = this.correctDay(item[0]);
          }
          this.bookingCalendar.push(block);
        });
      }
    },
  },
  created() {
    let roomId = this.$route.params.roomId;
    let roomCalendarId = this.getRoomCalendarId;
    if (roomId == roomCalendarId && this.getStatusRoomCalendar == 0) {
      this.date_in = new Date(this.getRoomBookingDate.date_in);
      this.date_out = new Date(this.getRoomBookingDate.date_out);
      this.actionDateCalendar = new Date(this.getActionDateCalendar);
    } else {
      this.changeStatusRoomCalendar(0);
      this.changeActionDateCalendar(new Date());
      this.changeRoomBookingDate({
        date_in: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 2,
          1,
        ),
        date_out: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 2,
          1,
        ),
      });
    }
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('permission-denied-403');
          } else {
            this.getBlockOfRoom();
            this.getRoomById();
            this.getBlockSchedule();
            this.getBookingOfRoom();
          }
        });
      }
    });
  },
};
</script>

<style>
.bg-past-day {
  background: repeating-linear-gradient(
    -45deg,
    #edeef7,
    #edeef7 10px,
    #f2f2f2 10px,
    #f2f2f2 20px
  );
  cursor: not-allowed !important;
}
.bg-blocked-day {
  background: repeating-linear-gradient(
    -45deg,
    #edeef7,
    #edeef7 10px,
    #f2f2f2 10px,
    #f2f2f2 20px
  );
}
.available {
  padding-top: 27px;
  font-size: 14px;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.available:hover {
  background-color: #edeef7;
  outline: rgb(118, 118, 118) solid 2px;
}
.event-block {
  background: repeating-linear-gradient(
    -45deg,
    #cccccc,
    #cccccc 10px,
    #f2f2f2 10px,
    #f2f2f2 20px
  );
}
.center {
  background-color: rgb(155, 155, 134);
  height: 1px;
  width: 110px;
  margin: 5px auto;
}
#price {
  padding-top: 38px;
}
.button-today {
  color: #333333;
  cursor: pointer;
  padding: 3px 10px;
  font-size: 16px;
}
.button-prev {
  color: #333333;
  cursor: pointer;
  padding: 3px 8px 3px 8px;
}
.button-next {
  color: #333333;
  cursor: pointer;
  padding: 3px 8px 3px 8px;
}
</style>






