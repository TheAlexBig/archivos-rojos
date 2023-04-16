import { createLogger, format as _format, transports as _transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: _format.combine(
        _format.timestamp(),
        _format.json()
    ),
    defaultMeta: { service: 'red-files' },
    transports: [
      new _transports.Console(),
    ]
});


// Create a custom stream for morgan
const stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

export default logger;
export {stream}