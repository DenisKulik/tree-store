import {ITreeItem, TreeStore} from "../tree-store";

describe('TreeStore', () => {
    let items: ITreeItem[]

    beforeEach(() => {
        items = items = [
            { id: 1, parent: 'root' },
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },

            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },

            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ]
    })

    it('should return all items', () => {
        const treeStore = new TreeStore(items)
        const allItems = treeStore.getItems()
        expect(allItems).toEqual(items)
    })

    it('should return item by id', () => {
        const treeStore = new TreeStore(items)
        const item = treeStore.getItem(1)
        expect(item).toEqual(items[0])
    })

    it('should return children by id', () => {
        const treeStore = new TreeStore(items)
        const children = treeStore.getChildren(1)
        const expectedChildren = [items[1], items[2]]
        expect(children).toEqual(expectedChildren)
    })

    it('should return empty array if no children', () => {
        const treeStore = new TreeStore(items)
        const children = treeStore.getChildren(8)
        expect(children).toEqual([])
    })

    it('should return all children by id', () => {
        const treeStore = new TreeStore(items)
        const children = treeStore.getAllChildren(4)
        const expectedChildren = [items[6], items[7]]
        expect(children).toEqual(expectedChildren)
    })

    it('should return empty array if no all children', () => {
        const treeStore = new TreeStore(items)
        const children = treeStore.getAllChildren(8)
        expect(children).toEqual([])
    })

    it('should return all parents by id', () => {
        const treeStore = new TreeStore(items)
        const parents = treeStore.getAllParents(4)
        const expectedParents = [items[3], items[1], items[0]]
        expect(parents).toEqual(expectedParents)
    })

    it('should return empty array if no item', () => {
        const treeStore = new TreeStore(items)
        const parents = treeStore.getAllParents(9)
        expect(parents).toEqual([])
    })
})