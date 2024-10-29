import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('product_styles').del();

    // Inserts seed entries
    await knex('product_styles').insert([
        { id: 1, name: 'casual', created_by: 'admin', updated_by: 'admin' },
        { id: 2, name: 'formal', created_by: 'admin', updated_by: 'admin' },
        { id: 3, name: 'party', created_by: 'admin', updated_by: 'admin' },
        { id: 4, name: 'gym', created_by: 'admin', updated_by: 'admin' },
    ]);
}
