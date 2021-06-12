import { Component, OnInit } from '@angular/core';
import { chartData } from 'src/app/models/chartData';
import { GeneralService } from 'src/app/services/general.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-_dashboard',
  templateUrl: './_dashboard.component.html',
  styleUrls: ['./_dashboard.component.scss']
})
export class _dashboardComponent implements OnInit {
  public tasksByStatus: Partial<ChartOptions>
  public tasksByResults: Partial<ChartOptions>
  public todos: Partial<ChartOptions>
  public taskSuccessRate: number;
  constructor(
    private svc: GeneralService
  ) {
    this.initializeChartOptions();

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.svc.getChartDatas().subscribe(res => {
      this.tasksByStatus.labels = res[0].labels
      this.tasksByStatus.series = res[0].series
      this.tasksByResults.labels = res[1].labels
      this.tasksByResults.series = res[1].series
      this.todos.labels = res[2].labels
      this.todos.series = res[2].series
      this.taskSuccessRate = Math.floor((100 / (res[1].series[0] + res[1].series[1])) * res[1].series[0])
    })
  }



  initializeChartOptions() {
    this.tasksByStatus = {
      series: [0, 0, 0],
      chart: {
        type: "donut"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
              legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.tasksByResults = {
      series: [0, 0, 0],
      chart: {
        type: "donut"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend:{
              position:"bottom"
            }
          }      
        }
      ]
    };
    this.todos = {
      series: [0, 0],
      chart: {
        type: "donut"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
