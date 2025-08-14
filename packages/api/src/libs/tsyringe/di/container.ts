import 'reflect-metadata'
import { container } from 'tsyringe';
import { UserService } from '../../../services/user.service';
import { UserRepositoryInMemory } from '../../../repositories/user/user.repositoryInMemory';
import { IUserRepository } from '../../../repositories/user/user.interface';

container.register<IUserRepository>('UserRepository', {
  useClass: UserRepositoryInMemory,
});

// Cria instância manualmente
const userServiceInstance = new UserService(container.resolve('UserRepository'));

// Registra instância já pronta
container.register<UserService>(UserService, { useValue: userServiceInstance });

export { container, userServiceInstance };