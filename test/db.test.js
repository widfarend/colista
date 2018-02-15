import { connectDatabase } from '../src/server/db';
import { testing } from '../src/server/db/config';

describe('#Database', () => {
    test('should connect to the mongo database', async () => {
        const db = await connectDatabase(testing);

        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        expect(db.readyState).toEqual(1);
    });
});