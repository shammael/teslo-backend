"use strict";
// /* eslint-disable no-param-reassign */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// /* eslint-disable @typescript-eslint/no-shadow */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { createLogger, transports, format } from 'winston';
// import path from 'path';
// import chalk from 'chalk';
// const { combine, timestamp, printf, metadata } = format;
// const logger = createLogger({
//   format: format.combine(
//     metadata(),
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.json()
//   ),
//   transports: [
//     new transports.Console({
//       level: 'debug',
//       format: combine(
//         timestamp({
//           format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         format.errors({ stack: true }),
//         printf(({ level, message, timestamp, stack }) => {
//           if (level === 'info') {
//             return `${chalk.blackBright(`[${timestamp}]`)} ${`${chalk.bold.blue(
//               level
//             )} ℹ️😊:`} ${message}`;
//           }
//           if (level === 'error') {
//             return `${chalk.blackBright(`[${timestamp}]`)} ${`${chalk.bold.red(
//               level
//             )} 🟥🤒:`} ${stack || message}`;
//           }
//           if (level === 'warn') {
//             return `${chalk.blackBright(
//               `[${timestamp}]`
//             )} ${`${chalk.bold.yellow(level)} ⚠️🤔:`} ${message}`;
//           }
//           if (level === 'debug') {
//             return `${chalk.blackBright(
//               `[${timestamp}]`
//             )} ${`${chalk.bold.greenBright(level)} 🤔:`} ${message}`;
//           }
//           return `${chalk.blackBright(`[${timestamp}]`)} ${`${chalk.bold(
//             level
//           )}`} ${message}`;
//         })
//       ),
//     }),
//     new transports.File({
//       filename: `${path.resolve()}/logs/index.log`,
//     }),
//   ],
// });
// // const transform = format((info) => {
// //   info.meta = [...info[Symbol.for('splat')]];
// //   return info;
// // });
// // export const expressLogger = createLogger({
// //   format: format.combine(
// //     timestamp({
// //       format: 'YYYY-MM-DD HH:mm:ss',
// //     }),
// //     transform(),
// //     format.prettyPrint(),
// //     printf(({ level, timestamp, meta }) => {
// //       return `${chalk.gray(`[${timestamp}]`)} ${chalk.bold.blue(meta[0])} ${
// //         meta[1]
// //       } ${
// //         level === 'info'
// //           ? chalk.green(meta[2])
// //           : level === 'error'
// //           ? chalk.bold.red(meta[2])
// //           : level === 'warn'
// //           ? chalk.bold.yellow(meta[2])
// //           : ''
// //       } ${meta[3]}`;
// //     })
// //   ),
// //   transports: [
// //     new transports.Console({
// //       level: 'debug',
// //     }),
// //     new transports.File({
// //       filename: `${path.resolve()}/logs/errors.log`,
// //       level: 'error',
// //       format: combine(
// //         timestamp({
// //           format: 'YYYY-MM-DD HH:mm:ss',
// //         }),
// //         printf(({ meta }) => {
// //           return `[${timestamp}] ${meta[0]} ${meta[1]} ${meta[2]} ${meta[3]}`;
// //         })
// //       ),
// //     }),
// //     new transports.File({
// //       filename: `${path.resolve()}/logs/info.log`,
// //       level: 'info',
// //       format: combine(
// //         timestamp({
// //           format: 'YYYY-MM-DD HH:mm:ss',
// //         }),
// //         printf(({ meta }) => {
// //           return `[${timestamp}] ${meta[0]} ${meta[1]} ${meta[2]} ${meta[3]}`;
// //         })
// //       ),
// //     }),
// //     new transports.File({
// //       filename: `${path.resolve()}/logs/warn.log`,
// //       level: 'warn',
// //       format: combine(
// //         timestamp({
// //           format: 'YYYY-MM-DD HH:mm:ss',
// //         }),
// //         printf(({ meta }) => {
// //           return `[${timestamp}] ${meta[0]} ${meta[1]} ${meta[2]} ${meta[3]}`;
// //         })
// //       ),
// //     }),
// //   ],
// // });
// // export const expressWinstonStream = {
// //   write: (text: string) => {
// //     expressLogger.info(text);
// //   },
// // };
// export default logger;
