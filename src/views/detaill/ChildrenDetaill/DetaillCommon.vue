<template>
  <div class="comment-info-wrap" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-title flex">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div v-for="item in commentInfo">
      <div class="comment-user-info">
        <span><img :src="item.user.avatar" alt="" class="avatar"></span>
        <span>{{item.user.uname}}</span>
      </div>
      <div class="comment-text">{{item.content}}</div>
      <div class="comment-goods-info">
        <span class="comment-time">{{item.created | showDate}}</span>
        <span>{{item.style}}</span>
      </div>
      <div class="flex">
        <div class="comment-info-images" v-for="item in item.images">
          <img :src="item" alt="">
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {formatDate} from "@/common/Utils/FormatDate";

  export default {
  name: "DetaillCommon",
  props:{
    commonInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
    filters:{
    showDate(value){
      const date = new Date(value * 1000);
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
    }
}
</script>

<style scoped>
</style>
