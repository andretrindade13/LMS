import {userServiceInstance} from '../..//src/libs/tsyringe/di/container'
import {Module} from '@nestjs/common'
import {AppController} from './app.controller'

import { UserService } from '../../src/services/user.service'


@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        {
            provide: UserService,
            useValue: userServiceInstance, // instância pronta
            },
    ]
})

export class AppModule {}
