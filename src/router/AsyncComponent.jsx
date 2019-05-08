import React from 'react';

/**
 * 异步加载组件
 * 这个asyncComponent 函数接受一个importComponent 的参数，importComponent 调用时候将动态引入给定的组件。
 * @param importComponent { Promise } 返回一个 promise 的动态引入组件函数
 * @returns {AsyncComponent} 异步包裹完成后的组件
 */
export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
        state = {
            component: null
        }

        constructor(props) {
            super(props)
        }

        // 在componentDidMount 我们只是简单地调用 importComponent 函数，并将动态加载的组件保存在状态中。
        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component
            })
        }

        // 最后，如果完成渲染，我们有条件地提供组件。在这里我们如果不写null的话，也可提供一个菊花图，代表着组件正在渲染。
        render() {
            const Component = this.state.component
            return Component ? <Component {...this.props} /> : null
        }
    }

    return AsyncComponent
}
