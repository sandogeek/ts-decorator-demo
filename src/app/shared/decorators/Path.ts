import 'reflect-metadata';

export const symbolPathKey = Symbol.for('router:path');

export let Path = (path: string): Function => {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {

    Reflect.defineMetadata(symbolPathKey, path, target, propertyKey);

    if (!descriptor.value) {
        return;
    }
    // 覆盖掉原来的 router method，在外层做封装
    const oldMethod = descriptor.value;
    descriptor.value = function () {
      const params = arguments;
      const methodResult = oldMethod.apply(this, params);
      return methodResult;
      // 输出返回结果
    //   console.log(methodResult);
    //   res.send(methodResult);
    };
  };
};
