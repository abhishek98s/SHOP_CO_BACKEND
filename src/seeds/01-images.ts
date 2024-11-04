import { Knex } from 'knex';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('images').del();

  // Inserts seed entries
  await knex('images').insert([
    {
      caption: 'no-image',
      url: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'one-life-graphic-t-shirt',
      url: 'https://mrmockup.com/wp-content/uploads/2024/07/Free-Backside-T-Shirt-Mockup-Square-1024x1024.jpg?x26095',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'men-casual-shirt',
      url: 'https://media.istockphoto.com/id/1293292206/photo/young-beautiful-girl-in-a-white-hoodie-posing-warm-oversized-hoodie-with-an-hood-stylish.jpg?s=612x612&w=0&k=20&c=jtOCQCQieltbA-xg3GE_MNdfNsnj4i0H1qvVD837xLk=',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'women-windter-hoddie',
      url: 'https://i5.walmartimages.com/seo/Athletic-Works-Men-s-and-Big-Men-s-Knit-Shorts-2-Pack-Sizes-S-3XL_d484b5f2-64a2-4fb4-bc74-dc28b38eb357.6a0a4b7c9f60637d0b1128b948fc78f9.jpeg?odnHeight=50px&odnWidth=50px&odnBg=FFFFFF',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'men-atletic-shorts',
      url: 'https://i.pinimg.com/474x/6c/43/c3/6c43c36565556b714073e15432aa33da.jpg',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'women-elegant-shirts',
      url: 'https://i5.walmartimages.com/seo/Men-s-The-Trucker-Jacket_e956615c-5f71-4f27-950f-3b3460ed05e3_1.822afa92300b 8dea0395359b9404f2e6.jpeg',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'mens-denim-jacket',
      url: 'https://i.pinimg.com/736x/74/0d/5d/740d5d0830b10f9027ce627922bb17a6.jpg',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'women-pants',
      url: 'https://i.pinimg.com/474x/c7/3c/1d/c73c1d88e0ff11cb515aa6c64467dcfb.jpg',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'men-formal-shirt',
      url: 'https://img.freepik.com/premium-photo/woman-white-tank-top-is-standing-gym_1216215-3758.jpg?semt=ais_hybrid',
      created_by: 'admin',
      updated_by: 'admin',
    },
    {
      caption: 'women-yoga-pants',
      url: 'https://thumbs.dreamstime.com/b/mens-belts-especially-genuine-leather-46767173.jpg',
      created_by: 'admin',
      updated_by: 'admin',
    },
  ]);
}
