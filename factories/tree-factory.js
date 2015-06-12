
/**
*   Author: Dan Martensen
*
*   A K-ary tree has n-children per node and n-levels.  Functions provided are
*   insertChild(), insertSibling(), and removeChild() operations, along with
*   set and remove parent references if needed.
*
*   Each operation does a Breadth First Search thru the tree iteratively
*   with O(n) time complexity.
*
*   Could easily be integrated into an Angular Model layer of a UI, enabling 
*   click events to call these functions which act on the tree data structure.  
*   Each node has a data property and array of children nodes.  This could 
*   be scaled to more properties, based on UI needs such as image paths, urls, 
*   numbers, and more.
*/
angular.module('selection').factory('TreeFactory',
    function() {
        'use strict';

        /**
        *   @function Node
        *
        *   Single node is created thru a factory function instead instance
        *   object so it's less vulnerable to instance (this) manipulations.
        *
        *   @param {string} data - data value to be stored in node
        *   @param {Object} parent - reference to parent node
        *   @param {Array} children - list of child nodes
        *   @returns {Object} node - new node with data, parent, and children 
        *                   properties or null if parameters don't meet type checking
        */
        function Node(data, parent, children) {
            var node = null;

            // type check parameters
            if(Object.prototype.toString.call(data) === '[object String]' &&
                parent instanceof Object &&
                Array.isArray(children)) {

                node = {
                    data: data,
                    parent: parent,
                    children: children
                };

            } else {
                console.log('Invalid data');
            }

            return node;
        }

        /**
        *   Defines private root node in tree with empty properties. It's the
        *   one exception from Node nodes because root nodes don't
        *   have parent references.
        */
        var _rootNode = {
            data: '',
            parent: null,
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
        *   @param {Object} target - node that invoked the operation (e.g Button click event)
        *   @returns {boolean} completed - boolean indicates if operation was successful.
        */
        function insertSiblingNode(target) {
            var queue = [], completed = false, node = null, i;

            queue.push(_rootNode);

            //  Breadth first search with early exit
            while(queue.length !== 0 && completed === false) {
                node = queue.shift();

                for(i = 0; i < node.children.length && completed === false; i++) {

                    // node's child matches target, meaning
                    if(node.children[i] === target) {

                        node.children.splice(i + 1, 0, Node('', node, []));

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
        *   @param {Object} target - node that invoked the operation (e.g Button click event)
        *   @returns {boolean} completed - boolean indicates if operation was successful.
        */
        function insertChildNode(target) {
            var queue = [], completed = false, node = null, i;

            queue.push(_rootNode);

            //  Breadth first search with early exit
            while(queue.length !== 0 && completed === false) {
                node = queue.shift();

                if(node === target) {
                    node.children.push(Node('', node, []));
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
        *   @param {Object} target - node that invoked the operation (e.g Button click event)
        *   @returns {boolean} completed - boolean indicates if operation was successful.
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
        *
        *   @param root - root of tree
        */
        function setParentReferences(root) {
            var queue = [], node = null, i;

            queue.push(root);

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
        *
        *   @param root - root of tree
        */
        function removeParentReferences(root) {
            var queue = [], node = null, i;

            queue.push(root);

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

        /**
        *   JavaScript API providing get and set functions via
        *   object literal.
        */
        return {
            setParentReferences: function() {
                return setParentReferences();
            },
            removeParentReferences: function() {
                return removeParentReferences();
            },
            insertChild: function(node) {
                return insertChildNode(node);
            },
            insertSibling: function(node) {
                return insertSiblingNode(node);
            },
            remove: function(node) {
                return removeNode(node);
            }
        };

    }

);
