import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        {
            id: 1,
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'Admin123!',
            phone: 9841235612,
            role: 'admin',
            image_url: '',
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 2,
            username: 'seller1',
            email: 'seller1@gmail.com',
            password: 'Seller123!',
            phone: 9841235613,
            role: 'seller',
            image_url: 'https://example.com/seller1.jpg',
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 3,
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'User 123!',
            phone: 9841235614,
            role: 'user',
            image_url: 'https://example.com/user1.jpg',
            created_by: 'admin',
            updated_by: 'admin',
        },
        {
            id: 4,
            username: 'seller2',
            email: 'seller2@gmail.com',
            password: 'Seller456!',
            phone: 9841235615,
            role: 'seller',
            image_url: 'https://example.com/seller2.jpg',
            created_by: 'admin',
            updated_by: 'admin',
        },
    ]);
}
