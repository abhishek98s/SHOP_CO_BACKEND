import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('categories').del();

    // Inserts seed entries
    await knex('categories').insert([
        { id: 1, name: 'new_arrival', created_by: 'admin', updated_by: 'admin' },
        { id: 2, name: 'top_selling', created_by: 'admin', updated_by: 'admin' },
        { id: 3, name: 'normal', created_by: 'admin', updated_by: 'admin' },
    ]);
}
