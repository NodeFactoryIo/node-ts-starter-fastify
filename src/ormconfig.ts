const ROOT_DIR = process.env.ROOT_DIR;

export = {
  entities: `${ROOT_DIR}/entities/*{.ts,.js}`,
  migrations: `${ROOT_DIR}/migrations/*{.ts,.js}`,
  subscribers: `${ROOT_DIR}/subscribers/*{.ts,.js}`,
  seedingFactories: `${ROOT_DIR}/services/db/factories/**/*{.ts,.js}`,
  seedingSeeds: `${ROOT_DIR}/services/db/seeders/**/*{.ts,.js}`,
  cli: {
    entitiesDir: `${ROOT_DIR}/entities`,
    migrationsDir: `${ROOT_DIR}/migrations`,
    subscribersDir: `${ROOT_DIR}/subscribers`,
  },
  synchronize: process.env.TYPEORM_SYNCHRONIZE
};