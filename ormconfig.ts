const ROOT_DIR = process.env.ROOT_DIR;

export = {
    entities: `${ROOT_DIR}/entities/*.ts`,
    migrations: `${ROOT_DIR}/migrations/*.ts`,
    subscribers: `${ROOT_DIR}/subscribers/*.ts`,
    seedingFactories: `${ROOT_DIR}/services/db/factories/**/*{.ts}`,
    seedingSeeds: `${ROOT_DIR}/services/db/seeders/**/*{.ts}`,
    cli: {
        entitiesDir: `${ROOT_DIR}/entities`,
        migrationsDir: `${ROOT_DIR}/migrations`,
        subscribersDir: `${ROOT_DIR}/subscribers`,
    },
    synchronize: process.env.TYPEORM_SYNCHRONIZE
};