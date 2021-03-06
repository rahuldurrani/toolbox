import {Component} from 'react';
import {HoistComponent} from '@xh/hoist/core';
import {vframe} from '@xh/hoist/cmp/layout';
import {page} from '@xh/hoist/mobile/cmp/page';
import {appBar} from '@xh/hoist/mobile/cmp/header';
import {navigator} from '@xh/hoist/mobile/cmp/navigator';

import './App.scss';

@HoistComponent
export class App extends Component {

    render() {
        const {appMenuModel, navigatorModel} = this.model;
        return vframe(
            page({
                renderToolbar: () => appBar({
                    appMenuModel,
                    navigatorModel,
                    hideRefreshButton: true
                }),
                item: navigator({model: navigatorModel})
            })
        );
    }
}