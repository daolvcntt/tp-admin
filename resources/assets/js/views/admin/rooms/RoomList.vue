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
            style="font-size: 1.8rem;margin-bottom: .5rem;color:white;"
          >Danh sách phòng</h3>
        </div>
      </div>
    </div>
    <div class="kt-container kt-grid__item kt-grid__item--fluid" style="margin-top:25px">
      <!-- Begin Filter -->
      <div class="kt-portlet">
        <div class="kt-form">
          <div class="kt-portlet__body">
            <div class="row">
              <div class="col-sm-6 col-md-3">
                <div class="form-group">
                  <label>Tên phòng</label>
                  <input type="text" v-model="q" class="form-control" placeholder="Nhập tên phòng" />
                </div>
              </div>
              <div class="col-sm-3 col-md-3">
                <div class="form-group">
                  <label>Mã phòng ngắn hạn</label>
                  <input
                    v-model="room_id_short_term"
                    type="text"
                    class="form-control"
                    placeholder="Mã phòng ngắn hạn"
                  />
                </div>
              </div>
              <div class="col-sm-3 col-md-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Mã phòng dài hạn</label>
                  <input
                    v-model="room_id_long_term"
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Mã phòng dài hạn"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Loại phòng</label>
                  <multiselect
                    id="inputUserName"
                    v-model="room_type"
                    label="name"
                    :options="room_type_list"
                    :searchable="true"
                    :show-labels="true"
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
                  <label>Trạng thái ngắn hạn</label>
                  <multiselect
                    v-model="short_term_status"
                    label="value"
                    :options="room_status_list"
                    :searchable="true"
                    :show-labels="true"
                  />
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="form-group">
                  <label>Trạng thái dài hạn</label>
                  <multiselect
                    v-model="long_term_status"
                    label="value"
                    :options="room_status_list"
                    :searchable="true"
                    :show-labels="true"
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
      <!-- Begin Listing -->
      <div v-else v-for="room in rooms" :key="room.id" class="kt-portlet">
        <div class="kt-portlet__body">
          <div class="kt-widget kt-widget--user-profile-3">
            <div class="kt-widget__top">
              <div class="kt-widget__media kt-hidden-">
                <img
                  v-if="room.avatar && room.avatar.images && room.avatar.images.length"
                  :src="`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${room.avatar.images[0].name}`"
                  alt="image"
                />
                <img v-else src="/metronic/assets/media/products/product6.jpg" />
              </div>
              <div
                class="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest kt-font-light kt-hidden"
              >JM</div>
              <div class="kt-widget__content">
                <div class="kt-widget__head">
                  <a
                    :href="`https://westay.vn/room/${room.room_id}`"
                    target="_blank"
                    class="kt-widget__username"
                    style="overflow-wrap: break-word;word-wrap: break-word;hyphens: auto;max-width:560px;"
                  >
                    {{room.room_id}} - {{room.about_room && room.about_room.name ? room.about_room.name : 'Chưa đặt tên'}}
                    <img
                      v-if="room.short_term_room.instant_book == 1"
                      v-tooltip.top-center="'Đặt phòng nhanh'"
                      width="18px"
                      src="/assets/thunder.svg"
                    />
                  </a>
                  <div class="kt-widget__action">
                    <button
                      type="button"
                      class="btn btn-label-success btn-sm btn-upper"
                      @click="openLongTermRoomPreview(room.id)"
                    >Xem dài hạn</button>&nbsp;
                    <button
                      type="button"
                      class="btn btn-label-success btn-sm btn-upper"
                      @click="openShortTermRoomPreview(room.room_id)"
                    >Xem ngắn hạn</button>&nbsp;
                    <button
                      type="button"
                      class="btn btn-brand btn-sm btn-upper"
                      @click="updateLongTerm(room.id)"
                    >Cập nhật</button>
                    <button
                      type="button"
                      class="btn btn-brand btn-sm btn-upper"
                      @click="openUpdateMinorRoom(room)"
                    >Chỉnh sửa</button>
                  </div>
                </div>
                <div class="kt-widget__subhead">
                  <a style="cursor:text;">
                    <i class="flaticon-user"></i>
                    {{room.merchant.data.name ? room.merchant.data.name : ''}}
                  </a>
                  <a style="cursor:text;">
                    <i class="flaticon2-phone"></i>
                    {{room.merchant.data.phone ? room.merchant.data.phone : ''}}
                  </a>

                  <a style="cursor:text;">
                    <i class="flaticon-home-2"></i>
                    {{room.accommodation_type_txt ? room.accommodation_type_txt : ''}}
                  </a>
                </div>
                <div class="kt-widget__info">
                  <div class="kt-widget__desc" style="font-size:1.175 rem">
                    <p>
                      <i class="flaticon-earth-globe"></i>
                      {{room.address ? room.address : ''}}
                    </p>
                    <p>
                      <i class="flaticon-earth-globe"></i>
                      {{room.building ? room.building : ''}}
                    </p>
                    <p>Update gần nhất: {{room.updated_at}}</p>
                    <p>Ngày đăng: {{room.created_at}}</p>
                    <p>
                      Bộ sưu tập: {{room.display_txt}}
                      <i
                        style="cursor: pointer;"
                        @click="openModalUpdateRoomDisplay(room)"
                        class="flaticon-edit"
                      ></i>
                    </p>
                  </div>
                  <div class="kt-widget__progress">
                    <div class="progress" style="height: 5px;width: 100%;">
                      <div
                        class="progress-bar kt-bg-success"
                        role="progressbar"
                        :style="`width: ${room.percent}%;`"
                        :aria-valuenow="room.percent"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="kt-widget__stats">{{room.percent}}%</div>
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
                  v-tooltip.top-center="'Click để xem chi tiết giá phòng'"
                  class="kt-widget__details"
                  @click="openLongTermRoomModal(room)"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">
                    Dài hạn
                    <i
                      :class="room.status == 1 ? 'flaticon2-correct kt-font-success' : 'flaticon2-cancel kt-font-danger'"
                    ></i>
                  </span>
                  <span class="kt-widget__value">
                    <span>Từ</span>
                    {{room.price_display | formatNumber}}
                  </span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-confetti"></i>
                </div>
                <div
                  v-tooltip.top-center="'Click để xem chi tiết giá phòng'"
                  class="kt-widget__details"
                  @click="openShortTermRoomModal(room)"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">
                    Ngắn hạn
                    <i
                      :class="room.short_term_room.status == 1 ? 'flaticon2-correct kt-font-success' : 'flaticon2-cancel kt-font-danger'"
                    ></i>
                  </span>
                  <span class="kt-widget__value">{{room.short_term_room.price_day | formatNumber}}</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-file-2"></i>
                </div>
                <div class="kt-widget__details">
                  <span class="kt-widget__title">Ngày lễ</span>
                  <a
                    class="kt-widget__value kt-font-brand"
                    @click="openModalOptionalPrices(room)"
                  >Chi tiết</a>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i :class="room.status == 1 ? 'flaticon2-checkmark' : 'flaticon2-cross'"></i>
                </div>
                <div class="kt-widget__details">
                  <span
                    v-if="room.status == 1"
                    style="cursor: pointer;"
                    class="kt-widget__title"
                    @click="roomBlock(room, 'long_term')"
                  >Khoá phòng</span>
                  <span
                    v-else
                    style="cursor: pointer;"
                    class="kt-widget__title"
                    @click="roomApprove(room, 'long_term')"
                  >Duyệt phòng</span>
                  <a href="#" class="kt-widget__value kt-font-brand">dài hạn</a>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i
                    :class="room.short_term_room.status == 1 ? 'flaticon2-checkmark' : 'flaticon2-cross'"
                  ></i>
                </div>
                <div class="kt-widget__details">
                  <span
                    v-if="room.short_term_room.status == 1"
                    style="cursor: pointer;"
                    class="kt-widget__title"
                    @click="roomBlock(room, 'short_term')"
                  >Khoá phòng</span>
                  <span
                    v-else
                    style="cursor: pointer;"
                    class="kt-widget__title"
                    @click="roomApprove(room, 'short_term')"
                  >Duyệt phòng</span>
                  <a class="kt-widget__value kt-font-brand">ngắn hạn</a>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon2-calendar-8"></i>
                </div>
                <div class="kt-widget__details">
                  <span
                    class="kt-widget__title"
                    style="cursor: pointer;"
                    @click="createBookingLongTerm(room.id)"
                  >Book dài hạn</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon2-calendar-7"></i>
                </div>
                <div class="kt-widget__details">
                  <span
                    class="kt-widget__title"
                    style="cursor: pointer;"
                    @click="createBooking(room.room_id)"
                  >Book ngắn hạn</span>
                </div>
              </div>
              <div class="kt-widget__item">
                <div class="kt-widget__icon">
                  <i class="flaticon-pie-chart"></i>
                </div>
                <div
                  class="kt-widget__details"
                  v-tooltip.top-center="'Xem thông tin chủ nhà'"
                  @click="openMerchantInfo(room)"
                >
                  <span class="kt-widget__title" style="cursor: pointer;">Chủ nhà</span>
                  <span class="kt-widget__value">{{room.merchant.data.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <sweet-modal ref="long_term_room" overlay-theme="dark">
          <div v-if="currentRoom && currentRoom.prices" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Bảng giá phòng dài hạn</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <span class="kt-section__info">Giá theo tháng</span>
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Kỳ hạn</th>
                        <th>Giá 1 tháng(30 ngày)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(price, index) in currentRoom.prices.prices" :key="index+price">
                        <th scope="row" v-if="index === 'term_1_month'">1 - 2 tháng</th>
                        <th scope="row" v-if="index === 'term_2_month'">2 - 3 tháng</th>
                        <th scope="row" v-if="index === 'term_3_month'">3 - 6 tháng</th>
                        <th scope="row" v-if="index === 'term_6_month'">6 - 12 tháng</th>
                        <th scope="row" v-if="index === 'term_12_month'">Trên 12 tháng</th>
                        <td>{{price | formatNumber}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="kt-section">
                <span class="kt-section__info">Phí dịch vụ</span>
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Dịch vụ</th>
                        <th>Phí dịch vụ</th>
                        <th>Cách tính</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(fee,index) in currentRoom.prices.included_fee" :key="index+100">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{fee.name}}</td>
                        <td>{{fee.included == 1 ? 'Đã trong giá thuê' : 'Chưa gồm trong giá thuê'}}</td>
                        <td>{{fee.calculate_function != 3 ? (fee.value | formatNumber) + fee.calculate_function_txt : fee.calculate_function_txt}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="kt-section">
                <span class="kt-section__info">Thanh toán và đặt cọc</span>
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <!-- <th>#</th> -->
                        <th>Kỳ thanh toán</th>
                        <th>Đặt cọc</th>
                        <th>Gía trị đặt cọc</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <!-- <th scope="row">{{}}</th> -->
                        <td>{{currentRoom.payment_method.payment_term_txt}}</td>
                        <td>{{currentRoom.payment_method.deposit.type_txt}}</td>
                        <td>{{currentRoom.payment_method.deposit.type == 1 ? `${currentRoom.payment_method.deposit.month} Tháng`: (currentRoom.payment_method.deposit.type == 3 ? `${currentRoom.payment_method.deposit.percent}% đặt phòng` : currentRoom.payment_method.deposit.value | formatNumber)}}</td>
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
        <sweet-modal ref="short_term_room" overlay-theme="dark">
          <div v-if="currentRoom" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Bảng giá phòng dài hạn</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <span class="kt-section__info">Giá phòng</span>
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Loại thuê</th>
                        <th>Giá tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="currentRoom.short_term_room.rent_type == 3 || currentRoom.short_term_room.rent_type == 1"
                      >
                        <th scope="row">Theo giờ</th>
                        <td>{{currentRoom.short_term_room.price_hour | formatNumber}}</td>
                      </tr>
                      <tr
                        v-if="currentRoom.short_term_room.rent_type == 3 || currentRoom.short_term_room.rent_type == 2"
                      >
                        <th scope="row">Theo ngày</th>
                        <td>{{currentRoom.short_term_room.price_day | formatNumber}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="kt-section">
                <span class="kt-section__info">Phụ phí</span>
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Phụ phí</th>
                        <th>Giá tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Thêm người(từ người thứ {{currentRoom.guests.recommendation + 1}})</td>
                        <td>{{currentRoom.short_term_room.price_charge_guest | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Dọn dẹp</td>
                        <td>{{currentRoom.short_term_room.cleaning_fee | formatNumber}}</td>
                      </tr>
                      <tr>
                        <td>Thêm giờ</td>
                        <td>{{currentRoom.short_term_room.price_after_hour | formatNumber}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="kt-section">
                <span class="kt-section__info">Chính sách huỷ</span>
                <div class="kt-section__content">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Chính sách huỷ</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <!-- <th scope="row">{{}}</th> -->
                        <td>{{currentRoom.short_term_room.settings.booking_cancel_type_text}}</td>
                        <td>{{`${currentRoom.short_term_room.settings.booking_cancel_text} trước ${currentRoom.short_term_room.settings.days} ngày check-in`}}</td>
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
        <sweet-modal ref="optional_prices" overlay-theme="dark">
          <table v-if="room_prices" class="table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Giá theo ngày</th>
                <th>Giá theo giờ</th>
                <th>Giờ tiếp theo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(price, index) in room_prices" :key="index">
                <td>
                  {{
                  price.weekday == null
                  ? price.day
                  : price.weekday | filterWeekDay
                  }}
                </td>
                <td>{{ price.price_day | formatNumber }}</td>
                <td>{{ price.price_hour | formatNumber }}</td>
                <td>{{ price.price_after_hour | formatNumber }}</td>
              </tr>
            </tbody>
          </table>
        </sweet-modal>
        <sweet-modal ref="merchant_info" overlay-theme="dark">
          <div v-if="currentRoom" class="kt-portlet">
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
                        <td>{{ currentRoom.merchant.data.name }}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{{ currentRoom.merchant.data.email }}</td>
                      </tr>
                      <tr>
                        <td>Số điện thoại</td>
                        <td>{{ currentRoom.merchant.data.phone }}</td>
                      </tr>
                      <tr>
                        <td>Tên chủ TK</td>
                        <td>{{ currentRoom.merchant.data.account_holder }}</td>
                      </tr>
                      <tr>
                        <td>Số TK</td>
                        <td>{{ currentRoom.merchant.data.account_number }}</td>
                      </tr>
                      <tr>
                        <td>Ngân hàng</td>
                        <td>{{ currentRoom.merchant.data.account_branch }}</td>
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
        <sweet-modal ref="room_display" overlay-theme="dark">
          <div v-if="currentRoom" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Vị trí hiển thị phòng</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <!--begin::Section-->
              <div class="kt-section">
                <div class="kt-section__content">
                  <div class="col-xs-12">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Bộ sưu tập</label>
                      <multiselect
                        id="inputUserName"
                        v-model="room_display"
                        label="name"
                        :options="room_display_list"
                        :searchable="true"
                        :show-labels="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                slot="button"
                type="button"
                class="btn btn-success"
                @click="updateRoomDisplay()"
              >Cập nhập</button>
              <!--end::Section-->
            </div>

            <!--end::Form-->
          </div>
        </sweet-modal>
        <sweet-modal ref="minor_update" overlay-theme="dark">
          <div v-if="currentRoom" class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">Cập nhật thông tin</h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <div class="kt-section">
                <button
                  slot="button"
                  type="button"
                  class="btn btn-success col-xs-4"
                  @click="modalUpdateMinorSetOption('merchant_id')"
                >Chủ nhà</button>

                <button
                  slot="button"
                  type="button"
                  class="btn btn-success col-xs-4"
                  @click="modalUpdateMinorSetOption('commission')"
                >Commission</button>

                <button
                  slot="button"
                  type="button"
                  class="btn btn-success col-xs-4"
                  @click="modalUpdateMinorSetOption('admin_note')"
                >Ghi chú</button>
              </div>
              <div class="kt-section">
                <div class="kt-section__content">
                  <div v-if="currentOptionUpdate === 'merchant_id'" class="col-xs-12">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Bộ sưu tập</label>
                      <multiselect
                        style="font-size: 1.2rem;"
                        v-model="merchant_id_minor_update"
                        :custom-label="nameWithPhone"
                        :options="merchants"
                        :searchable="true"
                        :show-labels="true"
                      />
                    </div>
                  </div>
                  <div v-if="currentOptionUpdate === 'commission'" class="col-xs-12">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Commission</label>
                      <input
                        type="text"
                        v-model="currentRoom.short_term_room.commission"
                        class="form-control"
                        placeholder="Hoa hồng Westay"
                      />
                    </div>
                  </div>
                  <div v-if="currentOptionUpdate === 'admin_note'" class="col-xs-12">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Ghi chú</label>
                      <input
                        type="text"
                        v-model="currentRoom.short_term_room.admin_note"
                        class="form-control"
                        placeholder="Ghi chú"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                slot="button"
                type="button"
                class="btn btn-success"
                @click="updateRoomMinor(currentOptionUpdate, currentOptionUpdate === 'commission' ? currentRoom.short_term_room.commission : currentOptionUpdate === 'admin_note' ? currentRoom.short_term_room.commission : '')"
              >Cập nhập</button>
              <!--end::Section-->
            </div>

            <!--end::Form-->
          </div>
        </sweet-modal>
      </div>
      <!-- End Listing -->

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

export default {
  components: { Lottie, SweetModal, Multiselect, Pagination },
  install(Vue, options) {
    Vue.component('SweetModal', SweetModal);
  },
  mixins: [format, constant],
  data() {
    return {
      currentOptionUpdate: 'merchant_id',
      merchant_id_minor_update: {
        id: null,
        name: null,
        phone: null,
      },
      q: '',
      defaultOptions: {
        animationData: animationData,
      },
      room_display: {
        id: null,
        name: null,
      },
      rooms: [],
      room_prices: null,
      merchant: null,
      permissions: 'room.view',
      totalPages: null,
      currentPage: null,
      count: null,
      loading: true,
      currentRoom: null,
      merchant_id: null,
      merchants: [],
      status: {
        id: '',
      },
      room_type: {
        id: '',
      },
      city: {
        id: '',
        name: '',
      },
      district: {
        id: '',
        name: '',
      },
      room_id_long_term: null,
      room_id_short_term: null,
      long_term_status: null,
      short_term_status: null,
    };
  },
  methods: {
    async getRooms({ page, filter, sort }) {
      try {
        const response = await axios.get(`long-term-rooms`, {
          params: {
            include: 'merchant',
            page: page,
            limit: 15,
            merchant_id:
              this.merchant_id != null ? this.merchant_id.id : this.merchant_id,
            room_id_long_term:
              this.room_id_long_term != null ? this.room_id_long_term : '',
            room_id_short_term:
              this.room_id_short_term != null ? this.room_id_short_term : '',
            long_term_status:
              this.long_term_status != null ? this.short_term_status.id : '',
            short_term_status:
              this.short_term_status != null ? this.short_term_status.id : '',
            name: this.q,
            city_id: this.city.id,
            district_id: this.district.id,
            accommodation_type: this.room_type.id,
          },
        });

        let paginate = response.data.meta.pagination;
        this.currentPage = paginate.current_page;
        this.totalPages = paginate.total_pages;
        this.count = paginate.count;
        this.rooms = response.data.data;
        this.loading = false;
      } catch (error) {
        if (error) {
          console.log(error);
          window.toastr['error'](
            'Dữ liệu phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
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
    openLongTermRoomModal(room) {
      this.currentRoom = room;
      this.$refs.long_term_room[0].open();
    },
    openMerchantInfo(room) {
      this.currentRoom = room;
      this.$refs.merchant_info[0].open();
    },
    openUpdateMinorRoom(room) {
      this.currentRoom = room;
      this.merchant_id_minor_update.id = room.merchant_id;
      this.merchant_id_minor_update.name = room.merchant.data.name;
      this.merchant_id_minor_update.phone = room.merchant.data.phone;
      this.$refs.minor_update[0].open();
    },
    modalUpdateMinorSetOption(option) {
      this.currentOptionUpdate = option;
    },
    openShortTermRoomModal(room) {
      this.currentRoom = room;
      this.$refs.short_term_room[0].open();
    },
    openModalUpdateRoomDisplay(room) {
      this.currentRoom = room;
      this.room_display.id = parseInt(room.display);
      this.room_display.name = room.display_txt;
      this.$refs.room_display[0].open();
    },
    async updateRoomDisplay() {
      try {
        const response = await axios.put(
          `long-term-room/update-room-display/${this.currentRoom.room_id}`,
          {
            long_term_room_display: this.room_display.id,
          },
        );
        if (response) {
          this.$refs.room_display[0].close();
        }
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Không thể cập nhật thông tin hiển thị phòng',
            'Error',
          );
        }
      }
    },
    async updateRoomMinor(option, value) {
      try {
        const response = await axios.put(
          `long-term-rooms/minor-update/${this.currentRoom.room_id}/${option}`,
          {
            [option]:
              option === 'merchant_id'
                ? this.merchant_id_minor_update.id
                : value,
          },
        );
        if (response) {
          this.$refs.room_display[0].close();
        }
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Không thể cập nhật thông tin hiển thị phòng',
            'Error',
          );
        }
      }
    },
    async openModalOptionalPrices(room) {
      try {
        const response = await axios.get(
          `get-room-optional-prices/${room.room_id}`,
        );

        this.room_prices = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr['error']('Không lấy được dữ liệu giá ngày lễ', 'Error');
        }
      }
      this.$refs.optional_prices[0].open();
    },
    createBooking(shortTermRoomId) {
      this.$router.push({
        name: 'booking.create',
        params: {
          roomId: shortTermRoomId,
        },
      });
    },
    createBookingLongTerm(roomId) {
      this.$router.push({
        name: 'long-term-booking.create',
        params: {
          roomId: roomId,
        },
      });
    },
    openLongTermRoomPreview(roomId) {
      window.open(`https://westay.vn/long-term-room/${roomId}`, '_blank');
    },
    openShortTermRoomPreview(roomId) {
      window.open(`https://westay.vn/preview-room/${roomId}`, '_blank');
    },
    updateLongTerm(roomId) {
      window.open(
        `https://westay.vn/host/create-listing/${roomId}/detail`,
        '_blank',
      );
    },
    roomApprove(room, option) {
      if (
        room.merchant_stats == 0 &&
        room.short_term_room.merchant_status == 0
      ) {
        this.$swal(
          'Thông báo',
          `Căn hộ đã bị chủ nhà khoá, mã phòng: ${room.room_id}`,
          'info',
        );
      } else {
        if (option === 'long_term') {
          axios
            .put(
              `long-term-rooms/minor-update/${room.room_id}/status_long_term`,
              {
                status_long_term: 1,
              },
            )
            .then(response => {
              this.$swal({
                title: 'Thành công',
                text: `Đã duyệt phòng dài hạn mã: ${room.room_id}`,
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Xác nhận',
                showCloseButton: false,
                showLoaderOnConfirm: true,
              }).then(result => {
                this.reloadData(this.currentPage);
              });
            })
            .catch(error => {
              this.$swal(
                'Thất bại',
                `Không thể duyệt phòng dài hạn mã: ${room.room_id}`,
                'success',
              );
            });
        } else {
          axios
            .put(
              `long-term-rooms/minor-update/${room.room_id}/status_short_term`,
              {
                status_short_term: 1,
              },
            )
            .then(response => {
              this.$swal({
                title: 'Thành công',
                text: `Đã duyệt phòng ngắn hạn mã: ${room.room_id}`,
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Xác nhận',
                showCloseButton: false,
                showLoaderOnConfirm: true,
              }).then(result => {
                this.reloadData(this.currentPage);
              });
            })
            .catch(error => {
              this.$swal(
                'Thất bại',
                `Không thể duyệt phòng ngắn hạn mã: ${room.room_id}`,
                'success',
              );
            });
        }
      }
    },
    roomBlock(room, option) {
      if (option === 'long_term') {
        axios
          .put(
            `long-term-rooms/minor-update/${room.room_id}/status_long_term`,
            {
              status_long_term: 0,
            },
          )
          .then(response => {
            this.$swal({
              title: 'Thành công',
              text: `Đã khoá phòng dài hạn mã: ${room.room_id}`,
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'Xác nhận',
              showCloseButton: false,
              showLoaderOnConfirm: true,
            }).then(result => {
              this.reloadData(this.currentPage);
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .put(
            `long-term-rooms/minor-update/${room.room_id}/status_short_term`,
            {
              status_short_term: 0,
            },
          )
          .then(response => {
            this.$swal({
              title: 'Thành công',
              text: `Đã khoá phòng ngắn hạn mã: ${room.room_id}`,
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'Xác nhận',
              showCloseButton: false,
              showLoaderOnConfirm: true,
            }).then(result => {
              this.reloadData(this.currentPage);
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    reloadData(page) {
      this.loading = true;
      this.getRooms({
        page,
      });
    },
    applyFilter(page) {
      this.getRooms({
        page,
      });
    },
    resetFilter(page) {
      this.q = '';
      this.room_id_long_term = null;
      this.room_id_short_term = null;
      this.room_type = {
        id: '',
      };
      this.city = {
        id: '',
        name: '',
      };
      this.district = {
        id: '',
        name: '',
      };
      this.short_term_status = null;
      this.long_term_status = null;
      this.merchant_id = null;
      this.loading = true;
      this.getRooms({
        page,
      });
    },
    scrollToTop() {
      return window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    },
    nameWithPhone({ name, phone }) {
      return `${name} — [${phone}]`;
    },
  },
  mounted() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403');
          } else {
            this.getRooms({});
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
</style>