class Container {
  private static injectableClasses: Map<string, any> = new Map();

  static register(key: string, instance: any) {
    if (!Container.injectableClasses.has(key)) {
      Container.injectableClasses.set(key, instance);
    }
  }

  static get(key: string) {
    return Container.injectableClasses.get(key)
  }
}

interface Injection {
  index: number;
  key: string;
}


function WithInjections() {
  return function Injectable<T extends { new(...args: any[]): {} }>(constructor: T): T | void {
    return class extends constructor {
      constructor(...args: any[]) {
        const injections = (constructor as any).injections as Injection[]
        const injectedArgs: any[] = injections.map(({ key }) => {
          return Container.get(key)
        })
        super(...injectedArgs);
      }
    }
  }
}

function Injectable(key: string): Function {
  return function (target: { new(...arg: any): any }): void {
    Container.register(key, new target())
  };
}


function Inject(key: string): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const injection: Injection = { index: parameterIndex, key }
    const existingInjections: Injection[] = (target as any).injections || []
    Object.defineProperty(target, "injections", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: [...existingInjections, injection]
    })
  }
}

@Injectable("MyDep")
class MyDep {
  toString(): string {
    return (777999).toString()
  }
}


@WithInjections()
class MyClass<T> {

  constructor(@Inject("MyDep") private myDep?: T) {}

  test() {
    console.log(this.myDep?.toString());
  }
}

new MyClass<MyDep>().test()
