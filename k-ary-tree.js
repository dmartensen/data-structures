/**
*   Author: Dan Martensen
*
*   Simple example of k-ary tree with insertChild(), insertSibling(),
*   and removeChild() operations, along with set and remove parent
*   references if needed.
*
*
*   Each operation does a Breadth First Search thru the tree iteratively
*   with O(n) time complcompletedy.
*
*   Could easily be integrated into the Model layer of a UI, allowing 
*   click events to call these functions which act on the tree data structure.  
*   Each node has a data property and array of children nodes.  This could 
*   be scaled to more properties, based on UI needs such as image paths, urls, 
*   numbers, and more.
*/
(function() {

    /**
    *   Root node in tree with data and children array properties.
    */
    var _rootNode = {
        data: '',
        children: []
    };

    /**
    *   @function addSiblingNode()
    *
    *   @description 
    *   Inserts new node as sibling to target node. 
    *
    *   Private function does BFS thru tree structure using a queue.  For each
    *   node's child checks if target node matches node's child references.
    *   If so, the node is parent so insert in the node via splice().
    *
    *   This ensures the sibling is added immediately following the node (target) 
    *   that invoked the operation.  
    *
    *   @param target - node that invoked the operation (e.g Button click event)
    *   @returns completed - boolean indicates if operation was successful.
    */
    function addSiblingNode(target) {
        var queue = [], completed = false, node = null, i;

        queue.push(_rootNode);

        //  Breadth first search with early exit
        while(queue.length !== 0 && completed === false) {
            node = queue.shift();

            for(i = 0; i < node.children.length && completed === false; i++) {

                // node's child matches target, meaning
                if(node.children[i] === target) {

                    node.children.splice(i + 1, 0,
                        {
                            data: '',
                            parent: node,
                            children: []
                        }
                    );

                    completed = true;
                } else {
                    queue.push(node.children[i]);
                }
            }
        }

        return completed;
    }

    /**
    *   @function addChildNode()
    *
    *   @description 
    *   Inserts a new node as target node's child.
    *
    *   Private function does BFS thru tree structure using a queue.  For each
    *   node's child checks if target's node matches node's reference.
    *   If so, the node is target so insert in the node into it's child array 
    *   via push().  Returns true
    *
    *   @param target - node that invoked the operation (e.g Button click event)
    *   @returns completed - boolean indicates if operation was successful.
    */
    function addChildNode(target) {
        var queue = [],
            completed = false, node = null, i;

        queue.push(_rootNode);

        //  Breadth first search with early exit
        while(queue.length !== 0 && completed === false) {
            node = queue.shift();

            if(node.data === target.data) {
                node.children.push(
                    {
                        data: '',
                        parent: node,
                        children: []
                    }
                );
                completed = true;
            } else {
                for(i = 0 ; i < node.children.length && completed === false; i++) {
                    queue.push(node.children[i]);
                }
            }
        }

        return completed;
    }

    /**
    *   @function removeNode()
    *
    *   @description 
    *   Removes target node from tree. 
    *
    *   Private function first checks that node isn't last node.
 
    *   Then does BFS thru tree structure using a queue.  For each
    *   node's child checks if target node matches node's child references.
    *   If so, the node is parent so remove the node via splice().
    *
    *   @param target - node that invoked the operation (e.g Button click event)
    *   @returns completed - boolean indicates if operation was successful.
    */
    function removeNode(target) {
        var queue = [],
            completed = false, node = null, i;

        if(_rootNode.children.length !== 0) {

            queue.push(_rootNode);

            //  Breadth first search with early exit
            while(queue.length !== 0 && completed === false) {
                node = queue.shift();

                for(i = 0; i < node.children.length && completed === false; i++) {

                    if(node.children[i] === target) {
                        node.children.splice(i, 1);
                        completed = true;
                    } else {
                        queue.push(node.children[i]);
                    }
                }
            }
        }

        return completed;
    }


    /**
    *   Sets parent references in tree data structure after JSON loads.
    */
    function setParentReferences() {
        var queue = [], node = null, i;

        queue.push(_rootNode);

        //  Breadth first search with early exit
        while(queue.length !== 0) {
            node = queue.shift();

            for(i = 0 ; i < node.children.length; i++) {

                // sets childs reference to parent
                node.children[i].parent = node;

                queue.push(node.children[i]);
            }

        }
        return true;
    }

    /**
    *   Removes parent references in tree structure for JSON encoding.
    */
    function removeParentReferences() {
         var queue = [], node = null, i;

        queue.push(_rootNode);

        //  Breadth first search with early exit
        while(queue.length !== 0) {
            node = queue.shift();

            for(i = 0 ;i < node.children.length; i++) {

                // removes childs reference to parent
                delete node.children[i].parent;

                queue.push(node.children[i]);
            }
        }
        return true;
    }


})();
