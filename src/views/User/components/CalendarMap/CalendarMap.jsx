import React,{ Component } from 'react'
import { hot } from 'react-hot-loader/root'
import echarts from 'echarts'
import './CalendarMap.less'

class CalendarMap extends Component {
    constructor() {
        super()
        this.DOM = null
        this.chart = null
    }

    componentDidMount() {
        this.DOM = document.getElementById('calendar-map')
        this.init()
    }

    init() {
        const self = this
        this.chart = echarts.init(this.DOM)
        this.chart.setOption({
            tooltip : {},
            visualMap: {
                show: false,
                min: 0,
                max: 10000,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                textStyle: {
                    color: '#000'
                },
                color: [ '#196127', '#239a3b', '#7bc96f', '#c6e48b', '#ebedf0', ]
            },
            calendar: {
                top: 20,
                left: 20,
                cellSize: ['auto', 14],
                range: '2019',
                splitLine: {
                    show: false,
                    lineStyle: {
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        opacity: 0
                    }
                },
                yearLabel: {show: false}
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: self._getVirtulData(2019)
            }
        }, true)
    }

    _getVirtulData(year) {
        year = year || '2017'
        const date = +echarts.number.parseDate(year + '-01-01')
        const end = +echarts.number.parseDate((+year + 1) + '-01-01')
        const dayTime = 3600 * 24 * 1000
        let data = []

        for (let time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ])
        }
        return data
    }

    render() {
        return <div id="calendar-map"></div>
    }
}

export default hot(CalendarMap)


