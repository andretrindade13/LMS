import 'reflect-metadata'
import { container } from 'tsyringe';
import { UserService } from '../../../services/user.service';
import { UserRepositoryInMemory } from '../../../repositories/user/user.repositoryInMemory';
import { IUserRepository } from '../../../repositories/user/user.interface';
import { IPasswordHasher } from '../../../domains/services/passwordHasher.interface';
import { BcryptPasswordHasher } from '../../crypto/bcryptPasswordHasher';

container.register<IUserRepository>('UserRepository', {
  useClass: UserRepositoryInMemory,
});
container.register<IPasswordHasher>('PasswordHasher', {
  useClass: BcryptPasswordHasher
})

// Cria instância manualmente
const userServiceInstance = new UserService(container.resolve('UserRepository'), container.resolve('PasswordHasher'));

// Registra instância já pronta
container.register<UserService>(UserService, { useValue: userServiceInstance });

export { container, userServiceInstance };