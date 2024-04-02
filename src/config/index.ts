interface Config {
  port: number;
  rabbitMQ: {
    hostname: string;
    port: number;
    username: string;
    password: string;
  };
  postgres: {
    port: number;
    database: string;
    host: string;
    user: string;
    password: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT || 8080),
  rabbitMQ: {
    hostname: process.env.MQ_HOSTNAME || "",
    port: Number(process.env.MQ_PORT || 0),
    username: process.env.MQ_USERNAME || "",
    password: process.env.MQ_PASSWORD || "",
  },
  postgres: {
    port: Number(process.env.DB_PORT || 0),
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
  },
};

export default config;
