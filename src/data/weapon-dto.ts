import 'server-only';

import { asc } from 'drizzle-orm';

import { db } from '~/server/db';
import { weapons } from '~/server/db/schema';

export async function getAllWeapons() {
    return db.query.weapons.findMany({
        orderBy: [asc(weapons.name)],
    });
}
