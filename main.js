"use strict";
//Grundgerüst Binary Search Tree
class TreeNode {
    constructor(val) {
        this.left = null;
        this.right = null;
        this.value = val;
    }
}
class Tree {
    constructor() {
        this.root = null;
    }
    //build a tree only with numbers
    buildTree(data, start = 0, end = data.length - 1) {
        if (start > end)
            return null;
        //sort array
        data.sort((a, b) => a - b);
        //create new node with mid value from array
        let mid = Math.floor((start + end) / 2);
        let node = new TreeNode(data[mid]);
        //recursive function call with right and left side
        node.left = this.buildTree(data, start, mid - 1);
        node.right = this.buildTree(data, mid + 1, end);
        return (this.root = node);
    }
    //find rekursiv
    findRec(val) {
        var _a;
        const search = (node, value) => {
            var _a;
            if (node === null)
                return;
            if (node.value === value)
                return node;
            return (_a = search(node.left, value)) !== null && _a !== void 0 ? _a : search(node.right, value);
        };
        return (_a = search(this.root, val)) !== null && _a !== void 0 ? _a : -1; //gibt entweder value oder -1 aus als Wert
    }
    //find methode
    find(val) {
        let current = this.root; //root ist der Knotenpunkt
        while (current) {
            if (val === current.value)
                return current;
            if (val < current.value) { //links
                current = current.left;
            }
            else {
                current = current.right; //rechts
            }
        }
        return -1; //if (val!===current.value) return -1;
    }
    //insert rekursiv
    insertRec(val) {
        var _a;
        const check = (node) => {
            var _a, _b;
            if (node.value === val)
                return;
            if (node.value > val) { //left hand side as assignement
                check((node.left = (_a = node.left) !== null && _a !== void 0 ? _a : new TreeNode(val)));
            }
            if (node.value < val) {
                check((node.right = (_b = node.right) !== null && _b !== void 0 ? _b : new TreeNode(val)));
            }
        };
        check((this.root = (_a = this.root) !== null && _a !== void 0 ? _a : new TreeNode(val)));
    }
    //insert method
    insert(val) {
        const newNode = new TreeNode(val);
        if (!this.root)
            return (this.root = newNode);
        let current = this.root;
        while (true) {
            if (val === current.value)
                return;
            if (val < current.value) { //links
                if (!current.left) {
                    return (current.left = newNode);
                }
                current = current.left;
            }
            if (val > current.value) { //rechts
                if (!current.right) {
                    return (current.right = newNode);
                }
                current = current.right;
            }
        }
    }
    //Breitensuche
    breadthFirst() {
        let node = this.root;
        //queue FiFo
        const queue = [];
        const visited = [];
        queue.push(node);
        while (queue.length) {
            //holt ersten Knoten mit shift
            node = queue.shift();
            //pusht ins array visited
            visited.push(node.value);
            //holt Werte von links und von rechts und wird in visited gepusht bis queue leer ist
            if (node.left)
                queue.push(node.left);
            if (node.right)
                queue.push(node.right);
        }
        return visited;
    }
    //Tiefensuche preOrder von links nach rechts von Knotenpunkt weg
    preOrder() {
        const list = []; //array
        const helper = (node, value) => {
            list.push(node.value); //pusht value in array
            //links knoten pusht ins array
            if (node.left)
                helper(node.left);
            //rechts knoten pusht ins array
            if (node.right)
                helper(node.right);
        };
        helper(this.root); //ruft helperfunktion auf
        return list;
    }
    //Tiefensuche postOrder zuerst links, dann rechts, dann mitte
    postOrder() {
        const list = []; //array
        const helper = (node, value) => {
            //links knoten pusht ins array
            if (node.left)
                helper(node.left);
            //rechts knoten pusht ins array
            if (node.right)
                helper(node.right);
            //pusht value in array
            list.push(node.value);
        };
        helper(this.root); //ruft helperfunktion auf
        return list;
    }
    //Tiefensuche inOrder zuerst links, dann root, dann rechts
    inOrder() {
        const list = []; //array
        const helper = (node, value) => {
            //links knoten pusht ins array
            if (node.left)
                helper(node.left);
            list.push(node.value); //pusht value in array
            //rechts knoten pusht ins array
            if (node.right)
                helper(node.right);
        };
        helper(this.root); //ruft helperfunktion auf
        return list;
    }
    //Höhensuche von unten nach oben
    mHeight(node) {
        if (node === null)
            return -1;
        else {
            let lHeight = this.mHeight(node.left);
            let rHeight = this.mHeight(node.right);
            if (lHeight > rHeight)
                return (lHeight + 1);
            else {
                return (rHeight + 1);
            }
        }
    }
}
//output
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if ((node === null || node === void 0 ? void 0 : node.right) !== null) {
        prettyPrint(node === null || node === void 0 ? void 0 : node.right, `${prefix}${isLeft ? "│ " : " "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if ((node === null || node === void 0 ? void 0 : node.left) !== null) {
        prettyPrint(node === null || node === void 0 ? void 0 : node.left, `${prefix}${isLeft ? " " : "│ "}`, true);
    }
};
const data = [1, 2, 10, 5, 6, 11, 8, 9, 4];
const tree = new Tree();
tree.buildTree(data);
//tree.insert(12);
//tree.insertRec(12);
//const result = tree.find(10);
//console.log(result);
//const resultRec = tree.findRec(25);
//console.log(resultRec);
//console.log(tree.breadthFirst());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
console.log(tree.mHeight(tree.root));
prettyPrint(tree.root);
//# sourceMappingURL=main.js.map