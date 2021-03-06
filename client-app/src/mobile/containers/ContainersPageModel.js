import {HoistModel} from '@xh/hoist/core';
import {TabContainerModel} from '@xh/hoist/mobile/cmp/tab';

import {hBoxPage} from './HBoxPage';
import {vBoxPage} from './VBoxPage';
import {toolbarPage} from './ToolbarPage';

@HoistModel
export class ContainersPageModel {

    tabContainerModel = new TabContainerModel({
        defaultTabId: 'hbox',
        tabs: [
            {
                id: 'hbox',
                pageFactory: hBoxPage,
                label: 'HBox'
            },
            {
                id: 'vbox',
                pageFactory: vBoxPage,
                label: 'VBox'
            },
            {
                id: 'toolbar',
                pageFactory: toolbarPage,
                label: 'Toolbars'
            }
        ]
    });

}