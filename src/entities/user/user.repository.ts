import { QueryError } from 'mysql2';
import { StatusCodes } from 'http-status-codes';

import knex from '../../config/knex.config';
import { IReturnUser, IUser } from './user.model';
import { userExceptionMessages } from './constant/userExceptionMessages';
import { customHttpError } from '../../utils/customErrorHandler';

export const findUserByEmail = async (email: string): Promise<IUser> => {
  return await knex('users')
    .select(
      'users.id',
      'users.username',
      'users.password',
      'users.email',
      'users.role',
      'users.phone',
      'images.url as image_url',
    )
    .leftJoin('images', 'users.image_id', 'users.id')
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
export const fetchById = async (userId: number): Promise<IReturnUser> => {
  return await knex('users')
    .select(
      'users.id',
      'users.username',
      'users.email',
      'users.phone',
      'images.url as image_url',
    )
    .leftJoin('images', 'users.image_id', 'users.id')
    .where('users.id', userId)
    .first();
};

export const create = async (
  userData: IUser,
): Promise<{ userID: number } | null> => {
  try {
    const user = await knex('users').insert(userData).returning('id');

    return { userID: user[0].id || 0 };
  } catch (error) {
    const err = error as QueryError;

    if (err.code === '23505') {
      throw new customHttpError(
        StatusCodes.CONFLICT,
        userExceptionMessages.DUPLICATE_EMAIL,
      );
    }
    return null;
  }
};

export const update = async (userData: IReturnUser, userId: number) => {
  return await knex('users').where('id', userId).update(userData);
};

export const remove = async (userId: number) => {
  return await knex('users').where('id', userId).delete();
};
