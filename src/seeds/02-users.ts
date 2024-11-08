import { Knex } from 'knex';export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '$2b$10$BjCXsc03p28FUNE558NeCuB7rirPuCCMB77uFgI/JFtvpNDH74tHO',
      phone: 9841235612,
      role: 'admin',
      image_id: 3,
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      username: 'seller1',
      email: 'seller1@gmail.com',
      password: '$2b$10$XEb/4zdN563D/znQNSa/ge8GGv9DIQeJnToaj2YdQufQhulpX3Iga',
      phone: 9841235613,
      role: 'seller',
      image_id: 4,
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      username: 'user1',
      email: 'user1@gmail.com',
      password: '$2b$10$llTZN/OUQE/tLNGSLg110O3WdYnqMQFDGWicPQASBZEhyRRm14jUS',
      phone: 9841235614,
      role: 'user',
      image_id: 5,
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      username: 'seller2',
      email: 'seller2@gmail.com',
      password: '$2b$10$XEb/4zdN563D/znQNSa/ge8GGv9DIQeJnToaj2YdQufQhulpX3Iga',
      phone: 9841235615,
      role: 'seller',
      image_id: 6,
      created_by: 'admin',
      updated_by: 'admin',
    },
  ]);
}
