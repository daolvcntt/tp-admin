<template>
  <div class="main-content">
    <div class="page-header">
      <h3 class="page-title">Tạo mới Role</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'role.list'}">
            <a>Roles</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          <a href="#">Update Roles</a>
        </li>
      </ol>
    </div>
    <div class="card">
      <div class="card-body">
        <form class="row" @submit.prevent="submitForm">
          <div class="col-sm-4">
            <div class="form-group col-sm-12">
              <label
                :style="errors.has('name') ? 'color:red;' : ''"
              >{{errors.has('name') ? errors.first('name') : 'Tên quyền *'}}</label>
              <input
                name="name"
                type="text"
                data-vv-as="Tên quyền"
                v-validate="'required'"
                v-model="role.name"
                class="form-control"
              >
            </div>
            <div class="form-group col-sm-12">
              <label
                :style="errors.has('slug') ? 'color:red;' : ''"
              >{{errors.has('slug') ? errors.first('slug') : 'Slug *'}}</label>
              <input
                name="slug"
                type="text"
                data-vv-as="Slug"
                v-validate="'required'"
                v-model="role.slug"
                class="form-control"
              >
            </div>
            <button class="btn btn-primary mt-6" type="submit">
              <i class="icon-fa icon-fa-plus-square"/>Cập nhật
            </button>
          </div>
          <div class="col-sm-8">
            <h4>
              <b>Danh sách quyền truy cập</b>
            </h4>
            <div class="ml-2">
              <div v-for="(perG, key) in listPermission" :key="key" class="col-sm-12 mt-3">
                <h5>{{perG.title}}</h5>
                <div class="form-check form-check-inline" v-for="(per, k) in perG.list">
                  <label class="container" style="color:#6c757d">
                    {{per}}
                    <input type="checkbox" v-model="role.permissions" :value="`${key}.${k}`">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "../../../services/auth";
import Multiselect from "vue-multiselect";
import { hoursList, format, constant } from "../../../helpers/mixins";
import { map, chain } from "lodash";
export default {
  data() {
    return {
      role: {
        name: null,
        slug: null,
        permissions: []
      },
      listPermission: null,
      permission: "booking.update"
    };
  },
  components: {
    Multiselect
  },
  mounted() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permission).then(response => {
          if (!response) {
            this.$router.push("/permission-denied-403");
          } else {
            this.allPermission({});
            this.getRole();
          }
        });
      }
    });
    this.hideSidebarOnMobile();
  },
  methods: {
    async getRole() {
      try {
        const response = await axios.get(`roles/${this.$route.params.roleId}`, {
          params: {
            include: "pers"
          }
        });
        this.setInitData(response.data.data);
      } catch (error) {
        if (error) {
          window.toastr["error"](
            "Dữ liệu quyền này hiện thời chưa có sẵn, vui lòng thử lại sau",
            "Error"
          );
        }
      }
    },
    setInitData(dataRole) {
      let initData = { ...dataRole };
      initData.permissions = map(initData.permissions, (value, key) => key);
      this.role = { ...this.role, ...initData };
    },
    // setInitData(dataRole) {
    //   let initData = { ...dataRole};
    //   let permissions = initData.permissions;
    //   Object.keys(permissions).map(function(key, value){ return key });
    //   this.role.permissions = permissions
    //   this.role.name = initData.name
    //   this.role.slug = initData.slug
    //   console.log(this.role)
    // },
    async allPermission() {
      try {
        const response = await axios.get(`permissions`, {
          params: {
            include: ""
          }
        });
        this.listPermission = response.data;
      } catch (error) {
        if (error) {
          window.toastr["error"](
            "Dữ liệu danh sách permission hiện thời chưa có sẵn, vui lòng thử lại sau",
            "Error"
          );
        }
      }
    },
    async submitForm() {
      let transform_permission = chain(this.role.permissions)
        .map(value => {
          return [value, true];
        })
        .fromPairs()
        .value();
      try {
        const response = await axios
          .put(`roles/${this.$route.params.roleId}`, {
            name: this.role.name,
            slug: this.role.slug,
            permissions: transform_permission
          })
          .then(response => {
            this.$swal("Thành công", "Sửa thành công", "success");
            this.$router.push({ name: "role.list" });
          });
      } catch (error) {
        if (error) {
          this.$swal(
            "Xin lỗi",
            "Sửa thất bại, làm ơn kiểm tra lại thông tin",
            "error"
          );
        }
      }
    },
    hideSidebarOnMobile() {
      let self = this;
      window.onresize = function() {
        if (window.innerWidth <= 992) {
          self.isLeftSidebarVisible = false;
        }
      };
    }
  }
};
</script>
<style scoped>
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
