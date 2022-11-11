function createElementStub(value) {
    return class StubElement {
        test() {
            return value;
        }
    };
}

const ClassA = createElementStub('A');
const ClassB = createElementStub('B');

console.log(ClassA === ClassB);

const a = new ClassA();
console.log(a.test());

const b = new ClassB();
console.log(b.test());
