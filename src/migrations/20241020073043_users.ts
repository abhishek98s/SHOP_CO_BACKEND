
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email', 191).unique().notNullable();
        table.string('password').notNullable();
        table.text('phone').notNullable();
        table.enu('role', ['seller', 'user', 'admin']).notNullable();
        table.integer('image_id').notNullable();
        table.string('created_by').notNullable();
        table.string('updated_by').notNullable();
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
