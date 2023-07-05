# Building a specialized Trie

```pseudo
class TrieNode:
    children: dictionary of (character, TrieNode)
    isEndOfPath: boolean

function insert(root, path):
    node = root
    components = splitPathIntoComponents(path)
    for component in components:
        if component not in node.children:
            node.children[component] = new TrieNode()
        node = node.children[component]
    node.isEndOfPath = true

function search(root, substring):
    node = root
    components = splitSubstringIntoComponents(substring)
    for component in components:
        if component not in node.children:
            return []  # No matching paths
        node = node.children[component]
    return collectPaths(node)

function splitPathIntoComponents(path):
    return split path by '/'

function splitSubstringIntoComponents(substring):
    return split substring by '/'

function collectPaths(node):
    paths = []
    if node.isEndOfPath:
        paths.append(node.path)  # Store the full path associated with the node
    for childNode in node.children.values():
        paths += collectPaths(childNode)
    return paths
```