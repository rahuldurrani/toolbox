/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {XH, BaseAppModel} from 'hoist/core';
import {TabContainerModel, FeedbackDialogModel} from 'hoist/cmp';

import {HomePanel} from './tabs/home/HomePanel';
import {LeftRightChooserPanel} from './tabs/components/LeftRightChooserPanel';
import {LoadMaskPanel} from './tabs/components/LoadMaskPanel';
import {ToolbarPanel} from './tabs/components/ToolbarPanel';
import {HboxContainerPanel} from './tabs/containers/HboxContainerPanel';
import {VboxContainerPanel} from './tabs/containers/VboxContainerPanel';
import {ResizableContainerPanel} from './tabs/containers/ResizableContainerPanel';
import {TabPanelContainerPanel} from './tabs/containers/TabPanelContainerPanel';
import {StandardGridPanel} from './tabs/grids/StandardGridPanel';
import {GroupedGridPanel} from './tabs/grids/GroupedGridPanel';
import {IconsPanel} from './tabs/icons/IconsPanel';

export class AppModel extends BaseAppModel {

    feedbackModel = new FeedbackDialogModel();
    tabs = this.createTabContainer();

    async initAsync() {
        XH.track({msg: 'Loaded App'});
    }

    getRoutes() {
        return [
            {
                name: 'default',
                path: '/app',
                forwardTo: 'default.home',
                children: this.getTabRoutes()
            }
        ];
    }

    //------------------------
    // Implementation
    //------------------------
    createTabContainer() {
        return new TabContainerModel({
            id: 'default',
            useRoutes: true,
            orientation: 'h',
            children: this.createTabs()
        });
    }

    //------------------------
    // For override / extension
    //------------------------
    getTabRoutes() {
        return [
            {
                name: 'home',
                path: '/home'
            },
            {
                name: 'components',
                path: '/components',
                forwardTo: 'default.components.leftRightChooser',
                children: [
                    {name: 'leftRightChooser', path: '/leftRightChooser'},
                    {name: 'loadMask', path: '/loadMask'},
                    {name: 'toolbar', path: '/toolbar'}
                ]
            },
            {
                name: 'containers',
                path: '/containers',
                forwardTo: 'default.containers.hbox',
                children: [
                    {name: 'hbox', path: '/hbox'},
                    {name: 'vbox', path: '/vbox'},
                    {name: 'resizable', path: '/resizable'},
                    {name: 'tabPanel', path: '/tabPanel'}
                ]
            },
            {
                name: 'grids',
                path: '/grids',
                forwardTo: 'default.grids.standard',
                children: [
                    {name: 'standard', path: '/standard'},
                    {name: 'grouped', path: '/grouped'}
                ]
            },
            {
                name: 'icons',
                path: '/icons'
            }
        ];
    }

    createTabs() {
        return [
            {
                id: 'home',
                component: HomePanel
            },
            {
                id: 'components',
                orientation: 'v',
                children: [
                    {id: 'leftRightChooser', component: LeftRightChooserPanel},
                    {id: 'loadMask', component: LoadMaskPanel},
                    {id: 'toolbar', component: ToolbarPanel}
                ]
            },
            {
                id: 'containers',
                orientation: 'v',
                children: [
                    {id: 'hbox', component: HboxContainerPanel},
                    {id: 'vbox', component: VboxContainerPanel},
                    {id: 'resizable', component: ResizableContainerPanel},
                    {id: 'tabPanel', component: TabPanelContainerPanel}
                ]
            },
            {
                id: 'grids',
                orientation: 'v',
                children: [
                    {id: 'standard', component: StandardGridPanel},
                    {id: 'grouped', component: GroupedGridPanel}
                ]
            },
            {
                id: 'icons',
                component: IconsPanel
            }
        ];
    }
}