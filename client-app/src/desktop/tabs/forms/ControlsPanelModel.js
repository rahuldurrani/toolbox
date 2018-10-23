import {HoistModel} from '@xh/hoist/core';
import {FieldSupport, field} from '@xh/hoist/field';
import moment from 'moment';
import {random} from 'lodash';

@HoistModel
@FieldSupport
export class ControlsPanelModel {

    // TextInput / TextArea
    @field() text1;
    @field() text2;
    @field() text3;
    @field() text4;
    @field() text5;

    // NumberInput / Single-val Slider
    @field() number1;
    @field() number2;
    @field() number3;
    @field() number4;

    // Multi-val Slider
    @field() range1;

    // Dropdowns
    @field() option1
    @field() option2
    @field() option3
    @field() option4
    @field() option5
    @field() option6

    // Others
    @field() date1;
    @field() date2;
    @field() bool1;
    @field() bool2;
    @field() buttonGroup1;
    
    constructor() {
        this.initFields({
            option1: 'CA',
            number3: random(0, 100),
            range1: [random(50000, 70000), random(110000, 150000)],
            date2: moment().startOf('hour').toDate(),
            buttonGroup1: 'button2'
        });
    }
}