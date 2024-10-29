import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products_tags', (table) => {
        table.increments('id').primary();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');

        table.integer('tag_id').unsigned().notNullable();
        table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE');

        table.unique(['product_id', 'tag_id']);
    
        table.string('created_by').notNullable();
        table.string('updated_by').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products_tags');
}

