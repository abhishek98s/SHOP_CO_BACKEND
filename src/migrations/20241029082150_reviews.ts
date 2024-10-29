import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews', (table) => {
        table.increments('id').primary();
        table.integer('rating').notNullable();
        table.string('comment').notNullable();
        
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');

        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

        table.string('created_by').notNullable();
        table.string('updated_by').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('reviews');
}

