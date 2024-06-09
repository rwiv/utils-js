export function ExecutionTime() {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    let originMethod = descriptor.value;
    descriptor.value = function (...args: any) {
      let start = new Date().getTime();

      const result = originMethod.apply(this, args);

      let end = new Date().getTime();
      console.log(`execution time: ${(end - start)}ms`);

      return result;
    };
  };
}
