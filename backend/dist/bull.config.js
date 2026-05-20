"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bullConfig = void 0;
exports.bullConfig = {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
    },
};
//# sourceMappingURL=bull.config.js.map