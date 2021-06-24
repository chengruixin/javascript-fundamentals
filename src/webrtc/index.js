const bufferArray = [];

navigator.mediaDevices.getUserMedia({video : true})
    .then( stream => {
        const v1 = document.querySelector('#v1');
        // Older browsers may not have srcObject
        if ("srcObject" in v1) {
            v1.srcObject = stream;
        } else {
            v1.src = window.URL.createObjectURL(stream);
        }

        return stream;
        // v1.onloadedmetadata = function () {
        //   v1.play();    
        // };
    })
    .catch( err => {
        console.log(err);
    })
    .then( stream => {

        return new Promise((resolve, reject) => {
            //media recorder
            console.log(stream);
            //video/x-matroska;codecs=avc1
            // var mimeType = 'video/webm\;codecs=h264';
            let mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs="vp8, opus"', 
                bitsPerSecond: 100000
            });
            mediaRecorder.start(1000);
            mediaRecorder.ondataavailable = data => {
                console.log(data.data.type);
                bufferArray.push(data.data);

                resolve("first chunk resolved");
            }
            // console.log(MediaRecorder.isTypeSupported(mimeType))
        })
        
    })
    .then( message => {
        const mimeCodec = 'video/webm; codecs="vp8, opus"';
        const mediaSource = new MediaSource();
        const v2 = document.querySelector("#v2");
        v2.src = window.URL.createObjectURL(mediaSource);

        mediaSource.addEventListener("sourceopen", function (e) {
            let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

            sourceBuffer.addEventListener("updateend", () => {

                if(bufferArray.length > 0 && !sourceBuffer.updating) {
                    sourceBuffer.appendBuffer(bufferArray.shift());
                    v2.play();
                }
                
            })
        })
        
        v2.onloadedmetadata = function () {
          v2.play();    
        };
        
    })
    .catch(err => {
        console.log("Error catched");
        console.error(err)
    })