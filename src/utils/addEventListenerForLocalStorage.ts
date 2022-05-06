export interface EventProps extends Event {
  [key: string]: any;
}

// 添加两个自定义监听localstorage event的事件，实现监听触发state变更导致react重新渲染组件的目的
export const addEvents = () => {
  const originalSetItem = localStorage.setItem;
  const originalRemoveItem = localStorage.removeItem;
  localStorage.setItem = function (key, newValue) {
    const setItemEvent: EventProps = new Event('setItemEvent');
    setItemEvent[key] = newValue;
    window.dispatchEvent(setItemEvent);
    originalSetItem.apply(this, [key, newValue]);
  };
  localStorage.removeItem = function (key) {
    const removeItemEvent: EventProps = new Event('removeItemEvent');
    removeItemEvent[key] = key;
    window.dispatchEvent(removeItemEvent);
    originalRemoveItem.apply(this, [key]);
  };
};
