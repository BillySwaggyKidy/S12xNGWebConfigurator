module.exports = function (api) {
    api.cache(true);
  
    const presets = [
        [
            "@babel/preset-react",
            {
                "runtime":"automatic"
            }
        ],
        [
            "@babel/preset-env",
            {
                "modules": "commonjs",
                "loose": false
            }
        ]
    ];
  
    const plugins = [
        "transform-class-properties",
        [
            "inline-import-data-uri",
            {
                "extensions":[
                    "png","svg","jpg","jpeg","gif"
                ]
            }
        ]
    ];

    const env = {
        "test": {
            "plugins": [
                "transform-es2015-modules-commonjs"
            ]
        }
    };
  
    return {
      presets,
      plugins,
      env
    };
  };