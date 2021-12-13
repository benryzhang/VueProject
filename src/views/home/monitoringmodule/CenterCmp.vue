<template>
  <div class="center-cmp">
    <div class="cc-main-container">
      <!-- <div class="left-domain">
            <LeftDomain />
      </div> -->
      <baidu-map
        class="bm-view"
        :center="center"
        :zoom="zoom"
        @ready="handler"
      ></baidu-map>
      <div class="left-domain">
        <div class="l-dm">
          <!-- <el-select v-model="value" placeholder="当前结构体" :popper-append-to-body="false">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
          <el-select
            clearable
            :popper-append-to-body="false"
            @change="changeStruct"
            @clear="changeStruct"
            v-model="structvalue"
            placeholder="当前结构体"
          >
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
              <li>
                <a href="#" @click="innerVisible = true">
                  <span> 平台简介 </span>
                </a>
              </li>
              <li>
                <a href="#" @click="outerVisible = true">
                  <span> 结构管理 </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="r-dm">
          <div class="sensor-top">
            <span class="sensor-num">{{ structnum }}</span>
            <span class="sensor-txt">结构体数量</span>
          </div>
          <div class="sensor-bottom">
            <span class="sensor-num">{{ totalWarnNum }}</span>
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

        <!-- <structureset-page v-if="dialogFormVisible" ref="structurepage"></structureset-page> -->
        <div v-if="innerVisible">
          <el-dialog
            title="平台简介"
            customClass="customWidth"
            :visible.sync="innerVisible"
            ref="structureset"
            :modal-append-to-body="false"
          >
            <!-- <introduce-bar v-model="sendVal" type="confirm" title="动力灾害监控数据分析平台" content="平台简介" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></introduce-bar>
     -->
            <div class="dialog-container">
              <div class="dialog-title"></div>
              <div class="content">
                <introduce></introduce>
              </div>
              <span slot="footer" class="dialog-footer">
                © 2019 智性科技南通有限公司
              </span>
                          <!-- <div class="btns">
                <div v-if="type != 'confirm'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
            </div> 
            <div class="el-dialog__headerbtn" @click="closeMask"><i class=" el-dialog__close el-icon el-icon-close"></i></div>-->
            </div>
          </el-dialog>
        </div>
        <el-dialog
          title="结构管理"
          :visible.sync="outerVisible"
          width="80%"
          @close="addDialogClosed"
          :modal-append-to-body="false"
        >
        <jggl></jggl>
          <!-- 内容主体区域 -->
           <!-- 表格区域 -->
      <!-- <template>
        <el-table 
        id="typecode"
          border
          stripe
          align="center"
          size="mini"
          :data="itemList"
          style="width: 100%;height:100%"
          max-height="872"
          >
          <el-table-column :index="indexMethod" type="index" fixed label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="sensortypecode" label="结构ID" fixed width="100" align="center"  ></el-table-column>
          <el-table-column prop="sensorcode" label="结构名称" width="" align="center"></el-table-column>
          <el-table-column prop="sensorname" label="结构类型" width="140" align="center"></el-table-column>
          <el-table-column prop="monitpara" label="结构说明" width="" align="center"></el-table-column>
          <el-table-column prop="position" label="经度坐标" width="180" align="center"></el-table-column>
          <el-table-column prop="worktemp" label="纬度坐标" width="" align="center"></el-table-column>
          <el-table-column prop="antimois" label="结构状态" width="120" align="center"></el-table-column>
          <el-table-column prop="antiinterference" label="权限状态" width="" align="center"></el-table-column>
          <el-table-column prop="impactvibration" label="创建用户" width="" align="center"></el-table-column>
          <el-table-column prop="orientation" label="结构模型" width="60" align="center"></el-table-column>
          <el-table-column prop="powerreq" label="结构材质" width="90" align="center"></el-table-column>
          <el-table-column prop="sensorlife" label="结构图片" width="60" align="center"></el-table-column>
          <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button  @click="addoredit(scope.row)" type="text" size="small" >编辑</el-button>
        <el-button  @click="addoreditchannel(scope.row)" type="text" size="small" >通道</el-button>
        <el-button type="text" size="small"  @click="del(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>

        </el-table>
      </template> -->

          <!-- 底部区域 -->
          <!-- <span slot="footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
          
          </span> -->
        </el-dialog>
        <!-- <structure-bar v-model="senStructure" type="danger" title="结构信息一览" content="" v-on:cancel="clickCancel()" @danger="openStructure()" @confirm="clickConfirm()" dangerText="Delete"></structure-bar> -->
      </div>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
//import LeftDomain from './LeftDomain.vue'
//import cir from '@/assets/img/cir.gif'
import structureset from "./structure.vue";
import introduce from "./introduce.vue";
//import content from "./content.vue";
import jggl from "./jggl.vue";

import Bus from "../../../assets/js/bus.js";
export default {
  name: "CenterCmp",
  components: {
    BaiduMap,
    structureset,
    introduce,
    jggl,
    //content
    //child1,
    //'structure-bar': structure,
    //'introduce': introduce,
    //'dialog-bar': dialogBar,
    //LeftDomain
  },
  
  data() {
    return {
      queryMap:{monitparatype:'',monitpara:'',sensortype:'',pageNumber:1,pageSize:20,structure:this.GLOBAL.structure },//查询对象
      itemList: [],
      sels: [], //选中的值显示
      total: 0, //总共多少条数据
      center: { lng: 0, lat: 0 },
      zoom: 3,
      structdata: [],
      structarray: [],
      Realstructid: "",
      //structdata: [],
      structvalue: "",
      sendVal: false,
      senStructure: false,
      options: [],
      value: "",
      longid: [],
      latid: [],
      structid: "",
      mp: "",
      structnum: "",
      totalWarnNum: 0,
      dialogFormVisible: false,
      outerVisible: false,
      innerVisible: false,
    };
  },
  mounted() {
    this.getStructInfo();
    Bus.$on("totalWarnNum", (data) => {
      this.totalWarnNum = Number(data);
    });
    window.getIn = this.getIn
     //this.getAllProjectInfo();
     window.blink = this.blink()
    
  },
  created () {
    // let that = this
   //  window.blink = that.blink
    // let heightStyle = that.$refs.tableCot.offsetHeight
    // that.Height = heightStyle
  },
  methods: {
    async getAllProjectInfo(re) {
      //this.handleCurrentChange('1');
      await this.$axios.get(this.api.getAllProjectInfo,
        {
          params: this.queryMap
         },
      ).then(response => {
        if( re === 'refresh'){
            this.reload();
        }
         
        this.total = JSON.parse(response).total;
        this.itemList = JSON.parse(response).rows;
      });

    },
    addRoutes() {
      this.$router.push("/home");
    },
    handler({ BMap, map }) {
      //console.log(BMap, map)
      //this.center.lng = 111.625117
      //this.center.lat = 33.409132
      //this.zoom = 5

      map.setMapStyleV2({ styleId: "f3ac6c7453a08d04617e66a2d8a7bad9" });
      //map.addControl(new BMap.NavigationControl());
      //map.addControl(new BMap.ScaleControl());
      //map.addControl(new BMap.OverviewMapControl());
      //map.addControl(new BMap.MapTypeControl());
      //map.addControl(new BMap.ZoomControl());
      // let zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
      // map.addControl(zoomCtrl);
      map.enableScrollWheelZoom(true); //启用滚轮放大缩小，默认禁用
      // let point = new BMap.Point(111.625117, 33.409132);
      // map.centerAndZoom(point, 5);

      // // let marker = new BMap.Marker(point);  // 创建标注
      // // map.addOverlay(marker);
      this.getStructInfo(BMap, map);
      this.mp = map;
    },
    async getStructInfo(BMap, map) {
      await this.$axios
        .get(this.api.getStructInfo, {
          params: { username: "admin", structure: this.GLOBAL.structure },
        })
        .then((response) => {
          //const sensortype = JSON.parse(response)
          let objdata = JSON.parse(response);
          let structdata = objdata;
          this.structdata = structdata;
          let structarray = [];
          // if (structdata.length != 0) {
          //   for (let i = 0; i < structdata.length; i++) {
          //     let point = new BMap.Point(
          //       structdata[i].longid,
          //       structdata[i].latid
          //     );
          //     map.centerAndZoom(point, 12);
          //     let mkr = new BMap.Marker(point);
          //     map.addOverlay(mkr);
          //     let label = new BMap.Label(structdata[i].structname, {
          //       offset: new BMap.Size(25, 8),
          //     }); // 创建文本标注对象
          //     //label.setStyle({background : "green", color : "white", fontSize : "8px", height : "12px", lineHeight : "12px", border : "0.5px green solid", fontFamily : "微软雅黑" });
          //     label.setStyle({
          //       background: "#10152f",
          //       color: "#fff",
          //       fontSize: "8px",
          //       height: "28px",
          //       lineHeight: "28px",
          //       border: "2px #00ffff  solid",
          //       padding: "0 6px",
          //     });
          //     mkr.setLabel(label);
          //     mkr.customData = { myProperty: structdata[i].structid };
          //     structarray.push(mkr);
          //     let contentall =
          //       "<div style='margin-top:12px ' ><img src='images/picture.png'/ height='100' width='100%'></div>" +
          //       "<div><h1 style='font-size:14px;width:100%;text-align:center;margin:4px 0px'>" +
          //       structdata[i].structname +
          //       "</h1></div>" +
          //       "<div style='height:128px;overflow-y:auto'><p style='font-size:12px; color:#333;margin:0'>" +
          //       structdata[i].structinfo +
          //       "</p></div>" +
          //       "<div style='padding-top:2px'  onclick='getIn(\"" +
          //       structdata[i].structid +
          //       "\")'><a style='background: #42a4e0; border: 1px solid #1e7db9;color: #fff;display: block; float: right; font-size: 14px;line-height: 24px; text-align: center; width: 260px;cursor:pointer;'>" +
          //       structdata[i].childname +
          //       "</a></div>";
          //     this.addClickHandler(
          //       contentall,
          //       mkr,
          //       structdata[i].structid,
          //       structdata[i].structname
          //     );
          //     this.structvalue = structdata[0].structname;
          //     this.structnum = i + 1;
          //     //$("#type4").append( "<div id='" + structdata[i].structid + 3 + "' class='box'  onclick='mapcenter(\"" + structdata[i].longid + "\",\"" + structdata[i].latid + "\",\"" + structdata[i].structid + "\")'  data-balloon-pos='left'><h1 style='font-size:14px;width:100%;text-align:center;margin:4px 0px'>" + structdata[i].structname + "</h1></div>");
          //     /* changeColor(rows.errtype,rows.sensorcode+"1"); */
          //   }
          // }

          //}
          // 之前二代机方法以下
          if (this.structdata != undefined && this.structdata.length > 0) {
            for ( let i = 0; i < this.structdata.length; i++) {
              //let icon = new BMap.Icon('images/target-gg.png', new BMap.Size(20, 32), {infoWindowAnchor : new BMap.Size(10, 0), infoWindowOffset : new BMap.Size(10, 0), anchor : new BMap.Size(10, 30) });
              //console.log(this.structdata)
              let point = new BMap.Point(structdata[i].longid, structdata[i].latid);
              //map.centerAndZoom(point, 12);
              let marker = new BMap.Marker(point);
              //let map = new BMap.Map("allmap", {enableMapClick : false, minZoom : 5, maxZoom : 17});
              map.addOverlay(marker);
              let label = new BMap.Label(structdata[i].structname, {offset : new BMap.Size(25, 8)}); // 创建文本标注对象
              label.setStyle({background : "#10152f", color : "#fff", fontSize : "8px", height : "28px", lineHeight : "28px", border : "2px #00ffff  solid",padding:"0 6px"});
              marker.setLabel(label);
              marker.customData = {myProperty : structdata[i].structid};
              structarray.push(marker);
              let contentall
              if(structdata[i].picurl !=undefined && structdata[i].picurl.length > 0){
                contentall = "<div style='margin-top:12px;' ><img src='"+structdata[i].picurl+"'/ height='100' width='100%'></div>" + "<div><h1 style='font-size:14px;width:100%;text-align:center;margin:4px 0px'>" + structdata[i].structname + "</h1></div>" + "<div style='height:128px;overflow-y:auto'><p style='font-size:12px; color:#333;margin:0'>" + structdata[i].structinfo + "</p></div>" + "<div style='bottom: 0px;position:absolute;right: 0;'  ><a id='btng' οnclick='blink(\"" + structdata[i].structid + "\")' style='background: #7ec9e3; border: 1px solid #1e7db9;color: #fff;display: block; float: right; font-size: 14px;line-height: 24px; text-align: center;cursor:pointer;padding:2px'>" + structdata[i].structname + "</a></div>";
              }else{
                contentall = "<div style='margin-top:12px;' ><img src='images/struct.png'/ height='100' width='100%'></div>" + "<div><h1 style='font-size:14px;width:100%;text-align:center;margin:4px 0px'>" + structdata[i].structname + "</h1></div>" + "<div style='height:128px;overflow-y:auto'><p style='font-size:12px; color:#333;margin:0'>" + structdata[i].structinfo + "</p></div>" + "<div style='bottom: 0px;position:absolute;right: 0;'  ><a id='btng' οnclick='blink(\"" + structdata[i].structid + "\")' style='background: #7ec9e3; border: 1px solid #1e7db9;color: #fff;display: block; float: right; font-size: 14px;line-height: 24px; text-align: center;cursor:pointer;padding:2px'>" + structdata[i].structname + "</a></div>";
              }
              this.addClickHandler(contentall, marker, structdata[i].structid, structdata[i].structname);
              //$("#type4").append("<div id='" + structdata[i].structid + 3 + "' class='box'  onclick='mapcenter(\"" + structdata[i].longid + "\",\"" + structdata[i].latid + "\",\"" + structdata[i].structid + "\")'  data-balloon-pos='left'><span>" + structdata[i].structname + "</span></div>");
              this.structvalue = structdata[0].structname
              this.structnum = i+1
            }
              //this.mapcenter(structdata[0].longid, structdata[0].latid, structdata[0].structid);
              let point = new BMap.Point(structdata[0].longid, structdata[0].latid);
              map.centerAndZoom(point, 12);
              //Bus.$emit("addClickHandler")

          }
          // 之前二代机方法以上
          //alert('sd')
          //this.sensortypelist = response
        });
    },
    
    addClickHandler(content, marker, structid, structname) {
      marker.addEventListener("click", function (e) {
        const opts = { width: 260, height: 300, enableMessage: false };
        let infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        marker.openInfoWindow(infoWindow);
        setTimeout(() => {
        document.getElementById("btng").onclick = function() {
          //this.blink();
          window.open('http://127.0.0.1/bshm_edj/default.jsp',"_blank")
        };
      }, 200);
      });
    },
    openStructure(index) {
      this.senStructure = true;
    },
    openIntroduce(index) {
      this.sendVal = true;
    },
    changeStruct(structid) {
      //console.log('改变结构体的方法' + e )
      for (let i = 0; i < this.structdata.length; i++) {
        //let icon = new BMap.Icon('images/target-gg.png', new BMap.Size(20, 32), {infoWindowAnchor : new BMap.Size(10, 0), infoWindowOffset : new BMap.Size(10, 0), anchor : new BMap.Size(10, 30) });
        if (structid == this.structdata[i].structid) {
          let point = new BMap.Point(
            this.structdata[i].longid,
            this.structdata[i].latid
          );
          this.mp.centerAndZoom(point, 12);
        }
      }
    },
    openStructure(row) {
      //let roleId = id;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.structureset.init();
      });
    },
    addDialogClosed() {
      //this.$refs.addFormRef.resetFields()
    },
    getIn(item) {
      this.$router.push('/index');
      console.log(item);
    },
     /*----- 以下为图片处理代码 ------*/
    handleSuccess(response, file, fileList) {
      this.$success("上传成功");
    },
    handleError() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handleProgress(event, file, fileList) {
      this.loading = true;  //  上传时执行loading事件
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getAllProjectInfo();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNumber = current;
      this.getAllProjectInfo();
    },
    indexMethod(index){
       return (this.queryMap.pageNumber-1)*this.queryMap.pageSize+index+1;
    },
    blink(){
      console.log('blqqqqq')
      window.open('http://127.0.0.1/bshm_edj/default.jsp',"_blank")
    },
    
  },
  
};
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  .el-button--primary {
  }
}
.cc-main-container {
  // position: relative;
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
}

@-webkit-keyframes halftone {
  100% {
    background-size: 2.375em 2.375em, 0.1em 0.1em;
  }
}
@keyframes halftone {
  100% {
    background-size: 2.375em 2.375em, 0.1em 0.1em;
  }
}

.bm-view {
  width: 100%;
  height: 100%;
}

.BMap_cpDctrl {
  display: none;
}
.anchorBL {
  display: none;
}
/* 红色小圆点 */
.BMap_Marker {
  width: 25px;
  height: 25px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: none !important ;
}
.BMap_Marker::before {
  content: "";
  width: 50px;
  height: 50px;
  position: absolute;
  // left: 50%;
  // top: 50%;
  margin-left: -15px;
  margin-top: -15px;
  border-radius: 50%;
  animation: GreenDot 1.5s ease-out 0s infinite;
  background-color: rgba(0, 255, 0, 0.5);
}
@keyframes GreenDot {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

//left-domain style
.left-domain {
  position: absolute;
  left: 1%;
  top: 8%;
  width: 22%;
  background-color: rgba(16,21,41,0.4);
  box-sizing: border-box;
  border: #00ffff solid 2px;
  display: block;
  float: left;
  z-index: 999;
  height: 210px;
  /* animation:mymove 1s infinite;
-webkit-animation:mymove 1s infinite; Safari and Chrome */
}
.l-dm {
  display: block;
  float: left;
  width: 64%;
  height: 100%;
  z-index: 9999;
}
.r-dm {
  display: block;
  float: left;
  width: 33%;
  height: 100%;
}
.r-dm .sensor-top {
  border: #a2cfde solid 8px;
  border-radius: 10px;
  margin: 6px;
}
.r-dm .sensor-bottom {
  border: #a2cfde solid 8px;
  border-radius: 10px;
  margin: 6px;
}
.r-dm .sensor-num {
  color: #00ffff;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  line-height: 46px;
  display: block;
}
.r-dm .sensor-txt {
  color: #fff;
  text-align: center;
  font-weight: bold;
  line-height: 29px;
  display: block;
}

.nav ul {
  display: table-row;
}
.nav li {
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
  content: "";
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
  line-height: 34px;
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
    -webkit-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@-moz-keyframes moveFromBottom {
  from {
    -moz-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -moz-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@-ms-keyframes moveFromBottom {
  from {
    -ms-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -ms-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@-o-keyframes moveFromBottom {
  from {
    -o-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -o-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@keyframes moveFromBottom {
  from {
    transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
.nav span:before {
  font-family: "LigatureSymbols";
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
  text-align: center;
}
.l-dm {
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

  .jg {
    // 未选中任何选项的时候 placeholder的样式 需要先选中父元素 增加权重
    /deep/ input::-webkit-input-placeholder {
      color: #fff;
    }
    /deep/ input::-moz-input-placeholder {
      color: #fff;
    }
    /deep/ input::-ms-input-placeholder {
      color: #fff;
    }

    //修改的是el-input的样式
    //一种方法是设置最里层el-input__inner的背景色 外层的两级父元素设置为透明色
    //另一种方法是从el-select到el-input__inenr的背景色都设置为需要的颜色
    /deep/ .el-select,
    /deep/ .el-input,
    /deep/ .el-input__inner {
      background-color: #08164d;
      color: #fff;
      border: 0px;
      border-radius: 0px;
      text-align: center;
    }

    //el-input聚焦的时候 外层的border会有一个样式
    /deep/ .el-select .el-input.is-focus .el-input__inner {
      border: 0px;
    }

    //修改的是el-input上下的小图标的颜色
    /deep/ .el-select .el-input .el-select__caret {
      color: #fff;
    }

    //修改总体选项的样式 最外层
    /deep/ .el-select-dropdown {
      background-color: #08164d;
      margin: 0px;
      border: 0px;
      border-radius: 0px;
    }

    //修改单个的选项的样式
    /deep/ .el-select-dropdown__item {
      background-color: transparent;
      color: #fff;
    }

    //item选项的hover样式
    /deep/ .el-select-dropdown__item.hover,
    /deep/ .el-select-dropdown__item:hover {
      color: #409eff;
    }

    //修改的是下拉框选项内容上方的尖角
    /deep/ .el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
      display: none;
    }
  }
}
.el-dialog {
  max-height: 600px;
  display: flex;
  flex-direction: column;
  width: 60%;
  top: 20%;
}
.el-dialog__body {
  overflow: auto;
}
.customWidth {
  width: 60%;
  top: 20%;
  max-height: 600px;
  overflow: auto;
}
.el-dialog__header {
  border-bottom: 1px solid #bcbcbc;
}
.dialog-footer{text-align: center;display: block;width: 100%;}


</style>