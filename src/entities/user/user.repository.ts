import { QueryError } from 'mysql2';
import knex from '../../config/knex.config';
import { UserModel } from './user.model';
import { userExceptionMessages } from './constant/userExceptionMessages';

/**
 * This function finds a user in the database by their email address and returns their information.
 * @param {string} email - The `findUserByEmail` function is designed to retrieve a user from a
 * database table named 'users' based on the provided email address. The function takes an email
 * address as a parameter and returns a Promise that resolves to a `UserModel` object.
 * @returns The `findUserByEmail` function is returning a Promise that resolves to a `UserModel` object
 * containing the user's information such as username, id, password, email, phone, and image_url. The
 * function queries the 'users' table in the database using the provided email address to find and
 * return the user's details.
 */
export const findUserByEmail = async (email: string): Promise<UserModel> => {
  return await knex('users')
    .select('username', 'id', 'password', 'email', 'phone', 'image_url')
    .where('email', email)
    .first();
};

/**
 * This function fetches user data by their ID from a database table called 'users' while ensuring the
 * user is not deleted.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user whose
 * information you want to fetch from the database.
 * @returns The `fetchById` function is returning a Promise that resolves to an object containing the
 * user's `id`, `username`, `email`, and `image_url` from the database table `users` where the `id`
 * matches the `userId` parameter and the `isdeleted` column is `false`.
 */
export const fetchById = async (userId: number) => {
  return await knex('users')
    .select('id', 'username', 'email', 'image_url')
    .where('id', userId)
    .first();
};

export const create = async (userData: UserModel) => {
  try {
    const user = await knex('users').insert(userData).returning('id');
    
    return { userID: user[0].id };
  } catch (error) {
    const err = error as QueryError;

    if (err.code === '23505') {
      throw new Error(userExceptionMessages.DUPLICATE_EMAIL);
    }

    throw new Error(userExceptionMessages.CREATE_FAILED);
  }
};

export const update = async (userData: UserModel, userId: number) => {
  return await knex('users').select('*').where('id', userId).update(userData);
};

export const remove = async (userId: number) => {
  return await knex('users').where('id', userId).delete();
};
