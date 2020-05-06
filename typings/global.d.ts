export declare global {
  export interface Window {
    __NEXT_DATA__: any;
  }
  namespace NodeJS {
    interface Global {
      DOMParser: typeof DOMParser;
    }
    interface ProcessEnv {
      DOMAIN: string;
      ENV_DEV: boolean;
      ENV_PROD: boolean;
      ENV_STAGING: boolean;
    }
    interface Process {
      browser: boolean;
    }
  }
}
