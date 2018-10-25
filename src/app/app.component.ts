import { Component } from '@angular/core';
import { sealed, god, validate, notEmpty } from './shared/decorators/decorators';
import { Path, symbolPathKey } from './shared/decorators/Path';
import { httpGet, httpPost, symbolHttpMethodsKey } from './shared/decorators/HttpMethod';
import { User } from './shared/model/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '我的第一个angular应用';
  constructor() {
    const user = new User();
    user.name = 'aa';
    user.changeName('aa');
    // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf (user)));
    // console.log(Object.getOwnPropertyNames(user));
    // for (const methodName of Object.getOwnPropertyNames(user)) {
    for (const methodName in user) {
      if (methodName) {
        // console.log(methodName);
        const method = user[methodName];
        // console.log(method);
        if (typeof method !== 'function') {
          continue;
        }
        // 反射得到挂载的数据
        const httpMethod = Reflect.getMetadata(symbolHttpMethodsKey, user, methodName);
        const path = Reflect.getMetadata(symbolPathKey, user, methodName);
        if (httpMethod) {
          console.log(httpMethod);
          this[httpMethod](path, method);
        }
      }
    }
  }
  get(path: string, fn: () => string) {
    console.log(`反射调用成功${path}回调返回` + fn());
  }
  post(path: string, fn: () => string) {
    console.log(`反射调用成功${path}回调返回` + fn());
  }
  // user.changeName('aa');
  // // console.log(user.name);
  // user.exit();
}
