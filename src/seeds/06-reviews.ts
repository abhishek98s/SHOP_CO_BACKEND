import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('reviews').del();

    // Inserts seed entries
    await knex('reviews').insert([
        {
            id: 1,
            rating: 4.5,
            comment: 'Great quality and very comfortable to wear!',
            product_id: 1,
            user_id: 2,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 2,
            rating: 4.0,
            comment: 'The fit is perfect, but the color is a bit different from the picture.',
            product_id: 2,
            user_id: 3,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 3,
            rating: 5.0,
            comment: 'Absolutely love this hoodie! It keeps me warm and looks stylish.',
            product_id: 3,
            user_id: 1,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 4,
            rating: 4.2,
            comment: 'These shorts are lightweight and perfect for workouts.',
            product_id: 4,
            user_id: 4,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 5,
            rating: 4.8,
            comment: 'This shirt is so elegant! I wore it to a party and received many compliments.',
            product_id: 5,
            user_id: 2,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 6,
            rating: 4.6,
            comment: 'The denim jacket is a classic! It goes well with almost everything.',
            product_id: 6,
            user_id: 3,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 7,
            rating: 5.0,
            comment: 'These pants are so comfortable and perfect for summer outings!',
            product_id: 7,
            user_id: 1,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 8,
            rating: 4.9,
            comment: 'This formal shirt is a must-have for any wardrobe. Fits perfectly!',
            product_id: 8,
            user_id: 4,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 9,
            rating: 4.3,
            comment: 'Great yoga pants! They are stretchy and comfortable for workouts.',
            product_id: 9,
            user_id: 2,
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 10,
            rating: 4.7,
            comment: 'This leather belt is high quality and looks great with my outfits.',
            product_id: 10,
            user_id: 3,
            created_by: 'admin',
            updated_by: 'admin',
        },
    ]);
}
