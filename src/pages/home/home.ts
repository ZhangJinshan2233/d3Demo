import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';

import * as d3Scale from 'd3-scale';

import * as d3Axis from 'd3-axis';

import *as d3TimeFormat from 'd3-time-format';

import * as d3Time from 'd3-time';

import * as d3 from 'd3';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('lineContriner') lineContriner:ElementRef;

  data=[
    {key: "Jelly", value: 60, date: "2014-01-01" },
    {key: "Jelly", value: 58, date: "2014-01-02" },
    {key: "Jelly", value: 59, date: "2014-01-03" },
    {key: "Jelly", value: 56, date: "2014-01-04" },
    {key: "Jelly", value: 57, date: "2014-01-05" },
    {key: "Jelly", value: 55, date: "2014-01-06" },
    {key: "Jelly", value: 56, date: "2014-01-07" },
    {key: "Jelly", value: 52, date: "2014-01-08" },
    {key: "Jelly", value: 54, date: "2014-01-09" },
    {key: "Jelly", value: 57, date: "2014-01-10" },
    {key: "Jelly", value: 56, date: "2014-01-11" },
    {key: "Jelly", value: 59, date: "2014-01-12" },
    {key: "Jelly", value: 56, date: "2014-01-13" },
    {key: "Jelly", value: 52, date: "2014-01-14" },
    {key: "Jelly", value: 48, date: "2014-01-15" },
    {key: "Jelly", value: 47, date: "2014-01-16" },
    {key: "Jelly", value: 48, date: "2014-01-17" },
    {key: "Jelly", value: 45, date: "2014-01-18" },
    {key: "Jelly", value: 43, date: "2014-01-19" },
    {key: "Jelly", value: 41, date: "2014-01-20" },
    {key: "Jelly", value: 37, date: "2014-01-21" },
    {key: "Jelly", value: 36, date: "2014-01-22" },
    {key: "Jelly", value: 39, date: "2014-01-23" },
    {key: "Jelly", value: 41, date: "2014-01-24" },
    {key: "Jelly", value: 42, date: "2014-01-25" },
    {key: "Jelly", value: 40, date: "2014-01-26" },
    {key: "Jelly", value: 43, date: "2014-01-27" },
    {key: "Jelly", value: 41, date: "2014-01-28" },
    {key: "Jelly", value: 39, date: "2014-01-29" },
    {key: "Jelly", value: 40, date: "2014-01-30" },
    {key: "Jelly", value: 39, date: "2014-01-31" } ];

  width:number;
  height:number;
  xScale:any;
  yScale:any;
  svg:any;
  lineChart:any;
  line:any;
  area:any;

  margin={top: 20, right: 20, bottom: 50, left: 40};

  constructor(public navCtrl: NavController) {

    this.height=500-this.margin.top-this.margin.bottom;

    this.width=900-this.margin.left-this.margin.right;

  }

 
  initSvg(){

    let lineContrainerelement=this.lineContriner.nativeElement;

    this.svg=d3.select(lineContrainerelement)
              .append('svg')
              .attr("width", '100%')
              .attr("height", '100%')
              .attr('viewBox','0 0 900 500');

    this.lineChart=this.svg
                        .append('g')
                        .attr('class','display-line-chart')
                        .attr('transform','translate('+ this.margin.left+','+this.margin.top+')');
      
  }

  initAxis(){

    let dateParser=d3.timeParse('%Y-%m-%d')

    this.xScale=d3Scale.scaleTime()
    
                      .domain(d3.extent(this.data,(d)=>{

                        let date=dateParser(d.date)

                        return date;

                      }))
                      .range([0,this.width])
             
               
    this.yScale=d3Scale.scaleLinear()
                      .domain([0,d3.max(this.data,(d)=>{
                        return d.value
                      })])
                      .range([this.height,0])

  }

  drawAxis(){

    this.lineChart     
        .append('g')
        .attr('class','axis x')
        .attr('transform','translate(0,'+this.height+')')
        .call(d3Axis.axisBottom(this.xScale).ticks(d3.timeWeek).tickFormat(d3.timeFormat('%m-%d')))
        .selectAll('text')
        .style('text-anchor','end')
        .attr('dx',-5)
        .attr("transform", "rotate(-45)")

    this.lineChart
        .append('g')
        .classed('axis y',true)
        .attr('transform','translate(0,0)')
        .call(d3Axis.axisLeft(this.yScale).ticks(10))

    

  }

  drawLine(){

   let dateParser=d3.timeParse('%Y-%m-%d')

    this.line=d3.line()
                /*
                * d was declared any 
                */
                .curve(d3.curveCardinal)
                .x((d:any)=>{ 
                  let date=dateParser(d['date'])
                  return this.xScale(date)
                })

                .y((d:any)=>{
                  return this.yScale(d['value'])
                })
                

              
  }

  drawArea(){

    let dateParser=d3.timeParse('%Y-%m-%d')

    this.area=d3.area()
                .curve(d3.curveCardinal)
                .x((d)=>{
                  
                  let date=dateParser(d['date'])

                  return this.xScale(date)
                })
                .y0(this.height)

                .y1((d)=>{

                  return this.yScale(d['value'])
                })
  }


  drawChart(data:Array<any>){

    let dateParser=d3.timeParse('%Y-%m-%d')
     /*
      *enter
    */
    this.lineChart
        .selectAll('.trendline')
        .data(data)
        .enter()
        .append('path')
        .classed('trendline',true)

    this.lineChart
        .selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .classed('area',true)


    this.lineChart
        .selectAll('.point')
        .data(data)
        .enter()
        .append('circle')
        .attr('class','point')
        .attr('r',2)

     /*
      *update
    */

    this.lineChart
        .selectAll('.trendline')
        .attr('d',this.line(data))
        .attr("stroke", "brown")
        .attr("stroke-width", "2")
        .attr("fill", "none");

    this.lineChart
        .selectAll('.area')
        .attr('d',this.area(data))
        .attr("stroke", "#ccc")
        .attr("stroke-width", "2")
        .attr("fill", "#ccc")
        .attr('opacity',0.25)


    this.lineChart
        .selectAll('.point')
        .attr('cx',(d,i)=>{

          let date=dateParser(d.date)
          return this.xScale(date)
        })
        .attr('cy',(d,i)=>{
          return this.yScale(d.value);
        })    

    /*
      *exit
    */

    this.lineChart
        .selectAll('.point')
        .data(data)
        .exit()
        .remove();
    
    this.lineChart
        .selectAll('.area')
        .data(data)
        .exit()
        .remove();


    this.lineChart
        .selectAll('.trendline')
        .data(data)
        .exit()
        .remove();
  }

  ionViewDidLoad() {

    this.initSvg();
    this.initAxis();
    this.drawLine();
    this.drawArea();
    this.drawAxis()
   
    this.drawChart(this.data)
   
  }





}
