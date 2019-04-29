var vm = new Vue({
  el: "#app",
  data: {

  },
  computed: {

  },
  methods: {
    captureBody: function(){

        var coord =  temp; //体の座標(始点X座標、始点Y座標、終点X座標、終点Y座標)
        var video = document.getElementById('video');
        var canvas = document.getElementById('capCanvas');
        var ctx    = canvas.getContext('2d');

        //console.log("始点X座標=" + coord[0] + ", 始点Y座標=" + coord[1] + ", 終点X座標=" + coord[2] + ", 終点Y座標=" + coord[3]);

        canvas.setAttribute('width' , coord[2]-coord[0]);
        canvas.setAttribute('height', coord[3]-coord[1]);

        //console.log("canvasの横幅は" + canvas.width + "、高さは" + canvas.height);

        ctx.scale(-1, 1);
        ctx.translate(-(coord[2]-coord[0]), 0);
        ctx.drawImage(video, videoWidth-coord[2], coord[3], coord[2]-coord[0], coord[1]-coord[3], 0, 0, coord[2]-coord[0], coord[3]-coord[1]);

        var cve2 = document.getElementById("output");
        var downloadLink = document.getElementById("capture_link");
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = "captured_" + moment().format("YYYY-MM-DD-HHmmss") + ".png";
        downloadLink.click();
        console.log(moment().format("YYYY-MM-DD-HHmmss"));
    }
  }
});
