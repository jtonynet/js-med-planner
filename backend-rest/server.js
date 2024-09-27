const app = require('./api/app');
const port = process.env.API_PORT || 3000;

app.listen(port, () => console.log(`server running on port ${port}`));
