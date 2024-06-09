export function ExecutionTime() {
    return function (target, property, descriptor) {
        let originMethod = descriptor.value;
        descriptor.value = function (...args) {
            let start = new Date().getTime();
            const result = originMethod.apply(this, args);
            let end = new Date().getTime();
            console.log(`execution time: ${(end - start)}ms`);
            return result;
        };
    };
}
