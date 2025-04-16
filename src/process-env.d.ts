
declare module "process" {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                [key: string]: string | undefined;
                PORT: number;
                DB_HOST: string;
                DB_USER: string;
                DB_PASSWORD: string;
                DB_NAME: string;
                DB_PORT: string;
                DB_DIALECT: string;
                SCOUNT: string;
                JWT_SECRET_KEY: string;
            }
        }
    }
}