import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
