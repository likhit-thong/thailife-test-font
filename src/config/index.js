/**
 *
 *  ENV (dev, uat, preprod, production)
 */
const appConfig = {
  development: {
    env: "development",
    apiLocation: "http://localhost:8080/api/v1",
  },
  production: {
    env: "production",
    apiLocation: "http://localhost:8080/api/v1",
  },
};

const config = {
  ...appConfig[process.env.NEXT_PUBLIC_STAGING],
};

export default config;
