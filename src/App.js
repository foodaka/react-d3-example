import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import data from './data'
import styles from './App.css'
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

class d3Chart extends React.Component{
    constructor(props){
        super(props)
        this.state = {data:''}
    }

    componentDidMount(){
        this.draw()
    }


    draw(){

        const svg = d3.select("svg"),
            margin = {top: 50, right: 20, bottom: 50, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleLinear()
            .rangeRound([0,width]);

        const y = d3.scaleLinear()
            .rangeRound([height, 0]);
        const make_x_grid_lines = () =>{
                return d3.axisBottom(x)
                    .ticks(10)
            }
        //
        const make_y_gridlines = () => {
                return d3.axisLeft(y)
                    .ticks(10)
            }

        const lineCount = d3.line()
            .x(function(d) { return x(d.week); })
            .y(function(d) { return y(d.users); });


            x.domain(d3.extent(data, function(d) {return d.week; }));
            y.domain(d3.extent(data, function(d) { return d.users; }));
                // // add the X gridlines
                g.append("g")
                  .attr("class", `grid`)
                  .attr("transform", "translate(0," + height + ")")
                  .call(make_x_grid_lines()
                      .tickSize(-height)
                      .tickFormat(""))
                //   // add the Y gridlines
                g.append("g")
                .attr("class", `grid`)
                .call(make_y_gridlines()
                  .tickSize(-width)
                  .tickFormat(""))

                  //plot the x axis
                g.append("g")
                    .attr("class", `axis axis--x`)
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("class", `${cx('axis axis--y')}`)
                    .call(d3.axisLeft(y))
                //plot the color legend
                .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .style("text-anchor", "end")
                    .text("New Users");
                g.append('g')
                    .attr('class', 'legend')
                .append('text')
                    .attr('y',-10)
                    .attr('x',width-100)
                    .text('Users');
                g.append('g')
                    .append('rect')
                    .attr('y',-23)
                    .attr('x',width-55)
                    .attr('width',18)
                    .attr('height',18)
                    .attr('fill','steelblue');

            //plot the x axis legend
                svg.append("text")
                    .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 40) + ")")
                    .style("text-anchor", "middle")
                    .text("Week #");

                g.append("path")
                    .datum(data)
                    .attr("class", `lineUsers`)
                    .attr("d", lineCount)

    }


    render(){

        return (
            <div className="chart" >
                <h3>Visualizing Data with React and D3</h3>
                <svg width="960" height="500" style={{border:'solid 1px #eee',borderBottom:'solid 1px #ccc'}} />
            </div>
        )
    }
}

export default d3Chart;
