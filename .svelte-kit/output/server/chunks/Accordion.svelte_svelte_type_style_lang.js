import * as THREE from "three";
import { REVISION } from "three";
import { Q as current_component, D as getContext, A as setContext, K as bind_props, C as pop, z as push } from "./index.js";
import { i as get, j as derived, w as writable } from "./exports.js";
import "clsx";
import "mitt";
function fromStore(store) {
  if ("set" in store) {
    return {
      get current() {
        return get(store);
      },
      set current(v) {
        store.set(v);
      }
    };
  }
  return {
    get current() {
      return get(store);
    }
  };
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const signal = Symbol();
const isStore = (dep) => {
  return typeof dep?.subscribe === "function";
};
const runObserve = (dependencies, callback, pre) => {
  const stores = dependencies().map((d) => {
    if (isStore(d)) {
      return fromStore(d);
    }
    return signal;
  });
  dependencies().map((d, i) => {
    if (stores[i] === signal) return d;
    return stores[i].current;
  });
};
const observePost = (dependencies, callback) => {
  return runObserve(dependencies);
};
const observePre = (dependencies, callback) => {
  return runObserve(dependencies);
};
Object.assign(observePost, { pre: observePre });
const isInstanceOf = (obj, type) => {
  return obj?.[`is${type}`] === true;
};
REVISION.replace("dev", "");
const watch = (stores, callback) => {
  const d = derived(stores, (values) => {
    return values;
  });
  let cleanupFn;
  const unsubscribe = d.subscribe(async (values) => {
    if (cleanupFn)
      cleanupFn();
    const fn = await callback(values);
    if (fn)
      cleanupFn = fn;
  });
  onDestroy(() => {
    unsubscribe();
    if (cleanupFn)
      cleanupFn();
  });
};
const currentWritable = (value) => {
  const store = writable(value);
  const extendedWritable = {
    set: (value2) => {
      extendedWritable.current = value2;
      store.set(value2);
    },
    subscribe: store.subscribe,
    update: (fn) => {
      const newValue = fn(extendedWritable.current);
      extendedWritable.current = newValue;
      store.set(newValue);
    },
    current: value
  };
  return extendedWritable;
};
const resolvePropertyPath = (target, propertyPath) => {
  if (propertyPath.includes(".")) {
    const path = propertyPath.split(".");
    const key = path.pop();
    for (let i = 0; i < path.length; i += 1) {
      target = target[path[i]];
    }
    return {
      target,
      key
    };
  } else {
    return {
      target,
      key: propertyPath
    };
  }
};
const useDOM = () => {
  const context = getContext("threlte-dom-context");
  if (!context) {
    throw new Error("useDOM can only be used in a child component to <Canvas>.");
  }
  return context;
};
const useScheduler = () => {
  const context = getContext("threlte-scheduler-context");
  if (!context) {
    throw new Error("useScheduler can only be used in a child component to <Canvas>.");
  }
  return context;
};
const useCamera$1 = () => {
  const context = getContext("threlte-camera-context");
  if (!context) {
    throw new Error("useCamera can only be used in a child component to <Canvas>.");
  }
  return context;
};
const useDisposal = () => {
  const context = getContext("threlte-disposal-context");
  if (!context) {
    throw new Error("useDisposal can only be used in a child component to <Canvas>.");
  }
  return context;
};
const parentContextKey = Symbol("threlte-parent-context");
const createParentContext = (parent) => {
  const ctx = currentWritable(parent);
  setContext(parentContextKey, ctx);
  return ctx;
};
const useParent = () => {
  const parent = getContext(parentContextKey);
  return parent;
};
const parentObject3DContextKey = Symbol("threlte-parent-object3d-context");
const createParentObject3DContext = (object) => {
  const parentObject3D = getContext(parentObject3DContextKey);
  const object3D = writable(object);
  const ctx = derived([object3D, parentObject3D], ([object3D2, parentObject3D2]) => {
    return object3D2 ?? parentObject3D2;
  });
  setContext(parentObject3DContextKey, ctx);
  return object3D;
};
const useParentObject3D = () => {
  return getContext(parentObject3DContextKey);
};
const useScene = () => {
  const context = getContext("threlte-scene-context");
  if (!context) {
    throw new Error("useScene can only be used in a child component to <Canvas>.");
  }
  return context;
};
const useRenderer = () => {
  const context = getContext("threlte-renderer-context");
  if (!context) {
    throw new Error("useRenderer can only be used in a child component to <Canvas>.");
  }
  return context;
};
const useThrelte = () => {
  const schedulerCtx = useScheduler();
  const rendererCtx = useRenderer();
  const cameraCtx = useCamera$1();
  const sceneCtx = useScene();
  const domCtx = useDOM();
  const context = {
    advance: schedulerCtx.advance,
    autoRender: schedulerCtx.autoRender,
    autoRenderTask: rendererCtx.autoRenderTask,
    camera: cameraCtx.camera,
    colorManagementEnabled: rendererCtx.colorManagementEnabled,
    colorSpace: rendererCtx.colorSpace,
    dpr: rendererCtx.dpr,
    invalidate: schedulerCtx.invalidate,
    mainStage: schedulerCtx.mainStage,
    renderer: rendererCtx.renderer,
    renderMode: schedulerCtx.renderMode,
    renderStage: schedulerCtx.renderStage,
    scheduler: schedulerCtx.scheduler,
    shadows: rendererCtx.shadows,
    shouldRender: schedulerCtx.shouldRender,
    dom: domCtx.dom,
    canvas: domCtx.canvas,
    size: domCtx.size,
    toneMapping: rendererCtx.toneMapping,
    get scene() {
      return sceneCtx.scene;
    },
    set scene(scene) {
      sceneCtx.scene = scene;
    }
  };
  return context;
};
const isObject = (ref) => {
  return typeof ref === "object" && ref !== null;
};
const useAttach = () => {
  const { invalidate } = useThrelte();
  let detachFn;
  const attach = writable();
  const parent = useParent();
  const parentObject3D = useParentObject3D();
  const currentRef = createParentContext();
  const object3D = createParentObject3DContext();
  watch([attach, currentRef, parent, parentObject3D], ([attach2, ref, parent2, parentObject3D2]) => {
    detachFn?.();
    detachFn = void 0;
    if (!ref) {
      invalidate();
      return;
    }
    if (attach2 !== void 0) {
      if (attach2) {
        if (typeof attach2 === "function") {
          detachFn = attach2({ ref, parent: parent2, parentObject3D: parentObject3D2 });
        } else if (isInstanceOf(attach2, "Object3D") && isInstanceOf(ref, "Object3D")) {
          detachFn = () => attach2?.remove(ref);
          attach2?.add(ref);
        } else if (typeof attach2 === "string") {
          const { target, key } = resolvePropertyPath(parent2, attach2);
          const valueBeforeAttach = target[key];
          detachFn = () => target[key] = valueBeforeAttach;
          target[key] = ref;
        }
      }
    } else {
      if (isInstanceOf(ref, "Object3D")) {
        detachFn = () => parentObject3D2?.remove(ref);
        parentObject3D2?.add(ref);
      } else if (isObject(parent2)) {
        if (isInstanceOf(ref, "Material")) {
          parent2["material"] = ref;
        } else if (isInstanceOf(ref, "BufferGeometry")) {
          parent2["geometry"] = ref;
        }
      }
    }
    invalidate();
  });
  const updateAttach = (a) => {
    attach.set(a);
  };
  const updateRef = (value) => {
    currentRef.set(value);
    if (isInstanceOf(value, "Object3D")) {
      object3D.set(value);
    }
  };
  onDestroy(() => {
    detachFn?.();
    invalidate();
  });
  return {
    updateRef,
    updateAttach
  };
};
const isPerspectiveOrOrthographicCamera = (value) => {
  return isInstanceOf(value, "PerspectiveCamera") || isInstanceOf(value, "OrthographicCamera");
};
const useCamera = () => {
  const { invalidate, size, camera } = useThrelte();
  const currentRef = writable();
  const manual = writable(true);
  const makeDefault = writable(false);
  watch([currentRef, makeDefault], ([ref, makeDefault2]) => {
    if (!ref || !makeDefault2)
      return;
    camera.set(ref);
    invalidate();
  });
  watch([currentRef, manual, size], ([ref, manual2, size2]) => {
    if (!ref || manual2)
      return;
    if (isInstanceOf(ref, "OrthographicCamera")) {
      ref.left = size2.width / -2;
      ref.right = size2.width / 2;
      ref.top = size2.height / 2;
      ref.bottom = size2.height / -2;
      ref.updateProjectionMatrix();
      ref.updateMatrixWorld();
      invalidate();
    } else if (isInstanceOf(ref, "PerspectiveCamera")) {
      ref.aspect = size2.width / size2.height;
      ref.updateProjectionMatrix();
      ref.updateMatrixWorld();
      invalidate();
    }
  });
  const updateRef = (ref) => {
    if (!isPerspectiveOrOrthographicCamera(ref))
      return;
    currentRef.set(ref);
  };
  const updateManual = (m) => {
    manual.set(m);
  };
  const updateMakeDefault = (d) => {
    makeDefault.set(d);
  };
  return {
    updateRef,
    updateManual,
    updateMakeDefault
  };
};
const useCreateEvent = (oncreate) => {
  let cleanupFunction;
  const updateRef = (newRef) => {
    return;
  };
  onDestroy(() => cleanupFunction?.());
  return {
    updateRef
  };
};
const contextName = Symbol("threlte-disposable-object-context");
const isDisposableObject = (object) => {
  return typeof object?.dispose === "function" && !isInstanceOf(object, "Scene");
};
const useDispose = (dispose) => {
  let previousRef = void 0;
  const currentRef = writable(void 0);
  const localDispose = writable(dispose);
  const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } = useDisposal();
  const parentDispose = getContext(contextName);
  const mergedDispose = derived([localDispose, parentDispose ?? writable(true)], ([localDispose2, parentDispose2]) => localDispose2 ?? parentDispose2 ?? true);
  setContext(contextName, mergedDispose);
  watch([currentRef, mergedDispose], ([ref, mergedDispose2]) => {
    if (ref === previousRef) {
      if (!mergedDispose2) {
        if (previousRef)
          removeObjectFromDisposal(previousRef);
      } else {
        if (previousRef)
          disposableObjectMounted(previousRef);
      }
    } else {
      if (mergedDispose2) {
        if (previousRef)
          disposableObjectUnmounted(previousRef);
        if (ref)
          disposableObjectMounted(ref);
      }
    }
    previousRef = ref;
  });
  onDestroy(() => {
    if (!get(mergedDispose))
      return;
    const ref = get(currentRef);
    if (ref)
      disposableObjectUnmounted(ref);
  });
  const updateRef = (ref) => {
    if (!isDisposableObject(ref))
      return;
    currentRef.set(ref);
  };
  const updateDispose = (dispose2) => {
    localDispose.set(dispose2);
  };
  return {
    updateRef,
    updateDispose
  };
};
let currentIs;
const setIs = (is) => {
  currentIs = is;
};
const useIs = () => {
  const is = currentIs;
  currentIs = void 0;
  return is;
};
const usePlugins = (args) => {
  const pluginContextName = "threlte-plugin-context";
  const plugins = getContext(pluginContextName);
  if (!plugins)
    return;
  const pluginsProps = [];
  const pluginsArray = Object.values(plugins);
  if (pluginsArray.length) {
    const pluginArgs = args();
    for (let i = 0; i < pluginsArray.length; i++) {
      const plugin = pluginsArray[i];
      const p = plugin(pluginArgs);
      if (p && p.pluginProps) {
        pluginsProps.push(...p.pluginProps);
      }
    }
  }
  return {
    pluginsProps
  };
};
const ignoredProps = /* @__PURE__ */ new Set(["$$scope", "$$slots", "type", "args", "attach", "instance"]);
const updateProjectionMatrixKeys = /* @__PURE__ */ new Set([
  "fov",
  "aspect",
  "near",
  "far",
  "left",
  "right",
  "top",
  "bottom",
  "zoom"
]);
const memoizeProp = (value) => {
  if (typeof value === "string")
    return true;
  if (typeof value === "number")
    return true;
  if (typeof value === "boolean")
    return true;
  if (typeof value === "undefined")
    return true;
  if (value === null)
    return true;
  return false;
};
const createSetter = (target, key, value) => {
  if (!Array.isArray(value) && typeof value === "number" && typeof target[key]?.setScalar === "function" && // colors do have a setScalar function, but we don't want to use it, because
  // the hex notation (i.e. 0xff0000) is very popular and matches the number
  // type. So we exclude colors here.
  !target[key]?.isColor) {
    return (target2, key2, value2) => {
      target2[key2].setScalar(value2);
    };
  } else {
    if (typeof target[key]?.set === "function") {
      if (Array.isArray(value)) {
        return (target2, key2, value2) => {
          target2[key2].set(...value2);
        };
      } else {
        return (target2, key2, value2) => {
          target2[key2].set(value2);
        };
      }
    } else {
      return (target2, key2, value2) => {
        target2[key2] = value2;
      };
    }
  }
};
const useProps = () => {
  const { invalidate } = useThrelte();
  const memoizedProps = /* @__PURE__ */ new Map();
  const memoizedSetters = /* @__PURE__ */ new Map();
  const setProp = (instance, propertyPath, value, options) => {
    if (memoizeProp(value)) {
      const memoizedProp = memoizedProps.get(propertyPath);
      if (memoizedProp && memoizedProp.instance === instance && memoizedProp.value === value) {
        return;
      }
      memoizedProps.set(propertyPath, {
        instance,
        value
      });
    }
    const { key, target } = resolvePropertyPath(instance, propertyPath);
    if (value !== void 0 && value !== null) {
      const memoizedSetter = memoizedSetters.get(propertyPath);
      if (memoizedSetter) {
        memoizedSetter(target, key, value);
      } else {
        const setter = createSetter(target, key, value);
        memoizedSetters.set(propertyPath, setter);
        setter(target, key, value);
      }
    } else {
      createSetter(target, key, value)(target, key, value);
    }
    if (options.manualCamera)
      return;
    if (updateProjectionMatrixKeys.has(key) && (target.isPerspectiveCamera || target.isOrthographicCamera)) {
      target.updateProjectionMatrix();
    }
  };
  const updateProp = (instance, key, value, options) => {
    if (!ignoredProps.has(key) && !options.pluginsProps?.includes(key)) {
      setProp(instance, key, value, options);
    }
    invalidate();
  };
  return {
    updateProp
  };
};
const classRegex = /^\s*class\s+/;
const isClass = (input) => {
  if (typeof input !== "function") {
    return false;
  }
  return classRegex.test(input.toString());
};
const argsIsConstructorParameters = (args) => {
  return Array.isArray(args);
};
const determineRef = (is, args) => {
  if (isClass(is)) {
    if (argsIsConstructorParameters(args)) {
      return new is(...args);
    } else {
      return new is();
    }
  }
  return is;
};
function T($$payload, $$props) {
  push();
  let {
    is = useIs(),
    args,
    attach,
    manual = false,
    makeDefault = false,
    dispose,
    ref = void 0,
    oncreate,
    children,
    $$slots,
    $$events,
    ...props
  } = $$props;
  let internalRef = determineRef(is, args);
  useCreateEvent();
  usePlugins(() => ({
    get ref() {
      return internalRef;
    },
    get args() {
      return args;
    },
    get attach() {
      return attach;
    },
    get manual() {
      return manual;
    },
    get makeDefault() {
      return makeDefault;
    },
    get dispose() {
      return dispose;
    },
    get props() {
      return props;
    }
  }));
  useProps();
  Object.keys(props).forEach((key) => {
  });
  useAttach();
  useCamera();
  useDispose(dispose);
  children?.($$payload, { ref: internalRef });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
const catalogue = {};
new Proxy(function() {
}, {
  apply(_target, _thisArg, argArray) {
    return T(...argArray);
  },
  get(_target, is) {
    if (typeof is !== "string") {
      return T;
    }
    const module = catalogue[is] || THREE[is];
    if (module === void 0) {
      throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`);
    }
    setIs(module);
    return T;
  }
});
