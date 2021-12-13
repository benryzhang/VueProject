<template>
  
            <div class="content">
                <section >
    
                    <!-- <p style="text-indent:2em;text-align: left;padding:0px 10px 0px 20px;" id="banner"></p> -->
                    <!-- <p v-html="options">{{ `${item.section} ${item.content}` }}</p>
                    <span ></span>
                    <img :src="srcurl" /> -->
                    <p style="text-indent:2em;text-align: left;padding:0px 10px 0px 20px;">（1）工程应用呈现软件接收二代机自带信号处理软件的数据，根据工程需求（目前已矿山监测为工程背景）进行后处理、数据库和可视化展示等。</p>
                    <p style="text-indent:2em;text-align: left;padding:0px 10px 0px 20px;">（2）具体形式参考下图：具体内容再细聊。</p>

                    <p style="text-align:center;widthL:100%">
                        <img :src="imgUrl1" />
                    </p>
                    
                    <p style="text-indent:2em;text-align: left;padding:0px 10px 0px 20px;">软件部分由主界面、实时数据、历史数据、数据分析、报警管理等功能模块构成。</p>
                    
                    <p style="text-align:center">
                        <img :src="imgUrl2" />
                    </p>
                    
                </section>
            </div>


     
</template>
<script>
export default {
   
    data(){
        return{
            parainfo: '',
            contenttext: [],
            srcurl:'',
            imgUrl1:require("../../../assets/img/edj1.png"),
            imgUrl2:require("../../../assets/img/edj2.png")
        }
    },
    methods:{
        getviewinfo() {
            
            this.$axios.get(this.api.getviewinfo,{params:{structure:this.GLOBAL.structure}}).then(response => {
                const data = JSON.parse(response)
                this.parainfo = data
               // console.log(this.parainfo)
                //$.each(jsonParseJson,function(idx,rows)
                var contenttext
                data.forEach(function(value, index, _ary) {  
                    //console.log(value.paratype);  
                    //return false;  
                
				 		if(value.paratype == 1){
                             //this.contenttext = value.parainfo
                             //console.log(this.contenttext)
				  			document.getElementById("banner").append(value.parainfo);
						}else if (value.paratype == 2){
                            //this.srcurl = value.parainfo
							//document.getElementById("banner").append(value.parainfo);
						}else if (value.paratype == 3){
							//document.getElementById("title").append(value.parainfo);
						}
					});	
            });
        },
    },

    mounted(){
        //this.getviewinfo()
        
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 999;
        .dialog-container{
            width: 1400px;
            height: 600px;
            background: #ffffff;
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            position: relative;
            .dialog-title{
                width: 100%;
                height: 60px;
                text-align: center;
                font-size: 18px;
                color: #696969;
                font-weight: 600;
                padding: 16px 50px 0 20px;
                box-sizing: border-box;
            }
            .content{
                color: #797979;
                line-height: 26px;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .content p{
                line-height: 42px;            }
            .inp{
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                width: 100%;
                height: 60px;
                // line-height: 60px;
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: right;
                padding: 0 16px;
                box-sizing: border-box;
                & > div{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 8px;
                    margin-right: 12px;
                    cursor: pointer;
                }
                .default-btn{
                    color: #787878;
                    &:hover{
                        color: #509EE3; 
                    }
                }
                .danger-btn{
                    background: #EF8C8C;
                    &:hover{
                        background: rgb(224, 135, 135);
                    }
                    &:active{
                        background: #EF8C8C;
                    }
                }
                .confirm-btn{
                    color: #ffffff;
                    background: #509EE3;
                    &:hover{
                        background: #6FB0EB;
                    }
                }
            }
            .close-btn:before {
                content: "\e6db";
            }
            .close-btn{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    font-weight: 600;
                }
            }
        }
    }
.el-dialog__title{text-align: center;
    width: 100%;
    display: block;}
.content p{line-height: 42px;}
.content img{width:100%}
</style>