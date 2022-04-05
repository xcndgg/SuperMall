<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name: "HomeSwiper",
  props: {
      banner:{
        type : Array,
        default() {
          return []
        }
      }
  },
  data(){
    return {
      isload:false
    }

  },
  components:{
    Swiper,SwiperItem
  },
  methods:{
    imgLoad() {
      if(!this.isload){
        this.$emit("imgLoad")
        this.isload=true;
      }
    }
  }
}
</script>

<style scoped>

</style>