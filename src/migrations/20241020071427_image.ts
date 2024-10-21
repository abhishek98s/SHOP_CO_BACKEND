import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('images', (table) => {
        table.increments('id').primary();
        table.integer('product_id').notNullable();
        table.string('image_url').notNullable();
        table.string('caption').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('images');

}
