<template>
<promotion-form v-if="promotionDetail" type="Update" :data-promotion="promotionDetail" />
</template>
<script>
import PromotionForm from './PromotionForm';
import Auth from "../../../services/auth";

export default {
  name: 'PromotionUpdate',
  components: {
    PromotionForm
  },
  data(){
    return {
      promotionDetail: null,
      permissions:"promotion.update",
    };
  },
  methods: {
    async getPromotionById() {
      try {
        const response = await axios.get(`promotions/${ this.$route.params.promotionId }`);
        this.promotionDetail = response.data.data;
      } catch (error) {
        if (error) {
          window.toastr["error"](
            "Dữ liệu chương trình khuyến mãi hiện thời chưa có sẵn, vui lòng thử lại sau",
            "Error"
          );
        }
      }
    }
  },
  created() {
    Auth.getProfile().then(res => {
      if (res) {
        Auth.canAccess(res.permissions, this.permissions).then(response => {
          if (!response) {
            this.$router.push("permission-denied-403"); // push về page 403
          } else {
            this.getPromotionById();
          }
        });
      }
    });
  }
};
</script>

