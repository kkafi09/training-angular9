import { ChartType } from './dashboard.model';
import { graphic } from 'echarts';

const pieChart: ChartType = {
    series: [{
        data: [
            { value: 45, name: 'Crome' },
            { value: 20, name: 'IE' }, { value: 17, name: 'Firefox' }, { value: 5, name: 'Safari' }, { value: 10, name: 'Etc' }],
        type: 'pie',
    }],
    color: ['#000', '#000', '#000', '#000', '#000'],
    legend: {
        x: 'center',
        y: 'bottom',
        data: ['Crome', 'IE', 'Firefox', 'Safari', 'Etc'],
    },
    tooltip: {
        trigger: 'axis'
    },
};

export { pieChart };
