<template>
  <div class="main-content">
    <div class="page-header">
      <h3 class="page-title">Tạo mới collections</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'collections.list'}">
            <a>Collections</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          <a href="#">Tạo mới collection</a>
        </li>
      </ol>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6>Tạo mới bộ sưu tập</h6>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="form-row">
                <div class="col-md-6 row">
                  <div class="form-group col-md-6">
                    <label
                      :style="errors.has('name') ? 'color:red;' : ''"
                    >{{errors.has('name')? errors.first('name') : 'Tên bộ sưu tập *'}}</label>
                    <input
                      name="name"
                      data-vv-as="Tên bộ sưu tập"
                      v-validate="'required'"
                      v-model="collection.vi.name"
                      type="text"
                      class="form-control"
                      placeholder="Nhập..."
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label>Nổi bật</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input
                          name="collectionHot"
                          v-model="collection.hot"
                          class="form-check-input"
                          type="radio"
                          :value="0"
                        />
                        <label class="form-check-label">Không</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          name="collectionHot"
                          v-model="collection.hot"
                          class="form-check-input"
                          type="radio"
                          :value="1"
                        />
                        <label class="form-check-label">Có</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group custom-margin col-md-6">
                    <label>Trạng thái</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input
                          v-model="collection.status"
                          class="form-check-input"
                          type="radio"
                          :value="0"
                        />
                        <label class="form-check-label">Đang chờ duyệt</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          v-model="collection.status"
                          class="form-check-input"
                          type="radio"
                          :value="1"
                        />
                        <label class="form-check-label">Đã duyệt</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group custom-margin col-md-6">
                    <label>Loại bộ sưu tập</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input
                          v-model="collection.new"
                          class="form-check-input"
                          type="radio"
                          :value="0"
                        />
                        <label class="form-check-label">Cũ</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          v-model="collection.new"
                          class="form-check-input"
                          type="radio"
                          :value="1"
                        />
                        <label class="form-check-label">Mới</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 row">
                  <div class="form-group col-md-12">
                    <label v-if="collection.image.length">Ảnh *</label>
                    <label v-else style="color: red;">Ảnh là bắt buộc *</label>
                    <vue-dropzone
                      id="dropzone"
                      ref="myVueDropzone"
                      :options="dropzoneOptions"
                      @vdropzone-canceled
                      @vdropzone-complete="afterComplete"
                      @vdropzone-removed-file="remove"
                      :duplicateCheck="true"
                    ></vue-dropzone>
                  </div>
                </div>

                <div class="col-md-12 row">
                  <div class="form-group col-md-4 mt-2">
                    <label
                      class="typo__label"
                      :style="errors.has('roomCollection') ? 'color:red;' : ''"
                    >{{errors.has('roomCollection')? errors.first('roomCollection') : 'Chọn phòng *'}}</label>

                    <multiselect
                      style="z-index: 3"
                      name="roomCollection"
                      data-vv-as="Phòng"
                      v-validate="'required'"
                      v-model="rooms"
                      :options="allRoom"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="true"
                      :preserve-search="true"
                      track-by="name"
                      placeholder="Chọn phòng"
                      label="name"
                      :preselect-first="true"
                    >
                      <template slot="selection" slot-scope="{ values, search, isOpen }">
                        <span
                          class="multiselect__single"
                          v-if="values.length &amp;&amp; !isOpen"
                        >{{ values.length }} phòng đã được chọn</span>
                      </template>
                    </multiselect>
                  </div>

                  <div
                    class="form-group col-md-11 row container-room ml-3 mt-2"
                    v-if="rooms.length > 0"
                  >
                    <draggable
                      name="roomCollection"
                      data-vv-as="Phòng"
                      v-validate="'required'"
                      v-model="rooms"
                      :options="{group:'people'}"
                      @start="drag=true"
                      @end="drag=false"
                    >
                      <div class="list-room" v-for="element in rooms" :key="element.id">
                        <p class="btn btn-outline-secondary name-room">
                          {{element.name}}
                          <i
                            class="icon-fa icon-fa-times icon-room"
                            @click="deleteRoom(element.name,element.id)"
                          ></i>
                        </p>
                      </div>
                    </draggable>
                  </div>
                </div>

                <div class="col-md-12 row">
                  <tabs class="tabs-default col-md-12" style="padding-left:1em;padding-top:1em;">
                    <tab id="basic-home" name="Tiếng việt">
                      <div class="form-group custom-margin col-md-12">
                        <label
                          :style="errors.has('descriptionCollection') ? 'color:red;' : ''"
                        >{{errors.has('descriptionCollection')? errors.first('descriptionCollection') : 'Mô tả (tiếng việt) *'}}</label>
                        <textarea
                          name="descriptionCollection"
                          v-validate="'required'"
                          cols="100"
                          rows="5"
                          v-model="collection.vi.description"
                        ></textarea>
                      </div>
                    </tab>
                    <tab id="basic-profile" name="Tiếng anh">
                      <div class="form-group col-md-3">
                        <label for="nameCollection">Tên bộ sưu tập (tiếng anh)</label>
                        <input
                          v-model="collection.en.name"
                          id="nameCollection"
                          type="text"
                          class="form-control"
                          placeholder="Nhập..."
                        />
                      </div>
                      <div class="form-group custom-margin col-md-12">
                        <label>Mô tả (tiếng anh)</label>
                        <textarea cols="100" rows="5" v-model="collection.en.description"></textarea>
                      </div>
                    </tab>
                  </tabs>
                </div>
              </div>
              <button
                type="submit"
                :disabled="collection.image.length == 0"
                class="btn btn-primary"
                style="margin-top: 2.2em;"
              >Thêm mới</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from '../../../services/auth';
import vue2Dropzone from 'vue2-dropzone';
import { chain } from 'lodash';
import Multiselect from 'vue-multiselect';
import { Tabs, Tab } from 'vue-tabs-component';
import draggable from 'vuedraggable';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
export default {
  components: {
    Multiselect,
    tabs: Tabs,
    tab: Tab,
    VueUploadMultipleImage,
    vueDropzone: vue2Dropzone,
    draggable,
  },
  data() {
    return {
      language: 0,
      collection: {
        image: [],
        hot: 0,
        status: 0,
        new: 0,
        vi: {
          name: '',
          description: '',
          lang: 'vi',
        },
        en: {
          name: '',
          description: '',
          lang: 'en',
        },
      },
      permission: 'collection.create',
      allRoom: [],
      rooms: [],
      room: {},
      dropzoneOptions: {
        url: 'https://dev.westay.vn/merchant-api/upload-image',
        maxFilesize: 5,
        maxFiles: 1,
        addRemoveLinks: true,
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        dictCancelUpload: 'Remove File',
        language: {
          dictDefaultMessage: 'Click để chọn ảnh',
        },
      },
    };
  },
  mounted() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permission).then(response => {
          if (!response) {
            this.$router.push('/permission-denied-403');
          } else {
            this.getNameRooms();
          }
        });
      }
    });
    this.hideSidebarOnMobile();
  },
  methods: {
    afterCompleteImageAvatar(file) {
      if (file.dataURL) {
        this.collection.image = file.dataURL;
      }
    },
    removedImageInDropzone(file, error, xhr) {
      this.collection.image = null;
    },
    selectRoom(selectedOption, id) {
      let objectRoom = {
        id: selectedOption.id,
        name: selectedOption.name,
      };
      this.rooms.push(objectRoom);
    },
    deleteRoom(name, id) {
      let valueRooms = this.rooms;
      for (var i = 0; i < valueRooms.length; i++) {
        if (valueRooms[i].id === id) {
          valueRooms.splice(i, 1);
        }
      }
      this.rooms = valueRooms;
    },

    afterComplete(file) {
      this.collection.image = file.dataURL;
    },
    remove(file) {
      this.collection.image = null;
    },

    async getNameRooms() {
      try {
        const response = await axios.get(`rooms/get-name`, {
          params: {
            include: '',
          },
        });
        let allRoom = response.data.data;
        for (var i = 0; i < allRoom.length; i++) {
          let objectRoom = {
            id: allRoom[i].id,
            name: allRoom[i].name,
          };
          this.allRoom.push(objectRoom);
        }
      } catch (error) {
        if (error) {
          window.toastr['error'](
            'Dữ liệu danh sách tên phòng hiện thời chưa có sẵn, vui lòng thử lại sau',
            'Error',
          );
        }
      }
    },
    async submitForm() {
      const result = this.$validator.validateAll();
      if (result) {
        if (this.collection.en.name == '') {
          this.collection.en.name = this.collection.vi.name;
        }
        if (this.collection.en.description == '') {
          this.collection.en.description = this.collection.vi.description;
        }
        let data = [];
        let details = { data };
        data[0] = this.collection.vi;
        data[1] = this.collection.en;
        let valueRooms = [];
        if (this.rooms.length > 0) {
          for (let i = 0; this.rooms.length > i; i++) {
            valueRooms.push(this.rooms[i].id);
          }
        }
        try {
          const response = await axios
            .post(`collections`, {
              image: this.collection.image,
              hot: this.collection.hot,
              new: this.collection.new,
              status: this.collection.status,
              rooms: valueRooms,
              details: details,
            })
            .then(response => {
              this.$swal('Thành công', 'Thêm thành công', 'success');
              this.$router.push({ name: 'collections.list' });
            });
        } catch (error) {
          if (error) {
            this.$swal(
              'Xin lỗi',
              'Collection chưa được lưu, làm ơn kiểm tra lại thông tin',
              'error',
            );
          }
        }
      } else {
        return window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
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
};
</script>
<style scoped>
.custom-margin {
  margin-top: 1em;
}
.container-room {
  border: 1px solid lightgray;
  padding-top: 1rem;
  border-radius: 15px;
}
.list-room {
  display: inline-block;
  margin-left: 1em;
}
.name-room:hover {
  color: yellowgreen;
}
.icon-room:hover {
  color: red;
}
</style>
