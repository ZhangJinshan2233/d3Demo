import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as liquid from './liquidFillGauge';
/**
 * Generated class for the LiqudGaugePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liqud-gauge',
  templateUrl: 'liqud-gauge.html',
})

export class LiqudGaugePage  {

  width: number;
  height: number;
  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiqudGaugePage');
  }
  @ViewChild('gauge') gauge: any;
  id = 'gauge'; // assign a random ID to SVG component
  private defaultSettings = liquid.liquidFillGaugeDefaultSettings();
  @Input() private value = 90;
  @Input() private minValue = this.defaultSettings.minValue;
  @Input() private maxValue = this.defaultSettings.maxValue;
  @Input() private circleThickness = this.defaultSettings.circleThickness;
  @Input() private circleFillGap = this.defaultSettings.circleFillGap;
  @Input() private circleColor = this.defaultSettings.circleColor;
  @Input() private waveHeight = this.defaultSettings.waveHeight;
  @Input() private waveCount = this.defaultSettings.waveCount;
  @Input() private waveRiseTime = this.defaultSettings.waveRiseTime;
  @Input() private waveAnimateTime = this.defaultSettings.waveAnimateTime;
  @Input() private waveRise = this.defaultSettings.waveRise;
  @Input() private waveHeightScaling = this.defaultSettings.waveHeightScaling;
  @Input() private waveAnimate = this.defaultSettings.waveAnimate;
  @Input() private waveColor = this.defaultSettings.waveColor;
  @Input() private waveOffset = this.defaultSettings.waveOffset;
  @Input() private textVertPosition = this.defaultSettings.textVertPosition;
  @Input() private textSize = this.defaultSettings.textSize;
  @Input() private valueCountUp = this.defaultSettings.valueCountUp;
  @Input() private displayPercent = this.defaultSettings.displayPercent;
  @Input() private textColor = this.defaultSettings.textColor;
  @Input() private waveTextColor = this.defaultSettings.waveTextColor;

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createChart();
  }

  createChart(): any {

    const element: Element = this.gauge.nativeElement;
    //clear previous chart
    d3.select(element).selectAll('*').remove();

    d3.select(element)
      .append('svg').attr('id', this.id)
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox','0 0 900 500');
    const settings = {
      minValue: this.minValue,
      maxValue: this.maxValue,
      circleThickness: this.circleThickness,
      circleFillGap: this.circleFillGap,
      circleColor: this.circleColor,
      waveHeight: this.waveHeight,
      waveCount: this.waveCount,
      waveRiseTime: this.waveRiseTime,
      waveAnimateTime: this.waveAnimateTime,
      waveRise: this.waveRise,
      waveHeightScaling: this.waveHeightScaling,
      waveAnimate: this.waveAnimate,
      waveColor: this.waveColor,
      waveOffset: this.waveOffset,
      textVertPosition: this.textVertPosition,
      textSize: this.textSize,
      valueCountUp: this.valueCountUp,
      displayPercent: this.displayPercent,
      textColor: this.textColor,
      waveTextColor: this.waveTextColor,
    };
    liquid.loadLiquidFillGauge(this.id, this.value, settings);
  }
}
