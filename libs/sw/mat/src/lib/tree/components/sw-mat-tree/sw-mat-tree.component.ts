import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SwMatFlatItemNode } from '../../models/sw-mat-flat-item-node';
import { SwMatItemNode } from '../../models/sw-mat-item-node';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'libs-tree',
  templateUrl: './sw-mat-tree.component.html',
  styleUrls: ['./sw-mat-tree.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwMatTreeComponent,
      multi: true,
    }
  ]
})
export class SwMatTreeComponent implements OnInit, ControlValueAccessor {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<SwMatFlatItemNode, SwMatItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<SwMatItemNode, SwMatFlatItemNode>();

  treeControl: FlatTreeControl<SwMatFlatItemNode>;

  treeFlattener: MatTreeFlattener<SwMatItemNode, SwMatFlatItemNode>;

  dataSource: MatTreeFlatDataSource<SwMatItemNode, SwMatFlatItemNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<number>(true /* multiple */);

  onChange: (value: Array<number>) => void;

  onTouched: () => {};

  @Input() data: Array<SwMatItemNode> = [];

  @Input() isExpandAll = false;

  @Input() isParentDisplayCheckbox = false;

  @Input() isIncludeParent = false;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<SwMatFlatItemNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.dataSource.data = this.data;
    if (this.isExpandAll) {
      this.treeControl.expandAll();
    }
  }

  getLevel = (node: SwMatFlatItemNode) => node.level;

  isExpandable = (node: SwMatFlatItemNode) => node.expandable;

  getChildren = (node: SwMatItemNode): SwMatItemNode[] => node.children;

  hasChild = (_: number, _nodeData: SwMatFlatItemNode) => _nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: SwMatItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new SwMatFlatItemNode();
    flatNode.id = node.id;
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: SwMatFlatItemNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child.id));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: SwMatFlatItemNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child.id));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  itemSelectionToggle(node: SwMatFlatItemNode): void {
    this.checklistSelection.toggle(node.id);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node.id)
      ? this.checklistSelection.select(...descendants.map(item => item.id))
      : this.checklistSelection.deselect(...descendants.map(item => item.id));

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child.id)
    );

    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  leafItemSelectionToggle(node: SwMatFlatItemNode): void {
    this.checklistSelection.toggle(node.id);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: SwMatFlatItemNode): void {
    let parent: SwMatFlatItemNode | null = this.getParentNode(node);
    while (parent) {
      if (this.isIncludeParent) {
        this.checkRootNodeSelection(parent);
      }
      parent = this.getParentNode(parent);
    }
    this.onChange(this.checklistSelection.selected);
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: SwMatFlatItemNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node.id);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.id)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node.id);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node.id);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: SwMatFlatItemNode): SwMatFlatItemNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  registerOnChange(fn: (value: Array<number>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(menuIds: Array<number> = []): void {
    if (menuIds) {
      menuIds.forEach(id => this.checklistSelection.select(id));
    }
  }
}
