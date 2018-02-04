$(document).ready(function() {

    function showLevelStats() {
        var data = {
            labels: [],
            series: []
        };

        $.get("/levelStats", function(levelData) {
            console.log(levelData);
            // var levelData = [{ "_id": 14, "total": 38 }, { "_id": 9, "total": 29 }, { "_id": 13, "total": 28 }, { "_id": 5, "total": 23 }, { "_id": 11, "total": 18 }, { "_id": 10, "total": 18 }, { "_id": 1, "total": 14 }, { "_id": 8, "total": 10 }, { "_id": 3, "total": 8 }, { "_id": 6, "total": 6 }, { "_id": 12, "total": 6 }, { "_id": 7, "total": 5 }, { "_id": 4, "total": 4 }, { "_id": 2, "total": 2 }, { "_id": 0, "total": 1 }];

            for (var i = 0, l = levelData.length ; i < l; i++) {
                var x = levelData[i];
                data.labels.push("Level " + x._id);
                data.series.push(x.total);
            }

            new Chartist.Pie('.ct-chart', data, {
                labelInterpolationFnc: Chartist.noop,
                width: 500,
                height: 300
            });
        });
    }
    showLevelStats();
    /*
    $('.genBtn').click(function() {
        console.log('test');
        $.post("/generateReference", { email_ID: $(".emailId").val() }, function(data) {
            console.log(data);
            if (data.id) {
                $('.referenceId').html(data.id);
            } else {
                $('.referenceId').html("Email Already Registered");
            }
        });
    });
    */
    function showReceipts(receiptData) {
        if (receiptData.valid == 1) {
            $.each(receiptData.data, function(key, value) {
                var html = '<div class="i-card"><div class="content"><p>Trek-Reg-ID : <strong>' + value.trekreg_ID + '</strong></p><p>Email : <strong>' + value.email_ID + '</strong></p><p>Reference Id : <strong>' + value.referenceNumber + '</strong></p></div><div class="logo"><img src="/img/ttlogo_new.png"><p style="flex-basis:100%;font-size:9px;margin:5px 0"><strong>NCS</strong><br>techtrek.hackncs.com</p><p>Fee : <strong>Rs. 20/- Paid.</strong></p></div></div>';
                $(".receipt-container").append(html);
            });
        }
        $(".receipt-container").removeClass("hidden");
        window.print();
    }

    function fetchId(data) {
        data = JSON.stringify(data);
        console.log("this is happening1");
        $.post("/generateMultipleReference", { "users": data }, function(receiptData) {
            console.log(receiptData);
            showReceipts(receiptData);
        });
    }
    JsonObj = null;

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        f = files[0];
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                JsonObj = JSON.parse(e.target.result);
                fetchId(JsonObj);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
    document.querySelector('.jsonFile').addEventListener('change', handleFileSelect, false);
});
