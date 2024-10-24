export interface ITreeItem {
    id: Key
    parent: Key
    type?: string | null
}

type Key = number | string

export class TreeStore {
    private readonly items: ITreeItem[]
    private itemMap: Map<Key, ITreeItem>
    private childrenMap: Map<Key, ITreeItem[]>

    constructor(items: ITreeItem[]) {
        this.items = items
        this.itemMap = new Map()
        this.childrenMap = new Map()
        this.prepareData()
    }

    private prepareData() {
        for (const item of this.items) {
            this.itemMap.set(item.id, item)

            if (!this.childrenMap.has(item.parent)) {
                this.childrenMap.set(item.parent, [])
            }

            this.childrenMap.get(item.parent)!.push(item)
        }
    }

    public getItems(): ITreeItem[] {
        return this.items
    }

    public getItem(id: Key): ITreeItem | undefined {
        return this.itemMap.get(id)
    }

    public getChildren(id: Key): ITreeItem[] {
        return this.childrenMap.get(id) || []
    }

    public getAllChildren(id: Key): ITreeItem[] {
        let allChildrenList: ITreeItem[] = []

        const findChildrenRecursive = (id: Key) => {
            const children: ITreeItem[] = this.getChildren(id)
            allChildrenList = [...allChildrenList, ...children]
            children.forEach(child => {
                findChildrenRecursive(child.id)
            })
        }

        findChildrenRecursive(id)

        return allChildrenList
    }

    public getAllParents(id: Key): ITreeItem[] {
        let allParentsList: ITreeItem[] = []

        const item = this.getItem(id)
        if (!item) return allParentsList
        allParentsList.push(item)

        const findParentRecursive = (id: Key) => {
            const currentItem = this.getItem(id)

            if (currentItem && currentItem.parent !== 'root') {
                const parentItem = this.getItem(currentItem.parent)

                if (parentItem) {
                    allParentsList.push(parentItem)
                    findParentRecursive(parentItem.id)
                }
            }
        }

        findParentRecursive(id)

        return allParentsList
    }
}