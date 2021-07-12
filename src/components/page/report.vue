
<template>
    <!-- <div class="pdfWrap">
      <canvas v-for="page in pages" :id="'the-canvas' + page" :key="page"></canvas>
    </div> -->
    <span>
    <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
        <el-form-item>
          <el-button  icon="el-icon-refresh" @click="getAllInfoData('refresh')" type="primary">刷新</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button  
            icon="el-icon-plus"
            type="primary" 
            @click="addPannel">添加</el-button>
        </el-form-item>
        <el-form-item>
          <download-excel
              class = "export-excel-wrapper"
              :data = "itemList"
              :fields = "json_fields"
              name = "用户信息.xls">
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button icon="el-icon-download" type="primary">下载</el-button>
        </download-excel>
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-printer" @click="search" type="primary">打印</el-button>
        </el-form-item>
        <el-form-item label="按角色查询">
        <el-select clearable
            @change="search"
            @clear="search"
            v-model="queryMap.para"
            placeholder="请选择用户角色">
          <el-option
            v-for="item in searchlist"
              :label="item.text"
              :key="item.id"
              :value="item.id"
              >
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
    <div class="wrap">
        <iframe :src="pSrc" width="100%" height="100%"></iframe>
    </div>
    </span>
</template>
<script>
export default {
  name: "pdf",
  data() {
   return {
    pSrc:'',
    queryMap:{para:'',pageNumber:1,pageSize:20,structure:this.GLOBAL.structure },//查询对象
   };
  },
  methods: {
   loadPDF () {
    //baseurl ：pdf存放的文件路径，可以是本地的，也可以是远程，这个是远程的，亲测可以用
    //let baseurl = 'http://image.cache.timepack.cn/nodejs.pdf';
    //let baseurl = 'report/report.pdf';
    this.pSrc = 'report/report.pdf';
    //ie有缓存加个随机数解决 + '?r=' + new Date()
    //let pSrc = baseurl + '?r=' + new Date();
    //this.pSrc = 'pdf/web/viewer.html?file=' + encodeURIComponent(pSrc) + '.pdf';
   },
  },
 
  mounted: function() {
   this.loadPDF();
  }
 
 };
//import PDFJS from "pdfjs-dist";
// import * as PDFJS from '../../assets/pdf/build/pdf'
// //import PDFJS from 'pdfjs-dist/webpack'
// //注意这句，网上看了很多例子，没有这句会报错
// PDFJS.GlobalWorkerOptions.workerSrc = '../../assets/pdf/build/pdf.worker.js'

//import * as PDFJS from './pdf/build/pdf'
//import PDFJS from 'pdfjs-dist/webpack'
//注意这句，网上看了很多例子，没有这句会报错
//PDFJS.GlobalWorkerOptions.workerSrc = './pdf/build/pdf.worker.js'
// import PDF from 'pdfjs-dist'
// PDF.disableWorker = true
// export default {
//   name: 'pdf',
//   data() {
//     return {
//       url: "",
//       pdfDoc: null,
//       pages: 0
//     }
//   },
//   created() {},
//   mounted() {
//     var protocol = window.location.protocol;
//     var main = window.location.host;
//     this.url = protocol + "//" + main + "/file/product_guide" + '.pdf'  //后端下载文件的接口,url根据自己实际pdf文件赋值
//     //window.open('/pdf/web/viewer.html?file=' + path);
//     this.loadFile(this.url)
//   },
//   methods: {
//     loadFile (url) {
//       let _this = this
//       PDFJS.getDocument(url).promise.then(pdf => {
//         _this.pdfDoc = pdf
//         _this.pages = _this.pdfDoc.numPages
//         _this.$nextTick(() => {
//           _this.renderPage(1)
//         })
//       })
//     },
//     renderPage(num) {
//       let _this = this
//       this.pdfDoc.getPage(num).then(function (page) {
//         var scale = 1.5
//         var viewport = page.getViewport({ scale: scale })
//         var canvas = document.getElementById('the-canvas' + num)
//         var context = canvas.getContext('2d')
//         canvas.height = viewport.height
//         canvas.width = viewport.width
//         var renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         }
//         page.render(renderContext)
//         if (_this.pages > num) {
//           _this.renderPage(num + 1)
//         }
//       })
//     },
//   }
// }
</script>
<style>
.wrap{
 /* position: fixed; */

 width: 100%;
 height:100%;
 /* bottom: 0;
  top: 0;
 left: 0; */
 }
</style>