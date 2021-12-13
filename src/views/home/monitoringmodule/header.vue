<template>
    <div class="cc-header">
      <!-- <dv-decoration-1 style="width:100%;height:50px;" /> -->
        <div class="cc-title">动力灾害监控数据分析平台</div>
<!--         
        <button class="btn button button--aylen button--border-medium button--inverted button--text-upper button--size-m" data-text="进入综合管理平台" @click="addRoutes"><span>进入综合管理平台</span></button> -->

    </div>
</template>
<script>
export default {
        name: 'Header',
        components: {
            
        },
         data () {
            return {
                nowTime:''
            }
        },
        mounted() {
            this.nowTimes();
            //const { createData } = this
            this.createData();
            //setInterval(this.createData, 30000)
             //this.initMap();
        },
        
        methods: {
        //   addRoutes () {
        //     this.$router.push('/home')
        //   },
       
            
           
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
                let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
                let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
                let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
                let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
                const myDate = new Date()
                let week = myDate.getDay() // 星期
                let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]

                
                //this.week = '星期' + '日一二三四五六'.charAt(myDate.getDay())
                this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss + ' ' + weekArr[week];
            },
            nowTimes(){
                    this.timeFormate(new Date());
                    setInterval(this.nowTimes,1000);
                    this.clear()
            },
            clear(){
                    clearInterval(this.nowTimes)
                    this.nowTimes = null;
            },
            createData () {
         
            }
            
            

        }
    }
</script>
<style lang="less">
.main-header {
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
    background: url("../../../assets/img/titbg.png") no-repeat center top;
}
// .main-header:after {
//   content: "";
//   background: url("../../../assets/img/titbg.png") no-repeat center top;
//   opacity: 0.5;
//   z-index: 999;   
// }
.cc-right{width:25%;float: right;}
.cc-title{width:100%;text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 40px;
    height: 40px;
    // background: url("../../../assets/img/light.png") no-repeat center top;
    }
    .cc-time{    line-height: 24px;font-size: 16px; color:#fff;padding-top:0px;}
.cc-system{width:100%;text-align: center;font-size: 16px; color:#fff;padding-top:10px;cursor: pointer;}
.dv-decoration-1{width: 25%;}
.cc-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>