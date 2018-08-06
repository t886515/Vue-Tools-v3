/* eslint-disable */

import Sortable from 'sortablejs';
import Vue from 'vue';
import ListEntry from '../components/ToDoEntry';

(function() {
  if (!Array.from) {
    Array.from = function(object) {
      return [].slice.call(object);
    };
  }

  function buildAttribute(object, propName, value) {
    // console.log('inside build attribute...', 'obj:', object, 'propname', propName, 'value', value);
    if (value == undefined) {
      return object;
    }
    object = object == null ? {} : object;
    object[propName] = value;
    return object;
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      const refNode =
        position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(elt => elt.elm).indexOf(element);
    }

    function computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      const elmFromNodes = slots.map(elt => elt.elm);
      const rawIndexes = [...children].map(elt => elmFromNodes.indexOf(elt));
      return isTransition ? rawIndexes.filter(ind => ind !== -1) : rawIndexes;
    }

    function emit(evtName, evtData) {
      // console.log('in emit', evtName, evtData);
      this.$nextTick(() => this.$emit(evtName.toLowerCase(), evtData));
    }

    function delegateAndEmit(evtName) {
      // console.log('in deletgate and emit', evtName);
      return evtData => {
        if (this.realList !== null) {
          this[`onDrag${evtName}`](evtData);
        }
        emit.call(this, evtName, evtData);
      };
    }

    const eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    const eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    const readonlyProperties = ['Move', ...eventsListened, ...eventsToEmit].map(evt => `on${evt}`);
    let draggingElement = null;

    const props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null,
      },
      value: {
        type: Array,
        required: false,
        default: null,
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false,
      },
      clone: {
        type: Function,
        default: original => original,
      },
      element: {
        type: String,
        default: 'span',
      },
      move: {
        type: Function,
        default: null,
      },
      componentData: {
        type: Object,
        required: false,
        default: null,
      },
    };

    const draggableComponent = {
      name: 'draggable',
      components: {
        ListEntry,
      },
      props,
      data() {
        return {
          transitionMode: false,
          noneFunctionalComponentMode: false,
          init: false,
        };
      },

      render(h) {
        const slots = this.$slots.default;
        if (slots && slots.length === 1) {
          // this is apparently only checking for the first item
          // inside of the slot group....
          // and set transition mode to true
          const child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === 'transition-group') {
            this.transitionMode = true;
          }
        }
        let children = slots;

        // if there's a slot called footer... then add footer to the array
        const { footer } = this.$slots;
        if (footer) {
          children = slots ? [...slots, ...footer] : [...footer];
        }

        // setting the attribute..
        let attributes = null;
        const update = (name, value) => {
          console.log(value);
          attributes = buildAttribute(attributes, name, value);
        };

        update('attrs', this.$attrs);
        // console.log(h, 'whats h in render function?', this.element);
        if (this.componentData) {
          const { on, props } = this.componentData;
          update('on', on);
          update('props', props);
        }
        // for h function..
        // TODO seems like this element has to be native
        // html ele. which makes sense...
        return h(this.element, attributes, children);
      },

      mounted() {
        this.noneFunctionalComponentMode =
          this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();

        if (this.noneFunctionalComponentMode && this.transitionMode) {
          throw new Error(
            `Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ${
              this.element
            }`,
          );
        }
        const optionsAdded = {};
        // console.log(eventsListened);
        eventsListened.forEach(elt => {
          optionsAdded[`on${elt}`] = delegateAndEmit.call(this, elt);
        });

        eventsToEmit.forEach(elt => {
          optionsAdded[`on${elt}`] = emit.bind(this, elt);
        });
        // console.log(optionsAdded);

        const options = Object.assign({}, this.options, optionsAdded, {
          onMove: (evt, originalEvent) => this.onDragMove(evt, originalEvent),
        });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },

      beforeDestroy() {
        this._sortable.destroy();
      },

      computed: {
        rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },

        isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },

        realList() {
          return this.list ? this.list : this.value;
        },
      },

      watch: {
        options: {
          handler(newOptionValue) {
            for (const property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },
          deep: true,
        },

        realList() {
          this.computeIndexes();
        },
      },

      methods: {
        getChildrenNodes() {
          if (!this.init) {
            this.noneFunctionalComponentMode =
              this.noneFunctionalComponentMode && this.$children.length == 1;
            this.init = true;
          }

          if (this.noneFunctionalComponentMode) {
            return this.$children[0].$slots.default;
          }
          const rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },

        computeIndexes() {
          this.$nextTick(() => {
            this.visibleIndexes = computeIndexes(
              this.getChildrenNodes(),
              this.rootContainer.children,
              this.transitionMode,
            );
          });
        },

        getUnderlyingVm(htmlElt) {
          const index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            // Edge case during move callback: related element might be
            // an element different from collection
            return null;
          }
          const element = this.realList[index];
          return { index, element };
        },

        getUnderlyingPotencialDraggableComponent({ __vue__ }) {
          if (
            !__vue__ ||
            !__vue__.$options ||
            __vue__.$options._componentTag !== 'transition-group'
          ) {
            return __vue__;
          }
          return __vue__.$parent;
        },

        emitChanges(evt) {
          this.$nextTick(() => {
            this.$emit('change', evt);
          });
        },

        alterList(onList) {
          if (this.list) {
            onList(this.list);
          } else {
            const newList = [...this.value];
            onList(newList);
            this.$emit('input', newList);
          }
        },

        spliceList() {
          const spliceList = list => list.splice(...arguments);
          this.alterList(spliceList);
        },

        updatePosition(oldIndex, newIndex) {
          const updatePosition = list => list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          this.alterList(updatePosition);
        },

        getRelatedContextFromMoveEvent({ to, related }) {
          const component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component };
          }
          const list = component.realList;
          const context = { list, component };
          if (to !== related && list && component.getUnderlyingVm) {
            const destination = component.getUnderlyingVm(related);
            if (destination) {
              return Object.assign(destination, context);
            }
          }

          return context;
        },

        getVmIndex(domIndex) {
          const indexes = this.visibleIndexes;
          const numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },

        getComponent() {
          return this.$slots.default[0].componentInstance;
        },

        resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          const nodes = this.getChildrenNodes();
          nodes[index].data = null;
          const transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },

        onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },

        onDragAdd(evt) {
          console.log(evt);
          const element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          const newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          // const attributes = Object.values(evt.item.attributes).reduce((acc, attr) => {
          //   console.log(acc, attr);
          //   const x = { ...acc, ...attr };
          //   return x;
          // }, {});
          const { attributes } = evt.item;
          console.log(attributes);
          const attrs = Object.values(attributes).map(attr => {
            return {};
            console.log(attr.nodeValue, '===');
          });
          const added = { element, newIndex, attributes };
          this.emitChanges({ added });
        },

        onDragRemove(evt) {
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          const oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          const removed = { element: this.context.element, oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed });
        },

        onDragUpdate(evt) {
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          const oldIndex = this.context.index;
          const newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          const moved = { element: this.context.element, oldIndex, newIndex };
          this.emitChanges({ moved });
        },

        computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          const domChildren = [...evt.to.children].filter(el => el.style.display !== 'none');
          const currentDOMIndex = domChildren.indexOf(evt.related);
          const currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          const draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },

        onDragMove(evt, originalEvent) {
          const onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }
          const relatedContext = this.getRelatedContextFromMoveEvent(evt);
          const draggedContext = this.context;
          const futureIndex = this.computeFutureIndex(relatedContext, evt);
          Object.assign(draggedContext, { futureIndex });
          Object.assign(evt, { relatedContext, draggedContext });
          return onMove(evt, originalEvent);
        },

        onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        },
      },
    };
    return draggableComponent;
  }

  const draggable = buildDraggable(Sortable);
  Vue.component('draggable', draggable);
})();
