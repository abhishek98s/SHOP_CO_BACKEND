import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('products').del();

    // Inserts seed entries
    await knex('products').insert(
        [
            {
                id: 1,
                name: 'One Life Graphic T-shirt',
                description: 'This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
                rating: 5,
                price: 260,
                discount: 30,
                image_id: 1,
                stock_quantity: 1,
                category_id: 1,
                size_id: 2,
                style_id: 1,
                type_id: 1,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 2,
                name: 'Men\'s Casual Shirt',
                description: 'A stylish and comfortable casual shirt made from 100% cotton.',
                rating: 4.5,
                price: 29.99,
                discount: 10,
                image_id: 2,
                stock_quantity: 2,
                category_id: 1,
                size_id: 2,
                style_id: 1,
                type_id: 3,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 3,
                name: 'Women\'s Winter Hoodie',
                description: 'A cozy hoodie designed for warmth and style during the colder months.',
                rating: 4.7,
                price: 49.99,
                discount: 15,
                image_id: 3,
                stock_quantity: 3,
                category_id: 3,
                size_id: 2,
                style_id: 1,
                type_id: 4,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 4,
                name: 'Men\'s Athletic Shorts',
                description: 'Lightweight and breathable shorts perfect for workouts and casual wear.',
                rating: 4.3,
                price: 35.00,
                discount: 20,
                image_id: 4,
                stock_quantity: 4,
                category_id: 2,
                size_id: 3,
                style_id: 4,
                type_id: 2,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 5,
                name: 'Women\'s Elegant shirts',
                description: 'A sophisticated shirts that can be dressed up or down for any occasion.',
                rating: 4.6,
                price: 45.00,
                discount: 25,
                image_id: 5,
                stock_quantity: 5,
                category_id: 1,
                size_id: 2,
                style_id: 2,
                type_id: 3,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 6,
                name: 'Men\'s Denim Jacket',
                description: 'A classic denim jacket that never goes out of style, perfect for layering.',
                rating: 4.4,
                price: 75.00,
                discount: 10,
                image_id: 6,
                stock_quantity: 6,
                category_id: 1,
                size_id: 2,
                style_id: 1,
                type_id: 1,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 7,
                name: 'Women\'s pants',
                description: 'A flowypant  dress that is perfect for summer outings and beach days.',
                rating: 4.8,
                price: 60.00,
                discount: 15,
                image_id: 7,
                stock_quantity: 7,
                category_id: 2,
                size_id: 2,
                style_id: 1,
                type_id: 4,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 8,
                name: 'Men\'s Formal Shirt',
                description: 'A crisp formal shirt perfect for special occasions and business meetings.',
                rating: 4.9,
                price: 80.00,
                discount: 20,
                image_id: 8,
                stock_quantity: 8,
                category_id: 3,
                size_id: 2,
                style_id: 2,
                type_id: 3,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 9,
                name: 'Women\'s Yoga Pants',
                description: 'Stretchy yoga pants designed for comfort and flexibility during workouts.',
                rating: 4.5,
                price: 40.00,
                discount: 25,
                image_id: 8,
                stock_quantity: 5,
                category_id: 2,
                size_id: 2,
                style_id: 4,
                type_id: 2,
                created_by: 'admin',
                updated_by: 'admin',
            },
            {
                id: 10,
                name: 'Men\'s Leather Belt',
                description: 'A high-quality leather belt that adds a touch of sophistication to any outfit.',
                rating: 4.7,
                price: 50.00,
                discount: 15,
                image_id: 10,
                stock_quantity: 6,
                category_id: 1,
                size_id: 2,
                style_id: 1,
                type_id: 1,
                created_by: 'admin',
                updated_by: 'admin',
            },
        ],
    );
}
