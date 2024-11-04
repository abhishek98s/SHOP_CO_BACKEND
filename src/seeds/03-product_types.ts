import { Knex } from 'knex';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('product_types').del();

  // Inserts seed entries
  await knex('product_types').insert([
    { name: 't-shirts', created_by: 'admin', updated_by: 'admin' },
    { name: 'shorts', created_by: 'admin', updated_by: 'admin' },
    { name: 'shirts', created_by: 'admin', updated_by: 'admin' },
    { name: 'Hoodie', created_by: 'admin', updated_by: 'admin' },
  ]);
}
