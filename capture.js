var vm = new Vue({
  el: "#app",
  data: {

  },
  computed: {

  },
  methods: {
    captureBody: function(){

        var coord =  getBodyPosition(keypoints); //体の座標
        var video = document.getElementById('video');
        var canvas = document.getElementById('capCanvas');
        var ctx    = canvas.getContext('2d');

        // var width  = video.offsetWidth;
        // var height = video.offsetHeight;

        //canvas.setAttribute('width' , width);
        canvas.setAttribute('width' , coord[2]);
        //canvas.setAttribute('height', height);
        canvas.setAttribute('height', coord[3]);
        ctx.drawImage(video, coord[0], coord[1], coord[2], coord[3]);
        // ctx.drawImage(video, 0, 0, width, height);

        var cve2 = document.getElementById("output");
        var downloadLink = document.getElementById("capture_link");
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = "captured_" + moment().format("YYYY-MM-DD-HHmmss") + ".png";
        downloadLink.click();
        console.log(moment().format("YYYY-MM-DD-HHmmss"));
    }
  }
});
