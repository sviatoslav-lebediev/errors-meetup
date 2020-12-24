import { InternalServerError } from '../errors/internal-server-error';
import * as mysqlUserRepository from '../repositories/user-repository-mysql';

const findUser = async (id: string) => mysqlUserRepository.findUser(id);

const createUser = async ({ email, password }: { email: string; password: string }) => {
    if (email === 'service-erro@mail.com') {
        throw new InternalServerError(`Service custom error`);
    }

    return mysqlUserRepository.createUser({ email, password });
};

export { findUser, createUser };
