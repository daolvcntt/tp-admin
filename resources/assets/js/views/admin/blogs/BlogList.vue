<template>
  <div class="main-content">
    <div class="page-header">
      <h3 class="page-title">Bài viết</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Trang chủ</a>
        </li>
        <li class="breadcrumb-item active">Danh sách bài viết</li>
      </ol>
      <div class="page-actions">
        <router-link class="btn btn-primary" :to="{ name: 'blog.create'}">
          <i class="icon-fa icon-fa-plus" /> Viết bài
        </router-link>
      </div>
    </div>

    <div class="mailbox">
      <div class="card">
        <div class="card-header">Bộ lọc</div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-5">
              <div class="form-group row">
                <label for="tagBlog" class="col-sm-2 col-form-label">Tìm kiếm</label>
                <div class="col-sm-10">
                  <input
                    v-model="tags"
                    id="tagBlog"
                    type="text"
                    class="form-control"
                    placeholder="Nhập vào tên bài viết, tags..."
                  />
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="form-group row">
                <label for="userName" class="col-sm-2 col-form-label">Người viết</label>
                <div class="col-sm-4">
                  <multiselect
                    class="custom-input-filter"
                    id="userName"
                    v-model="user"
                    label="name"
                    :options="users"
                    :searchable="true"
                    :show-labels="false"
                  />
                </div>
                <label for="collection" class="col-sm-2 col-form-label">Bộ sưu tập</label>
                <div class="col-sm-4">
                  <multiselect
                    class="custom-input-filter"
                    id="collection"
                    v-model="category"
                    label="name"
                    :options="list_categories"
                    :searchable="true"
                    :show-labels="false"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Hiển thị</label>
                <div class="col-sm-10 mt-2">
                  <div class="form-check form-check-inline">
                    <input
                      id="inlineCheckbox1"
                      class="form-check-input"
                      type="checkbox"
                      v-model.number="hot_blog"
                      true-value="1"
                      false-value="0"
                    />
                    <label class="form-check-label" for="inlineCheckbox1">Hot</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      id="inlineCheckbox2"
                      class="form-check-input"
                      type="checkbox"
                      v-model.number="new_blog"
                      true-value="1"
                      false-value="0"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">New</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      id="inlineCheckbox3"
                      class="form-check-input"
                      type="checkbox"
                      v-model.number="status_blog"
                      true-value="1"
                      false-value="0"
                    />
                    <label class="form-check-label" for="inlineCheckbox3">Status</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="form-group row">
                <label for="lastName" class="col-sm-2 col-form-label">Từ ngày</label>
                <div class="col-sm-4">
                  <datepicker
                    class="custom-input-filter"
                    v-model="date_start"
                    :format="format"
                    input-class="form-control"
                  />
                </div>
                <label for="lastName" class="col-sm-2 col-form-label">Đến ngày</label>
                <div class="col-sm-4">
                  <datepicker
                    class="custom-input-filter"
                    :disabled-dates="disabledDate"
                    v-model="date_end"
                    :format="format"
                    input-class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <button @click="applyFilter(1)" class="btn btn-success btn-sm">Áp dụng</button>
          <button @click="resetFilter(1)" class="btn btn-info btn-sm">Làm mới</button>
        </div>
      </div>
      <div class="mailbox-content">
        <lottie v-if="loading" :options="defaultOptions" :height="150" :width="150"></lottie>
        <table class="table" v-else>
          <thead>
            <tr>
              <th>#</th>
              <td>Ảnh</td>
              <th>Tên</th>
              <th>Bộ sưu tập</th>
              <th colspan="2">Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(blog,index) in blogs" :key="index" :class="{'read' : blog.status }">
              <td>{{index + 1}}</td>
              <td class="cell-content" width="160">
                <img
                  :src="'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/'+blog.image"
                  height="150px"
                  width="150px"
                />
              </td>
              <td class="cell-content">
                <div class="content">
                  <div class="content-name mb-2">
                    <p>{{blog.title}}</p>
                  </div>
                  <div class="content-subject mb-2">
                    <i class="icon-fa icon-fa-user" />
                    &ensp; Người đăng: {{ blog.user.data.name }}
                  </div>
                  <div class="content-subject mb-2">
                    <i class="icon-fa icon-fa-clock-o" />
                    &ensp;Ngày tạo: {{ blog.created_at | formatDateBlog }}
                  </div>
                  <div class="content-subject mb-2">
                    <i class="icon-fa icon-fa-tag" />
                    &ensp;
                    <span
                      v-for="(tag,idx) in blog.tags.data"
                      :key="'tag'+idx"
                    >
                      {{ tag.name }}
                      <span v-if="idx != (blog.tags.data.length - 1)">&frasl;</span>
                    </span>
                  </div>
                  <div class="content-subject mb-2" style="color:#008ae1">
                    <i class="icon-fa icon-fa-clock-o" />
                    &ensp;Ngày đăng: {{ blog.scheduled | formatDateBlog }}
                  </div>
                </div>
              </td>
              <td width="15%" class="cell-content">
                <div
                  class="content-subject mb-2"
                  v-for="category in blog.categories.data"
                  :key="category.details.data[0].slug"
                >
                  <i class="icon-fa icon-fa-tasks" />
                  &ensp;{{ category.details.data[0].name }}
                </div>
              </td>
              <td width="10%">
                <div class="mb-3">Bài mới</div>
                <div class="mb-3">Bài hot</div>
                <div class="mb-3">Trạng thái</div>
              </td>
              <td class="cell-fav">
                <div class="content-subject mb-3">
                  <button
                    @click="updateMinorBlog('new',blog)"
                    type="button"
                    :class="blog.new == 1 ? 'btn btn-xs btn-icon btn-success mailbox-action' :'btn btn-xs btn-icon btn-light mailbox-action'"
                  >
                    <i :class="blog.new == 1 ? 'icon-fa icon-fa-check' : 'icon-fa icon-fa-times'"></i>
                  </button>
                </div>
                <div class="content-subject mb-3">
                  <button
                    @click="updateMinorBlog('hot',blog)"
                    type="button"
                    :class="blog.hot == 1 ? 'btn btn-xs btn-icon btn-success mailbox-action' :'btn btn-xs btn-icon btn-light mailbox-action'"
                  >
                    <i :class="blog.hot == 1? 'icon-fa icon-fa-check' : 'icon-fa icon-fa-times'"></i>
                  </button>
                </div>
                <div class="content-subject mb-3">
                  <button
                    type="button"
                    :class="blog.status == 1 ? 'btn btn-xs btn-icon btn-success mailbox-action' :'btn btn-xs btn-icon btn-danger mailbox-action'"
                  >
                    <i :class="blog.status == 1? 'icon-fa icon-fa-check' : 'icon-fa icon-fa-times'"></i>
                  </button>
                </div>
              </td>
              <td width="15%" style="text-align:center">
                <div class="btn-group mb-3" role="group" aria-label="First group">
                  <button
                    @click="openDetailBlog(blog.id)"
                    v-tooltip.top-center="'Chi tiết'"
                    type="button"
                    class="btn btn-sm btn-icon btn-outline-info"
                  >
                    <i class="icon-fa icon-fa-search" />
                  </button>
                  <button
                    @click="openUpdateBlog(blog.id)"
                    v-tooltip.top-center="'Chỉnh sửa'"
                    type="button"
                    class="btn btn-sm btn-icon btn-outline-info"
                  >
                    <i class="icon-fa icon-fa-pencil" />
                  </button>
                  <button
                    v-if="!ctv_role"
                    v-tooltip.top-center="'Xóa'"
                    @click="deleteBlog(blog.id)"
                    type="button"
                    class="btn btn-sm btn-icon btn-outline-info"
                  >
                    <i class="icon-fa icon-fa-times" />
                  </button>
                </div>
                <div class="btn-group mb-3" role="group" aria-label="First group">
                  <button
                    @click="updateMinorBlog('status',blog)"
                    v-if="!ctv_role && blog.status == 0"
                    class="btn btn-success btn-xs"
                  >Duyệt bài</button>
                  <button
                    @click="openSchedulerModal(blog)"
                    v-if="!ctv_role && blog.status == 0"
                    class="btn btn-warning btn-xs"
                  >Đặt lịch</button>
                </div>
                <button
                  @click="updateMinorBlog('status',blog)"
                  v-if="!ctv_role && blog.status == 1"
                  class="btn btn-danger btn-xs"
                >Ẩn bài viết</button>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination @clicked="reloadData" :total-pages="totalPages" :current-page="currentPage" />

        <sweet-modal overlay-theme="dark" ref="scheduler">
          <div v-if="currentBlog != null" class="card">
            <div class="card-header">
              <h6>{{currentBlog.title}}</h6>
            </div>
            <div class="card-body">
              <div
                class="col-xs-6 mb-3"
                style="color:#0066A6"
              >Giờ đăng bài: {{currentBlog.scheduled}}</div>
              <!-- <div class="col-xl-12"> -->
              <div class="col-xs-6 mb-3">
                <label>Ngày đăng bài</label>
                <datepicker
                  :disabled-dates="disabledDatesCheckin"
                  name="checkin_date"
                  input-class="form-control"
                  v-model="schedule.post_date"
                  :format="format"
                />
              </div>
              <div class="col-xs-6 mb-3">
                <label>Giờ đăng bài</label>
                <multiselect
                  :allow-empty="true"
                  name="post_hour"
                  v-model="schedule.post_hour"
                  :options="blogPostHour"
                  :searchable="true"
                  :show-labels="false"
                />
              </div>
              <!-- </div> -->
            </div>
          </div>

          <button
            slot="button"
            type="button"
            class="btn btn-default"
            data-dismiss="modal"
            @click="closeSchedulerModal"
          >Đóng</button>

          <button
            slot="button"
            type="button"
            class="btn btn-primary"
            @click="updateMinorBlog('post_hour',currentBlog)"
          >Xác nhận</button>
        </sweet-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../../../services/auth';
import { SweetModal } from 'sweet-modal-vue';
import Lottie from 'vue-lottie';
import * as animationData from '../../loading/material_wave_loading.json';
import { format, constant, hoursList, location } from '../../../helpers/mixins';
import Datepicker from 'vuejs-datepicker';
import Multiselect from 'vue-multiselect';
import Pagination from '../../../components/paginate/ServerPagination';
import Ls from '../../../services/ls';
import moment from 'moment';

export default {
  mixins: [format, constant, hoursList, location],
  components: {
    Pagination,
    Multiselect,
    Datepicker,
    Lottie,
    SweetModal,
  },
  data() {
    return {
      schedule: {
        post_hour: null,
        post_date: null,
      },
      ctv_role: Ls.get('auth.currentRole') === 'ctv' ? true : false,
      defaultOptions: {
        animationData: animationData,
      },
      list_categories: [],
      format: 'dd/MM/yyyy',
      permissions: 'blog.view',
      totalPages: null,
      currentPage: null,
      count: null,
      loading: true,
      user: {
        id: '',
      },
      tags: '',
      status: null,
      category: {
        id: '',
      },
      hot_blog: null,
      new_blog: null,
      status_blog: null,
      date_start: null,
      date_end: null,
      categories: [],
      blogs: [],
      users: [],
      disabledDate: {
        to: '',
      },
      currentBlog: {
        name: '',
        post_hour: '',
      },
    };
  },
  watch: {
    categories: {
      handler(val) {
        val.forEach(element => {
          this.list_categories.push({
            id: element.id,
            name: element.details.data[0].name,
          });
        });
      },
      deep: true,
    },
    date_start: {
      handler(val) {
        let addOneDay = this.addDay(val);
        this.disabledDate.to = new Date(addOneDay);
      },
    },
    schedule: {
      handler(val) {
        // console.log(val)
        if (val.post_date !== null) {
          let post_date_schedule = new Date(val.post_date);
          let show_date = new Date(
            post_date_schedule.getFullYear(),
            post_date_schedule.getMonth(),
            post_date_schedule.getDate() + 1,
          );
          this.currentBlog.scheduled = `${show_date
            .toISOString()
            .substr(0, 10)} ${val.post_hour}`;
        }
      },
      deep: true,
    },
  },
  computed: {
    disabledDatesCheckin() {
      let today = new Date();
      let disabledTo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      return { to: disabledTo };
    },
  },
  methods: {
    addDay(date) {
      let beforeAddDay = new Date(date);
      let timeDay = 86400000;
      let afterAddDay = new Date(beforeAddDay.getTime() + timeDay);
      let day = afterAddDay.toISOString().substring(0, 10);
      return day;
    },
    async getBlogs({ page, filter, sort }) {
      let date_start =
        this.date_start !== null
          ? this.date_start.toISOString().substr(0, 10)
          : '';
      let date_end =
        this.date_end !== null ? this.date_end.toISOString().substr(0, 10) : '';
      try {
        const response = await axios.get(`blogs`, {
          params: {
            include: 'user,categories.details,tags',
            page: page,
            limit: 10,
            date_start: date_start,
            date_end: date_end,
            user: this.user.id,
            q: this.tags,
            status: this.status,
            hot: this.hot_blog,
            new: this.new_blog,
            status: this.status_blog,
            category: this.category.id,
          },
        });

        let paginate = response.data.meta.pagination;
        this.currentPage = paginate.current_page;
        this.totalPages = paginate.total_pages;
        this.count = paginate.count;
        this.blogs = response.data.data;
        this.loading = false;
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Không lấy được danh sách bài viết, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async getUsers() {
      try {
        const response = await axios.get(`users`, {
          params: {
            limit: -1,
            type: 2,
          },
        });
        this.users = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr['error']('There was an error', 'Error');
        }
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(`categories`, {
          params: {
            limit: -1,
            include: 'details',
          },
        });
        this.categories = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr['error']('There was an error', 'Error');
        }
      }
    },
    async updateMinorBlog(option, blog) {
      if (option === 'hot') {
        let response = await axios
          .put(`blogs/single-update/${blog.id}?option=${option}`, {
            hot: blog.hot == 1 ? 0 : 1,
          })
          .then(result => {
            if (result) {
              this.reloadData(this.currentPage);

              window.toastr['success']('Updated Hot Room!', 'Success');
            } else {
              window.toastr['error']('Something wrong!', 'Error');
            }
          });
      } else if (option === 'new') {
        let response = await axios
          .put(`blogs/single-update/${blog.id}?option=${option}`, {
            new: blog.new == 1 ? 0 : 1,
          })
          .then(result => {
            if (result) {
              this.reloadData(this.currentPage);

              window.toastr['success']('Updated New Room!', 'Success');
            } else {
              window.toastr['error']('Something wrong!', 'Error');
            }
          });
      } else if (option === 'status') {
        let response = await axios
          .put(`blogs/single-update/${blog.id}?option=${option}`, {
            status: blog.status == 1 ? 0 : 1,
          })
          .then(result => {
            if (result) {
              this.reloadData(this.currentPage);
              window.toastr['success']('Updated Status!', 'Success');
            } else {
              window.toastr['error']('Something wrong!', 'Error');
            }
          });
      } else if (option === 'post_hour') {
        let response = await axios
          .put(`blogs/single-update/${blog.id}?option=${option}`, {
            post_hour: this.currentBlog.scheduled,
          })
          .then(result => {
            if (result) {
              this.reloadData(this.currentPage);
              window.toastr['success'](
                'Đã lên lịch cho bài đăng!',
                'Thành công',
              );
              this.closeSchedulerModal();
            }
          })
          .catch(err => {
            window.toastr['error'](
              'Có lỗi xảy ra, vui lòng thử lại sau!',
              'Có lỗi',
            );
          });
      }
    },
    async deleteBlog(id) {
      this.$swal({
        title: 'Bạn có muốn xóa bài viết này không ?',
        type: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Quay lại',
        showCloseButton: true,
      }).then(result => {
        if (result.value) {
          let response = axios.delete('blogs/' + id).then(result => {
            if (result) {
              this.reloadData(this.currentPage);
              this.$swal('Success!', 'Bài viết đã đưọc xóa', 'success');
            } else {
              this.$swal('Xin lỗi', 'Bài viết chưa đưọc xóa', 'error');
            }
          });
        }
      });
    },
    openSchedulerModal(blog) {
      this.currentBlog = blog;
      this.$refs.scheduler.open();
    },
    closeSchedulerModal() {
      this.schedule = {
        post_hour: null,
        post_date: null,
      };
      this.currentBlog = {
        name: '',
        post_hour: '',
      };
      this.$refs.scheduler.close();
    },
    openDetailBlog(blog_id) {
      this.$router.push({
        name: 'blog.detail',
        params: {
          blogId: blog_id,
        },
      });
    },
    openUpdateBlog(blog_id) {
      this.$router.push({
        name: 'blog.update',
        params: {
          blogId: blog_id,
        },
      });
    },
    reloadData(page) {
      this.getBlogs({
        page,
      });
    },
    applyFilter(page) {
      this.getBlogs({
        page,
      });
    },
    resetFilter(page) {
      this.tags = '';
      this.user = {
        id: '',
      };
      this.category = {
        id: '',
      };
      this.date_start = null;
      this.date_end = null;
      this.hot_blog = null;
      this.new_blog = null;
      this.status_blog = null;
      this.getBlogs({
        page,
      });
    },
    hideSidebarOnMobile() {
      let self = this;
      window.onresize = function() {
        if (window.innerWidth <= 992) {
          self.isLeftSidebarVisible = false;
        }
      };
    },
  },
  mounted() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403');
          } else {
            this.getBlogs({});
            this.getUsers();
            this.getCategories();
          }
        });
      }
    });
    this.hideSidebarOnMobile();
  },
};
</script>

<style>
.custom-input-filter {
  width: 300px;
  margin-left: -27px;
}
</style>
