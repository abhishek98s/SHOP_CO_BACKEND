import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.text('description').notNullable();
        table.float('rating').defaultTo(0);
        table.decimal('price', 10, 2).notNullable();
        table.decimal('discount', 10, 2).defaultTo(0);
        table.decimal('discounted_price', 10, 2);
        table.integer('stock_quantity').notNullable();
        
        table.integer('image_id').notNullable();
        table.foreign('image_id').references('id').inTable('images').onDelete('CASCADE');

        table.integer('size_id').notNullable();
        table.foreign('size_id').references('id').inTable('sizes').onDelete('CASCADE');

        table.integer('category_id').notNullable();
        table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE');

        table.integer('style_id').notNullable();
        table.foreign('style_id').references('id').inTable('product_styles').onDelete('CASCADE');
        
        table.integer('type_id').notNullable();
        table.foreign('type_id').references('id').inTable('product_types').onDelete('CASCADE');
        
        // table.integer('category', ['new_arrival', 'top_selling']);
        // table.integer('style', ['casual', 'formal', 'party', 'gym']);
        // table.integer('type', ['t-shirts', 'shorts', 'shirts']);

        table.string('created_by').notNullable();
        table.string('updated_by').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products');
}
