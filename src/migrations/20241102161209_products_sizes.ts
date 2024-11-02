import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products_sizes', (table) => {
    table.increments('id').primary();

    table.integer('product_id').notNullable();
    table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    table.integer('size_id').notNullable();
    table
      .foreign('size_id')
      .references('id')
      .inTable('sizes')
      .onDelete('CASCADE');

    table.string('created_by').notNullable();
    table.string('updated_by').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('products_sizes');
}
