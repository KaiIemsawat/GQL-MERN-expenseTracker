// Due to the limitation of using FREE HOSTING, loading the application could be slow once inactive for a while

// * Solution - CORN JOB
// Cron job are scheduled tasks that run periodically at fixed intervals or specific times

// * Minute, Hour, Day of the month, Month, Day of the week

// Example
// 0 * * * * - Every hour
// 14 * * * * - Every 14 mins
// 0 0 * * 0 - At midnight on every Sunday
// 30 3 15 * * - At 3:30AM, on the 15th of every month
// 0 0 1 1 * - At midnight, on January 1st

// import cron from "cron";
// import https from "https";

// const URL = "https://gql-mern-expensetracker.onrender.com";

// const job = new cron.CronJob("*/14 * * * *", function () {
//     https
//         .get(URL, (res) => {
//             if (res.statusCode === 200) {
//                 console.log("GET request sent successfully");
//             } else {
//                 console.log("GET request failed", res.statusCode);
//             }
//         })
//         .on("error", (e) => {
//             console.error("Error while sending request", e);
//         });
// });

// export default job;
