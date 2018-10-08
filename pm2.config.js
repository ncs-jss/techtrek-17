
var pm2Config = {
    "apps": [
      {
        "name": "server",
        "script": "app.js",
        "exec_mode": "cluster_mode",
        "instances": "max"
      }
    ]
};

module.exports = pm2Config;