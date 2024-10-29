import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_styles', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();

        table.string('created_by').notNullable();
        table.string('updated_by').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('product_styles');
}

