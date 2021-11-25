<template>
	<div>
    <div class="l-dm">
      
      <!-- <el-select v-model="value" placeholder="当前结构体" :popper-append-to-body="false">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <el-select clearable :popper-append-to-body="false"
            @change="changeStruct"
            @clear="changeStruct"
            v-model="structvalue"
            placeholder="当前结构体">
          <el-option
            v-for="item in structdata"
              :label="item.structname"
              :key="item.structid"
              :value="item.structid"
              >
              <span style="float: left">{{ item.structname }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.structid }}</span> -->
          </el-option>
        </el-select>
      <nav class="nav">
        <ul>
          <li> <a href="#" @click="openIntroduce"> <span> 平台简介 </span> </a> </li>
          <li> <a href="#" @click="openStructure"> <span> 结构管理 </span> </a> </li>
        </ul>
      </nav>
      </div>
      <div class="r-dm">
      <div class="sensor-top">
        <span class="sensor-num">2</span>
        <span class="sensor-txt">结构体数量</span>
      </div>
      <div  class="sensor-bottom">
        <span class="sensor-num">268</span>
        <span class="sensor-txt">预警总条数</span>
      </div>
  </div>
  <!--弹框组件开始-----------------------start-->
    <!-- <standardPanel-page
      v-if="dialogFormVisible"
      ref="introduce"
      :dialog-title="dialogTitle"
      :item-info="tableItem"
      @closeDialog="closeDialog"
    ></standardPanel-page> -->
    <!-- <introduce-bar v-model="sendVal"></introduce-bar> -->
    <introduce-bar v-model="sendVal" type="confirm" title="动力灾害监控数据分析平台" content="平台简介" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></introduce-bar>
    <introduce-bar v-model="senStructure" type="danger" title="动力灾害监控数据分析平台" content="管理" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></introduce-bar>
  </div>

  
</template>

<script>
import structure from './structure.vue'
import introduce from './introduce.vue'
import Bus from '../../../assets/js/bus.js';
export default {
  name: 'LeftDomain',
  components: {
    //introduce,
     'structure-bar': structure,
     'introduce-bar': introduce,
  },
  data () {
    return {
      structdata: [],
      structvalue:'',
      sendVal:false,
      senStructure:false,
      options: [],
      value: ''
    }
  },
  mounted() {
      Bus.$on('addClickHandler',()=>{
            console.log('addClickHandler')
        });
      Bus.$on('structdata', structdata => {  
            //console.log("dome02组件收到bus消息：",structdata);  
            this.structdata = structdata
            let options = []
            if (structdata != undefined && structdata.length > 0) {
                  for ( var i = 0; i < structdata.length; i++) {
                    //console.log(this.structdata[i].structid)
                    
                    this.options = structdata
                    // this.options.value = this.structdata[i].structid
                    // this.options[i].value = this.structdata[i].structid
                    // this.options.label = this.structdata[i].structname
                  }
                  this.structvalue = this.structdata[0].structname
            }
        });  
  },
  methods: {
    
    openStructure(index){
            this.senStructure = true;
        },
    openIntroduce(index){
            this.sendVal = true;
        },
    clickCancel(){
        console.log('点击了取消');
    },
    clickDanger(){
        console.log('这里是danger回调')
    },
    clickConfirm(){
        console.log('点击了confirm');
    },
    changeStruct(){
      console.log('改变结构体的方法')
      //this.$parent.addClickHandler();
      //this.$emit('getStructInfo');
      Bus.$on("addClickHandler", this.addClickHandler);
    }
  }
}
</script>

<style lang="less">
.l-dm{display: block; float: left; width: 64%;height: 100%;z-index: 9999;}
.r-dm{    display: block;
    float: left;
    width: 33%;
    height: 100%;
    }
.r-dm .sensor-top{border: #a2cfde solid 8px;
    border-radius: 10px;
    margin: 6px;}
    .r-dm .sensor-bottom{border: #a2cfde solid 8px;
    border-radius: 10px;
    margin: 6px;}
.r-dm .sensor-num{color: #00ffff; font-size: 32px; text-align: center;font-weight: bold;line-height: 46px;display: block;}
.r-dm .sensor-txt{color: #fff; text-align: center;font-weight: bold;line-height: 29px;display: block;}

.nav ul {display: table-row;}
.nav li	{
 position: relative;
 -webkit-transition: all 0.4s linear;
 -moz-transition: all 0.4s linear;
 -o-transition: all 0.4s linear;
 -ms-transition: all 0.4s linear;
 transition: all 0.4s linear;
 float: left;
 padding: 6px;
 display: block;
}
.nav li a {
 display: block;
 width: 120px;
 height: 120px;
 padding: 24px;
 border-radius: 12%;
 border-width: 8px;
 border-style: solid;
}
.nav li::marker {
  content: '';
}

.nav li:hover {
 z-index: 11;
 -webkit-transform: scale(1.1);
 -moz-transform: scale(1.1);
 -o-transform: scale(1.1);
 -ms-transform: scale(1.1);
 transform: scale(1.1);
}
.nav li:hover a {
 text-decoration: none;
}
.nav li:hover span {
 -webkit-transition: all 0.4s linear;
 -moz-transition: all 0.4s linear;
 -o-transition: all 0.4s linear;
 -ms-transition: all 0.4s linear;
 transition: all 0.4s linear;
 -webkit-animation: moveFromBottom 0.3s ease;
 -moz-animation: moveFromBottom 0.3s ease;
 -o-animation: moveFromBottom 0.3s ease;
 -ms-animation: moveFromBottom 0.3s ease;
 animation: moveFromBottom 0.3s ease;
}
.nav li:nth-child(1) a {
 color: #fff;
 text-shadow: 0 1px 0 #9de3cf;
 border-color: #a2cfde;
 background-color: #51c9a7;
}
.nav li:nth-child(2) a {
 color: #fff;
 text-shadow: 0 1px 0 #7ec9e3;
 border-color: #a2cfde;
 background-color: #7ec9e3;
}
.nav li:nth-child(3) a {
 color: #5e9eb4;
 text-shadow: 0 1px 0 #adddec;
 border-color: #a2cfde;
 background-color: #7ec9e3;
}
.nav li:nth-child(4) a {
 color: #ba9d5e;
 text-shadow: 0 1px 0 #f5e0ad;
 border-color: #dcc999;
 background-color: #f0cd78;
}
.nav li:nth-child(5) a {
 color: #b468a2;
 text-shadow: 0 1px 0 #e8acd8;
 border-color: #d8abcd;
 background-color: #dd91cb;
}
.nav li:nth-child(1):hover a {
 color: #fff;
 text-shadow: 0 1px 0 #81e6c9;
 border-color: #00ffff;
 background-color: #00c18c;
}
.nav li:nth-child(2):hover a {
 color: #fff;
 text-shadow: 0 1px 0 #7ec9e3;
 border-color: #00ffff;
 background-color: #7ec9e3;
}
.nav li:nth-child(3):hover a {
 color: #2883a2;
 text-shadow: 0 1px 0 #9cdef2;
 border-color: #4397b3;
 background-color: #55c1e5;
}
.nav li:nth-child(4):hover a {
 color: #ab8228;
 text-shadow: 0 1px 0 #ffe199;
 border-color: #b08f3e;
 background-color: #f8c64d;
}
.nav li:nth-child(5):hover a {
 color: #a33689;
 text-shadow: 0 1px 0 #ec97d6;
 border-color: #b7569f;
 background-color: #dd70c3;
}
.nav span {
 display: block;
 line-height:34px;
 font-size: 14px;
 font-style: normal;
}
.nav span:before {
 display: block;
}
.nav li:nth-child(1) span:before {
 content: "home";
}
.nav li:nth-child(2) span:before {
 content: "setting";
}

@-webkit-keyframes moveFromBottom {
  from {
    -webkit-transform: translateY(120%) scale(0.5) ;
    opacity: 0;
  }
 to {
   -webkit-transform: translateY(0%) scale(1);
   opacity: 1;        
 }
}
@-moz-keyframes moveFromBottom {
  from {
    -moz-transform: translateY(120%) scale(0.5) ;
    opacity: 0;
  }
  to {
    -moz-transform: translateY(0%) scale(1);
    opacity: 1;        
  }
}
@-ms-keyframes moveFromBottom {
  from {
    -ms-transform: translateY(120%) scale(0.5) ;
    opacity: 0;
  }
  to {
   -ms-transform: translateY(0%) scale(1);
   opacity: 1;        
 }
}
@-o-keyframes moveFromBottom {
  from {
    -o-transform: translateY(120%) scale(0.5) ;
    opacity: 0;
  }
  to {
   -o-transform: translateY(0%) scale(1);
   opacity: 1;        
 }
}
@keyframes moveFromBottom {
  from {
    transform: translateY(120%) scale(0.5) ;
    opacity: 0;
  }
  to {
   transform: translateY(0%) scale(1);
   opacity: 1;        
 }
}
.nav span:before { 
 font-family: 'LigatureSymbols';
 text-rendering: optimizeLegibility;
 -webkit-font-smoothing: antialiased;
 -moz-font-smoothing: antialiased;
 -ms-font-smoothing: antialiased;
 -o-font-smoothing: antialiased;
 //font-smoothing: antialiased;
 -webkit-font-feature-settings: "liga" 1, "dlig" 1;
 -moz-font-feature-settings: "liga=1, dlig=1";
 -ms-font-feature-settings: "liga" 1, "dlig" 1;
 font-feature-settings: "liga" 1, "dlig" 1;
 font-size: 40px;
 text-align:center;
}
.l-dm{
.el-select {
    display: inline-block;
    position: relative;
    border-radius: 12px;
    border: #00ffff solid 3px;
    margin: 6px;
    border: #a2cfde solid 8px;
    // border-radius: 20%;
    width: 252px;
}

.jg{
  // 未选中任何选项的时候 placeholder的样式 需要先选中父元素 增加权重
  /deep/ input::-webkit-input-placeholder {
    color: #fff;
  }
  /deep/  input::-moz-input-placeholder {
    color: #fff;
  }
  /deep/  input::-ms-input-placeholder {
    color: #fff;
  }

  //修改的是el-input的样式 
  //一种方法是设置最里层el-input__inner的背景色 外层的两级父元素设置为透明色
  //另一种方法是从el-select到el-input__inenr的背景色都设置为需要的颜色
  /deep/ .el-select,
  /deep/ .el-input,
  /deep/ .el-input__inner{
    background-color:#08164D ;
    color:#fff;
    border:0px;
    border-radius:0px;
    text-align: center;
  }

  //el-input聚焦的时候 外层的border会有一个样式
  /deep/ .el-select .el-input.is-focus .el-input__inner{
    border:0px;
  }

  //修改的是el-input上下的小图标的颜色
  /deep/ .el-select .el-input .el-select__caret{
    color:#fff;
  }

  //修改总体选项的样式 最外层
  /deep/ .el-select-dropdown{
    background-color: #08164d;
    margin: 0px;
    border:0px;
    border-radius: 0px;
  }

  //修改单个的选项的样式
  /deep/ .el-select-dropdown__item{
    background-color: transparent;
    color:#fff;
  }

  //item选项的hover样式
  /deep/ .el-select-dropdown__item.hover, 
  /deep/ .el-select-dropdown__item:hover{
    color:#409eff;
  }

  //修改的是下拉框选项内容上方的尖角
  /deep/ .el-popper .popper__arrow, .el-popper .popper__arrow::after{
    display: none;
  }
}
}
</style>