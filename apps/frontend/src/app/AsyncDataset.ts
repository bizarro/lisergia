import { Component, type ComponentParameters } from '@lisergia/core'

type ComponentConstructor = new (params?: ComponentParameters) => Component
type ComponentModuleLoader = () => Promise<{ default: unknown }>

export default function createAsyncDataset(loader: ComponentModuleLoader): ComponentConstructor {
  let componentPromise: Promise<ComponentConstructor> | undefined

  const loadComponent = () => {
    componentPromise ??= loader().then(({ default: ComponentClass }) => ComponentClass as ComponentConstructor)

    return componentPromise
  }

  return class AsyncDataset extends Component {
    component?: Component
    destroyed = false

    constructor(params: ComponentParameters = {}) {
      super({
        ...params,
        autoListeners: false,
        autoMount: false,
      })

      this.create()
    }

    create() {
      super.create()

      if (!this.element) return

      void this.mountComponent()
    }

    async mountComponent() {
      const ComponentClass = await loadComponent()

      if (this.destroyed || !this.element?.isConnected) return

      this.component = new ComponentClass({
        application: this.application,
        element: this.element,
      })
    }

    destroy() {
      this.destroyed = true
      this.component?.destroy()
      this.component = undefined

      super.destroy()
    }
  }
}
