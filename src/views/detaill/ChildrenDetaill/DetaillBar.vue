<template>
  <div>
    <NavBar>
      <div slot="right" @click="backClic" class="back">
        <img src="~assets/img/common/back.svg" >
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
        class="titleItem" :class="{active:index===currentIndex}"
        @click="getType(index)">
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetaillBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }

  },
  methods:{
    getType(index) {
      this.currentIndex = index;
    },
    backClic(){
      this.$router.back();
    }
  }
}
</script>


<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .titleItem{
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>