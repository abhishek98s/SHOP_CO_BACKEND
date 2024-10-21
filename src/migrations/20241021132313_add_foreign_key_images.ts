import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('images', (table) => {
        table.foreign('product_id').references('products.id');
    });
};

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('images', (table) => {
        table.dropColumn('product_id');
    });
};