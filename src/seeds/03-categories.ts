import { Knex } from 'knex';export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert([
    { name: 'new_arrival', created_by: 'admin', updated_by: 'admin' },
    { name: 'top_selling', created_by: 'admin', updated_by: 'admin' },
    { name: 'normal', created_by: 'admin', updated_by: 'admin' },
  ]);
}
