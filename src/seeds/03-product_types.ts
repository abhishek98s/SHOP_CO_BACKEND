import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('product_types').del();

    // Inserts seed entries
    await knex('product_types').insert([
        { id: 1, name: 't-shirts', created_by: 'admin', updated_by: 'admin' },
        { id: 2, name: 'shorts', created_by: 'admin', updated_by: 'admin' },
        { id: 3, name: 'shirts', created_by: 'admin', updated_by: 'admin' },
        { id: 4, name: 'Hoodie', created_by: 'admin', updated_by: 'admin' },
    ]);
}
