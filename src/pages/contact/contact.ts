import { Component, ViewChild, ElementRef, trigger } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import * as d3 from 'd3'
import * as d3Scale from "d3-scale";
import * as d3Axis from 'd3-axis';
import { appendNgContent } from '@angular/core/src/view/ng_content';
import { ascending } from 'd3';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('chart') chart: ElementRef;
  @ViewChild('buttonChart') buttonChart: ElementRef;
  w: number=500;
  format1="";
  h: number=500;

  margin = {top: 60, right: 20, bottom: 80, left: 60};

  width=this.w-this.margin.left-this.margin.right;

  height=this.h-this.margin.top-this.margin.bottom;

  svg :any;

  group:any;

  scaleX:any;

  scaleY:any;

  buttonSvg:any;

  groupButton:any;

  controls:any

  sort_btn:any

  initializedAxis:boolean=false;
  
  constructor(public navCtrl: NavController) {
   
  }
  
  data=[
    {key:"Glazed",value:132},
    {key:"Jelly",value:71},
    {key:"Holes",value:330},
    {key:"Sprinkles",value:93},
    {key:"Crumb",value:78},
    {key:"Chocolate",value:43}
  ]

  ascending(a,b){
    return a.value-b.value
  }



  descending(a,b){
    return b.value-a.value
  }


  initAxis(){
    
    this.scaleY=d3Scale

            .scaleLinear()

            .domain([0,d3.max(this.data,(d)=>d.value)])

            .range([this.height,0])

    this.scaleX=d3Scale
        
                .scaleBand()

                .domain(this.data.map((d)=>d.key))
                
                .rangeRound([0,this.width])
   
  }
  
  

  drawAxis(){

    if(this.initializedAxis){
      
      this.group.append('g')

            .classed('axis axis-x',true)

            .attr('transform','translate(0,' + (this.height) + ')')

            .call(d3Axis.axisBottom(this.scaleX))
              .selectAll('text')
              .style("text-anchor", "end")
              .attr('dx',-8)
              .attr("transform", "rotate(-45)")
             

      this.group.append('g')

          .classed('axis axis-y',true)

          .attr('transform','translate(0,0)')

          .call(d3Axis.axisLeft(this.scaleY))
         
        
      
      this.group.append('g')

            .classed('gridline',true)

            .attr('transform','translate(0,0)')
            
            .call(d3Axis.axisLeft(this.scaleY).ticks(5).tickSize(-this.width).tickValues([]))

     this.group.select(".axis.axis-y")
          .append('text')
          .attr('fill','black')
          .attr('x',0)
          .attr('y',0)
          .style('text-anchor','middle')
          .attr('transform','translate(-50,'+ this.height/2 +') rotate(-90)')
          .text("United")
    }else{

      this.group.selectAll('.axis.axis-x')
          .call(d3Axis.axisBottom(this.scaleX))
    }
              

  }
   

  plot(params){
    //enter
    this.group.selectAll('.bar')

      .data(params.data)
      .enter()
      .append('rect')
      .attr('class','bar')

     this.group.selectAll('.bar-label')

      .data(params.data)
      .enter()
      .append('text')
      .attr('class','bar-label')
      
      //update
      this.group.selectAll('.bar')
        .transition()
        .duration(500)
        .delay(500)
        .attr('x',(d,i)=>{
          return this.scaleX(d.key)
        })
        .attr('y',(d,i)=>{
          console.log(this.scaleY(d.value));
          return this.scaleY(d.value)
        })

        .attr('width',(d,i)=>{
          return this.scaleX(params.data[1].key)
        
        })
        .attr('height',(d,i)=>{
          console.log(this.scaleY(d.value))
          return this.height-this.scaleY(d.value);
        })
        .style('fill',(d,i)=>{
          return d3.schemeCategory10[i];
        })

        this.group.selectAll('.bar-label')

    
          .attr('x',(d,i)=>{

            return this.scaleX(d.key)+this.scaleX(params.data[1].key)/2;
    
          })
          // .attr('dx',-4)
          .attr('y',(d,i)=>{
          
            return this.scaleY(d.value)
          })
          .attr('dy',0)
          .classed('bar-label',true)
          .text((d,i)=>{
            return d.value
          })
      //exit

      this.group.selectAll('.bar')

        .data(params.data)
        .exit()
        .remove()
        

    this.group.selectAll('.bar-label')

      .data(params.data)
      .exit()
      .remove()
  }

  initSvg(){

    let element=this.chart.nativeElement;
    
    this.svg=d3
              .select(element).append('svg')
              .attr('id','chart') 
              .attr('width',this.w)
              .attr('height',this.h)

    this.group=this.svg
                    .append('g')
                    .classed('diaplay',true)
                    .attr("transform", "translate(" + this.margin.left+ "," + this.margin.top + ")");
    
    let buttonElement=this.buttonChart.nativeElement;

   
    this.sort_btn=d3.select(buttonElement)
                  .append('button')
                  .html('Sort data:ascending')
                  .attr('id',"btn")
                  .attr('state',0)
   
  

  }

  
  ionViewDidLoad() {

    this.initializedAxis=true;

    this.initSvg();

    this.initAxis();
    
    this.drawAxis();

    this.plot({data:this.data})

    this.sort_btn.on('click',()=>{
      
      let self=d3.select('#btn')

      let state=+self.attr('state');

     let txt='Sort Data: '

     if(state==0){
       this.data.sort(this.ascending)
       state=1;
       txt+='descending'
     }else{
       this.data.sort(this.descending)
      state=0;
      txt+='ascending'
     }

     self.attr('state',state)

     self.html(txt)

     this.initializedAxis=false

     this.initAxis();
     
     this.drawAxis();

     this.plot({data:this.data})

     
    })
   
  }

}
