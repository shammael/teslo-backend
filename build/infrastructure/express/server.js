import express from 'express';
import setupApp from './setup/setup-routes';
const app = express();
setupApp(app);
app.listen(process.env.PORT || 4000, () => {
    console.log('running');
});
