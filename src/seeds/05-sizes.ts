import { Knex } from 'knex';export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('ALTER SEQUENCE sizes_id_seq RESTART WITH 1');
  await knex('sizes').del();

  // Inserts seed entries
  await knex('sizes').insert([
    { name: 'XX-Small', created_by: 'admin', updated_by: 'admin' },
    { name: 'X-Small', created_by: 'admin', updated_by: 'admin' },
    { name: 'Small', created_by: 'admin', updated_by: 'admin' },
    { name: 'Medium', created_by: 'admin', updated_by: 'admin' },
    { name: 'Large', created_by: 'admin', updated_by: 'admin' },
    { name: 'X-Large', created_by: 'admin', updated_by: 'admin' },
    { name: 'XX-Large', created_by: 'admin', updated_by: 'admin' },
  ]);
}
