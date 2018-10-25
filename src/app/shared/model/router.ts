import { god, validate, notEmpty, sealed } from '../decorators/decorators';
import { httpPost, httpGet, symbolHttpMethodsKey } from '../decorators/HttpMethod';
import { Path, symbolPathKey } from '../decorators/Path';
// import { Router } from 'express';

export class User {
    name: string;
    @httpPost
    @Path('/user/login')
    login() {
        return 'user login';
    }

    @httpGet
    @Path('/user/exit')
    exit() {
        return 'user logout';
    }
    @validate
    changeName(@notEmpty a: string) {
        console.log(`changeName excute`);
    }
}

// export default (app: Router) => {
//   const user = new User();
//   for (let methodName in user) {
//     let method = user[methodName]
//     if (typeof method !== 'function') break;
//     // 反射得到挂载的数据
//     let httpMethod = Reflect.getMetadata(symbolHttpMethodsKey, user, methodName);
//     let path = Reflect.getMetadata(symbolPathKey, user, methodName);

//     // app.get('/', () => any)
//     // app[httpMethod](path, method);
//   }
// }
