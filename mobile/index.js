/// zxing.qrcodereader.min.js
/// zxing.qrcodereader.min.js.map

window.addEventListener('load', function() {
    const reader = new ZXing.BrowserQRCodeReader();
    console.log('reader initiated');
    reader.getVideoInputDevices().then((devices) => {
        if(devices) {
            addDevices(devices);
            document.getElementById('startButton').addEventListener('click', function () {
                var selectedDevice = document.getElementById('sourceSelect').value;
                reader.decodeFromInputVideoDevice(selectedDevice, 'video').then(function (result) {
                    console.log(result);
                    document.getElementById('result').textContent = result.text
                }).catch((err) => {
                    console.log(err);
                });
            });
            document.getElementById('resetButton').addEventListener('click', () => {
                reader.reset();
                document.getElementById('result').textContent = "";
                console.log('Reset.');
            });
        } else {
            console.log('result: no camera available on your device');
        }
    }).catch((err) => {
        console.log(err);
    });

    function addDevices (devices) {
        var pnl = document.getElementById('sourceSelectPanel');
        var list = document.getElementById('sourceSelect');
        if(devices.length >= 1) {
            devices.forEach(d => {
                var opt = document.createElement('option');
                opt.value = d.deviceId;
                opt.text = d.label;
                list.appendChild(opt);
            });
            pnl.style.display = 'block';
        }
    }
});
