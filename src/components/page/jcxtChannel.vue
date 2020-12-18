<template>
	<el-dialog  title="通道信息" :visible.sync="dialogChannel"  v-if="dialogChannel" append-to-body width="60%" class="abow_dialog" @open = "open" ref = "dialog"  @close="closeDialog('channelinfolist')">
        <span>
          <el-tabs v-model="editableTabsValue" type="card" 
            @tab-remove="removeTab" 
            :before-leave="beforeLeave"
            class="my-tab-pane"
            >
            <el-tab-pane
              v-for="(item,index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              closable
            >
            <!-- <div v-if="item.show === true"> -->
              <!-- <el-form :model="item.request_tab_data" ref="table_url" :rules="rules" :key="index" >
                由于外层有v-if控制dom树只存在当前tab页，所以不用:prop，直接用官方示例中的prop--
                <el-form-item prop="url" >
                  <el-col :span="6" >
                        <div class="grid-content bg-purple">
                          <el-form-item label="通道编号" prop="channelcode">
                            <el-input v-model="item.channelcode"></el-input>
                            <el-input v-model="item.samplefrequency"></el-input>
                          </el-form-item>
                        </div>
                    </el-col>
                </el-form-item>
              </el-form> -->
            <!-- </div> -->
            <!-- <tab-component ></tab-component> -->
            <!-- <tab-component :is="item.content"></tab-component> -->
            <!-- {{item.content}} -->
            <!-- <keep-alive>
            <component :is="item.content">
            </component>
          </keep-alive> -->
            <!-- <component  :is="item.content"></component> -->
            <!-- <div :is="item.content"></div> -->
            <jcxtChannelcont-page  v-bind:is="item.content" :sigochcodestatus="sigochcodestatus" :outputsigtype="outputsigtype" :interfacetype="interfacetype" :cabletype="cabletype" :dataacqusystem="dataacqusystem" :channelinfolist="channelinfolist[index]"></jcxtChannelcont-page>
            </el-tab-pane>
            <el-tab-pane key="add" name="add" >
              <span slot="label" style="font-size:16px;">
                +增加通道
              </span>
            </el-tab-pane>
          </el-tabs>

        </span>
        
        
    <!-- 确定按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('channelinfolist')">取 消</el-button>
          <el-button type="primary" @click="savejcxtdata('channelinfolist')" >保 存</el-button>
        </span>
</el-dialog>
</template>

<script>
//import jcxtChannelcont from './jcxtChannelcont'
import jcxtChannelcont from './jcxtChannelcont.vue'
export default {
    data() {
      return {
        dialogChannel:false,
        channelinfolist:{},
        components: {
          jcxtChannelcont
        },
        //editableTabs:1,
        editableTabsValue: '1',
        currentIndex:1,
        editableTabs: [{
          title: '通道1',
          name: '1',
          //show: false,
          content: jcxtChannelcont
        }],
        tabIndex: 1,
        addIndex:1,
       // isShow:false,
        
        sigochcodestatus:{},
        outputsigtype:{},
        interfacetype:{},
        cabletype:{},
        dataacqusystem:{}

      }
    },
    mounted() {
          this.getinfobykey();
          console.log(jcxtChannelcont)
          
    },
    inject:['reload'],
    methods: {
      init(id){
            //this.form.id = id || 0
            this.dialogChannel = true
            //this.dialogChannel = true
            this.$nextTick(()=>{
            //this.$refs.jcxtAddorEdit.init(id);
            })

        },
      onSubmit() {
        console.log('submit!');
      },
      // 关闭 Modal 执行
      closeDialog(formName) {
        this.dialogChannel = false
        this.reload();
          //this.$nextTick(()=>{
               //this.$refs[formName].resetFields();
              //  if (this.$refs[formName]!==undefined) {
              //       this.$refs[formName].resetFields();
              //   }
          //})
      },
      open(){
          // this.getallsensors()
          // this.getcgqjccs()
          // this.getsyscodeinfo()
          // this.getszgjbh()
          // this.getSectionIdByType()
          
          this.getinfobykey()
      },
      async getinfobykey(info){
            
            const data = JSON.parse(info)
            const number = 0;
            this.tabIndex = data.channelcount
            //console.log(data.channelcount)
            //console.log(this.editableTabs.title)
              for ( var i = 2; i <= data.channelcount; i++) {
                this.tabIndex = i
                if( data.channelcount > 1){
                 this.addTab();
                }
               
              }
            // for(let i in data){
            //   let p={};
            //   p[i]=data[i];
            //   data.push(p)
            //   console.log(p)
            // };
            //this.addTab()
            this.getsyscodeinfo()
            //this.channelinfolist = JSON.parse(JSON.stringify(data.fm))
            for ( var i = 0; i < data.channelcount; i++) {
						  if (typeof(data.fm[i]) != "undefined") {
                console.log(i)
                console.log(JSON.stringify(data.fm) + 'channelcode')
                console.log(data.fm)
                this.channelinfolist = JSON.parse(JSON.stringify(data.fm)) //JSON.stringify(data.fm)
                console.log(this.channelinfolist)
                //var cfm = document.forms[i + 1];
                //$(cfm).form('load', objdata.fm[i]);
              }
            }
            //console.log(this.channelinfolist.fm + 'dddddddddddddd')
        },
      async getsyscodeinfo() {
            //await this.$axios.get(this.api.getsyscodeinfo,{params:this.ChCodeStatus}).then(response => {
            //    this.sigochcodestatus = response
                //this.$refs.channelinfolist.getsyscodeinfo(JSON.parse(response))
                //this.channelinfolist = response
                //console.log(response)
                //console.log('fu' + this.sigochcodestatus + 'sd')
            //});
            let sendArr=[
              this.$axios.get(this.api.getsyscodeinfo,{params:{code:'ChCodeStatus',structure:this.GLOBAL.structure}}),//获取传感器通道的工作状态
              this.$axios.get(this.api.getsyscodeinfo,{params:{code:'SigType',structure:this.GLOBAL.structure}}),//获取传感器通道的输出 信号类型
              this.$axios.get(this.api.getsyscodeinfo,{params:{code:'InterfaceType',structure:this.GLOBAL.structure}}),//获取传感器通道的连接线缆类型
              this.$axios.get(this.api.getsyscodeinfo,{params:{code:'CableType',structure:this.GLOBAL.structure}}),//获取传感器通道的连接线缆类型
              this.$axios.get(this.api.getsyscodeinfo,{params:{code:'DataAcquSystem',structure:this.GLOBAL.structure}}),//获取传感器通道的连接线缆类型
            ]
            this.$axios.all(sendArr).then(response=>{
              this.sigochcodestatus = response[0]
              this.outputsigtype = response[1]
              this.interfacetype = response[2]
              this.cabletype = response[3]
              this.dataacqusystem = response[4]
              //console.log(response[2])//会返回3个对象，在控制台中显示
            })
      },
      addTab(targetName) {
        let newTabIndex = ++this.tabIndex + '';
        this.editableTabs.push({
          title: '通道'+ ++this.addIndex,
          name: newTabIndex,
          //channelinfolist:{},
          //content: 'New Tab content'
          content: jcxtChannelcont
          
        });
        this.editableTabsValue = newTabIndex;
        this.currentIndex=newTabIndex;
      },
      removeTab(targetName) {
        if(this.editableTabs.length<=1){
          return false;
        }
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        
        this.editableTabs.map((tab,index)=>{
          tab.title="通道"+(index+1);
          this.addIndex=(index+1);
        })
        this.currentIndex=this.editableTabsValue;
        this.$message({
                  type: 'success',
                  message: '删除成功!'
        });
      },
      /* 活动标签切换时触发 */
      beforeLeave(currentName,oldName) {
        var self=this;
        //重点，如果name是add，则什么都不触发
        if(currentName=="add"){
          this.addTab()
          return false
        }else{
          this.currentIndex=currentName;
        }
      }
    }
  }
</script>

<style>
</style>
