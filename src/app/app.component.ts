import { Component } from '@angular/core';
import { sealed, god, validate, notEmpty } from './shared/decorators/decorators';
import { Path, symbolPathKey } from './shared/decorators/Path';
import { httpGet, httpPost, symbolHttpMethodsKey } from './shared/decorators/HttpMethod';
import { User } from './shared/model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '我的第一个angular应用';
  constructor() {
    const user = new User();
    console.log(Object.getOwnPropertyNames(user));
    for (const methodName of Object.getOwnPropertyNames(user)) {
      // if (user.hasOwnProperty(methodName)) {
      console.log(methodName);
      const method = user[methodName];
      if (typeof method !== 'function') {
        break;
      }
      // 反射得到挂载的数据
      // const httpMethod = Reflect.getMetadata(symbolHttpMethodsKey, user, methodName);
      const path = Reflect.getMetadata(symbolPathKey, user, methodName);
    }
    // app.get('/', () => any)
    // app[httpMethod](path, method)
  }
  // user.changeName('aa');
  // // console.log(user.name);
  // user.exit();
}
