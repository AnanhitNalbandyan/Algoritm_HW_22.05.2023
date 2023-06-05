//1 уровень сложности: Изучит код и написать к каждой строчке комментарий - 
//что эта строчка делает. Если строчка непонятна отметьте это в комментариях 

//! создаем класс узела дерева
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

//! создаем класс дерева
class AVLTree {
    constructor() {
        this.root = null;
    }

//!метод возвращает высоту заданного узла в дереве AVL
getHeight(node) {
    if (node === null) {    //!eсли узел равен null,
        return 0;          //!он возвращает 0
    }
    return node.height;
}

//!метод вычисляет коэффициент баланса данного узла,
getBalanceFactor(node) {
    if (node === null) { //!eсли узел равен null,
        return 0;          //!он возвращает 0
    }
    return this.getHeight(node.left) - this.getHeight(node.right);//!возвращает разницу между высотами его левого и правого поддеревьев.
}
//!метод обновляет высоту заданного узла, вычисляя максимальную высоту 
//!между его левым и правым поддеревьями и добавляя 1.
updateHeight(node) {
    if (node === null) {
        return;
    }
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
}
//!//!метод обновляет высоту заданного узла, 
//!вычисляя максимальную высоту между его левым и правым поддеревьями и добавляя 1.
rotateLeft(z) {
    const y = z.right;
    const T2 = y.left;

    y.left = z;
    z.right = T2;

    this.updateHeight(z);
    this.updateHeight(y);

    return y;
}
//!метод выполняет правильное вращение на данном узле, чтобы сбалансировать дерево AVL. 
//!Он возвращает новый корень повернутого поддерева.z
rotateRight(z) {
    const y = z.left;//!не понятно
    const T3 = y.right;//!не понятно

    y.right = z;//!не понятно
    z.left = T3;//!не понятно

    this.updateHeight(z);//!не понятно
    this.updateHeight(y);//!не понятно

    return y;
}

//!метод вставляет новый узел с заданным значением в дерево AVL, 
//!вызывая метод.insertNode
insert(value) {
    this.root = this.insertNode(this.root, value);
}

//!метод рекурсивно вставляет новый узел с заданным значением в дерево AVL, начиная с указанного корня. 
//!Он выполняет необходимые вращения для поддержания равновесия дерева.
insertNode(root, value) {
    if (root === null) {
        return new Node(value);
    }

    if (value < root.value) {
        root.left = this.insertNode(root.left, value);
    } else if (value > root.value) {
        root.right = this.insertNode(root.right, value);
    } else {
        return root;
    }

    this.updateHeight(root);

    const balanceFactor = this.getBalanceFactor(root);

    if (balanceFactor > 1) {
        if (value < root.left.value) {
            return this.rotateRight(root);
        } else if (value > root.left.value) {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }
    }

    if (balanceFactor < -1) {
        if (value > root.right.value) {
            return this.rotateLeft(root);
        } else if (value < root.right.value) {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }
    }

    return root;
}

//!метод удаляет узел с заданным значением из дерева AVL путем вызова метода.deleteNode
delete(value) {
    this.root = this.deleteNode(this.root, value);
}

//!метод рекурсивно удаляет узел с заданным значением из дерева AVL, начиная с указанного корня. 
//!Он выполняет необходимые вращения для поддержания равновесия дерева.
deleteNode(root, value) {
    if (root === null) {
        return null;
    }

    if (value < root.value) {
        root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
        root.right = this.deleteNode(root.right, value);
    } else {
        if (root.left === null && root.right === null) {
            return null;
        } else if (root.left === null || root.right === null) {
            root = root.left || root.right;
        } else {
            const minValue = this.findMinValue(root.right);
            root.value = minValue;
            root.right = this.deleteNode(root.right, minValue);
        }
    }

    this.updateHeight(root);

    const balanceFactor = this.getBalanceFactor(root);

    if (balanceFactor > 1) {
        if (this.getBalanceFactor(root.left) >= 0) {
            return this.rotateRight(root);
        } else {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }
    }

    if (balanceFactor < -1) {
        if (this.getBalanceFactor(root.right) <= 0) {
            return this.rotateLeft(root);
        } else {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }
    }

    return root;
}

//!Этот метод находит и 
//!возвращает минимальное значение в поддереве, укорененном в данном узле.
findMinValue(node) {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current.value;
}

//! метод ищет узел с заданным значением в дереве AVL, вызывая метод.searchNode
search(value) {
    return this.searchNode(this.root, value);
}

//! метод рекурсивно ищет узел с заданным значением, 
//!начинающимся с указанного корня.
searchNode(root, value) {
    if (root === null || root.value === value) {
        return root;
    }

    if (value < root.value) {
        return this.searchNode(root.left, value);
    }

    return this.searchNode(root.right, value);
}

//!метод выполняет обход дерева AVL по порядку 
//!и вызывает указанную функцию обратного вызова для каждого узла в дереве.
inOrderTraversal(callback) {
    this.inOrderTraversalNode(this.root, callback);
}

//! метод рекурсивно выполняет обход по порядку поддерева, укорененного в данном узле, 
//!и вызывает указанную функцию обратного вызова для каждого узла.
inOrderTraversalNode(node, callback) {
    if (node !== null) {
        this.inOrderTraversalNode(node.left, callback);
        callback(node.value);
        this.inOrderTraversalNode(node.right, callback);
    }
}

//!метод выполняет обход дерева AVL до заказа 
//!и вызывает указанную функцию обратного вызова для каждого узла в дереве.
preOrderTraversal(callback) {
    this.preOrderTraversalNode(this.root, callback);
}

//!метод рекурсивно выполняет обход поддерева, укорененного в данном узле, 
//!и вызывает указанную функцию обратного вызова для каждого узла.
preOrderTraversalNode(node, callback) {
    if (node !== null) {
        callback(node.value);
        this.preOrderTraversalNode(node.left, callback);
        this.preOrderTraversalNode(node.right, callback);
    }
}

postOrderTraversal(callback) {
    this.postOrderTraversalNode(this.root, callback);
}

postOrderTraversalNode(node, callback) {
    if (node !== null) {
        this.postOrderTraversalNode(node.left, callback);
        this.postOrderTraversalNode(node.right, callback);
        callback(node.value);
    }
}

}

