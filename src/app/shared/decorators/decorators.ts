// 类装饰器
export const sealed = function (constructor: Function) {
    // console.log(constructor);
    Object.seal(constructor);
    Object.seal(constructor.prototype);
};
// 属性/方法装饰器
export function god(name: string) {
    return function (target, propertyKey: string) {
      // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
      // propertyKey: 成员的名字
    //   console.log(target[propertyKey]);
    };
}

// 参数装饰器
// 定义一个私有 key
const notEmptyMetadataKey = Symbol('notEmpty');
// 定义参数装饰器，大概思路就是把要校验的参数索引保存到成员中
export const notEmpty = function (target, propertyKey: string, parameterIndex: number) {
  // 参数装饰器只能拿到参数的索引
  if (!target[propertyKey][notEmptyMetadataKey]) {
    target[propertyKey][notEmptyMetadataKey] = {};
  }
  // 把这个索引挂到属性上
  target[propertyKey][notEmptyMetadataKey][parameterIndex] = true;
};
// 定义一个方法装饰器，从成员中获取要校验的参数进行校验
export const validate = function (target, propertyKey: string, descriptor: TypedPropertyDescriptor<Function> ) {
    // 保存原来的方法
    const oldMethod = descriptor.value;
    // 重写原来的方法
    descriptor.value = function () {
      // 使得方法能够接收任意个参数并传递给旧方法执行
      const args = arguments;
      // 看看成员里面有没有存的私有的对象
      if (oldMethod[notEmptyMetadataKey]) {
        // 检查私有对象的 key
        Object.keys(oldMethod[notEmptyMetadataKey]).forEach(parameterIndex => {
          // 对应索引的参数进行校验
          if (!args[parameterIndex]) {
            throw Error(`方法${target.constructor.name}::${propertyKey}的第${parameterIndex}个参数不能为空字符串`);
          }
        });
      }

      // const params = Object.assign({}, req.body, req.query)；
      //  通过验证执行旧方法
      oldMethod.apply(this, args);
    };
};
