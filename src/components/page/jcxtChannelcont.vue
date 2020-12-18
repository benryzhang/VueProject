<template>
    <!-- <div>
      <div v-for="(item,index) in channelinfolist" :key="index"> -->
          <el-form label-width="100px" class="demo-ruleForm" size="mini" :model="channelinfolist" :rules="channelrules" ref="channelinfolist" :validate-on-rule-change="false">
            <!-- <el-divider content-position="left">基本信息</el-divider> -->
              <el-row :gutter="20">
                    <el-col :span="6" >
                        <div class="grid-content bg-purple">
                          <el-form-item label="通道编号" prop="channelcode">
                            <el-input v-model="channelinfolist.channelcode"></el-input>
                          </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="通道名称" prop="channelname">
                                    <el-input v-model="channelinfolist.channelname"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="工作状态" prop="sigochcodestatus">
                                    <el-select placeholder="请选择工作状态" v-model="channelinfolist.sigochcodestatus">
                                      <el-option
                                        v-for="item in sigochcodestatus"
                                        :label="item.text"
                                        :key="item.id"
                                        :value="item.id"
                                        >
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="监测物理量" prop="physics">
                                    <el-input v-model="channelinfolist.physics" ></el-input>
                                    <!-- <el-input-number v-model.number="channelinfolist.channelcount" controls-position="right" :min="1" :max="10"></el-input-number> -->
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="单位" prop="unit">
                                <el-input v-model="channelinfolist.unit" ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="正负方向" prop="posorneg">
                                    <el-select placeholder="请选择正负方向" v-model="channelinfolist.posorneg">
                                        <el-option
                                            v-for="item in posorneg"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="输出信号类型"  prop="outputsigtype">
                                    <el-select placeholder="请选择输出信号类型" v-model="channelinfolist.outputsigtype">
                                        <el-option
                                            v-for="item in outputsigtype"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="输出信号范围" prop="outputsigrange">
                                    <el-input v-model="channelinfolist.outputsigrange"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="动态频响特征" prop="dynrespchara">
                                <el-input v-model="channelinfolist.dynrespchara"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="灵敏度系数" prop="sensitivitycoeff">
                                    <el-input v-model="channelinfolist.sensitivitycoeff"></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="采样频率" prop="samplefrequency">
                                    <el-input v-model="channelinfolist.samplefrequency"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="触发阀值" prop="trigthreshold">
                                    <el-input v-model="channelinfolist.trigthreshold"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="输入阻抗" prop="inputimpedance">
                                <el-input v-model="channelinfolist.inputimpedance"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="输出阻抗" prop="outputimpedance">
                                    <el-input v-model="channelinfolist.outputimpedance"></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="虚拟通道" prop="sensorlife">
                                    <el-select placeholder="请选择虚拟通道类型" v-model="channelinfolist.isvirtualflag">
                                        <el-option
                                            v-for="item in isvirtualflag"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="接口类型" prop="interfacetype">
                                    <el-select placeholder="请选择接口类型" v-model="channelinfolist.interfacetype">
                                        <el-option
                                            v-for="item in interfacetype"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="连接线缆类型" prop="cabletype">
                                <el-select placeholder="请选择接口类型" v-model="channelinfolist.cabletype">
                                        <el-option
                                            v-for="item in cabletype"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                  </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="连接线缆编号" prop="cableid">
                                    <el-input v-model="channelinfolist.cableid"></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="精度" prop="accuracy">
                                    <el-input v-model="channelinfolist.accuracy"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="量程" prop="sensorrange">
                                    <el-input v-model="channelinfolist.sensorrange"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="传感器方向" prop="direction">
                                <el-select placeholder="请选择传感器方向" v-model="channelinfolist.direction">
                                        <el-option
                                            v-for="item in direction"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                  </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="数据采集制度" prop="dataacqusystem">
                                    <el-select placeholder="请选择数据采集制度" v-model="channelinfolist.dataacqusystem">
                                        <el-option
                                            v-for="item in dataacqusystem"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    
                    
                </el-row>
                <el-divider content-position="left"></el-divider>
                <el-row :gutter="20" >
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="连接信号调理设备" prop="isconnsigcondequi" label-width="166px">
                                    <el-select placeholder="请选择数据采集制度" v-model="channelinfolist.isconnsigcondequi" >
                                        <el-option
                                            v-for="item in isconnsigcondequi"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    </el-row>
                <el-row :gutter="20" >
                  <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="信号调理设备编号" prop="sigcondequicode" label-width="166px">
                                    <el-input v-model="channelinfolist.sigcondequicode"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                  </el-col>
                </el-row>
                
                    <el-row :gutter="20" >
                      <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="信号调理设备名称" prop="sigichcode" label-width="166px">
                                        <el-input v-model="channelinfolist.sigichcode"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" >
                      <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="信号调理设备输入通道号" prop="sigochcode" label-width="166px">
                                        <el-input v-model="channelinfolist.sigochcode"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" >
                      <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="数据采集设备编号" prop="dataacqucode" label-width="166px">
                                        <el-input v-model="channelinfolist.dataacqucode"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" >
                      <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="数据采集设备名称" prop="dataacquichcode" label-width="166px">
                                        <el-input v-model="channelinfolist.dataacquichcode"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" >
                      <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="数据采集设备输入通道号" prop="dataacquochcode" label-width="166px">
                                        <el-input v-model="channelinfolist.dataacquochcode"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                      </el-col>
                    </el-row>
          </el-form>
        
        <!-- </div>
      </div> -->
</template>

<script>
export default {
    data() {
      return {
        //channelinfolist:{channelcode:''},
        //sigochcodestatus:[],
        posorneg:[{
          id: '0',
          text: '正方向'
        }, {
          id: '1',
          text: '负方向'
        }],
        //outputsigtype:[],
        isvirtualflag:[{
          id: '0',
          text: '虚拟通道'
        }, {
          id: '1',
          text: '非虚拟通道'
        }],
        //interfacetype:[],
        //cabletype:[],
        direction:[],
        //dataacqusystem:[],
        isconnsigcondequi:[{
          id: '0',
          text: '是'
        }, {
          id: '1',
          text: '否'
        }],
        
        ChCodeStatus:{code:"ChCodeStatus",structure:this.GLOBAL.structure},
        channelrules: {
          channelcode: [
            { required: true, message: '请输入通道编号', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          channelname: [
            { message: '请输入通道名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          sigochcodestatus: [
            {message: '请选择工作状态', trigger: 'change' }
          ],
          physics: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}//type:'number',
          ],
          unit: [
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          posorneg: [
            { message: '请选择正负方向', trigger: 'change' }
          ],
          outputsigtype: [
            { message: '请选择输出信号类型', trigger: 'change'}
          ],
          outputsigrange: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          dynrespchara: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          sensitivitycoeff: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          samplefrequency: [
            {}
          ],
          trigthreshold: [
            { }
          ],
          inputimpedance: [
            {}
          ],
          outputimpedance: [
            {}
          ],
          isvirtualflag: [{ message: '请选择虚拟通道', trigger: 'change'}],
          interfacetype: [{ message: '请选择接口类型', trigger: 'change'}],
          cabletype: [{ message: '请选择线缆类型', trigger: 'change'}],
          cableid: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          accuracy: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          sensorrange: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          direction: [{ message: '请选择传感器方向', trigger: 'change'}],
          dataacqusystem: [{ message: '请选择数据采集制度', trigger: 'change'}],
          isconnsigcondequi: [{ message: '请选择信号调理设备', trigger: 'change'}],
          
          sigcondequicode: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          sigichcode: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          sigochcode: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          dataacqucode: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          dataacquichcode: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          dataacquochcode: [
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    props: ["sigochcodestatus","outputsigtype","interfacetype","cabletype","dataacqusystem","channelinfolist"],
    mounted() {
          //.getsyscodeinfo();
          //console.log(149,this.channelinfolist)
          //console.log(JSON.parse(JSON.stringify(this.channelinfolist[0])))
          //console.log(this.channelinfolist[2])
    },
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
          
          
      },
      open(){
          // this.getallsensors()
          // this.getcgqjccs()
          // this.getsyscodeinfo()
          // this.getszgjbh()
          // this.getSectionIdByType()
      },
      async getsyscodeinfo(info){
            console.log(this.channelinfolist)
            this.channelinfolist=info

        },
    }
  }
</script>

<style>
</style>
