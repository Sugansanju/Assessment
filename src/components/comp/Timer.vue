<template>
     <div class="timer"><b>Time Left :</b> {{ timeLeft | prettify}}</div>
</template>

<script>
export default {
    name: 'timer',
    props:['time'],
	filters: {
		 prettify : function(value) {
			let t = value / 60;
			let minutes = parseInt(t);
			let secondes = Math.round((t - minutes) * 60);
			t=minutes + ":" + secondes;
			  let data = t.split(':')
			  minutes = data[0]
			  secondes = data[1]
			  if (minutes < 10) {
					minutes = "0"+minutes
			  }
			  if (secondes < 10) {
					secondes = "0"+secondes
			  }
			  return minutes+":"+secondes
		 }
	},
	data() {
        return{
		 isRunning: false,
		 minutes:0,
		 secondes:0,
		//  time:0,
		 timeLeft: 0,
		 timer:null,
		 sound:new Audio("http://s1download-universal-soundbank.com/wav/nudge.wav")
        }
    },
    mounted(){
		// console.log('Payload ', this.time);
        this.setTime(this.time);
        this.start();
    },
	methods: {
		 start () {
			 this.isRunning = true
			 if (this.timer==null) {
				  this.timer = setInterval( () => {
						if (this.timeLeft > 0) {
							 this.timeLeft--;
							 if((this.timeLeft / 60) == 5){
								 this.$emit('timeAlert');
							 }
						} else {
							 clearInterval(this.timer)
							 this.sound.play()
                            this.$emit('timeExpired');
                            this.stop();
						}
				  }, 1000 )
			 }
		 },
		 stop () {
			 this.isRunning = false
			 clearInterval(this.timer)
			 this.timer = null
		 },
		 reset () {
			  this.stop()
			  this.time = 0
			  this.secondes = 0
			  this.minutes = 0
		 },
		 setTime (payload) {
			//   let data = payload.split(':');
			//   let minutes = data[0];
			//   let secondes = data[1];
			//  this.time = (minutes * 60 + secondes)
			//  console.log('Payload set', this.time);
			this.timeLeft=payload;
		 }
	}
}
</script>

