module.exports = {
  apps : [
    {
      name: "main",
      node_args: "--no-warnings",
      script: "./bin/server.js",
      args: "main",
      watch: ["bin", "src"],
      out_file: "/dev/null",
      error_file: "/dev/null",
    },
    {
      name: "social",
      node_args: "--no-warnings",
      script: "./bin/server.js",
      args: "social",
      watch: ["bin", "src"],
      out_file: "/dev/null",
      error_file: "/dev/null",
    },
    {
      name: "notification",
      node_args: "--no-warnings",
      script: "./bin/server.js",
      args: "notification",
      watch: ["bin", "src"],
      out_file: "/dev/null",
      error_file: "/dev/null",
    },
  ]
}
