import React from 'react';
import * as d3 from 'd3';
import useD3Chart from '../../../hooks/useD3Chart'

function StackedAreaChart(props) {

    let { data } = props
    const renderChartFunction = async (svg) => {

        const height = 300;
        const width = 500;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.year))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1);

        const y1 = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.sales)])
            .rangeRound([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y1(d.sales))
            .curve(d3.curveMonotoneX);

        const xAxis = (g) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                d3.axisBottom(x).tickValues(
                    d3
                        .ticks(...d3.extent(x.domain()), width / 40)
                        .filter((v) => x(v) !== undefined)
                )
                    .tickSizeOuter(0)
            );

        const y1Axis = (g) =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .style("color", "steelblue")
                .call(d3.axisLeft(y1).ticks(null, "s"))
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g
                        .append("text")
                        .attr("x", -margin.left)
                        .attr("y", 10)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .text(data.y1)
                );

        svg.select(".x-axis").call(xAxis);
        svg.select(".y-axis").call(y1Axis);

        svg
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("fill", "orange")
            .attr("stroke", "green")
            .attr("stroke-width", 3.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line);


        // svg
        //     .select(".viewBox")
        //     .selectAll(".line")
        //     .data(data)
        //     .append("path")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .attr("fill", "red")
        //     .attr("stroke", "steelblue")
        //     .attr("stroke-width", 30.5)
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-linecap", "round")
        //     .attr('d', line)
        // .attr("x", (d) => x(d.year))
        // .attr("width", x.bandwidth())
        // .attr("y", (d) => y1(d.sales))
        // .attr("height", (d) => y1(0) - y1(d.sales));

        // .select(".plot-area")
        // .attr("fill", "steelblue")
        // .selectAll(".bar")
        // .data(data)
        // .join("rect")
        // .attr("class", "bar")
        // .attr("x", (d) => x(d.year))
        // .attr("width", x.bandwidth())
        // .attr("y", (d) => y1(d.sales))
        // .attr("height", (d) => y1(0) - y1(d.sales));

    }

    const ref = useD3Chart(renderChartFunction, data)

    return (
        <div style={{ width: '100%' }}>
            <svg
                ref={ref}
                style={{
                    height: 300,
                    width: "100%",
                    marginRight: "0px",
                    marginLeft: "0px",
                }}
            >
                <g className="viewBox" />
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    );
}

StackedAreaChart.defaultProps = {
    data: [
        { year: 1980, efficiency: 24.3, sales: 8949000 },
        { year: 1985, efficiency: 27.6, sales: 10979000 },
        { year: 1990, efficiency: 28, sales: 9303000 },
        { year: 1991, efficiency: 28.4, sales: 8185000 },
        { year: 1992, efficiency: 27.9, sales: 8213000 },
        { year: 1993, efficiency: 28.4, sales: 8518000 },
        { year: 1994, efficiency: 28.3, sales: 2991000 },
        { year: 1995, efficiency: 28.6, sales: 8620000 },
        { year: 1996, efficiency: 28.5, sales: 8479000 },
        { year: 1997, efficiency: 28.7, sales: 8217000 },
        { year: 1998, efficiency: 28.8, sales: 8085000 },
        { year: 1999, efficiency: 28.3, sales: 3638000 },
        { year: 2000, efficiency: 28.5, sales: 8778000 },
        { year: 2001, efficiency: 28.8, sales: 8352000 },
        { year: 2002, efficiency: 29, sales: 6042000 },
        { year: 2003, efficiency: 29.5, sales: 7556000 },
        { year: 2004, efficiency: 29.5, sales: 7483000 },
        { year: 2005, efficiency: 30.3, sales: 7660000 },
        { year: 2006, efficiency: 30.1, sales: 7762000 },
        { year: 2007, efficiency: 31.2, sales: 4562000 },
        { year: 2008, efficiency: 31.5, sales: 6769000 },
        { year: 2009, efficiency: 32.9, sales: 5402000 },
        { year: 2010, efficiency: 33.9, sales: 5636000 },
        { year: 2011, efficiency: 33.1, sales: 6093000 },
        { year: 2012, efficiency: 35.3, sales: 7245000 },
        { year: 2013, efficiency: 36.4, sales: 7586000 },
        { year: 2014, efficiency: 36.5, sales: 7708000 },
        { year: 2015, efficiency: 37.2, sales: 7517000 },
        { year: 2016, efficiency: 37.7, sales: 6873000 },
        { year: 2017, efficiency: 39.4, sales: 6081000 },
    ]
}

export default StackedAreaChart;