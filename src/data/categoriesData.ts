
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: CategoryItem[];
}

export const categoriesData: Category[] = [
  {
    id: 'linear',
    name: 'Linear Data Structures',
    description: 'Linear data structures arrange elements in a sequential manner where each element is attached to its previous and next adjacent elements.',
    items: [
      {
        id: 'array',
        name: 'Array',
        description: 'A collection of elements identified by index or key',
        path: '/visualizer/array',
        icon: '📊'
      },
      {
        id: 'linked-list',
        name: 'Linked List',
        description: 'Linear collection of elements where each points to the next',
        path: '/visualizer/linked-list',
        icon: '🔗'
      },
      {
        id: 'stack',
        name: 'Stack',
        description: 'LIFO (Last In First Out) data structure',
        path: '/visualizer/stack',
        icon: '📚'
      },
      {
        id: 'queue',
        name: 'Queue',
        description: 'FIFO (First In First Out) data structure',
        path: '/visualizer/queue',
        icon: '🧵'
      }
    ]
  },
  {
    id: 'trees',
    name: 'Tree-Based Structures',
    description: 'Hierarchical data structures with a root value and subtrees of children, represented as a set of linked nodes.',
    items: [
      {
        id: 'binary-tree',
        name: 'Binary Tree',
        description: 'Tree where each node has at most two child nodes',
        path: '/visualizer/binary-tree',
        icon: '🌳'
      },
      {
        id: 'bst',
        name: 'Binary Search Tree',
        description: 'Binary tree with ordered nodes for efficient search',
        path: '/visualizer/bst',
        icon: '🔍'
      },
      {
        id: 'avl',
        name: 'AVL Tree',
        description: 'Self-balancing binary search tree',
        path: '/visualizer/avl',
        icon: '⚖️'
      },
      {
        id: 'heap',
        name: 'Heap',
        description: 'Complete binary tree where parent is ordered with respect to children',
        path: '/visualizer/heap',
        icon: '🏔️'
      }
    ]
  },
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    description: 'Algorithms that put elements of a list in a certain order, typically in numerical or lexicographical order.',
    items: [
      {
        id: 'bubble-sort',
        name: 'Bubble Sort',
        description: 'Simple sorting algorithm that repeatedly steps through the list',
        path: '/visualizer/bubble-sort',
        icon: '🫧'
      },
      {
        id: 'quick-sort',
        name: 'Quick Sort',
        description: 'Efficient divide-and-conquer algorithm',
        path: '/visualizer/quick-sort',
        icon: '⚡'
      },
      {
        id: 'merge-sort',
        name: 'Merge Sort',
        description: 'Efficient, stable, divide-and-conquer algorithm',
        path: '/visualizer/merge-sort',
        icon: '🔄'
      },
      {
        id: 'insertion-sort',
        name: 'Insertion Sort',
        description: 'Simple sorting algorithm that builds the final sorted array one item at a time',
        path: '/visualizer/insertion-sort',
        icon: '📥'
      }
    ]
  },
  {
    id: 'searching',
    name: 'Searching Algorithms',
    description: 'Algorithms that retrieve information stored within a data structure.',
    items: [
      {
        id: 'linear-search',
        name: 'Linear Search',
        description: 'Sequential search algorithm that starts from one end and checks every element',
        path: '/visualizer/linear-search',
        icon: '📶'
      },
      {
        id: 'binary-search',
        name: 'Binary Search',
        description: 'Efficient search algorithm that works on sorted arrays',
        path: '/visualizer/binary-search',
        icon: '🔍'
      },
      {
        id: 'dfs',
        name: 'Depth First Search',
        description: 'Algorithm for traversing or searching tree or graph data structures',
        path: '/visualizer/dfs',
        icon: '🔎'
      },
      {
        id: 'bfs',
        name: 'Breadth First Search',
        description: 'Algorithm for traversing or searching tree or graph data structures',
        path: '/visualizer/bfs',
        icon: '🔬'
      }
    ]
  },
  {
    id: 'graph',
    name: 'Graph Algorithms',
    description: 'Algorithms that solve problems represented in graph form, with vertices and edges.',
    items: [
      {
        id: 'dijkstra',
        name: 'Dijkstra\'s Algorithm',
        description: 'Algorithm for finding the shortest paths between nodes in a graph',
        path: '/visualizer/dijkstra',
        icon: '🛣️'
      },
      {
        id: 'bellman-ford',
        name: 'Bellman-Ford Algorithm',
        description: 'Algorithm for finding the shortest paths from a single source vertex',
        path: '/visualizer/bellman-ford',
        icon: '🚏'
      },
      {
        id: 'kruskal',
        name: 'Kruskal\'s Algorithm',
        description: 'Algorithm for finding the minimum spanning tree',
        path: '/visualizer/kruskal',
        icon: '🌐'
      },
      {
        id: 'prim',
        name: 'Prim\'s Algorithm',
        description: 'Algorithm for finding the minimum spanning tree',
        path: '/visualizer/prim',
        icon: '🕸️'
      }
    ]
  },
  {
    id: 'hash',
    name: 'Hash-Based Structures',
    description: 'Data structures that use a hash function to map identifying values to their data values.',
    items: [
      {
        id: 'hash-table',
        name: 'Hash Table',
        description: 'Data structure that implements an associative array',
        path: '/visualizer/hash-table',
        icon: '🗃️'
      },
      {
        id: 'hash-map',
        name: 'Hash Map',
        description: 'Implementation of the Map interface that uses a hash table',
        path: '/visualizer/hash-map',
        icon: '🗺️'
      },
      {
        id: 'hash-set',
        name: 'Hash Set',
        description: 'Implementation of the Set interface backed by a hash table',
        path: '/visualizer/hash-set',
        icon: '🧩'
      }
    ]
  }
];

export const getAllItems = (): CategoryItem[] => {
  return categoriesData.flatMap(category => category.items);
};

export const getItemById = (id: string): CategoryItem | undefined => {
  return getAllItems().find(item => item.id === id);
};
