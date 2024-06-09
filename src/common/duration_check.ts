export function DurationCheck() {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    let originMethod = descriptor.value;
    descriptor.value = async function (...args: any) {
      let start = new Date().getTime();

      const result = await originMethod.apply(this, args);

      let end = new Date().getTime();
      console.log(`execution time: ${(end - start)}ms`);

      return result;
    };
  };
}
