import { get } from 'config';

import { app } from './app';

const PORT = get('port');
app.listen(PORT, () => console.log(`Server runs on http://localhost:${PORT}`));