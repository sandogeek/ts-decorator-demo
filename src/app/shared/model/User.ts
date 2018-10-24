import { god, validate, notEmpty, sealed } from '../decorators/decorators';
import { httpPost, httpGet } from '../decorators/HttpMethod';
import { Path } from '../decorators/Path';

export class User {
    name: string;
    title: string;
    constructor() {

    }
    @god('tasaid.com')
    sayHello() { }

    // 调用装饰器
    @validate
    changeName(@notEmpty newName: string) {
        this.name = newName;
    }
    @httpPost
    @Path('/user/login')
    login() { }

    @httpGet
    @Path('/user/exit')
    exit() { }
}
// @sealed
// class User2 {
//     @god('tasaid.com')
//     sayHello2() { }
// }
