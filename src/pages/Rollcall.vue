<template>
	<div class="page-rollcall">
		<el-tabs v-model="active">
		    <el-tab-pane label="随机点名" name="first">
		    	<el-header class="text-center"><el-button type="primary" round @click="start">开始</el-button></el-header>
				<el-row :gutter=5 v-cloak>
					<el-col :offset=1 :span=11 class="left-user">
						<el-button round :class="{winner:player[0].blood<=0}">{{player[0].name}}</el-button>
						<el-progress :stroke-width="5" :percentage="player[0].blood" :color="barColor1"></el-progress>
					</el-col>
				 	<el-col :span=1 class="text-center">PK</el-col>
					<el-col :span=10 class="text-right right-user">
						<el-button round :class="{winner:player[1].blood<=0}">{{player[1].name}}</el-button>
						<el-progress :stroke-width="5" :percentage="player[1].blood" :color="barColor2"></el-progress>
					</el-col>
				</el-row>
				<el-table
			    :data="fireLog"
			    stripe
			    style="width: 100%">
			    	<el-table-column prop="times" width="120">
			    		<template slot-scope="scope">
					        <i class="el-icon-time"></i>
					        <span>{{scope.row.times ? '【第' +scope.row.times +'轮】' : 'game over'}}</span>
					     </template>
			    	</el-table-column>
				    <el-table-column prop="currentUser" width="100"></el-table-column>
				    <el-table-column prop="skill"></el-table-column>
				    <el-table-column prop="damage" width="200">
				    	<template slot-scope="scope">
							{{ scope.row.damage ? '对方损失' + scope.row.damage + '点血量' : '' }}
				    	</template>
				    </el-table-column>
			  </el-table>
			</el-tab-pane>
		    <el-tab-pane label="分组点名" name="second">分组点名</el-tab-pane>
		    <el-tab-pane label="顺序点名" name="third">顺序点名</el-tab-pane>
		    <el-tab-pane label="惩罚机制" name="fourth">惩罚机制</el-tab-pane>
		  </el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'Rollcall',
		data () {
			return {
				active: 'first', //tab初始高亮
				ready:false,
				fireLog:[],//攻击记录
				player:[{},{}], //玩家{name,blood}
				pking:false,
				timer:null,
			}
		},
		computed:{
			nameList(){
				return this.$store.state.currentClass.student
			},
			barColor1(){
				return this.player[0].blood < 20 ? '#F56C6C' : '#67C23A';
			},
			barColor2(){
				return this.player[1].blood < 20 ? '#F56C6C' : '#67C23A';
			}
		},
		watch:{

			// 监听currentClass
			// 当currentClass从父级组件传入，则得到学生名单，进而执行初始化操作
			nameList(){
				// this.nameList = this.currentClass.student;
				this.nameList.length>0 && this.getPlayer();
			}
		},
		methods:{
			start(){
				if(this.pking) return;
				var sklist = [
					"发起了猛烈的进攻，打的他满地找牙",
				    "使用了大招，对方的假发被打掉了！",
				    `使用了魅惑技能，对方被迷的神魂颠倒，瞬间掉了${this.random(2,20)}W的粉丝`,
				    `查看了葵花宝典，逼格提升了${this.random(1,100)}%，对方被吓破了胆`,
				    "炫耀了他的大块肌肉",
				    "狠狠的鄙视了对方一下，造成了巨大伤害",
					"使用了情侣花式虐狗秀恩爱，一下子打中了对方的小心脏",
					`使用练了${this.random(5,20)}年的手速，瞬间扇了对方${this.random(5,50)}个耳光`
				];

				// 重置默认值
				this.init();

			    var times = 1; //当前是第几轮攻击
			    this.timer = setInterval(fight.bind(this), 200);

			    function fight() {
			    	//本轮使用的技能(随机)
			    	let idx = parseInt(this.random(0,sklist.length-1));
			        var skill = sklist[idx]; 

			        //本轮造成的伤害(随机)
			        var damage = this.random(1,30);

			        // 本轮攻击者
			        let currentUser;
			        // 对手
			        let opponent;

					// 随机获取攻击者
					let index = this.random(0,1);
					if(index===0){
			        	currentUser = this.player[0];
			        	opponent = this.player[1];
			        }else{
			        	currentUser = this.player[1];
			        	opponent = this.player[0];
					}

			        // 对手耗血
			        opponent.blood -= damage;
			        
			       
		            this.fireLog.push({times,currentUser:currentUser.name,skill,damage})

			        // PK结束条件
			        if (opponent.blood <= 0) {
			        	opponent.blood = 0;
			            clearInterval(this.timer); //清理定时器

			            //增加最后一行，输出游戏结束
			            this.fireLog.push({currentUser:opponent.name,skill:'大喊一声“为什么！”，然后挂掉了！'});

			            //打斗标识设为false,表示打完了
			            this.pking = this.ready = false; 
			            return;
			        }

			        ;
			        times++; //进入下一轮攻击
			    }
			},
			random(min,max){
				return parseInt(Math.random()*(max-min+1)+min);
			},
		  	getPlayer(num=2){
				  this.player = [];

		  		// 随机获取两个名单
		  		for(let i=0;i<num;i++){
		  			let idx = this.random(0,this.nameList.length-1);
		  			this.player.push({
		  				name:this.nameList[idx].name,
		  				blood:100
		  			});

				  }
				  this.ready = true;
		  	},
		  	init(){
		  		
				
				this.fireLog = [];
				if(this.timer){
					clearInterval(this.timer);
					this.timer = null;
				}
				
				// 重新开始：直接点击开始按钮
				if(!this.ready){
					this.getPlayer();
				}
		  		
			}
		},
		mounted(){
			this.nameList.length>0 && this.getPlayer()
			console.log('player:',this.player)
		}
	}
</script>
