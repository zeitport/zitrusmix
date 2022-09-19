import {parseFragment, serialize, defaultTreeAdapter} from 'parse5';

// https://astexplorer.net/#/1CHlCXc4n4
const documentFragment = parseFragment(`
    <div>
        <my-element name="test">Content</my-element>
    </div>
`);

for (const node of traverseNodes(documentFragment)) {
    if (defaultTreeAdapter.isElementNode(node) && node.nodeName.includes('-')) {
        console.log(node);

        node.attrs = [{name: 'name', value: 'test2'}];

        console.log(node);
    }
}

const updatedFragment = serialize(documentFragment);
console.log(updatedFragment);


function* traverseNodes(node) {
    for(const childNode of node.childNodes) {
        yield childNode;

        if (childNode.childNodes) {
            yield* traverseNodes(childNode);
        }
    }
}
