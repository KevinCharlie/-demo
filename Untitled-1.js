var user = "oT_UT59ok2uzgqhBgUzhObj3S1uE";
    var token = "";
    var region = "济南";
    var weather = "";
    var temp = "";
    var wind_dir = "";
    var note_en = "";
    var note_ch = "";
    var template_id = "YzWveXyfKfCKLtcxw-72wYIKWErvoPzZ36HRXIPjkEo";
    function ceshi() {
      // alert("document");
      get_token();
      get_weather();
      get_ciba();
      setTimeout(() => {
        send_message();
      }, 3000);
    }

    // 获取随机颜色
    function getColor() {
      //使用字符串把十六进制数存起来
      var str = '0123456789abcdef';
      //用另一个字符串来存储#
      var colorStr = '#';
      for (var i = 1; i <= 6; i++) {
        colorStr += str[parseInt(Math.random() * str.length)];
      }
      return colorStr;
    }

    // 获取token
    function get_token() {
      //  appId
      var app_id = "wx59c0abc4422dd0be"
      //  appSecret
      var app_secret = "d6ff964b19d72ca0d0b1c532019fcd37"
      var post_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + app_id + "&secret=" + app_secret;
      $.ajax({
        type: "GET",			//GET、POST
        url: post_url,
        withCredentials: false,
        success: function (res) {
          console.log(res)	//res为成功返回数据，可自定义名称
          token = res.access_token;
        },
        error: function (e) {
        }
      });
    }

    // 获取天气
    function get_weather() {
      var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
      }
      var key = "a1558df7450647729f1009eda7501f3b";
      var region_url = "https://geoapi.qweather.com/v2/city/lookup?location=济南&key=" + key;
      var location_id = "";
      $.ajax({
        type: "GET",			//GET、POST
        url: region_url,
        async: false,  //同步
        success: function (res) {
          console.log(res)	//res为成功返回数据，可自定义名称
          location_id = res.location[0].id;
        },
        error: function (e) {
        }
      });
      var weather_url = "https://devapi.qweather.com/v7/weather/now?location=" + location_id + "&key=" + key;
      $.ajax({
        type: "GET",			//GET、POST
        url: weather_url,
        async: false,  //同步
        success: function (res) {
          console.log(res)	//res为成功返回数据，可自定义名称
          //  天气
          weather = res.now.text;
          //  当前温度
          temp = res.now.temp + "℃";
          //  风向
          wind_dir = res.now.windDir;
        },
        error: function (e) {
        }
      });
    }

    // 获取生日
    function get_birthday() {

    }

    // 获取名言
    function get_ciba() {
      var ciba_url = "http://open.iciba.com/dsapi/";
      var headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
      }
      $.ajax({
        type: "GET",			//GET、POST
        url: ciba_url,
        async: false,  //同步
        withCredentials: false,
        headers: headers,
        success: function (res) {
          console.log(res)	//res为成功返回数据，可自定义名称
          note_en = res.content;
          note_ch = res.note;
        },
        error: function (e) {
        }
      });
    }

    // 发送推送
    function send_message(user, token, region, weather, temp, wind_dir, note_en, note_ch) {
      var url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + token;
      var data = {
        "touser": user,
        "template_id": template_id,
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
          "region": {
            "value": region,
            "color": getColor()
          },
          "weather": {
            "value": weather,
            "color": getColor()
          },
          "temp": {
            "value": temp,
            "color": getColor()
          },
          "wind_dir": {
            "value": wind_dir,
            "color": getColor()
          },
          "note_en": {
            "value": note_en,
            "color": getColor()
          },
          "note_ch": {
            "value": note_ch,
            "color": getColor()
          }
        }
      };
      headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
      };
      $.ajax({
        type: "POST",			//GET、POST
        url: url,
        async: false,  //同步
        withCredentials: false,
        headers: headers,
        success: function (res) {
          console.log(res)	//res为成功返回数据，可自定义名称
        },
        error: function (e) {
        }
      });
    }