import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('sizes').del();

    // Inserts seed entries
    await knex('sizes').insert([
        { id: 1, name: 'XX-Small', created_by: 'admin', updated_by: 'admin' },
        { id: 2, name: 'X-Small', created_by: 'admin', updated_by: 'admin' },
        { id: 3, name: 'Small', created_by: 'admin', updated_by: 'admin' },
        { id: 4, name: 'Medium', created_by: 'admin', updated_by: 'admin' },
        { id: 5, name: 'Large', created_by: 'admin', updated_by: 'admin' },
        { id: 6, name: 'X-Large', created_by: 'admin', updated_by: 'admin' },
        { id: 7, name: 'XX-Large', created_by: 'admin', updated_by: 'admin' },
    ]);
}
