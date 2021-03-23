class VideoRecordHandler {
  constructor() {
    this.canvas = document.body.querySelector('canvas');
    this.video = document.body.querySelector('video');
    this.videoStream = this.canvas.captureStream(60);

    this.mediaRecorder = new MediaRecorder(this.videoStream);

    this.chunks = [];
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info
      this.chunks = [];
      const videoURL = URL.createObjectURL(blob);
      this.video.src = videoURL;
    };

    document.body.insertAdjacentHTML('beforeend', '<video></video>');
  }

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
  }
}

export default VideoRecordHandler;
