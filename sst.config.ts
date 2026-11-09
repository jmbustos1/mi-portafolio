/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mi-portafolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const site = new sst.aws.Nextjs("Site", {
      path: ".",
      build: {
        command: "pnpm run build",
      },
      environment: {
        NODE_ENV: "production",
      },
    });

    return {
      url: site.url,
    };
  },
});
