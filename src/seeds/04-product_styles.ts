import { Knex } from 'knex';export async function seed(knex: Knex): Promise<void> {  // Deletes ALL existing entries
  await knex.raw('ALTER SEQUENCE product_styles_id_seq RESTART WITH 1');
  await knex('product_styles').del();

  // Inserts seed entries
  await knex('product_styles').insert([
    { name: 'casual', created_by: 'admin', updated_by: 'admin' },
    { name: 'formal', created_by: 'admin', updated_by: 'admin' },
    { name: 'party', created_by: 'admin', updated_by: 'admin' },
    { name: 'gym', created_by: 'admin', updated_by: 'admin' },
  ]);
}
