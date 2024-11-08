import { Knex } from 'knex';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('ALTER SEQUENCE products_sizes_id_seq RESTART WITH 1');
  await knex('products_sizes').del();

  // Inserts seed entries
  await knex('products_sizes').insert([
    { product_id: 1, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 1, size_id: 2, created_by: 'admin', updated_by: 'admin' },
    { product_id: 1, size_id: 3, created_by: 'admin', updated_by: 'admin' },
    { product_id: 1, size_id: 4, created_by: 'admin', updated_by: 'admin' },
    { product_id: 1, size_id: 5, created_by: 'admin', updated_by: 'admin' },
    { product_id: 1, size_id: 6, created_by: 'admin', updated_by: 'admin' },

    { product_id: 2, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 2, size_id: 4, created_by: 'admin', updated_by: 'admin' },
    { product_id: 2, size_id: 6, created_by: 'admin', updated_by: 'admin' },
    { product_id: 2, size_id: 7, created_by: 'admin', updated_by: 'admin' },

    { product_id: 3, size_id: 2, created_by: 'admin', updated_by: 'admin' },
    { product_id: 3, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 3, size_id: 4, created_by: 'admin', updated_by: 'admin' },
    { product_id: 3, size_id: 6, created_by: 'admin', updated_by: 'admin' },

    { product_id: 4, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 4, size_id: 3, created_by: 'admin', updated_by: 'admin' },
    { product_id: 4, size_id: 5, created_by: 'admin', updated_by: 'admin' },
    { product_id: 4, size_id: 2, created_by: 'admin', updated_by: 'admin' },
    { product_id: 4, size_id: 6, created_by: 'admin', updated_by: 'admin' },

    { product_id: 5, size_id: 2, created_by: 'admin', updated_by: 'admin' },
    { product_id: 5, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 5, size_id: 3, created_by: 'admin', updated_by: 'admin' },
    { product_id: 5, size_id: 5, created_by: 'admin', updated_by: 'admin' },
    { product_id: 5, size_id: 7, created_by: 'admin', updated_by: 'admin' },

    { product_id: 6, size_id: 7, created_by: 'admin', updated_by: 'admin' },
    { product_id: 6, size_id: 3, created_by: 'admin', updated_by: 'admin' },
    { product_id: 6, size_id: 2, created_by: 'admin', updated_by: 'admin' },
    { product_id: 6, size_id: 5, created_by: 'admin', updated_by: 'admin' },

    { product_id: 7, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 7, size_id: 2, created_by: 'admin', updated_by: 'admin' },

    { product_id: 8, size_id: 3, created_by: 'admin', updated_by: 'admin' },
    { product_id: 8, size_id: 5, created_by: 'admin', updated_by: 'admin' },

    { product_id: 9, size_id: 4, created_by: 'admin', updated_by: 'admin' },
    { product_id: 9, size_id: 6, created_by: 'admin', updated_by: 'admin' },

    { product_id: 10, size_id: 1, created_by: 'admin', updated_by: 'admin' },
    { product_id: 10, size_id: 3, created_by: 'admin', updated_by: 'admin' },
  ]);
}
