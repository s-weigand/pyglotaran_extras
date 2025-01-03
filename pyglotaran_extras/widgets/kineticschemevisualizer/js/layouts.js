const cytoscape = require('cytoscape');
const dagre = require('cytoscape-dagre');

cytoscape.use(dagre);

function getDagreLayoutOptions() {
    var defaults = {
        // dagre algo options, uses default value on undefined
        nodeSep: undefined, // the separation between adjacent nodes in the same rank
        edgeSep: undefined, // the separation between adjacent edges in the same rank
        rankSep: undefined, // the separation between each rank in the layout
        rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right,
        align: undefined,  // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
        acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
                              // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
        ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
        minLen: function(edge) { return 1; }, // number of ranks to keep between the source and target of the edge
        edgeWeight: function(edge) { return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

        // general layout options
        fit: true, // whether to fit to viewport
        padding: 30, // fit padding
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
        animate: false, // whether to transition the node positions
        animateFilter: function(node, i) { return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        transform: function(node, pos) { return pos; }, // a function that applies a transform to the final node position
        ready: function() {}, // on layoutready
        sort: undefined, // a sorting function to order the nodes and edges; e.g. function(a, b) { return a.data('weight') - b.data('weight'); }
                         // because cytoscape dagre creates a directed graph, and directed graphs use the node order as a tie breaker when
                         // defining the topology of a graph, this sort function can help ensure the correct order of the nodes/edges.
                         // this feature is most useful when adding and removing the same nodes and edges multiple times in a graph.
        stop: function() {} // on layoutstop
    };

    return { name: 'dagre', ...defaults };
}

function applyGridLayout(cytoscapeInstance) {
    let options = {
        name: 'grid',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // padding used on fit
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        condense: false, // uses all available space on false, uses minimal space on true
        rows: undefined, // force num of rows in the grid
        cols: undefined, // force num of columns in the grid
        position: function(node) {}, // returns { row, col } for element
        sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function(node, i) { return true; }, // a function that determines whether the node should be animated. All nodes animated by default on animate enabled. Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function(node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
    };

    cytoscapeInstance.layout(options).run();
}

module.exports = {
    getDagreLayoutOptions,
    applyGridLayout,
};