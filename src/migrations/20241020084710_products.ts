import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.text('description');
        table.enu('size', ['small', 'medium', 'large', 'x-large']);
        table.float('rating');
        table.decimal('price', 10, 2).notNullable();
        table.decimal('discount', 10, 2).defaultTo(0);
        table.decimal('discounted_price', 10, 2);
        table.enu('category', ['new_arrival', 'top_selling']);
        table.enu('style', ['casual', 'formal', 'party', 'gym']);
        table.enu('type', ['t-shirts', 'shorts', 'shirts']);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products');
}
