import { get } from 'config';
import mongoose from 'mongoose';

import { app } from './app';

( async () => {
    try {
        await mongoose.connect(get('mongo_url'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        const PORT = get('port');
        app.listen(PORT, () => console.log(`Server runs on http://localhost:${PORT}`));
    } catch (e) {
        throw new Error(e);
    }
})();